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
  Criteria,
  getActionApi,
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
  const criteria: Criteria[] = [
    getSearchCriterias('stock_packaging', searchValue),
  ];

  if (logisticalFormId != null && parentPackagingId == null) {
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
}: {
  searchValue?: string;
  logisticalFormId?: number;
  parentPackagingId?: number;
  noParent?: boolean;
  page?: number;
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
  });
}

export async function createPackaging(body: {
  packageUsedId: number;
  parentPackagingId?: number;
  logisticalFormId?: number;
}) {
  return getActionApi().send({
    method: 'post',
    url: 'ws/aos/packaging',
    body,
    description: 'create new packaging',
    matchers: {
      modelName: 'com.axelor.apps.supplychain.db.Packaging',
      id: Date.now(),
      fields: {
        logisticalFormId: 'logisticalForm.id',
        parentPackagingId: 'parentPackaging.id',
        packageUsedId: 'packageUsed.id',
      },
    },
  });
}

export async function fetchPackaging({id}: {id: number}) {
  return createStandardFetch({
    model: 'com.axelor.apps.supplychain.db.Packaging',
    id,
    fieldKey: 'stock_packaging',
    provider: 'model',
  });
}

export async function updatePackaging({
  id,
  ...body
}: {
  id: number;
  version?: number;
  packageUsedId?: number;
}) {
  return getActionApi().send({
    method: 'put',
    url: `ws/aos/packaging/update-package-used/${id}`,
    body,
    description: 'update packaging',
    matchers: {
      modelName: 'com.axelor.apps.supplychain.db.Packaging',
      id,
      fields: {packageUsedId: 'packageUsed.id'},
    },
  });
}

export async function deletePackaging({id}: {id: number}) {
  return getActionApi().send({
    method: 'delete',
    url: `ws/aos/packaging/${id}`,
    body: {},
    description: 'delete packaging',
    matchers: {
      modelName: 'com.axelor.apps.supplychain.db.Packaging',
      id,
      fields: {},
    },
  });
}
