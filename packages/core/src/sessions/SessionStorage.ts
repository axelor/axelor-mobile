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

import {storage, Storage} from '../storage/Storage';
import {Session} from './type';
import {setActiveSession} from './utils';

const SESSION_KEY = 'ConnectionSessions';

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
    let sessionList = this.getSessionList();

    if (!Array.isArray(sessionList) || sessionList.length === 0) {
      this.localStorage.setItem(SESSION_KEY, [session]);
      return;
    }

    if (sessionList.find(_item => _item.id === session.id)) {
      sessionList = sessionList.map(_item => {
        if (_item.id === session.id) {
          return {..._item, ...session};
        }

        return _item;
      });
    } else {
      sessionList.push(session);
    }

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
