/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  createStandardSearch,
  Criteria,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createPackagingCriteria = ({
  searchValue,
  logisticalFormId,
  parentPackagingId,
  noParent,
}: {
  searchValue?: string;
  logisticalFormId?: number;
  parentPackagingId?: number;
  noParent?: boolean;
}) => {
  const criteria: Criteria[] = [];
  const searchCriteria = getSearchCriterias('stock_packaging', searchValue);

  if (searchCriteria != null) {
    criteria.push(searchCriteria);
  }

  if (logisticalFormId != null) {
    criteria.push({
      fieldName: 'logisticalForm.id',
      operator: '=',
      value: logisticalFormId,
    });
  }

  if (parentPackagingId != null) {
    criteria.push({
      fieldName: 'parentPackaging.id',
      operator: '=',
      value: parentPackagingId,
    });
  } else if (noParent) {
    criteria.push({
      fieldName: 'parentPackaging',
      operator: 'isNull',
      value: null,
    });
  }

  return criteria;
};

export async function searchPackaging({
  searchValue,
  logisticalFormId,
  parentPackagingId,
  noParent,
  page = 0,
  filterDomain,
}: {
  searchValue?: string;
  logisticalFormId?: number;
  parentPackagingId?: number;
  noParent?: boolean;
  page?: number;
  filterDomain?: any;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.supplychain.db.Packaging',
    criteria: createPackagingCriteria({
      searchValue,
      logisticalFormId,
      parentPackagingId,
      noParent,
    }),
    fieldKey: 'stock_packaging',
    sortKey: 'stock_packaging',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}
