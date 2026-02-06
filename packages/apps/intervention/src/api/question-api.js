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
  formatRequestBody,
  getActionApi,
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

const createAdjacentQuestionCriteria = (
  interventionId,
  currentRangeOrderSeq,
  currentQuestionOrderSeq,
  comparisonOperator = '>',
) => {
  return [
    {
      fieldName: 'interventionRange.intervention.id',
      operator: '=',
      value: interventionId,
    },
    {
      operator: 'or',
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'interventionRange.orderSeq',
              operator: '=',
              value: currentRangeOrderSeq,
            },
            {
              fieldName: 'orderSeq',
              operator: comparisonOperator,
              value: currentQuestionOrderSeq,
            },
          ],
        },
        {
          fieldName: 'interventionRange.orderSeq',
          operator: comparisonOperator,
          value: currentRangeOrderSeq,
        },
      ],
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
    provider: 'model',
  });
}

export async function fetchQuestionById({questionId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.intervention.db.InterventionQuestion',
    id: questionId,
    fieldKey: 'intervention_question',
    provider: 'model',
  });
}

export async function updateQuestion({question}) {
  const {matchers, formattedData} = formatRequestBody(question, 'data');

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.intervention.db.InterventionQuestion/${question.id}`,
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update intervention question',
    matchers: {
      modelName: 'com.axelor.apps.intervention.db.InterventionQuestion',
      id: question.id,
      fields: matchers,
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
    provider: 'model',
  });
}

export async function fetchNextQuestion({
  interventionId,
  currentRangeOrderSeq,
  currentQuestionOrderSeq,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.InterventionQuestion',
    criteria: createAdjacentQuestionCriteria(
      interventionId,
      currentRangeOrderSeq,
      currentQuestionOrderSeq,
      '>',
    ),
    fieldKey: 'intervention_simpleQuestion',
    sortKey: 'intervention_question',
    page: 0,
    numberElementsByPage: 1,
    provider: 'model',
  });
}

export async function fetchPreviousQuestion({
  interventionId,
  currentRangeOrderSeq,
  currentQuestionOrderSeq,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.InterventionQuestion',
    criteria: createAdjacentQuestionCriteria(
      interventionId,
      currentRangeOrderSeq,
      currentQuestionOrderSeq,
      '<',
    ),
    fieldKey: 'intervention_simpleQuestion',
    sortKey: 'intervention_question_reversed',
    page: 0,
    numberElementsByPage: 1,
    provider: 'model',
  });
}
