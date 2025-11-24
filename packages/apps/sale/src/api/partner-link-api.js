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
  getTypes,
} from '@axelor/aos-mobile-core';

const createDeliveryLinksCriteria = (partnerId, searchValue) => {
  const PartnerLinkType = getTypes().PartnerLinkType;

  return [
    {
      fieldName: 'partner1.id',
      operator: '=',
      value: partnerId,
    },
    {
      fieldName: 'partnerLinkType.typeSelect',
      operator: '=',
      value: PartnerLinkType?.typeSelect.Delivery,
    },
    getSearchCriterias('sale_partnerLink', searchValue),
  ];
};

export async function searchDeliveryPartnerLinks({
  partnerId,
  searchValue,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.PartnerLink',
    criteria: createDeliveryLinksCriteria(partnerId, searchValue),
    fieldKey: 'sale_partnerLink',
    page,
    numberElementsByPage: null,
    provider: 'model',
  });
}

const createPartnerLinkCriteria = partnerId => {
  return [
    {
      operator: 'or',
      criteria: [
        {fieldName: 'partner1', operator: '=', value: partnerId},
        {fieldName: 'partner2', operator: '=', value: partnerId},
      ],
    },
  ];
};

export async function searchPartnerLinks({partnerId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.PartnerLink',
    criteria: createPartnerLinkCriteria(partnerId),
    fieldKey: 'sale_partnerLink',
    sortKey: 'sale_partnerLink',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  });
}
