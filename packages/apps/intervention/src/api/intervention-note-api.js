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
} from '@axelor/aos-mobile-core';

const createInterventionNoteCriteria = (
  searchValue,
  deliveredPartnerId,
  noteTypeId,
) => {
  const criteria = [
    getSearchCriterias('intervention_interventionNote', searchValue),
    {
      fieldName: 'partner.id',
      operator: '=',
      value: deliveredPartnerId,
    },
  ];

  if (noteTypeId != null) {
    criteria.push({
      fieldName: 'type.id',
      operator: '=',
      value: noteTypeId,
    });
  }

  return criteria;
};

export async function fetchInterventionNote({
  searchValue,
  deliveredPartnerId,
  noteTypeId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.InterventionNote',
    criteria: createInterventionNoteCriteria(
      searchValue,
      deliveredPartnerId,
      noteTypeId,
    ),
    fieldKey: 'intervention_interventionNote',
    sortKey: 'intervention_interventionNote',
    page,
    provider: 'model',
  });
}

export async function fetchInterventionNoteById({interventionNoteId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.intervention.db.InterventionNote',
    id: interventionNoteId,
    fieldKey: 'intervention_interventionNote',
    provider: 'model',
  });
}

export async function fetchInterventionNoteType() {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.InterventionNoteType',
    criteria: [],
    fieldKey: 'intervention_interventionNoteType',
    sortKey: 'intervention_interventionNoteType',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  });
}

export async function createInterventionNote({interventionNote}) {
  const {matchers, formattedData} = formatRequestBody(interventionNote, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.intervention.db.InterventionNote',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'create intervention note',
    matchers: {
      modelName: 'com.axelor.apps.intervention.db.InterventionNote',
      id: Date.now(),
      fields: matchers,
    },
  });
}

export async function updateInterventionNote({interventionNote}) {
  const {matchers, formattedData} = formatRequestBody(interventionNote, 'data');

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.intervention.db.InterventionNote/${interventionNote.id}`,
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update intervention note',
    matchers: {
      modelName: 'com.axelor.apps.intervention.db.InterventionNote',
      id: interventionNote.id,
      fields: matchers,
    },
  });
}

export async function deleteInterventionNote({interventionNoteId}) {
  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.intervention.db.InterventionNote/${interventionNoteId}`,
    method: 'delete',
    description: 'delete intervention note',
  });
}
