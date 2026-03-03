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
  getActionApi,
  getObjectFields,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createQualityImprovementCriteria = ({
  searchValue,
  userId,
  selectedStatus,
  selectedGravity,
}) => {
  const criteria = [
    getSearchCriterias('quality_qualityImprovement', searchValue),
  ];

  if (userId != null) {
    criteria.push({
      fieldName: 'createdBy.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(selectedGravity) && selectedGravity.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedGravity.map(({key}) => ({
        fieldName: 'gravityTypeSelect',
        operator: '=',
        value: key,
      })),
    });
  }

  if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedStatus.map(({key}) => ({
        fieldName: 'qiStatus.id',
        operator: '=',
        value: key,
      })),
    });
  }

  return criteria;
};

export async function searchQualityImprovement({
  searchValue,
  page = 0,
  companyId,
  filterDomain,
  userId,
  selectedStatus,
  selectedGravity,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.QualityImprovement',
    criteria: createQualityImprovementCriteria({
      searchValue,
      userId,
      selectedStatus,
      selectedGravity,
    }),
    fieldKey: 'quality_qualityImprovement',
    sortKey: 'quality_qualityImprovement',
    page,
    companyId,
    filter: filterDomain,
    provider: 'model',
  });
}

export async function fetchQualityImprovementStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.QIStatus',
    fieldKey: 'quality_qiStatus',
    sortKey: 'quality_qiStatus',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function fetchQualityImprovement({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.quality.db.QualityImprovement',
    id,
    fieldKey: 'quality_qualityImprovement',
    provider: 'model',
  });
}

export async function fetchQiResolution({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.quality.db.QIResolution',
    id,
    fieldKey: 'quality_qiResolution',
    relatedFields: {
      qiResolutionDefaultsList: getObjectFields('quality_qiResolutionDefault'),
    },
    provider: 'model',
  });
}

export async function createQualityImprovement({qualityImprovement}) {
  return getActionApi().send({
    url: '/ws/aos/quality-improvement',
    method: 'post',
    body: qualityImprovement,
    description: 'create quality improvement',
  });
}

export async function updateQualityImprovement({qualityImprovement}) {
  return getActionApi().send({
    url: `/ws/aos/quality-improvement/update/${qualityImprovement.id}`,
    method: 'put',
    body: qualityImprovement,
    description: 'update quality improvement',
  });
}
