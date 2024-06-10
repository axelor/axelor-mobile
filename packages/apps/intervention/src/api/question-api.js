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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
} from '@axelor/aos-mobile-core';

const createQuestionCriteria = (interventionId, rangeId) => {
  const criteria = [
    {
      fieldName: 'interventionRange.intervention.id',
      operator: '=',
      value: interventionId,
    },
  ];

  if (rangeId != null) {
    criteria.push({
      fieldName: 'interventionRange.id',
      operator: '=',
      value: rangeId,
    });
  }
  return criteria;
};

const createRangeCriteria = interventionId => {
  return [
    {
      fieldName: 'intervention.id',
      operator: '=',
      value: interventionId,
    },
  ];
};

export async function fetchQuestion({interventionId, rangeId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.InterventionQuestion',
    criteria: createQuestionCriteria(interventionId, rangeId),
    fieldKey: 'intervention_question',
    sortKey: 'intervention_question',
    page,
  });
}

export async function fetchQuestionById({questionId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.intervention.db.InterventionQuestion',
    id: questionId,
    fieldKey: 'intervention_question',
  });
}

export async function updateQuestion({question}) {
  return axiosApiProvider.post({
    url: `ws/rest/com.axelor.apps.intervention.db.InterventionQuestion/${question.id}`,
    data: {
      data: question,
    },
  });
}

export async function fetchRange({interventionId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.InterventionRange',
    criteria: createRangeCriteria(interventionId),
    fieldKey: 'intervention_range',
    page: 0,
    numberElementsByPage: null,
  });
}
