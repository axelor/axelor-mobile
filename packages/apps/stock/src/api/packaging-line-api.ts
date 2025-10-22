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
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import {searchPackaging as searchPackagingApi} from './packaging-api';

const createPackagingLineCriteria = ({
  packagingId,
  searchValue,
}: {
  packagingId: number;
  searchValue?: string;
}): Criteria[] => {
  return [
    getSearchCriterias('stock_packagingLine', searchValue),
    {fieldName: 'packaging.id', operator: '=', value: packagingId},
  ];
};

export async function searchPackagingLines({
  packagingId,
  searchValue,
}: {
  packagingId: number;
  searchValue?: string;
}) {
  if (!packagingId) return {data: {data: []}};

  return createStandardSearch({
    model: 'com.axelor.apps.supplychain.db.PackagingLine',
    criteria: createPackagingLineCriteria({packagingId, searchValue}),
    fieldKey: 'stock_packagingLine',
    sortKey: 'stock_packagingLine',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  });
}

export async function searchPackagingBranch({
  parentPackagingId,
}: {
  parentPackagingId: number;
}) {
  const packagings = await searchPackagingApi({parentPackagingId}).then(
    res => res?.data?.data ?? [],
  );
  const packagingLines = await searchPackagingLines({
    packagingId: parentPackagingId,
  })
    .then(res => res?.data?.data ?? [])
    .then(data =>
      data.map((line: any) => ({...line, parentPackaging: line.packaging})),
    );

  const result = [...packagings, ...packagingLines];

  return {data: {data: result.length > 0 ? result : null}} as any;
}

export async function createPackagingLine(body: {
  packagingId: number;
  stockMoveLineId: number;
  quantity: number;
}) {
  return getActionApi().send({
    method: 'post',
    url: 'ws/aos/packaging-line',
    body,
    description: 'create new packaging line',
    matchers: {
      modelName: 'com.axelor.apps.supplychain.db.PackagingLine',
      id: Date.now(),
      fields: {
        packagingId: 'packaging.id',
        stockMoveLineId: 'stockMoveLine.id',
        quantity: 'qty',
      },
    },
  });
}

export async function updatePackagingLine({
  id,
  ...body
}: {
  id: number;
  version?: number;
  quantity?: number;
}) {
  return getActionApi().send({
    method: 'put',
    url: `ws/aos/packaging-line/update-quantity/${id}`,
    body,
    description: 'update packaging line',
    matchers: {
      modelName: 'com.axelor.apps.supplychain.db.PackagingLine',
      id,
      fields: {quantity: 'qty'},
    },
  });
}

export async function deletePackagingLine({id}: {id: number}) {
  return getActionApi().send({
    method: 'delete',
    url: `ws/aos/packaging-line/${id}`,
    body: {},
    description: 'delete packaging line',
    matchers: {
      modelName: 'com.axelor.apps.supplychain.db.PackagingLine',
      id,
      fields: {},
    },
  });
}
