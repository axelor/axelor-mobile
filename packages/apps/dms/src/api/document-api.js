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
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createDocumentCriteria = ({
  searchValue,
  authorId,
  extensions,
  parentDirectoryId,
  noParent,
  isDirectory = null,
  favoriteFileIds,
  metaFileIds,
}) => {
  const criteria = [getSearchCriterias('dms_document', searchValue)];

  if (authorId != null) {
    criteria.push({
      fieldName: 'createdBy.id',
      operator: '=',
      value: authorId,
    });
  }

  if (Array.isArray(extensions) && extensions.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'isDirectory',
              operator: '=',
              value: false,
            },
            {
              operator: 'or',
              criteria: extensions.map(_extension => ({
                fieldName: 'metaFile.fileName',
                operator: 'like',
                value: '%.' + _extension,
              })),
            },
          ],
        },
        {
          fieldName: 'isDirectory',
          operator: '=',
          value: true,
        },
      ],
    });
  }

  if (parentDirectoryId != null) {
    criteria.push({
      fieldName: 'parent.id',
      operator: '=',
      value: parentDirectoryId,
    });
  }

  if (noParent) {
    criteria.push({
      fieldName: 'parent',
      operator: 'isNull',
    });
  }

  if (isDirectory != null) {
    criteria.push({
      fieldName: 'isDirectory',
      operator: '=',
      value: isDirectory,
    });
  }

  if (Array.isArray(favoriteFileIds) && favoriteFileIds.length > 0) {
    criteria.push({
      fieldName: 'id',
      operator: 'in',
      value: favoriteFileIds,
    });
  }

  if (Array.isArray(metaFileIds) && metaFileIds.length > 0) {
    criteria.push({
      fieldName: 'metaFile.id',
      operator: 'in',
      value: metaFileIds,
    });
  }

  return criteria;
};

const createFetchDirectoryCriteria = ({model, modelId}) => {
  return [
    {
      fieldName: 'isDirectory',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'relatedId',
      operator: '=',
      value: modelId,
    },
    {
      fieldName: 'relatedModel',
      operator: '=',
      value: model,
    },
    {
      fieldName: 'parent.relatedModel',
      operator: '=',
      value: model,
    },
    {
      operator: 'or',
      criteria: [
        {
          fieldName: 'parent.relatedId',
          operator: 'isNull',
        },
        {
          fieldName: 'parent.relatedId',
          operator: '=',
          value: 0,
        },
      ],
    },
  ];
};

const createCountAttachedFilesCriteria = ({model, modelId}) => {
  return [
    {
      fieldName: 'relatedModel',
      operator: '=',
      value: model,
    },
    {
      fieldName: 'relatedId',
      operator: '=',
      value: modelId,
    },
    {
      fieldName: 'isDirectory',
      operator: '!=',
      value: true,
    },
  ];
};

export async function searchDocument({
  searchValue = null,
  authorId,
  extensions,
  parentDirectoryId,
  noParent = false,
  favoriteFileIds = [],
  metaFileIds = [],
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.dms.db.DMSFile',
    criteria: createDocumentCriteria({
      searchValue,
      authorId,
      extensions,
      parentDirectoryId,
      noParent,
      favoriteFileIds,
      metaFileIds,
    }),
    fieldKey: 'dms_document',
    sortKey: 'dms_document',
    page,
    provider: 'model',
  });
}

export async function searchDirectory({searchValue, authorId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.dms.db.DMSFile',
    criteria: createDocumentCriteria({
      searchValue,
      authorId,
      isDirectory: true,
    }),
    fieldKey: 'dms_document',
    sortKey: 'dms_document',
    page,
    provider: 'model',
  });
}

export async function createDocument({document, model, modelId}) {
  const body = {relatedModel: model, relatedId: modelId, ...document};
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.dms.db.DMSFile',
    method: 'put',
    body: {
      data: formattedData,
    },
    description: 'create document',
    matchers: {
      modelName: 'com.axelor.dms.db.DMSFile',
      id: Date.now(),
      fields: matchers,
    },
  });
}

export async function updateDocument({document}) {
  const {matchers, formattedData} = formatRequestBody(document, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.dms.db.DMSFile',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update document',
    matchers: {
      modelName: 'com.axelor.dms.db.DMSFile',
      id: document.id,
      fields: matchers,
    },
  });
}

export async function fetchDirectory({model, modelId}) {
  return createStandardSearch({
    model: 'com.axelor.dms.db.DMSFile',
    criteria: createFetchDirectoryCriteria({model, modelId}),
    fieldKey: 'dms_document',
    sortKey: 'dms_document',
    page: 0,
    numberElementsByPage: 1,
    provider: 'model',
  });
}

export async function countAttachedFiles({model, modelId}) {
  return createStandardSearch({
    model: 'com.axelor.dms.db.DMSFile',
    criteria: createCountAttachedFilesCriteria({model, modelId}),
    fieldKey: 'dms_document',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  });
}

export async function addToFavorites({documentId}) {
  return getActionApi().send({
    url: `ws/aos/dms/favorites/${documentId}`,
    method: 'post',
    description: 'add to favorites',
  });
}

export async function removeFromFavorites({documentId}) {
  return getActionApi().send({
    url: `ws/aos/dms/favorites/${documentId}`,
    method: 'delete',
    description: 'remove from favorites',
  });
}

export async function deleteDocument({documentId}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.dms.db.DMSFile/${documentId}`,
    method: 'delete',
    description: 'delete document',
    matchers: {
      modelName: 'com.axelor.dms.db.DMSFile',
      id: documentId,
    },
  });
}
