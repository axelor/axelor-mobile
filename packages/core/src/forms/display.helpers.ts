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

import {KeyboardType, Platform} from 'react-native';
import {checkNullString} from '@axelor/aos-mobile-ui';
import {
  DEFAULT_COLSPAN,
  DisplayField,
  DisplayPanel,
  Form,
  Widget,
} from './types';

const DEFAULT_ZINDEX = 50;

export const getZIndexStyle = (zIndex: number) => {
  return Platform.OS === 'ios' ? {zIndex} : null;
};

const getItem = (key: string, formContent: (DisplayPanel | DisplayField)[]) => {
  const _item = formContent.find(_i => _i.key === key);
  const _index = formContent.indexOf(_item);

  return {item: _item, index: _index};
};

export const getNumberOfParent = (
  key: string,
  formContent: (DisplayPanel | DisplayField)[],
) => {
  const {item: _item} = getItem(key, formContent);

  if (checkNullString((_item as DisplayPanel).parent)) {
    return 0;
  }

  return getNumberOfParent((_item as DisplayPanel).parent, formContent) + 1;
};

export const getRootParentIndex = (
  key: string,
  formContent: (DisplayPanel | DisplayField)[],
) => {
  const {item: _item, index: _index} = getItem(key, formContent);

  if (checkNullString((_item as DisplayPanel).parent)) {
    return _index;
  }

  return getRootParentIndex((_item as DisplayPanel).parent, formContent);
};

export const getParentKey = (
  key: string,
  formContent: (DisplayPanel | DisplayField)[],
): string => {
  const {item: _item} = getItem(key, formContent);

  if (
    checkNullString((_item as DisplayPanel).parent) &&
    checkNullString((_item as DisplayField).parentPanel)
  ) {
    return null;
  }

  if (isField(_item)) {
    return (_item as DisplayField).parentPanel;
  } else {
    return (_item as DisplayPanel).parent;
  }
};

export const getIndexOfItemInParent = (
  key: string,
  formContent: (DisplayPanel | DisplayField)[],
) => {
  const parentKey = getParentKey(key, formContent);

  if (checkNullString(parentKey)) {
    return 0;
  }

  const childrenOfParent = formContent
    .filter(
      _i =>
        (_i as DisplayPanel).parent === parentKey ||
        (_i as DisplayField).parentPanel === parentKey,
    )
    .sort((a, b) => b.order - a.order);

  return childrenOfParent.findIndex(_i => _i.key === key);
};

export const getZIndex = (
  formContent: (DisplayPanel | DisplayField)[],
  key: string,
) => {
  const {item: _item, index: _index} = getItem(key, formContent);

  if (_item == null) {
    return 0;
  }

  const parentKey = getParentKey(key, formContent);

  if (
    checkNullString((_item as DisplayField).parentPanel) &&
    checkNullString((_item as DisplayPanel).parent)
  ) {
    return DEFAULT_ZINDEX - _index;
  } else {
    const indexInParent = getIndexOfItemInParent(key, formContent);

    return getZIndex(formContent, parentKey) + 2 + indexInParent;
  }
};

export const isField = (_object: DisplayPanel | DisplayField): boolean => {
  return (_object as any).type != null;
};

export const getFields = (config: Form): DisplayField[] => {
  if (config.fields == null) {
    return [];
  }

  return Object.entries(config.fields)
    .map(([fieldName, _field], index) => ({
      ..._field,
      key: fieldName,
      order: _field.order != null ? _field.order : index * 10,
      hideIf: _field.hideIf != null ? _field.hideIf : () => false,
      requiredIf: _field.requiredIf != null ? _field.requiredIf : () => false,
      readonlyIf: _field.readonlyIf != null ? _field.readonlyIf : () => false,
    }))
    .sort((a, b) => a.order - b.order);
};

export const getPanels = (config: Form): DisplayPanel[] => {
  if (config.panels == null) {
    return [];
  }

  return Object.entries(config.panels)
    .map(([panelKey, _panel], index) => ({
      ..._panel,
      key: panelKey,
      order: _panel.order != null ? _panel.order : index * 10,
    }))
    .sort((a, b) => a.order - b.order);
};

export const getConfigItems = (
  config: Form,
): (DisplayPanel | DisplayField)[] => {
  const fields: DisplayField[] = getFields(config);
  const panels: DisplayPanel[] = getPanels(config);

  const result = [...fields, ...panels];

  return result.sort((a, b) => a.order - b.order);
};

export const sortContent = (config: Form): (DisplayPanel | DisplayField)[] => {
  if (config == null) {
    return [];
  }

  const fields: DisplayField[] = getFields(config);

  if (config.panels == null || Object.keys(config.panels).length === 0) {
    return fields;
  }

  const panels: DisplayPanel[] = getPanels(config);

  const rootPanels = panels.filter(_item => checkNullString(_item.parent));

  if (rootPanels.length === 0) {
    return fields;
  }

  const result: (DisplayPanel | DisplayField)[] = fields.filter(_item =>
    checkNullString(_item.parentPanel),
  );

  rootPanels.forEach(_panel => {
    result.push({
      ..._panel,
      content: getContentOfPanel(_panel.key, fields, panels),
    });
  });

  return result.sort((a, b) => a.order - b.order);
};

const getContentOfPanel = (
  panelKey: string,
  fields: DisplayField[],
  panels: DisplayPanel[],
): (DisplayPanel | DisplayField)[] => {
  if (fields.length === 0) {
    return [];
  }

  let result: (DisplayPanel | DisplayField)[] = fields.filter(
    _item => _item.parentPanel === panelKey,
  );

  if (panels.length === 0) {
    return result;
  }

  panels
    .filter(_item => _item.parent === panelKey)
    .forEach(_item => {
      result.push({
        colSpan: DEFAULT_COLSPAN,
        ..._item,
        content: getContentOfPanel(
          _item.key,
          fields.filter(_field => _field.parentPanel !== panelKey),
          panels.filter(_panel => _panel.parent !== panelKey),
        ),
      });
    });

  return result.sort((a, b) => a.order - b.order);
};

export const getWidget = (_field: DisplayField): Widget => {
  if (_field.widget === 'custom' && _field.customComponent != null) {
    return 'custom';
  }

  if (_field.widget === 'file' || _field.widget === 'signature') {
    return _field.widget;
  }

  if (_field.widget === 'label' && _field.type === 'string') {
    return 'label';
  }

  if (_field.type === 'boolean') {
    return 'checkbox';
  }

  if (_field.widget === 'star' && _field.type === 'number') {
    return 'star';
  }

  if (_field.widget === 'increment' || _field.type === 'number') {
    return 'increment';
  }

  if (
    _field.type === 'date' ||
    _field.type === 'datetime' ||
    _field.type === 'time'
  ) {
    return 'date';
  }

  if (_field.widget === 'password' && _field.type === 'string') {
    return 'password';
  }

  if (_field.widget === 'HTML' && _field.type === 'string') {
    return 'HTML';
  }

  return 'default';
};

export const getKeyboardType = (_field: DisplayField): KeyboardType => {
  switch (_field.type) {
    case 'number':
      if (
        _field.validationOptions != null &&
        Object.keys(_field.validationOptions).includes('integer')
      ) {
        return 'number-pad';
      }

      return 'decimal-pad';
    case 'phone':
      return 'phone-pad';
    case 'email':
      return 'email-address';
    default:
      return 'default';
  }
};
