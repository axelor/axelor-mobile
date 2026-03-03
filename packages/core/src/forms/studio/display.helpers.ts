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

import {HorizontalRule, Label, ThemeColors} from '@axelor/aos-mobile-ui';
import {Field, InputType, JSONObject, Panel, Widget} from '../types';
import {
  CustomButton,
  CustomPicker,
  CustomSearchBar,
  CustomTagList,
} from '../../components';
import {
  combinedFormula,
  createFormulaFunction,
  manageDependsOnFormula,
  reverseFormula,
} from './formula.helpers';

export const mapStudioFields = (
  items: any[],
  Colors: ThemeColors,
  removeUnauthorizedFields: (item: any) => any = _i => _i,
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
        metaJsonFields,
        modelField,
        Colors,
        removeUnauthorizedFields,
      );

      formFields = {...formFields, ..._fields};
      formPanels = {...formPanels, ..._panels};
      defaults = {...defaults, ..._defaults};
    }
  }

  return {fields: formFields, panels: formPanels, defaults};
};

export const mapFormToStudioFields = (
  fields: any[],
  formValues: any,
): JSONObject<string> => {
  let items: JSONObject<string> = {};

  if (Array.isArray(fields)) {
    const metaJsonFields = [...fields];
    const modelFields = metaJsonFields
      .map(_item => _item.modelField)
      .filter((item, index, self) => self.indexOf(item) === index)
      .sort();

    for (const modelField of modelFields) {
      let panelValues = {};
      const keys = Object.keys(formValues);

      metaJsonFields
        .filter(_item => _item.modelField === modelField)
        .forEach(_item => {
          const fieldKey = _item.name;

          if (keys.includes(fieldKey)) {
            panelValues[fieldKey] = formValues[fieldKey];
          }
        });

      items = {...items, [modelField]: JSON.stringify(panelValues)};
    }
  }

  return items;
};

const mapStudioTypeToInputType = (type: string): InputType => {
  switch (type) {
    case 'integer':
    case 'decimal':
      return 'number';
    case 'many-to-many':
    case 'one-to-many':
      return 'array';
    case 'many-to-one':
    case 'reference':
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
    case 'Password':
      result.widget = 'password';
      break;
    case 'Drawing':
      result.widget = 'signature';
      break;
    case 'Image':
      result.widget = 'file';
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
  metaJsonFields: any[],
  modelField: string,
  Colors: ThemeColors,
  removeUnauthorizedFields: (item: any) => any,
): {_panels: JSONObject<Panel>; _fields: JSONObject<Field>; _defaults: any} => {
  const formFields: JSONObject<Field> = {};
  const formPanels: JSONObject<Panel> = {};
  const defaults: any = {};
  let lastPanel = null;

  metaJsonFields
    .sort((a, b) => a.sequence - b.sequence)
    .filter(_item => _item.modelField === modelField)
    .map(removeUnauthorizedFields)
    .forEach(item => {
      switch (item.type) {
        case 'panel':
          lastPanel = item.name;

          formPanels[item.name] = {
            titleKey: hasPanelTitle(item) ? item.title : null,
            order: item.sequence,
            colSpan: 12,
            direction: 'column',
            isCollapsible: isPanelCollapsible(item),
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
            hideIf: () => item.hidden,
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
            hideIf: () => item.hidden,
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
        case 'button':
          formFields[item.name] = {
            titleKey: item.title,
            type: 'object',
            order: item.sequence,
            parentPanel: lastPanel,
            widget: 'custom',
            hideIf: () => item.hidden,
            customComponent: CustomButton,
            options: {item},
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
            helperKey: item.help,
            type: inputType || fieldType,
            required: item.required,
            requiredIf: createFormulaFunction(item.requiredIf),
            readonly: item.readonly,
            readonlyIf: createFormulaFunction(item.readonlyIf),
            hideIf: item.hidden
              ? () => true
              : createFormulaFunction(
                  combinedFormula(
                    '||',
                    item.hideIf,
                    reverseFormula(item.showIf),
                  ),
                ),
            order: item.sequence,
            parentPanel: lastPanel,
            widget: widget,
          };

          if (item.type === 'integer') {
            config.validationOptions = {
              integer: {},
            };
            config.options = {scale: 0};
          }

          if (item.type === 'decimal' && item.scale != null) {
            config.options = {scale: item.scale};
          }

          if (isMultiLinesInput(item)) {
            config.options = {multiline: true, adjustHeightWithLines: true};
          }

          if (item.isSelectionField) {
            config.widget = 'custom';
            config.customComponent = CustomPicker;
            config.options = {item};
          }

          if (fieldType === 'array') {
            config.widget = 'custom';
            config.customComponent = CustomTagList;
            config.options = {
              targetModel: item.targetModel,
            };
          }

          if (fieldType === 'object') {
            if (widget === 'signature') {
              config.options = {popup: true};
            } else if (widget === 'file') {
              config.options = {returnBase64String: false};
            } else {
              config.widget = 'custom';
              config.customComponent = CustomSearchBar;
              config.options = {item};
            }
          }

          if (item.valueExpr != null) {
            config.dependsOn = manageDependsOnFormula(
              item.valueExpr,
              metaJsonFields,
            );
          }

          if (
            item.type === 'date' ||
            item.type === 'datetime' ||
            item.type === 'time'
          ) {
            config.options = {popup: true};
          }

          formFields[item.name] = config;

          break;
      }
    });

  return {_fields: formFields, _panels: formPanels, _defaults: defaults};
};
