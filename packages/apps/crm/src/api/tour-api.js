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
  createStandardFetch,
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createToursCriteria = (searchValue, userId, isSalesperson, date) => {
  const criteria = [getSearchCriterias('crm_tour', searchValue)];

  if (isSalesperson && userId != null) {
    criteria.push({
      fieldName: 'salespersonUser.id',
      operator: '=',
      value: userId,
    });
  }

  if (date != null) {
    criteria.push({
      fieldName: 'date',
      operator: '=',
      value: date,
    });
  }

  return criteria;
};

export async function searchTour({
  searchValue = null,
  userId,
  date,
  isSalesperson,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Tour',
    criteria: createToursCriteria(searchValue, userId, isSalesperson, date),
    fieldKey: 'crm_tour',
    sortKey: 'crm_tour',
    page: page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function fetchTourById({tourId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.crm.db.Tour',
    id: tourId,
    fieldKey: 'crm_tour',
    provider: 'model',
  });
}

export async function validateTour({tourId}) {
  return getActionApi().send({
    url: `ws/aos/tour/validate/${tourId}`,
    method: 'put',
    description: 'validate tour',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Tour',
      id: tourId,
    },
  });
}
