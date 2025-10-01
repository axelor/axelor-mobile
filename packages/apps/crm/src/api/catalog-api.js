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
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createCatalogCriteria = (searchValue, statusList) => {
  const criteria = [getSearchCriterias('crm_catalog', searchValue)];

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'catalogType.id',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criteria;
};

export async function searchCatalog({
  searchValue,
  statusList,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Catalog',
    criteria: createCatalogCriteria(searchValue, statusList),
    fieldKey: 'crm_catalog',
    sortKey: 'crm_catalog',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function getCatalogType() {
  return createStandardSearch({
    numberElementsByPage: null,
    model: 'com.axelor.apps.crm.db.CatalogType',
    criteria: [],
    fieldKey: 'crm_catologType',
    page: 0,
    provider: 'model',
  });
}

export async function createCatalog({
  name,
  catalogType,
  pdfFile,
  image,
  description,
}) {
  const body = {
    name,
    catalogType,
    pdfFile,
    image,
    description,
  };
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Catalog',
    method: 'put',
    body: {data: formattedData},
    description: 'create catalog',
    matchers: {
      modelName: '/ws/rest/com.axelor.apps.crm.db.Catalog',
      id: Date.now(),
      fields: matchers,
    },
  });
}
