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

import {createStandardSearch, getActionApi} from '@axelor/aos-mobile-core';

const createEquipmentPictureCriteria = equipmentId => {
  const criteria = [
    {
      fieldName: 'equipment.id',
      operator: '=',
      value: equipmentId,
    },
  ];

  return criteria;
};

export async function searchEquipmentPicture({equipmentId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Picture',
    criteria: createEquipmentPictureCriteria(equipmentId),
    fieldKey: 'intervention_equipmentPicture',
    sortKey: 'intervention_equipmentPicture',
    page,
    provider: 'model',
  });
}

export async function createEquipmentPicture({
  equipmentId,
  version,
  metaFileId,
}) {
  return getActionApi().send({
    url: `/ws/aos/equipment/add-picture/${equipmentId}`,
    method: 'put',
    body: {
      pictureId: metaFileId,
      version,
    },
    description: 'create equipment picture',
    matchers: {
      modelName: 'com.axelor.apps.intervention.db.Picture',
      id: equipmentId,
      fields: {
        pictureId: 'pictureId',
        version: 'version',
      },
    },
  });
}

export async function deleteEquipmentPicture({
  equipmentId,
  version,
  pictureId,
}) {
  return getActionApi().send({
    url: `/ws/aos/equipment/remove-picture/${equipmentId}`,
    method: 'put',
    body: {
      pictureId,
      version,
    },
    description: 'remove equipment picture',
  });
}
