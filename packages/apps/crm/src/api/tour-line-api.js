/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import {axiosApiProvider, createStandardSearch} from '@axelor/aos-mobile-core';

const createTourLineCriteria = (tourId, isValidated) => {
  const criteria = [
    {
      fieldName: 'tour.id',
      operator: '=',
      value: tourId,
    },
  ];

  if (isValidated != null) {
    criteria.push({
      fieldName: 'isValidated',
      operator: '=',
      value: isValidated,
    });
  }

  return criteria;
};

export async function searchTourLine({
  page = 0,
  tourId,
  numberElementsByPage = 10,
  isValidated = null,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.TourLine',
    criteria: createTourLineCriteria(tourId, isValidated),
    fieldKey: 'crm_tourLine',
    sortKey: 'crm_tourLine',
    page: page,
    numberElementsByPage: numberElementsByPage,
  });
}

export async function validateTourLine({tourLineId}) {
  return axiosApiProvider.put({
    url: `ws/aos/tour-line/validate/${tourLineId}`,
  });
}
