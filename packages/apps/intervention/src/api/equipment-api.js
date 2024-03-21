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
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import {Equipment} from '../types';

const createEquipmentsCriteria = ({
  searchValue,
  inService,
  partnerId,
  isPlaceEquipment = false,
  parentPlaceId,
}) => {
  const criteria = [getSearchCriterias('intervention_equipment', searchValue)];

  criteria.push({
    fieldName: 'partner.id',
    operator: '=',
    value: partnerId,
  });

  if (inService != null) {
    criteria.push({
      fieldName: 'inService',
      operator: inService ? '=' : '!=',
      value: true,
    });
  }

  criteria.push({
    fieldName: 'typeSelect',
    operator: '=',
    value: isPlaceEquipment ? Equipment.type.place : Equipment.type.equipment,
  });

  if (parentPlaceId != null) {
    criteria.push({
      fieldName: 'parentEquipment.id',
      operator: '=',
      value: parentPlaceId,
    });
  }

  return criteria;
};

export async function searchEquipment({
  searchValue,
  page = 0,
  inService,
  partnerId,
  parentPlaceId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    criteria: createEquipmentsCriteria({
      searchValue,
      inService,
      partnerId,
      parentPlaceId,
    }),
    fieldKey: 'intervention_equipment',
    sortKey: 'intervention_equipment',
    page,
  });
}

export async function searchPlaceEquipment({searchValue, page = 0, partnerId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    criteria: createEquipmentsCriteria({
      searchValue,
      partnerId,
      isPlaceEquipment: true,
    }),
    fieldKey: 'intervention_equipment',
    sortKey: 'intervention_equipment',
    page,
  });
}
