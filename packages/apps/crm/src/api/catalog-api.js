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

import {
  axiosApiProvider,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createCatalogCriteria = searchValue => {
  return [getSearchCriterias('crm_catalog', searchValue)];
};

export async function searchCatalog({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Catalog',
    criteria: createCatalogCriteria(searchValue),
    fieldKey: 'crm_catalog',
    sortKey: 'crm_catalog',
    page,
  });
}

export async function getCatalogType() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.crm.db.CatalogType/',
  });
}

export async function createCatalog({
  name,
  catalogType,
  pdfFile,
  image,
  description,
}) {
  return axiosApiProvider.put({
    url: '/ws/rest/com.axelor.apps.crm.db.Catalog/',
    data: {
      data: {
        name,
        catalogType,
        pdfFile,
        image,
        description,
      },
    },
  });
}
