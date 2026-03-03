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

import {DATAWEDGE_API, DATAWEDGE_RESULT} from './path.helpers';

export function isScanIntent(intent: any): boolean {
  return (
    intent.hasOwnProperty(DATAWEDGE_RESULT.LABEL_TYPE) &&
    intent.hasOwnProperty(DATAWEDGE_RESULT.DATA_STRING)
  );
}

export function castScanIntent(intent: any) {
  return {
    labelType: intent[DATAWEDGE_RESULT.LABEL_TYPE],
    time: new Date(intent[DATAWEDGE_RESULT.DATA_DISPATCH_TIME]),
    value: intent[DATAWEDGE_RESULT.DATA_STRING],
  };
}

const EAN13_LABEL_TYPE = 'LABEL-TYPE-EAN13';

export function formatBarcode(value: string, type: string) {
  return type === EAN13_LABEL_TYPE ? value.slice(0, -1) : value;
}

export function isVersionIntent(intent: any): boolean {
  return intent.hasOwnProperty(DATAWEDGE_API.RESULT_GET_VERSION_INFO);
}

export function castVersionIntent(intent: any) {
  const versionInfo = intent[DATAWEDGE_API.RESULT_GET_VERSION_INFO];
  return {
    version: versionInfo.DATAWEDGE,
  };
}
