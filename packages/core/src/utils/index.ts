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

export {updateAgendaItems} from './agenda';
export {
  isDate,
  isDateTime,
  getNextMonth,
  getPreviousMonth,
  diffDate,
  sameDate,
  incrementDate,
} from './date';
export {displayItemName} from './displayers';
export {
  formatDate,
  formatDateTime,
  formatTime,
  formatScan,
  formatURL,
  getNowDateZonesISOString,
  getDateZonesISOString,
} from './formatters';
export {useBinaryImageUri, useBinaryPictureUri, useMetafileUri} from './image';
export {filterList, filterListContain} from './list';
export {
  calculateDiff,
  formatDuration,
  formatTwoNumber,
  getIntegerPart,
} from './time';
export {
  areObjectsEquals,
  isEmpty,
  fetchJsonField,
  filterObjectsFields,
  pickFieldsOfObject,
  isPlainObject,
} from './object';
export {showToastMessage} from './show-toast-message';
export {checkNullString, isHtml, splitInTwo, stringNoAccent} from './string';
export {filterChip} from './filter';
