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

import {getNetInfo} from '../api';
import {formatURL as _formatURL} from './formatters';

const PREFIX_REGEX = /^https?:\/\//;
const INVALID_URL_CODE = 999;
const NO_CONNECTION_CODE = 418;

export function testUrl(url: string): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    if (!url || typeof url !== 'string') {
      reject(new Error(`Invalid URL: "${url}" ${INVALID_URL_CODE}`));
      return;
    }

    const formatUrl = _formatURL(
      isHttpUrl(url) ? url.replace(PREFIX_REGEX, '') : url,
    );

    const urlsWithProtocol = ['https', 'http'].map(
      protocol => `${protocol}://${formatUrl}`,
    );

    for (const urlWithProtocol of urlsWithProtocol) {
      try {
        const response = await fetch(urlWithProtocol);
        if (response.ok) {
          resolve(urlWithProtocol);
          return;
        }
      } catch (error) {
        console.warn('error while testing url', error);
      }
    }

    const {isConnected} = await getNetInfo();

    if (!isConnected) {
      reject(
        new Error(
          `No available connection while testing URL: "${url}" ${NO_CONNECTION_CODE}`,
        ),
      );
    }

    reject(new Error(`Could not fetch URL: "${url}" ${INVALID_URL_CODE}`));
  });
}

export function isHttpUrl(url: string) {
  return PREFIX_REGEX.test(url);
}
