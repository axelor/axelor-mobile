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

export const useSessions = (): {
  sessionList: Session[];
  sessionActive: Session;
  sessionDefault: Session;
} => {
  const [sessionList, setSessionList] = useState(
    sessionStorage.getSessionList(),
  );

  const [sessionActive, setSessionActive] = useState(
    sessionStorage.getActiveSession(),
  );
  const [sessionDefault, setSessionDefault] = useState(
    sessionStorage.getDefaultSession(),
  );

  const refreshData = useCallback(
    ({sessionList: sessions, activeSession, defaultSession}) => {
      setSessionActive(activeSession);
      setSessionList(sessions);
      setSessionDefault(defaultSession);
    },
    [],
  );

  useEffect(() => {
    sessionStorage.register(refreshData);
  }, [refreshData]);

  return useMemo(() => {
    return {
      sessionList: sessionList,
      sessionActive: sessionActive,
      sessionDefault: sessionDefault,
    };
  }, [sessionActive, sessionList, sessionDefault]);
};
