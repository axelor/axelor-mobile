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

import {Schema, array, boolean, number, object, setLocale, string} from 'yup';
import {getFields} from './display.helpers';
import {DisplayField, Form} from './types';

export const updateRequiredFieldsOfConfig = (
  config: Form,
  {objectState, storeState}: {objectState: any; storeState: any},
): Form => {
  if (config == null) {
    return null;
  }

  const fields = getFields(config);

  const result = {...config.fields};

  fields.forEach(_item => {
    result[_item.key] = {
      ..._item,
      required: _item.required || _item.requiredIf({objectState, storeState}),
    };
  });

  return {...config, fields: result};
};

export const isObjectMissingRequiredField = (
  content: any,
  config: Form,
): boolean => {
  if (config == null) {
    return false;
  }

  if (content == null) {
    return true;
  }

  const fields = getFields(config);

  const requiredFieldNames = fields
    .filter(_item => _item.required === true)
    .map(_item => _item.key);

  return requiredFieldNames.some(_fieldName => content?.[_fieldName] == null);
};

export const mapErrorWithTranslationKey = () => {
  setLocale({
    mixed: {
      notType: function notType(_ref) {
        switch (_ref.type) {
          case 'string':
            return 'Base_FormValidation_String';
          case 'number':
            return 'Base_FormValidation_Number';
          case 'boolean':
            return 'Base_FormValidation_Boolean';
          case 'array':
            return 'Base_FormValidation_Array';
          default:
            return 'Base_FormValidation_Object';
        }
      },
      required: 'Base_FormValidation_Required',
    },
    string: {
      length: ({length}) => ({
        key: 'Base_FormValidation_String_Length',
        values: {length},
      }),
      min: ({min}) => ({key: 'Base_FormValidation_String_Min', values: {min}}),
      max: ({max}) => ({key: 'Base_FormValidation_String_Max', values: {max}}),
      matches: ({regex}) => ({
        key: 'Base_FormValidation_String_Match',
        values: {regex},
      }),
      email: 'Base_FormValidation_String_Email',
      url: 'Base_FormValidation_String_Url',
      uuid: 'Base_FormValidation_String_UUID',
      trim: 'Base_FormValidation_String_Trim',
      lowercase: 'Base_FormValidation_String_Lowercase',
      uppercase: 'Base_FormValidation_String_Uppercase',
    },
    number: {
      min: ({min}) => ({key: 'Base_FormValidation_Number_Min', values: {min}}),
      max: ({max}) => ({key: 'Base_FormValidation_Number_Max', values: {max}}),
      lessThan: ({less}) => ({
        key: 'Base_FormValidation_Number_LessThan',
        values: {less},
      }),
      moreThan: ({more}) => ({
        key: 'Base_FormValidation_Number_MoreThan',
        values: {more},
      }),
      positive: 'Base_FormValidation_Number_Positive',
      negative: 'Base_FormValidation_Number_Negative',
      integer: 'Base_FormValidation_Number_Integer',
    },
    date: {
      min: ({min}) => ({key: 'Base_FormValidation_Date_Min', values: {min}}),
      max: ({max}) => ({key: 'Base_FormValidation_Date_Max', values: {max}}),
    },
    boolean: {
      isValue: ({value}) => ({
        key: 'Base_FormValidation_Boolean_IsValue',
        values: {value},
      }),
    },
    object: {
      noUnknown: ({unknown}) => ({
        key: 'Base_FormValidation_Object_Unknown',
        values: {unknown},
      }),
    },
    array: {
      min: ({min}) => ({key: 'Base_FormValidation_Array_Min', values: {min}}),
      max: ({max}) => ({key: 'Base_FormValidation_Array_Max', values: {max}}),
      length: ({length}) => ({
        key: 'Base_FormValidation_Array_Length',
        values: {length},
      }),
    },
  });
};

const createValidationSchema = (config: Form): Schema => {
  const fields = getFields(config);

  let schemaConfig = {};

  fields
    .filter(_field => !_field.readonly)
    .filter(_field => _field.widget !== 'label')
    .forEach(_field => {
      schemaConfig[_field.key] = getFieldSchema(_field);
    });

  return object(schemaConfig);
};

const getRequiredCondition = (schema: Schema, _field: DisplayField): Schema => {
  if (_field.required) {
    return schema.required();
  }

  return schema.nullable();
};

const getFieldSchema = (field: DisplayField): Schema => {
  let schema = null;

  switch (field.type) {
    case 'string':
    case 'email':
    case 'url':
    case 'phone':
    case 'date':
    case 'datetime':
    case 'time':
      schema = string();
      break;
    case 'number':
      schema = number();
      break;
    case 'boolean':
      schema = boolean();
      break;
    case 'array':
      schema = array().of(object());
      break;
    case 'object':
      schema = object().shape({
        id: getRequiredCondition(number().positive().integer(), field),
        version: number().min(0).integer().nullable(),
      });
      break;
    default:
      throw new Error(`Type ${field.type} is not managed for schema creation`);
  }

  if (field.validationOptions == null) {
    switch (field.type) {
      case 'email':
        schema = schema.email();
        break;
      case 'url':
        schema = schema.url();
        break;
      case 'phone':
        schema = schema.matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g,
          'Base_FormValidation_PhoneNumber',
        );
        break;
      case 'date':
        schema = schema.matches(
          /^\d{4}-\d{2}-\d{2}$/g,
          'Base_FormValidation_Date',
        );
        break;
      case 'datetime':
        schema = schema.matches(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?Z$/g,
          'Base_FormValidation_DateTime',
        );
        break;
      default:
        break;
    }
  } else {
    for (const [key, _options] of Object.entries(field.validationOptions)) {
      if (_options?.value != null) {
        if (_options?.customErrorKey != null) {
          schema = schema?.[key](_options.value, _options.customErrorKey);
        } else {
          schema = schema?.[key](_options.value);
        }
      } else {
        if (_options?.customErrorKey != null) {
          schema = schema?.[key](_options.customErrorKey);
        } else {
          schema = schema?.[key]();
        }
      }
    }
  }

  return getRequiredCondition(schema, field);
};

export async function validateSchema(content: Form, value: any): Promise<any> {
  return createValidationSchema(content).validate(value, {
    abortEarly: false,
  });
}

export async function validateFieldSchema(
  field: DisplayField,
  value: any,
): Promise<any> {
  return getFieldSchema(field).validate(value);
}

export function getValidationErrors(err: any): any[] {
  return err.inner?.map(e => {
    const message = typeof e.message === 'object' ? e.message?.key : e.message;

    return {
      attr: e.path,
      message: message,
      values: typeof e.message === 'object' ? e.message?.values : null,
      translatable: !message.includes(e.path),
    };
  });
}
