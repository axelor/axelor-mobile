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
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createEquipmentsCriteria = ({
  searchValue,
  inService,
  partnerId,
  isPlaceEquipment = null,
  parentPlaceId,
  noParent,
}) => {
  const Equipment = getTypes().Equipment;

  const criteria = [
    {
      fieldName: 'partner.id',
      operator: '=',
      value: partnerId,
    },
    getSearchCriterias('intervention_equipment', searchValue),
  ];

  if (inService != null) {
    criteria.push({
      operator: 'or',
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: Equipment?.typeSelect.Equipment,
            },
            {
              fieldName: 'inService',
              operator: inService ? '=' : '!=',
              value: true,
            },
          ],
        },
        {
          fieldName: 'typeSelect',
          operator: '=',
          value: Equipment?.typeSelect.Place,
        },
      ],
    });
  }

  if (isPlaceEquipment != null) {
    criteria.push({
      fieldName: 'typeSelect',
      operator: '=',
      value: isPlaceEquipment
        ? Equipment?.typeSelect.Place
        : Equipment?.typeSelect.Equipment,
    });
  }

  if (parentPlaceId != null) {
    criteria.push({
      fieldName: 'parentEquipment.id',
      operator: '=',
      value: parentPlaceId,
    });
  }

  if (noParent) {
    criteria.push({
      fieldName: 'parentEquipment',
      operator: 'isNull',
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

export async function searchEquipment({
  searchValue = null,
  page = 0,
  inService = null,
  partnerId,
  parentPlaceId,
  noParent = false,
  isCountFetch = false,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    criteria: createEquipmentsCriteria({
      searchValue,
      inService,
      partnerId,
      parentPlaceId,
      noParent,
    }),
    fieldKey: 'intervention_equipment',
    sortKey: 'intervention_equipment',
    page,
    numberElementsByPage: isCountFetch ? 0 : 10,
    provider: 'model',
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
    provider: 'model',
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
    provider: 'model',
  });
}

export async function getEquipmentById({equipmentId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    id: equipmentId,
    fieldKey: 'intervention_equipment',
    provider: 'model',
  });
}

export async function saveEquipment({equipment}) {
  const {matchers, formattedData} = formatRequestBody(equipment, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.intervention.db.Equipment',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'save equipment',
    matchers: {
      modelName: 'com.axelor.apps.intervention.db.Equipment',
      id: equipment.id,
      fields: matchers,
    },
  });
}

export async function archiveEquipment({equipmentId, equipmentVersion}) {
  const body = {
    id: equipmentId,
    version: equipmentVersion,
    archived: true,
  };
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.intervention.db.Equipment',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'archive equipment',
    matchers: {
      modelName: 'com.axelor.apps.intervention.db.Equipment',
      id: equipmentId,
      fields: matchers,
    },
  });
}

export async function copyEquipment({equipmentId}) {
  return getActionApi()
    .send({
      url: `/ws/rest/com.axelor.apps.intervention.db.Equipment/${equipmentId}/copy`,
      method: 'get',
      description: 'copy equipment',
      matchers: {
        modelName: 'com.axelor.apps.intervention.db.Equipment',
        id: equipmentId,
      },
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
  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.intervention.db.Equipment/${equipmentId}`,
    method: 'delete',
    description: 'delete equipment',
  });
}

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
    provider: 'model',
  });
}
