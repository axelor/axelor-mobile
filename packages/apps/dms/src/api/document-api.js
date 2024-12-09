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

const createDocumentCriteria = ({
  searchValue,
  authorId,
  extensions,
  parentDirectoryId,
  noParent,
  isDirectory = null,
  favoriteFileIds,
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
                fieldName: 'fileName',
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

  return criteria;
};

export async function searchDocument({
  searchValue = null,
  authorId,
  extensions,
  parentDirectoryId,
  noParent = false,
  favoriteFileIds = [],
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
