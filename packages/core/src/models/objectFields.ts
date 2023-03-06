import {ObjectFields, schemaContructor} from '../app';

export const core_modelAPI: ObjectFields = {
  core_mobileMenu: schemaContructor.object({
    name: schemaContructor.string(),
    technicalName: schemaContructor.string(),
    authorizedRoles: schemaContructor.array().of(schemaContructor.subObject()),
  }),
  core_metaFile: schemaContructor.object({
    fileName: schemaContructor.string(),
    createdOn: schemaContructor.string(),
  }),
};
