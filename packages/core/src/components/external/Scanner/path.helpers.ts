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

const DATAWEDGE_PATH = 'com.symbol.datawedge';
const API_PATH = `${DATAWEDGE_PATH}.api`;

export const DATAWEDGE_API = {
  GET_VERSION_INFO: `${API_PATH}.GET_VERSION_INFO`,
  RESULT_ACTION: `${API_PATH}.RESULT_ACTION`,
  RESULT_GET_VERSION_INFO: `${API_PATH}.RESULT_GET_VERSION_INFO`,
  ACTION: `${API_PATH}.ACTION`,
  CREATE_PROFILE: `${API_PATH}.CREATE_PROFILE`,
  GET_ACTIVE_PROFILE: `${API_PATH}.GET_ACTIVE_PROFILE`,
  SET_CONFIG: `${API_PATH}.SET_CONFIG`,
  ENUMERATE_SCANNERS: `${API_PATH}.ENUMERATE_SCANNERS`,
};

export const DATAWEDGE_RESULT = {
  LABEL_TYPE: `${DATAWEDGE_PATH}.label_type`,
  DATA_DISPATCH_TIME: `${DATAWEDGE_PATH}.data_dispatch_time`,
  DATA_STRING: `${DATAWEDGE_PATH}.data_string`,
};
