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

export {updateAgendaItems} from './agenda';
export * from './api';
export {
  decreaseDate,
  diffDate,
  getDay,
  getEndOfDay,
  getFromNowDate,
  getFullDateItems,
  getMonth,
  getNextMonth,
  getPreviousMonth,
  getStartOfDay,
  incrementDate,
  isDate,
  isDateTime,
  ISODateTimeToDate,
  isMidnightDate,
  isToday,
  sameDate,
} from './date';
export {
  displayItemName,
  displayItemFullname,
  displayItemTitle,
} from './displayers';
export {sanitizeFileName} from './file';
export {
  formatDate,
  formatDateTime,
  formatTime,
  formatScan,
  formatURL,
  getNowDateZonesISOString,
  getDateZonesISOString,
  formatRequestBody,
} from './formatters';
export {useBinaryImageUri, useBinaryPictureUri, useMetafileUri} from './image';
export {filterList, filterListContain, getLastItem, getNextItem} from './list';
export {
  calculateDiff,
  formatDuration,
  formatTwoNumber,
  getIntegerPart,
  formatDurationToMiliseconds,
  hoursToMilliseconds,
} from './time';
export {
  areObjectsEquals,
  isEmpty,
  fetchJsonField,
  filterObjectsFields,
  pickFieldsOfObject,
  isPlainObject,
} from './object';
export {getRoles} from './role';
export {showToastMessage} from './show-toast-message';
export {
  checkNullString,
  formatVersionString,
  isHtml,
  splitInTwo,
  stringNoAccent,
} from './string';
export {filterChip, filterChipCriteria} from './filter';
