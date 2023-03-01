import {Models, Module, ObjectFields, SearchFields, SortFields} from './Module';

export const addModuleObjectFields = (
  objectFields: ObjectFields,
  moduleObjects: ObjectFields,
) => {
  const result: ObjectFields = {...objectFields};
  const currentObjects = Object.keys(result);

  const newObjects = Object.keys(moduleObjects);

  newObjects.forEach(_objectKey => {
    if (currentObjects.includes(_objectKey)) {
      result[_objectKey] = result[_objectKey].concat(moduleObjects[_objectKey]);
    } else {
      result[_objectKey] = moduleObjects[_objectKey];
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
