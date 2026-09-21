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

import {createStandardSearch} from '@axelor/aos-mobile-core';

const VALUE_MODEL = 'com.axelor.apps.quality.db.ControlTypeFieldValue';

export async function searchEntryValue({entryLineId}: {entryLineId: number}) {
  return createStandardSearch({
    model: VALUE_MODEL,
    criteria: [{fieldName: 'entryLine.id', operator: '=', value: entryLineId}],
    fieldKey: 'quality_controlTypeFieldValue',
    sortKey: 'quality_controlTypeFieldValue',
    numberElementsByPage: null as any,
    page: 0,
    provider: 'model',
  });
}

export async function searchPlanValue({planLineId}: {planLineId: number}) {
  return createStandardSearch({
    model: VALUE_MODEL,
    criteria: [{fieldName: 'planLine.id', operator: '=', value: planLineId}],
    fieldKey: 'quality_controlTypeFieldValue',
    sortKey: 'quality_controlTypeFieldValue',
    numberElementsByPage: null as any,
    page: 0,
    provider: 'model',
  });
}

export async function searchControlTypeField({ids}: {ids: number[]}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.ControlTypeField',
    criteria: [{fieldName: 'id', operator: 'in', value: ids}],
    fieldKey: 'quality_controlTypeField',
    sortKey: 'quality_controlTypeField',
    numberElementsByPage: null as any,
    page: 0,
    includeNestedArrayFields: true,
    provider: 'model',
  });
}

export async function searchCharacteristicProperty({ids}: {ids: number[]}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.CharacteristicProperty',
    criteria: [{fieldName: 'id', operator: 'in', value: ids}],
    fieldKey: 'quality_characteristicProperty',
    sortKey: 'quality_characteristicProperty',
    numberElementsByPage: null as any,
    page: 0,
    provider: 'model',
  });
}
