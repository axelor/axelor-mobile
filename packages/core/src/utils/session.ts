/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {useCallback, useEffect, useMemo, useState} from 'react';
import {storage, Storage} from '../storage/Storage';

const SESSION_KEY = 'ConnectionSessions';

const setActiveSession = (
  sessionList: Session[],
  activeSessionId: string,
): Session[] => {
  return sessionList.map(_session => {
    if (_session.id === activeSessionId) {
      return {..._session, isActive: true};
    }

    return {..._session, isActive: false};
  });
};

interface Session {
  id: string;
  url: string;
  username: string;
  isActive: boolean;
}

class SessionStorage {
  private refreshCallBack: ({
    sessionList,
    activeSession,
  }: {
    sessionList: Session[];
    activeSession: Session;
  }) => void;

  constructor(private localStorage: Storage) {}

  register(callBack) {
    this.refreshCallBack = callBack;
  }

  private updateState() {
    if (this.refreshCallBack != null) {
      this.refreshCallBack({
        sessionList: this.getSessionList(),
        activeSession: this.getActiveSession(),
      });
    }
  }

  getSessionList(): Session[] {
    const item = this.localStorage.getItem(SESSION_KEY);
    return item;
  }

  getActiveSession(): Session {
    const sessionList = this.getSessionList();

    if (!Array.isArray(sessionList) || sessionList.length === 0) {
      return null;
    }

    return sessionList.find(_session => _session.isActive === true);
  }

  addSession({session}: {session: Session}) {
    const sessionList = this.getSessionList();

    if (!Array.isArray(sessionList) || sessionList.length === 0) {
      this.localStorage.setItem(SESSION_KEY, [session]);
      return;
    }

    sessionList.push(session);
    const activeSessionList = setActiveSession(sessionList, session.id);
    this.localStorage.setItem(SESSION_KEY, activeSessionList);

    this.updateState();
  }

  changeActiveSession({sessionId}: {sessionId: string}) {
    const sessionList = this.getSessionList();

    if (!Array.isArray(sessionList) || sessionList.length === 0) {
      return;
    }

    const activeSessionList = setActiveSession(sessionList, sessionId);
    this.localStorage.setItem(SESSION_KEY, activeSessionList);

    this.updateState();
  }

  removeSession({sessionId}: {sessionId: string}) {
    const sessionList = this.getSessionList();

    if (!Array.isArray(sessionList) || sessionList.length === 0) {
      return;
    }

    const index = sessionList.findIndex(_session => _session.id === sessionId);

    if (index !== -1) {
      sessionList.splice(index, 1);
    }

    this.localStorage.setItem(SESSION_KEY, sessionList);

    this.updateState();
  }
}

export const sessionStorage = new SessionStorage(storage);

export const useSessions = (enableConnectionSessions: boolean = false) => {
  const [sessionList, setSessionList] = useState(
    sessionStorage.getSessionList(),
  );

  const [sessionActive, setSessionActive] = useState(
    sessionStorage.getActiveSession(),
  );

  const refreshData = useCallback(({sessionList: sessions, activeSession}) => {
    setSessionActive(activeSession);
    setSessionList(sessions);
  }, []);

  useEffect(() => {
    sessionStorage.register(refreshData);
  }, [refreshData]);

  return useMemo(() => {
    if (enableConnectionSessions) {
      return {
        sessionList: sessionList,
        sessionActive: sessionActive,
      };
    }

    return {
      sessionList: [],
      sessionActive: null,
    };
  }, [enableConnectionSessions, sessionActive, sessionList]);
};
