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
  const _index = formContent.indexOf(_item!);

  return {item: _item, index: _index};
};

export const getNumberOfParent = (
  key: string,
  formContent: (DisplayPanel | DisplayField)[],
): number => {
  const {item: _item} = getItem(key, formContent);

  if (checkNullString((_item as DisplayPanel).parent)) return 0;

  return getNumberOfParent((_item as DisplayPanel).parent!, formContent) + 1;
};

export const getRootParentIndex = (
  key: string,
  formContent: (DisplayPanel | DisplayField)[],
): number => {
  const {item: _item, index: _index} = getItem(key, formContent);

  if (checkNullString((_item as DisplayPanel).parent)) return _index;

  return getRootParentIndex((_item as DisplayPanel).parent!, formContent);
};

const getItemParentKey = (
  item: DisplayPanel | DisplayField,
): string | undefined => {
  return isField(item)
    ? (item as DisplayField)?.parentPanel
    : (item as DisplayPanel)?.parent;
};

export const getParentKey = (
  key: string,
  formContent: (DisplayPanel | DisplayField)[],
): string | undefined => {
  const {item: _item} = getItem(key, formContent);
  if (!_item) return undefined;

  return getItemParentKey(_item);
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
    .sort((a, b) => b.order! - a.order!);

  return childrenOfParent.findIndex(_i => _i.key === key);
};

export const getZIndex = (
  formContent: (DisplayPanel | DisplayField)[],
  key: string,
): number => {
  const {item: _item, index: _index} = getItem(key, formContent);

  if (_item == null) return 0;

  const parentKey = getParentKey(key, formContent);

  if (checkNullString(parentKey)) {
    return DEFAULT_ZINDEX - _index;
  } else {
    const indexInParent = getIndexOfItemInParent(key, formContent);

    return getZIndex(formContent, parentKey!) + 2 + indexInParent;
  }
};

export const getZIndexMap = (
  formContent: (DisplayPanel | DisplayField)[],
): {[key: string]: number} => {
  const zIndexOfKey: {[key: string]: number} = {};

  if (!Array.isArray(formContent)) return zIndexOfKey;

  const itemOfKey: {[key: string]: DisplayPanel | DisplayField} = {};
  const indexOfKey: {[key: string]: number} = {};
  const childrenOfKey: {[key: string]: (DisplayPanel | DisplayField)[]} = {};

  formContent.forEach((_item, _index) => {
    itemOfKey[_item.key] = _item;
    indexOfKey[_item.key] = _index;
  });

  formContent.forEach(_item => {
    const parentKeys = [
      (_item as DisplayPanel).parent,
      (_item as DisplayField).parentPanel,
    ].filter(
      (_key, _index, _self) =>
        !checkNullString(_key) && _self.indexOf(_key) === _index,
    );

    parentKeys.forEach(_parentKey => {
      if (childrenOfKey[_parentKey!] == null) {
        childrenOfKey[_parentKey!] = [];
      }

      childrenOfKey[_parentKey!].push(_item);
    });
  });

  const indexInParent: {[parentKey: string]: {[key: string]: number}} = {};

  Object.entries(childrenOfKey).forEach(([_parentKey, _children]) => {
    indexInParent[_parentKey] = {};

    [..._children]
      .sort((a, b) => b.order! - a.order!)
      .forEach((_child, _index) => {
        indexInParent[_parentKey][_child.key] = _index;
      });
  });

  const resolve = (key: string, pending: string[]): number => {
    if (zIndexOfKey[key] != null) return zIndexOfKey[key];

    const item = itemOfKey[key];

    if (item == null || pending.includes(key)) return 0;

    const parentKey = getItemParentKey(item);

    const zIndex = checkNullString(parentKey)
      ? DEFAULT_ZINDEX - indexOfKey[key]
      : resolve(parentKey!, [...pending, key]) +
        2 +
        (indexInParent[parentKey!]?.[key] ?? 0);

    zIndexOfKey[key] = zIndex;

    return zIndex;
  };

  formContent.forEach(_item => resolve(_item.key, []));

  return zIndexOfKey;
};

export const isField = (_object: DisplayPanel | DisplayField): boolean => {
  return (_object as any).type != null;
};

export const getColSpanWidth = (colSpan?: number): `${number}%` | undefined => {
  if (colSpan == null || colSpan <= 0 || colSpan >= DEFAULT_COLSPAN) {
    return undefined;
  }

  return `${(colSpan / DEFAULT_COLSPAN) * 100}%`;
};

export const getFields = (config: Form): DisplayField[] => {
  if (config.fields == null) return [];

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
  if (config.panels == null) return [];

  return Object.entries(config.panels)
    .map(([panelKey, _panel], index) => ({
      ..._panel,
      key: panelKey,
      order: _panel.order != null ? _panel.order : index * 10,
      hideIf: _panel.hideIf != null ? _panel.hideIf : () => false,
      readonlyIf: _panel.readonlyIf != null ? _panel.readonlyIf : () => false,
    }))
    .sort((a, b) => a.order - b.order);
};

export const getConfigItems = (
  config: Form,
): (DisplayPanel | DisplayField)[] => {
  const fields: DisplayField[] = getFields(config);
  const panels: DisplayPanel[] = getPanels(config);

  const result = [...fields, ...panels];

  return result.sort((a, b) => a.order! - b.order!);
};

export const sortContent = (config: Form): (DisplayPanel | DisplayField)[] => {
  if (config == null) return [];

  const fields: DisplayField[] = getFields(config);

  if (config.panels == null || Object.keys(config.panels).length === 0)
    return fields;

  const panels: DisplayPanel[] = getPanels(config);

  const rootPanels = panels.filter(_item => checkNullString(_item.parent));

  if (rootPanels.length === 0) return fields;

  const result: (DisplayPanel | DisplayField)[] = fields.filter(_item =>
    checkNullString(_item.parentPanel),
  );

  rootPanels.forEach(_panel => {
    result.push({
      ..._panel,
      content: getContentOfPanel(_panel.key, fields, panels),
    });
  });

  return result.sort((a, b) => a.order! - b.order!);
};

const getContentOfPanel = (
  panelKey: string,
  fields: DisplayField[],
  panels: DisplayPanel[],
): (DisplayPanel | DisplayField)[] => {
  if (fields.length === 0) return [];

  let result: (DisplayPanel | DisplayField)[] = fields.filter(
    _item => _item.parentPanel === panelKey,
  );

  if (panels.length === 0) return result;

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

  return result.sort((a, b) => a.order! - b.order!);
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
