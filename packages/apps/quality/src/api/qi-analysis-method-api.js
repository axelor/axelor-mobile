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
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createQIAnalysisMethoCriteria = ({searchValue, origin, gravity}) => {
  const criteria = [
    getSearchCriterias('quality_qiAnalysisMethod', searchValue),
  ];

  if (origin != null) {
    criteria.push({
      fieldName: origin,
      operator: '=',
      value: true,
    });
  }

  if (gravity != null) {
    criteria.push({
      fieldName: gravity,
      operator: '=',
      value: true,
    });
  }

  return criteria;
};

export async function searchQIAnalysisMethod({
  page = 0,
  searchValue,
  companyId,
  origin,
  gravity,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.QIAnalysisMethod',
    criteria: createQIAnalysisMethoCriteria({searchValue, origin, gravity}),
    fieldKey: 'quality_qiAnalysisMethod',
    sortKey: 'quality_qiAnalysisMethod',
    page,
    companyId,
    provider: 'model',
  });
}
