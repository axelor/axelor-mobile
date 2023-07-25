/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {Schema, array, boolean, number, object, string} from 'yup';
import {getFields} from './display.helpers';
import {DisplayField, Form} from './types';

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

const createValidationSchema = (config: Form): Schema => {
  const fields = getFields(config);

  let schemaConfig = {};

  fields
    .filter(_field => !_field.readonly)
    .forEach(_field => {
      schemaConfig[_field.key] = getFieldSchema(_field);
    });

  return object(schemaConfig);
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
      schema = object({
        id: number().positive().integer().required(),
        version: number().min(0).integer().required(),
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
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g,
          'must be a valid phone number',
        );
        break;
      case 'date':
        schema = schema.matches(/^\d{4}-\d{2}-\d{2}$/g);
        break;
      case 'datetime':
        schema = schema.matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z$/g);
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

  if (field.required) {
    schema = schema.required();
  }

  return schema;
};

export async function validateSchema(content: Form, value: any): Promise<any> {
  return createValidationSchema(content).validate(value, {
    abortEarly: false,
  });
}

export function getValidationErrors(err: any): string[] {
  return err.inner?.map(e =>
    e.message.includes(e.path) ? e.message : `${e.path} ${e.message}`,
  );
}
