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

import {
  formatDateTime,
  Selection,
  TranslatorProps,
} from '@axelor/aos-mobile-core';

export const getDates = (
  status: number,
  statusType: Selection,
  plannedStartDate: string,
  plannedEndDate: string,
  realStartDate: string,
  realEndDate: string,
  I18n: TranslatorProps,
): {title: string; value: string}[] => {
  const formatDate = date => {
    if (date == null) {
      return '';
    }

    return formatDateTime(date, I18n.t('Base_DateTimeFormat'));
  };

  switch (status) {
    case statusType.Draft:
    case statusType.Planned:
      return [
        {
          title: I18n.t('Manufacturing_StartDate') + ' :',
          value: formatDate(plannedStartDate),
        },
        {
          title: I18n.t('Manufacturing_EndDate') + ' :',
          value: formatDate(plannedEndDate),
        },
      ];
    case statusType.InProgress:
    case statusType.StandBy:
      return [
        {
          title: I18n.t('Manufacturing_StartDate') + ' :',
          value: formatDate(realStartDate),
        },
        {
          title: I18n.t('Manufacturing_EndDate') + ' :',
          value: formatDate(plannedEndDate),
        },
      ];
    case statusType.Finished:
      return [
        {
          title: I18n.t('Manufacturing_StartDate') + ' :',
          value: formatDate(realStartDate),
        },
        {
          title: I18n.t('Manufacturing_EndDate') + ' :',
          value: formatDate(realEndDate),
        },
      ];
    default:
      console.warn(`Status provided with value ${status} is not supported`);
      return [];
  }
};
