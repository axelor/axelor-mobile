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

import {
  createStandardSearch,
  createStandardFetch,
  axiosApiProvider,
} from '@axelor/aos-mobile-core';
import {ControlEntry} from '../types';

const createControlEntrySampleLineCriteria = controlEntrySampleId => {
  return [
    {
      fieldName: 'controlEntrySample.id',
      operator: '=',
      value: controlEntrySampleId,
    },
  ];
};

export async function searchControlEntrySampleLine({
  page = 0,
  controlEntrySampleId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.ControlEntryPlanLine',
    criteria: createControlEntrySampleLineCriteria(controlEntrySampleId),
    fieldKey: 'quality_controlEntrySampleLine',
    sortKey: 'quality_controlEntrySampleLine',
    page: page,
  });
}

const createSampleLineOfControlEntryCriteria = controlEntryId => {
  return [
    {
      fieldName: 'controlEntrySample.controlEntry.id',
      operator: '=',
      value: controlEntryId,
    },
  ];
};

export async function searchControlEntrySampleLineOfControlEntry({
  controlEntryId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.ControlEntryPlanLine',
    criteria: createSampleLineOfControlEntryCriteria(controlEntryId),
    fieldKey: 'quality_controlEntrySampleLine',
    sortKey: 'quality_controlEntrySampleLine',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function fetchControlEntrySampleLine({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.quality.db.ControlEntryPlanLine',
    id,
    fieldKey: 'quality_controlEntrySampleLine',
  });
}

export async function checkComformity({object}) {
  return axiosApiProvider
    .post({
      url: 'ws/action',
      data: {
        action: 'action-quality-control-entry-line-method-control-conformity',
        data: {
          context: {
            ...object,
            _model: 'com.axelor.apps.quality.db.ControlEntryPlanLine',
          },
        },
        model: 'com.axelor.apps.quality.db.ControlEntryPlanLine',
      },
    })
    .then(() =>
      createStandardFetch({
        model: 'com.axelor.apps.quality.db.ControlEntryPlanLine',
        id: object.id,
        fieldKey: 'quality_controlEntrySampleLine',
      }),
    )
    .then(({data: {data}}) => {
      if (data?.[0] != null) {
        return data[0].resultSelect;
      } else {
        return ControlEntry.sampleResult.NotControlled;
      }
    })
    .catch(() => {
      return ControlEntry.sampleResult.NotControlled;
    });
}
