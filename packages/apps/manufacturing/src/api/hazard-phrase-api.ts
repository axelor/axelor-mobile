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

import {createStandardSearch, Criteria} from '@axelor/aos-mobile-core';

const createHzardPhraseCriteria = (idSet: number[]): Criteria[] => {
  return [{fieldName: 'id', operator: 'in', value: idSet}];
};

export async function fetchProdProcessLineHazardPhrases({
  manufOrderId,
}: {
  manufOrderId: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ProdProcessLine',
    domain:
      'EXISTS (SELECT 1 FROM OperationOrder oo WHERE oo.prodProcessLine = self AND oo.manufOrder.id = :manufOrderId) AND self.hazardPhraseSet IS NOT EMPTY',
    domainContext: {manufOrderId},
    fieldKey: 'manufacturing_prodProcessLine',
    includeNestedArrayFields: true,
    numberElementsByPage: null as any,
    page: 0,
    provider: 'model',
  });
}

export async function fetchHazardPhrases({
  hazardPhraseIds,
}: {
  hazardPhraseIds: number[];
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.HazardPhrase',
    criteria: createHzardPhraseCriteria(hazardPhraseIds),
    fieldKey: 'manufacturing_hazardPhrase',
    numberElementsByPage: null as any,
    page: 0,
    provider: 'model',
  });
}
