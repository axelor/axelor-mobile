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

import {Schema} from 'yup';
import {Models, ObjectFields, SearchFields, SortFields} from '../../app';
import {CriteriaField, CriteriaGroup} from '../Model';
import {checkNullString} from '../../utils/string';

const BASIC_FIELDS = ['id', 'version', '$version'];

class ObjectFieldsProvider {
  private objectFields: ObjectFields;
  private searchFields: SearchFields;
  private sortFields: SortFields;

  constructor() {
    this.objectFields = {};
    this.searchFields = {};
    this.sortFields = {};
  }

  init(models: Models) {
    this.objectFields = models.objectFields;
    this.searchFields = models.searchFields;
    this.sortFields = models.sortFields;
  }

  getObjectSchema(objectKey: string): Schema {
    const registeredObjects = Object.keys(this.objectFields);

    if (registeredObjects.includes(objectKey)) {
      return this.objectFields[objectKey];
    }

    return null;
  }

  getObjectFields(objectKey: string): string[] {
    const objectSchema: any = this.getObjectSchema(objectKey);

    if (objectSchema != null) {
      return this.handleSchemaField(objectSchema);
    }

    return [];
  }

  getObjectFieldsForSearch(objectKey: string): string[] {
    const objectSchema: any = this.getObjectSchema(objectKey);

    if (objectSchema != null) {
      return this.handleSchemaField(objectSchema, false, true);
    }

    return [];
  }

  private handleSchemaField(
    schema: any,
    isNested = false,
    excludeNestedArrays = false,
  ): string[] {
    const fields = schema.fields;
    const result: string[] = [];

    for (const fieldName of schema._nodes) {
      if (fields[fieldName].type === 'object') {
        this.handleSchemaField(
          fields[fieldName],
          true,
          excludeNestedArrays,
        ).forEach(_field => {
          if (BASIC_FIELDS.includes(_field)) return;
          result.push(`${fieldName}.${_field}`);
        });
      }

      if (fields[fieldName].type === 'array') {
        if (isNested && excludeNestedArrays) {
          continue;
        } else {
          const subSchema: any = fields[fieldName].innerType;

          if (
            subSchema?._nodes?.find((_i: any) => !BASIC_FIELDS.includes(_i)) !=
            null
          ) {
            this.handleSchemaField(subSchema).forEach(_field => {
              if (BASIC_FIELDS.includes(_field)) return;
              result.push(`${fieldName}.${_field}`);
            });
          }
        }
      }

      result.push(fieldName);
    }

    return result.filter((item, index, self) => self.indexOf(item) === index);
  }

  getSortFields(objectKey: string): string[] {
    const registeredObjects = Object.keys(this.sortFields);

    if (registeredObjects.includes(objectKey)) {
      return this.sortFields[objectKey];
    }

    return ['id'];
  }

  getSearchFields(objectKey: string): string[] {
    const registeredObjects = Object.keys(this.searchFields);

    if (registeredObjects.includes(objectKey)) {
      return this.searchFields[objectKey];
    }

    return [];
  }

  getSearchCriterias(
    objectKey: string | string[],
    searchValue: string,
  ): CriteriaGroup {
    const searchFields: string[] = Array.isArray(objectKey)
      ? objectKey
      : this.getSearchFields(objectKey);

    let criteria: CriteriaField[] = [];

    if (searchFields.length > 0 && !checkNullString(searchValue)) {
      criteria = searchFields.map(_searchField => ({
        fieldName: _searchField,
        operator: 'like',
        value: searchValue,
      }));
    }

    return {operator: 'or', criteria: criteria};
  }
}

export const objectFieldsProvider = new ObjectFieldsProvider();

export function getObjectFields(objectKey: string): string[] {
  return objectFieldsProvider.getObjectFields(objectKey);
}

export function getObjectFieldsForSearch(objectKey: string): string[] {
  return objectFieldsProvider.getObjectFieldsForSearch(objectKey);
}

export function getSortFields(objectKey: string): string[] {
  return objectFieldsProvider.getSortFields(objectKey);
}

export function getSearchCriterias(
  objectKey: string | string[],
  searchValue: string,
): CriteriaGroup {
  return objectFieldsProvider.getSearchCriterias(objectKey, searchValue);
}
