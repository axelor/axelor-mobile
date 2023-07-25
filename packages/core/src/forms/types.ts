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

import {ReactElement} from 'react';

export const DEFAULT_COLSPAN = 12;

export interface States {
  objectState?: any;
  storeState?: any;
}

export interface DependsOnStates extends States {
  newValue?: any;
}

export interface customComponentOptions {
  title?: string;
  defaultValue?: any;
  onChange: (value?: any) => void;
  required?: boolean;
  readonly?: boolean;
}

export interface Field {
  parentPanel?: string;
  order?: number;
  titleKey?: string;
  type: InputType;
  required?: boolean;
  readonly?: boolean;
  hideIf?: (values?: States) => boolean;
  dependsOn?: {
    fieldName: string;
    onChange: (values: DependsOnStates) => any;
  };
  widget?: Widget;
  customComponent?: (
    options?: customComponentOptions,
  ) => ReactElement | JSX.Element;
  options?: {
    [propsKey: string]: any;
  };
  validationOptions?: {
    [key: string]: {
      value?: number | string | boolean | RegExp;
      customErrorKey?: string;
    };
  };
}

export type Widget =
  | 'default'
  | 'increment'
  | 'star'
  | 'HTML'
  | 'file'
  | 'date'
  | 'checkbox'
  | 'custom';

export type InputType =
  | 'string'
  | 'email'
  | 'url'
  | 'phone'
  | 'date'
  | 'datetime'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object';

export interface Panel {
  titleKey?: string;
  isCollaspible?: boolean;
  order?: number;
  colSpan?: number;
  direction?: 'row' | 'column';
  parent?: string;
}

export interface JSONObject<Type> {
  [Key: string]: Type;
}

export interface Form {
  readonlyIf?: (values?: States) => boolean;
  panels?: JSONObject<Panel>;
  /** Fields attribut is a JSON object contening all fields of object.
   * When defining a field you need to define as key in the JSON object
   * the fieldName of the object.
   */
  fields: JSONObject<Field>;
}

export interface FormConfigs {
  [formKey: string]: Form;
}

export interface DisplayPanel extends Panel {
  key: string;
  content?: (DisplayPanel | DisplayField)[];
}

export interface DisplayField extends Field {
  key: string;
}
