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

import {checkNullString} from '@axelor/aos-mobile-ui';
import {
  DEFAULT_COLSPAN,
  DisplayField,
  DisplayPanel,
  Form,
  Widget,
} from './types';
import {KeyboardType} from 'react-native';

export const isField = (_object: DisplayPanel | DisplayField): boolean => {
  return (_object as any).type != null;
};

export const getFields = (config: Form): DisplayField[] => {
  return Object.entries(config.fields)
    .map(([fieldName, _field], index) => ({
      ..._field,
      key: fieldName,
      order: _field.order != null ? _field.order : index * 10,
      hideIf: _field.hideIf != null ? _field.hideIf : () => false,
    }))
    .sort((a, b) => a.order - b.order);
};

export const getPanels = (config: Form): DisplayPanel[] => {
  return Object.entries(config.panels)
    .map(([panelKey, _panel], index) => ({
      ..._panel,
      key: panelKey,
      order: _panel.order != null ? _panel.order : index * 10,
    }))
    .sort((a, b) => a.order - b.order);
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

  if (_field.widget === 'file') {
    return 'file';
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

  if (_field.type === 'date' || _field.type === 'datetime') {
    return 'date';
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
