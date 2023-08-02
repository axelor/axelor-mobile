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

import {Label} from '@axelor/aos-mobile-ui';
import {Field, InputType, JSONObject, Panel} from '../types';
import CustomSearchBar from '../../components/pages/FormView/CustomSearchBar';

export const mapStudioFields = (
  items: any[],
): {panels: JSONObject<Panel>; fields: JSONObject<Field>} => {
  let formFields: JSONObject<Field> = {};
  let formPanels: JSONObject<Panel> = {};

  if (Array.isArray(items)) {
    const metaJsonFields = [...items];
    const modelFields = metaJsonFields
      .map(_item => _item.modelField)
      .filter((item, index, self) => self.indexOf(item) === index)
      .sort();

    for (const modelField of modelFields) {
      const {_fields, _panels} = manageContentOfModel(
        metaJsonFields.filter(_item => _item.modelField === modelField),
      );

      formFields = {...formFields, ..._fields};
      formPanels = {...formPanels, ..._panels};
    }
  }

  return {fields: formFields, panels: formPanels};
};

export const mapStudioTypeToInputType = (type: string): InputType => {
  switch (type) {
    case 'integer':
    case 'decimal':
      return 'number';
    case 'many-to-one':
      return 'object';
    default:
      return type as InputType;
  }
};

const manageContentOfModel = (
  items: any,
): {_panels: JSONObject<Panel>; _fields: JSONObject<Field>} => {
  const formFields: JSONObject<Field> = {};
  const formPanels: JSONObject<Panel> = {};
  let lastPanel = null;

  items
    .sort((a, b) => a.sequence - b.sequence)
    .forEach(item => {
      switch (item.type) {
        case 'panel':
          lastPanel = item.name;

          formPanels[item.name] = {
            titleKey: item.title,
            order: item.sequence,
            colSpan: 12,
            direction: 'column',
          };
          break;
        case 'spacer':
          formPanels[item.name] = {
            titleKey: item.title,
            order: item.sequence,
            colSpan: 12,
            direction: 'column',
          };
          break;
        case 'label':
          formFields[item.name] = {
            titleKey: item.title,
            type: 'string',
            order: item.sequence,
            parentPanel: lastPanel,
            widget: 'custom',
            customComponent: () => Label({message: item.title, type: 'info'}),
          };
          break;
        default:
          const fieldType: InputType = mapStudioTypeToInputType(item.type);

          const config: Field = {
            titleKey: item.title,
            type: fieldType,
            required: item.required,
            readonly: item.readonly,
            order: item.sequence,
            parentPanel: lastPanel,
          };

          if (fieldType === 'object') {
            config.widget = 'custom';
            config.customComponent = CustomSearchBar;
            config.options = {item};
          }

          formFields[item.name] = config;

          break;
      }
    });

  return {_fields: formFields, _panels: formPanels};
};
