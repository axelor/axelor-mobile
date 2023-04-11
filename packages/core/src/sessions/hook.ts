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
