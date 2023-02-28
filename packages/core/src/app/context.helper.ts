import {Module, ObjectFields} from './Module';

export const addModuleObjectFields = (objectFields, _module: Module) => {
  const result: ObjectFields = {...objectFields};
  const currentObjects = Object.keys(result);

  const moduleObjects = _module.objectFields;
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
