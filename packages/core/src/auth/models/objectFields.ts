import {ObjectFields, schemaContructor} from '../../app';

export const auth_modelAPI: ObjectFields = {
  auth_company: schemaContructor.object({
    code: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
};
