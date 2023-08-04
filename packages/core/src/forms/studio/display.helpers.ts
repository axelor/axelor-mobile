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

import {HorizontalRule, Label, ThemeColors} from '@axelor/aos-mobile-ui';
import {Field, InputType, JSONObject, Panel, Widget} from '../types';
import CustomSearchBar from '../../components/pages/FormView/CustomSearchBar';
import CustomPicker from '../../components/pages/FormView/CustomPicker';

export const mapStudioFields = (
  items: any[],
  Colors,
): {panels: JSONObject<Panel>; fields: JSONObject<Field>; defaults: any} => {
  let formFields: JSONObject<Field> = {};
  let formPanels: JSONObject<Panel> = {};
  let defaults: any = {};

  if (Array.isArray(items)) {
    const metaJsonFields = [...items];
    const modelFields = metaJsonFields
      .map(_item => _item.modelField)
      .filter((item, index, self) => self.indexOf(item) === index)
      .sort();

    for (const modelField of modelFields) {
      const {_fields, _panels, _defaults} = manageContentOfModel(
        metaJsonFields.filter(_item => _item.modelField === modelField),
        Colors,
      );

      formFields = {...formFields, ..._fields};
      formPanels = {...formPanels, ..._panels};
      defaults = {...defaults, ..._defaults};
    }
  }

  return {fields: formFields, panels: formPanels, defaults};
};

const mapStudioTypeToInputType = (type: string): InputType => {
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

const mapStudioWidgetToWidget = (
  widget: any,
): {widget: Widget; inputType: InputType} => {
  let result = {widget: undefined, inputType: undefined};

  switch (widget) {
    case 'Email':
      result.inputType = 'email';
      break;
    case 'Url':
      result.inputType = 'url';
      break;
    case 'Html':
      result.widget = 'HTML';
      break;
    default:
      break;
  }

  return result;
};

const getWidgetAttrs = (item: any): any => {
  return item?.widgetAttrs == null ? null : JSON.parse(item.widgetAttrs);
};

const BootstrapMapper = {
  error: ['warning'],
  danger: ['danger'],
  info: ['info'],
  success: ['primary', 'success'],
  light: ['light', 'secondary'],
  dark: ['dark'],
};

const mapStudioCSSToLabelOptions = (item: any, Colors: ThemeColors): any => {
  const css: string = getWidgetAttrs(item)?.css as string;

  let result: any = {};

  Object.entries(BootstrapMapper).forEach(([key, values]) => {
    if (Array.isArray(values) && values.some(_item => css.includes(_item))) {
      if (key === 'light') {
        result.color = Colors.secondaryColor;
      } else if (key === 'dark') {
        result.color = Colors.secondaryColor_dark;
      } else {
        result.type = key;
      }
    }
  });

  return result;
};

const isPanelCollapsible = (item: any): boolean => {
  return getWidgetAttrs(item)?.canCollapse;
};

const isPanelTab = (item: any): boolean => {
  return getWidgetAttrs(item)?.tab;
};

const isMultiLinesInput = (item: any): boolean => {
  return getWidgetAttrs(item)?.multiline;
};

const hasPanelTitle = (item: any): boolean => {
  return (
    isPanelCollapsible(item) ||
    isPanelTab(item) ||
    !getWidgetAttrs(item)?.showTitle
  );
};

const manageContentOfModel = (
  items: any,
  Colors: ThemeColors,
): {_panels: JSONObject<Panel>; _fields: JSONObject<Field>; _defaults: any} => {
  const formFields: JSONObject<Field> = {};
  const formPanels: JSONObject<Panel> = {};
  const defaults: any = {};
  let lastPanel = null;

  items
    .sort((a, b) => a.sequence - b.sequence)
    .forEach(item => {
      switch (item.type) {
        case 'panel':
          lastPanel = item.name;

          formPanels[item.name] = {
            titleKey: hasPanelTitle(item) ? item.title : null,
            order: item.sequence,
            colSpan: 12,
            direction: 'column',
            isCollaspible: isPanelCollapsible(item),
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
            customComponent: () =>
              Label({
                message: item.title,
                type: 'info',
                ...mapStudioCSSToLabelOptions(item, Colors),
              }),
          };
          break;
        case 'separator':
          formFields[item.name] = {
            titleKey: item.title,
            type: 'string',
            order: item.sequence,
            parentPanel: lastPanel,
            widget: 'custom',
            customComponent: () =>
              HorizontalRule({
                style: {
                  marginVertical: 5,
                  width: '60%',
                  alignSelf: 'center',
                },
              }),
          };
          break;
        default:
          const fieldType: InputType = mapStudioTypeToInputType(item.type);
          const {widget, inputType} = mapStudioWidgetToWidget(item.widget);

          if (item.defaultValue != null) {
            defaults[item.name] = item.defaultValue;
          }

          const config: Field = {
            titleKey: item.title,
            type: inputType || fieldType,
            required: item.required,
            readonly: item.readonly,
            order: item.sequence,
            parentPanel: lastPanel,
            widget: widget,
          };

          if (item.contextField != null) {
            config.hideIf = ({storeState}) => {
              const obejctValue =
                storeState?.metaJsonField?.object?.[item.contextField];

              const targetValue = parseInt(item.contextFieldValue, 10);
              return obejctValue?.id !== targetValue;
            };
          }

          if (item.type === 'integer') {
            config.validationOptions = {
              integer: {},
            };
          }

          if (isMultiLinesInput(item)) {
            config.options = {multiline: true, adjustHeightWithLines: true};
          }

          if (item.isSelectionField) {
            config.widget = 'custom';
            config.customComponent = CustomPicker;
            config.options = {item};
          }

          if (fieldType === 'object') {
            config.widget = 'custom';
            config.customComponent = CustomSearchBar;
            config.options = {item};
          }

          formFields[item.name] = config;

          break;
      }
    });

  return {_fields: formFields, _panels: formPanels, _defaults: defaults};
};
