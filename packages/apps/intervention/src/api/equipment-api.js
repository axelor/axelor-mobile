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
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createEquipmentsCriteria = ({
  searchValue,
  inService,
  partnerId,
  isPlaceEquipment = false,
  parentPlaceId,
}) => {
  const Equipment = getTypes().Equipment;

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
    value: isPlaceEquipment
      ? Equipment?.typeSelect.Place
      : Equipment?.typeSelect.Equipment,
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

const createInterventionEquipmentCriteria = ({
  searchValue,
  idsInterventionEquipement,
  inService,
}) => {
  const criteria = [getSearchCriterias('intervention_equipment', searchValue)];

  criteria.push({
    fieldName: 'id',
    operator: 'in',
    value: idsInterventionEquipement,
  });

  if (inService != null) {
    criteria.push({
      fieldName: 'inService',
      operator: inService ? '=' : '!=',
      value: true,
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
  isCountFetch = false,
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
    numberElementsByPage: isCountFetch ? 0 : 10,
  });
}

export async function searchInterventionEquipment({
  searchValue,
  idsInterventionEquipement: equipmentIds,
  inService,
  isCountFetch = false,
  page = 0,
}) {
  if (!Array.isArray(equipmentIds) || equipmentIds.length === 0) {
    return {data: {data: [], total: 0}};
  }

  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    criteria: createInterventionEquipmentCriteria({
      searchValue,
      idsInterventionEquipement: equipmentIds,
      inService,
    }),
    fieldKey: 'intervention_equipment',
    sortKey: 'intervention_equipment',
    page,
    numberElementsByPage: isCountFetch ? 0 : 10,
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

export async function getEquipmentById({equipmentId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    id: equipmentId,
    fieldKey: 'intervention_equipment',
  });
}

export async function saveEquipment({equipment}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.intervention.db.Equipment',
    data: {
      data: equipment,
    },
  });
}

export async function archiveEquipment({equipmentId, equipmentVersion}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.intervention.db.Equipment/',
    data: {
      data: {
        id: equipmentId,
        version: equipmentVersion,
        archived: true,
      },
    },
  });
}

export async function copyEquipment({equipmentId}) {
  return axiosApiProvider
    .get({
      url: `/ws/rest/com.axelor.apps.intervention.db.Equipment/${equipmentId}/copy`,
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(({data}) => {
      const equipment = Array.isArray(data?.data) ? data.data[0] : null;

      if (equipment != null) {
        return saveEquipment({equipment});
      }

      return null;
    });
}

export async function deleteEquipment({equipmentId}) {
  return axiosApiProvider.delete({
    url: `/ws/rest/com.axelor.apps.intervention.db.Equipment/${equipmentId}`,
  });
}

const createInterventionEquipmentToLinkCriteria = ({
  searchValue,
  equipmentSet,
  partnerId,
}) => {
  const Equipment = getTypes().Equipment;

  const criteria = [
    getSearchCriterias('intervention_equipment', searchValue),
    {
      fieldName: 'partner.id',
      operator: '=',
      value: partnerId,
    },
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: Equipment?.typeSelect.Equipment,
    },
  ];

  if (Array.isArray(equipmentSet) && equipmentSet.length > 0) {
    criteria.push({
      operator: 'not',
      criteria: [
        {
          fieldName: 'id',
          operator: 'in',
          value: equipmentSet,
        },
      ],
    });
  }

  return criteria;
};

export async function searchEquipmentToLink({
  page = 0,
  searchValue,
  equipmentSet,
  partnerId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    criteria: createInterventionEquipmentToLinkCriteria({
      searchValue,
      equipmentSet,
      partnerId,
    }),
    fieldKey: 'intervention_equipment',
    sortKey: 'intervention_equipment',
    page,
  });
}
