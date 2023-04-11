import {Session} from './type';

export const setActiveSession = (
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
