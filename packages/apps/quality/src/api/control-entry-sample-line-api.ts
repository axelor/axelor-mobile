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
  getActionMessage,
  getTypes,
} from '@axelor/aos-mobile-core';
import {ControlTypeFieldValueUpdate} from '../types';

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
  entryValueList: Partial<ControlTypeFieldValueUpdate>[];
}) {
  return getActionApi().send({
    url: `/ws/aos/control-entry-sample-line/${sampleLineId}`,
    method: 'put',
    body: {version, entryValueList},
    description: 'update control entry sample line values',
  });
}

interface ConformityResult {
  resultSelect?: number;
  message?: string;
}

const getActionValue = (response: any, fieldName: string): any => {
  const items: any[] = response?.data?.data ?? [];

  return items.find(_item => _item?.values?.[fieldName] != null)?.values?.[
    fieldName
  ];
};

async function saveResult({
  id,
  version,
  resultSelect,
}: {
  id: number;
  version: number;
  resultSelect: number;
}) {
  return getActionApi().send({
    url: `ws/rest/${MODEL}`,
    method: 'post',
    body: {data: {id, version, resultSelect}},
    description: 'save control entry sample line result',
  });
}

export async function checkConformity({
  object,
}: {
  object: any;
}): Promise<ConformityResult> {
  const ControlEntrySample = getTypes().ControlEntrySample;
  const notControlled = {
    resultSelect: ControlEntrySample?.resultSelect.NotControlled,
  };

  return getActionApi()
    .send({
      url: 'ws/action',
      method: 'post',
      body: {
        action: 'action-quality-control-entry-line-method-control-conformity',
        data: {context: {...object, _model: MODEL}},
        model: MODEL,
      },
      description: 'check conformity',
    })
    .then((response): ConformityResult | Promise<ConformityResult> => {
      const actionMessage = getActionMessage(response);

      if (actionMessage != null) return {message: actionMessage.message};

      const resultSelect = getActionValue(response, 'resultSelect');

      if (resultSelect == null) return notControlled;

      return saveResult({
        id: object.id,
        version: object.version,
        resultSelect,
      }).then(() => ({resultSelect}));
    })
    .catch(() => notControlled);
}
