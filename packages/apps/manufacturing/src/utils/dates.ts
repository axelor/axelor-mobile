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
import {formatDateTime, TranslatorProps} from '@axelor/aos-mobile-core';

export const DATE_TYPE = {
  Planned: 'planned',
  Real: 'real',
};

interface StatusTypeProps {
  Draft: number;
  Planned: number;
  InProgress: number;
  StandBy: number;
  Finished: number;
}

export const getDates = (
  status: number,
  statusType: StatusTypeProps,
  plannedStartDate: string,
  plannedEndDate: string,
  realStartDate: string,
  realEndDate: string,
  I18n: TranslatorProps,
): {title: string; value: string; type: string}[] => {
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
          type: DATE_TYPE.Planned,
        },
        {
          title: I18n.t('Manufacturing_EndDate') + ' :',
          value: formatDate(plannedEndDate),
          type: DATE_TYPE.Planned,
        },
      ];
    case statusType.InProgress:
    case statusType.StandBy:
      return [
        {
          title: I18n.t('Manufacturing_StartDate') + ' :',
          value: formatDate(realStartDate),
          type: DATE_TYPE.Real,
        },
        {
          title: I18n.t('Manufacturing_EndDate') + ' :',
          value: formatDate(plannedEndDate),
          type: DATE_TYPE.Planned,
        },
      ];
    case statusType.Finished:
      return [
        {
          title: I18n.t('Manufacturing_StartDate') + ' :',
          value: formatDate(realStartDate),
          type: DATE_TYPE.Real,
        },
        {
          title: I18n.t('Manufacturing_EndDate') + ' :',
          value: formatDate(realEndDate),
          type: DATE_TYPE.Real,
        },
      ];
    default:
      console.warn(`Status provided with value ${status} is not supported`);
      return [];
  }
};
