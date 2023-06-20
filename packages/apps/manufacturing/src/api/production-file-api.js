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

import {createStandardSearch} from '@axelor/aos-mobile-core';

const createProductionFileCriteria = prodProcessLineId => {
  let criterias = [];

  if (prodProcessLineId != null) {
    criterias.push({
      fieldName: 'prodProcessLine.id',
      operator: '=',
      value: prodProcessLineId,
    });
  }

  return criterias;
};

export async function searchProductionFile({
  prodProcessLineId = null,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ObjectDescription',
    criteria: createProductionFileCriteria(prodProcessLineId),
    fieldKey: 'manufacturing_productionFile',
    sortKey: 'manufacturing_productionFile',
    page,
    provider: 'model',
  });
}
