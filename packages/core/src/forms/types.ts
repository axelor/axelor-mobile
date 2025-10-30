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

import {Dispatch, ReactElement} from 'react';
import {Color} from '@axelor/aos-mobile-ui';

export const DEFAULT_COLSPAN = 12;

export interface States {
  objectState?: any;
  storeState?: any;
}

export interface DependsOnStates extends States {
  newValue?: any;
  dispatch?: any;
}

export interface customComponentOptions {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value?: any) => void;
  objectState?: any;
  required?: boolean;
  readonly?: boolean;
}

export interface Field {
  parentPanel?: string;
  order?: number;
  titleKey?: string;
  helperKey?: string;
  type: InputType;
  required?: boolean;
  requiredIf?: (values?: States) => boolean;
  readonly?: boolean;
  readonlyIf?: (values?: States) => boolean;
  hideIf?: (values?: States) => boolean;
  dependsOn?: {
    [fieldName: string]: (values: DependsOnStates) => any;
  };
  widget?: Widget;
  customComponent?: (
    options?: customComponentOptions,
  ) => ReactElement | React.JSX.Element;
  options?: {
    [propsKey: string]: any;
  };
  validationOptions?: {
    [key: string]: {
      value?: any;
      customErrorKey?: string;
    };
  };
}

export type Widget =
  | 'default'
  | 'increment'
  | 'star'
  | 'HTML'
  | 'label'
  | 'password'
  | 'file'
  | 'signature'
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
  | 'time'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object';

export interface Panel {
  titleKey?: string;
  isCollapsible?: boolean;
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
  modelName: string;
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

export interface Action {
  key: string;
  type: FormActionType;
  titleKey?: string;
  iconName?: string;
  color?: Color;
  hideIf?: (_states: States) => boolean;
  disabledIf?: (_states: States) => boolean;
  customAction?: (_options: ActionProps) => void;
  needValidation?: boolean;
  needRequiredFields?: boolean;
  customComponent?: ReactElement<any>;
  readonlyAfterAction?: boolean;
}

export interface ActionProps {
  handleReset?: () => void;
  objectState?: any;
  storeState?: any;
  handleObjectChange?: (newValue?: any) => void;
  dispatch?: Dispatch<any>;
}

export type FormActionType =
  | 'update'
  | 'create'
  | 'reset'
  | 'delete'
  | 'refresh'
  | 'custom';

export interface FormatedAction extends Action {
  title?: string;
  onPress: () => void;
  isDisabled: boolean;
}
