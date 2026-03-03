/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {manageDefaultSession, migrateOldSessionToNewSystem} from './utils';

const SESSION_KEY = 'ConnectionSessions';

class SessionStorage {
  private refreshCallBack: ({
    sessionList,
    defaultSession,
  }: {
    sessionList: Session[];
    defaultSession: Session;
  }) => void;

  constructor(private localStorage: Storage) {}

  init(isDemoSession: boolean, demoSession: Session) {
    if (isDemoSession && this.localStorage.getItem(SESSION_KEY) == null) {
      this.registerSession({session: demoSession});
    }
  }

  register(callBack) {
    this.refreshCallBack = callBack;
  }

  private updateState() {
    if (this.refreshCallBack != null) {
      this.refreshCallBack({
        sessionList: this.getSessionList(),
        defaultSession: this.getDefaultSession(),
      });
    }
  }

  getSessionList(): Session[] {
    const storageData = this.localStorage.getItem(SESSION_KEY) || [];

    if (storageData.some(_item => _item?.name == null)) {
      this.localStorage.setItem(
        SESSION_KEY,
        migrateOldSessionToNewSystem(storageData),
      );
      return this.getSessionList();
    }

    return storageData;
  }

  getDefaultSession(): Session {
    const sessionList = this.getSessionList();

    if (!Array.isArray(sessionList) || sessionList.length === 0) {
      return null;
    }

    return sessionList.find(_session => _session.isDefault === true);
  }

  private saveSession(session: Session, list: Session[]) {
    const id = session?.id || `session-${Date.now()}`;
    const _session = {...session, id};

    if (!Array.isArray(list) || list.length === 0) {
      list = [];
    }

    if (session.id != null && list.find(_item => _item.id === session.id)) {
      list = list.map(_item => {
        if (_item.id === session.id) {
          return {..._item, ...session};
        }

        return _item;
      });
    } else {
      list.push(_session);
    }

    list = manageDefaultSession(list, _session);

    this.localStorage.setItem(SESSION_KEY, list);
  }

  saveHiddenSession(session: Session) {
    if (session == null) {
      return;
    }

    this.saveSession(session, []);
  }

  registerSession({session}: {session: Session}) {
    if (session == null) {
      return;
    }

    let sessionList = this.getSessionList();
    this.saveSession(session, sessionList);

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
