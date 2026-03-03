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

const VALIDATED_CONTRACT_STATUS = 3;

const createContractCriteria = ({partnerId, searchValue}) => {
  const criteria = [
    getSearchCriterias('intervention_contract', searchValue),
    {
      fieldName: 'currentContractVersion.statusSelect',
      operator: '=',
      value: VALIDATED_CONTRACT_STATUS,
    },
    {
      fieldName: 'partner.id',
      operator: '=',
      value: partnerId,
    },
  ];

  return criteria;
};

export async function searchContract({
  page,
  partnerId,
  searchValue,
  companyId,
}) {
  return createStandardSearch({
    companyId,
    model: 'com.axelor.apps.contract.db.Contract',
    criteria: createContractCriteria({partnerId, searchValue}),
    fieldKey: 'intervention_contract',
    sortKey: 'intervention_contract',
    page: page,
    provider: 'model',
  });
}
