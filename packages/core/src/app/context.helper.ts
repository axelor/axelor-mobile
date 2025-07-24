/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {Schema, mixed, number, object, ObjectSchema} from 'yup';
import {Models, Module, ObjectFields, SearchFields, SortFields} from './Module';

function deepMergeSchemas(
  schemaA: ObjectSchema<Record<string, any>>,
  schemaB: ObjectSchema<Record<string, any>>,
) {
  if (!object().isType(schemaA) || !object().isType(schemaB)) {
    return schemaB ?? schemaA;
  }

  const fieldsA = schemaA.fields;
  const fieldsB = schemaB.fields;

  const mergedFields = {...fieldsA};

  for (const key in fieldsB) {
    if (
      fieldsA[key] &&
      object().isType(fieldsA[key]) &&
      object().isType(fieldsB[key])
    ) {
      mergedFields[key] = deepMergeSchemas(
        fieldsA[key] as any,
        fieldsB[key] as any,
      );
    } else {
      mergedFields[key] = fieldsB[key];
    }
  }

  return object().shape(mergedFields);
}

export const addModuleObjectFields = (
  objectFields: ObjectFields,
  moduleObjects: ObjectFields,
) => {
  const result: ObjectFields = {...objectFields};
  const currentObjects = Object.keys(result);

  const newObjects = Object.keys(moduleObjects);

  newObjects.forEach(_objectKey => {
    if (currentObjects.includes(_objectKey)) {
      result[_objectKey] = deepMergeSchemas(
        result[_objectKey] as any,
        moduleObjects[_objectKey] as any,
      );
    } else {
      result[_objectKey] = (
        object({
          id: number(),
          version: number(),
          attrs: mixed(),
        }) as Schema
      ).concat(moduleObjects[_objectKey]);
    }
  });

  return result;
};

export const addModuleSortFields = (
  sortFields: SortFields,
  moduleObjects: SortFields,
) => {
  const result: SortFields = {...sortFields};
  const newObjects = Object.keys(moduleObjects);

  newObjects.forEach(
    _objectKey => (result[_objectKey] = moduleObjects[_objectKey]),
  );

  return result;
};

export const addModuleSearchFields = (
  searchFields: SearchFields,
  moduleObjects: SearchFields,
) => {
  const result: SearchFields = {...searchFields};
  const currentObjects = Object.keys(result);

  const newObjects = Object.keys(moduleObjects);

  newObjects.forEach(_objectKey => {
    if (currentObjects.includes(_objectKey)) {
      result[_objectKey] = [
        ...result[_objectKey],
        ...moduleObjects[_objectKey],
      ];
    } else {
      result[_objectKey] = moduleObjects[_objectKey];
    }
  });

  return result;
};

export const addModuleModels = (models: Models, _module: Module): Models => {
  const fields = _module?.models;

  return {
    objectFields: fields?.objectFields
      ? addModuleObjectFields(models.objectFields, fields.objectFields)
      : models.objectFields,
    sortFields: fields?.sortFields
      ? addModuleSortFields(models.sortFields, fields.sortFields)
      : models.sortFields,
    searchFields: fields?.searchFields
      ? addModuleSearchFields(models.searchFields, fields.searchFields)
      : models.searchFields,
  };
};
