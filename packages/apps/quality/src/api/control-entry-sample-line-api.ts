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
  createStandardSearch,
  createStandardFetch,
  getActionApi,
} from '@axelor/aos-mobile-core';
import {ControlTypeFieldValue} from '../types';

const MODEL = 'com.axelor.apps.quality.db.ControlEntryPlanLine';

export async function searchControlEntrySampleLine({
  page = 0,
  controlEntrySampleId,
}: {
  page?: number;
  controlEntrySampleId: number;
}) {
  return createStandardSearch({
    model: MODEL,
    criteria: [
      {
        fieldName: 'controlEntrySample.id',
        operator: '=',
        value: controlEntrySampleId,
      },
    ],
    fieldKey: 'quality_controlEntrySampleLine',
    sortKey: 'quality_controlEntrySampleLine',
    page: page,
    provider: 'model',
  });
}

export async function searchControlEntrySampleLineOfControlEntry({
  controlEntryId,
}: {
  controlEntryId: number;
}) {
  return createStandardSearch({
    model: MODEL,
    criteria: [
      {
        fieldName: 'controlEntrySample.controlEntry.id',
        operator: '=',
        value: controlEntryId,
      },
    ],
    fieldKey: 'quality_controlEntrySampleLine',
    sortKey: 'quality_controlEntrySampleLine',
    numberElementsByPage: null as any,
    page: 0,
    provider: 'model',
  });
}

export async function fetchControlEntrySampleLine({id}: {id: number}) {
  return createStandardFetch({
    model: MODEL,
    id,
    fieldKey: 'quality_controlEntrySampleLine',
    provider: 'model',
  });
}

export async function updateSampleLineValues({
  sampleLineId,
  version,
  entryValueList,
}: {
  sampleLineId: number;
  version: number;
  entryValueList: Partial<ControlTypeFieldValue>[];
}) {
  return getActionApi().send({
    url: `/ws/aos/control-entry-sample-line/${sampleLineId}`,
    method: 'put',
    body: {version, entryValueList},
    description: 'update control entry sample line values',
  });
}
