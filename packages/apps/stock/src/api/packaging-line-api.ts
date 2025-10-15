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

import {createStandardSearch, Criteria} from '@axelor/aos-mobile-core';
import {searchPackaging as searchPackagingApi} from './packaging-api';

const PACKAGING_LINE_MODEL = 'com.axelor.apps.supplychain.db.PackagingLine';

const createPackagingLineCriteria = ({packagingId}: {packagingId: number}) => {
  const criteria: Criteria[] = [];

  if (packagingId != null) {
    criteria.push({
      fieldName: 'packaging.id',
      operator: '=',
      value: packagingId,
    });
  }

  return criteria;
};

export async function searchPackagingLines({
  packagingId,
  page = 0,
}: {
  packagingId: number;
  page?: number;
}) {
  return createStandardSearch({
    model: PACKAGING_LINE_MODEL,
    criteria: createPackagingLineCriteria({packagingId}),
    fieldKey: 'stock_packagingLine',
    sortKey: 'stock_packagingLine',
    page,
    provider: 'model',
  });
}

export async function searchPackagingBranch({
  parentPackagingId,
}: {
  logisticalFormId?: number;
  parentPackagingId: number;
}) {
  const [packagingResponse, packagingLineResponse] = await Promise.all([
    searchPackagingApi({
      logisticalFormId: null,
      parentPackagingId,
    }),
    searchPackagingLines({packagingId: parentPackagingId}),
  ]);

  const packagingData = packagingResponse?.data?.data ?? [];
  const packagingLines = (packagingLineResponse?.data?.data ?? []).map(
    line => ({
      ...line,
      parentPackaging: line.packaging ?? null,
    }),
  );

  return {
    ...packagingResponse,
    data: {
      ...(packagingResponse?.data ?? {}),
      data:
        packagingData.length + packagingLines.length > 0
          ? [...packagingData, ...packagingLines]
          : null,
    },
  };
}
