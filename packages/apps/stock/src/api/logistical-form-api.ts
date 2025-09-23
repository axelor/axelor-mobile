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
  getEndOfDay,
  getSearchCriterias,
  getStartOfDay,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (
  searchValue?: string | null,
  carrierPartnerId?: number,
  stockLocationId?: number,
  collectionDate?: Date | null,
  statusList?: Array<{key: number}> | null,
) => {
  const criteria: Criteria[] = [
    getSearchCriterias('stock_logisticalForm', searchValue),
  ];

  if (carrierPartnerId != null) {
    criteria.push({
      fieldName: 'carrierPartner.id',
      operator: '=',
      value: carrierPartnerId,
    });
  }

  if (stockLocationId != null) {
    criteria.push({
      fieldName: 'stockLocation.id',
      operator: '=',
      value: stockLocationId,
    });
  }

  if (collectionDate != null) {
    criteria.push(
      {
        fieldName: 'collectionDate',
        operator: '>=',
        value: getStartOfDay(collectionDate).toISOString(),
      },
      {
        fieldName: 'collectionDate',
        operator: '<=',
        value: getEndOfDay(collectionDate).toISOString(),
      },
    );
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    const statusCriteria = statusList.map(status => ({
      fieldName: 'statusSelect',
      operator: '=',
      value: status.key,
    }));

    criteria.push({operator: 'or', criteria: statusCriteria as Criteria[]});
  }

  return criteria;
};

export async function searchLogisticalForms({
  searchValue,
  carrierPartnerId,
  stockLocationId,
  collectionDate,
  statusList,
  companyId,
  page = 0,
  filterDomain,
}: {
  searchValue?: string | null;
  carrierPartnerId?: number;
  stockLocationId?: number;
  collectionDate?: Date | null;
  statusList?: Array<{key: number}> | null;
  companyId?: number;
  page?: number;
  filterDomain?: any;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.LogisticalForm',
    companyId,
    criteria: createSearchCriteria(
      searchValue,
      carrierPartnerId,
      stockLocationId,
      collectionDate,
      statusList,
    ),
    fieldKey: 'stock_logisticalForm',
    sortKey: 'stock_logisticalForm',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}
