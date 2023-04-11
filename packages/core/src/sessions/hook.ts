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
import {sessionStorage} from './SessionStorage';
import {Session} from './type';

export const useSessions = (
  enableConnectionSessions: boolean = false,
): {sessionList: Session[]; sessionActive: Session} => {
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
