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

import {AxiosResponse} from 'axios';

export const translationMiddleware = (
  response: AxiosResponse,
): AxiosResponse => {
  try {
    if (response?.data?.data) {
      const originalData = response.data.data;
      const updatedData = originalData.map(item => {
        const itemKeys = Object.keys(item);
        const translationKeys = itemKeys.filter(key => key.startsWith('$t:'));

        if (translationKeys.length > 0) {
          translationKeys.forEach(translationKey => {
            const key = translationKey.split(':')?.[1];
            if (key) {
              item[key] = item[translationKey];
            }
          });
        }

        return item;
      });

      const updatedResponse: AxiosResponse = {
        ...response,
        data: {
          ...response.data,
          data: updatedData,
        },
      };

      return updatedResponse;
    }

    return response;
  } catch (error) {
    throw error;
  }
};
