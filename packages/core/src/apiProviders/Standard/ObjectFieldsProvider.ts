import {object, Schema} from 'yup';
import {ObjectFields} from '../../app/Module';

class ObjectFieldsProvider {
  private objectFields: ObjectFields;

  constructor() {
    this.objectFields = {};
  }

  init(objectFields: ObjectFields) {
    this.objectFields = objectFields;
  }

  getObjectSchema(objectKey: string): Schema {
    const registeredObjects = Object.keys(this.objectFields);

    if (registeredObjects.includes(objectKey)) {
      return this.objectFields[objectKey];
    }

    return object({});
  }

  getObjectFields(objectKey: string): string[] {
    const objectSchema: any = this.getObjectSchema(objectKey);

    if (Object.keys(objectSchema)?.length > 0) {
      return objectSchema._nodes;
    }

    return [];
  }
}

export const objectFieldsProvider = new ObjectFieldsProvider();

export function getObjectFields(objectKey: string): string[] {
  return objectFieldsProvider.getObjectFields(objectKey);
}

export function getObjectSchema(objectKey: string): Schema {
  return objectFieldsProvider.getObjectSchema(objectKey);
}
