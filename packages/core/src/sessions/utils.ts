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

import {storage} from '../storage/Storage';
import {URL_STORAGE_KEY} from './type';
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

export const setDefaultSession = (
  sessionList: Session[],
  defaultSessionId: string,
): Session[] => {
  return sessionList.map(_session => {
    if (_session.id === defaultSessionId) {
      return {..._session, isDefault: true};
    }

    return {..._session, isDefault: false};
  });
};

export const getStorageUrl = (): string => {
  return storage.getItem(URL_STORAGE_KEY);
};

export const saveUrlInStorage = (url: string): void => {
  storage.setItem(URL_STORAGE_KEY, url);
};
