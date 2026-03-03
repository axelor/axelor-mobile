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

import {storage} from '../storage/Storage';
import {URL_STORAGE_KEY} from './type';
import {Session} from './type';

export const manageDefaultSession = (
  sessionList: Session[],
  session: Session,
): Session[] => {
  if (session.isDefault) {
    return sessionList.map(_session => {
      if (_session.id === session.id) {
        return {..._session, isDefault: true};
      }

      return {..._session, isDefault: false};
    });
  }

  return sessionList;
};

export const getStorageUrl = (): string => {
  return storage.getItem(URL_STORAGE_KEY);
};

export const saveUrlInStorage = (url: string): void => {
  storage.setItem(URL_STORAGE_KEY, url);
};

export const migrateOldSessionToNewSystem = (data: any[]): Session[] => {
  return data.map((_item, index) => {
    if (_item?.name == null) {
      return {
        id: `session-${Date.now()}-${index}`,
        name: _item.id,
        url: _item.url,
        username: _item.username,
        isDefault: _item.isActive,
      };
    } else {
      return _item as Session;
    }
  });
};
