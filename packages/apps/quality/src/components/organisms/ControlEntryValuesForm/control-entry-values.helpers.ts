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

import {checkNullString} from '@axelor/aos-mobile-ui';
import {CustomPicker, Field, JSONObject} from '@axelor/aos-mobile-core';
import {
  ControlEntryFormulaDescription,
  ControlEntryReferenceValues,
} from '../../molecules';
import {
  ControlTypeField,
  ControlTypeFieldDefinition,
  ControlTypeFieldFormValue,
  ControlTypeFieldValue,
} from '../../../types';

export const FORMULA_FIELD = '$formulaDescription';
export const REFERENCE_FIELD = '$referenceValues';

export interface SelectionItem {
  title: string;
  value: number;
}

interface EntryField {
  value: ControlTypeFieldValue;
  definition: ControlTypeFieldDefinition;
  code: string;
}

const getEntryFields = (entryValues: ControlTypeFieldValue[]): EntryField[] =>
  entryValues.flatMap(_value => {
    const definition = _value.controlTypeField;

    return definition?.code == null
      ? []
      : [{value: _value, definition, code: definition.code}];
  });

const getValueField = (
  {value, definition}: EntryField,
  order: number,
  selectionOfField: Map<number, SelectionItem[]>,
): Field => {
  const config: Field = {
    titleKey: definition.name,
    order,
    required: definition.isRequired,
    type: 'string',
  };

  switch (value.fieldTypeSelect) {
    case ControlTypeField.fieldType.Decimal:
      config.type = 'number';
      break;
    case ControlTypeField.fieldType.Boolean:
      config.type = 'boolean';
      config.widget = 'checkbox';
      break;
    case ControlTypeField.fieldType.Selection:
      config.type = 'number';
      config.widget = 'custom';
      config.customComponent = CustomPicker;
      config.options = {selection: selectionOfField.get(definition.id) ?? []};
      break;
    default:
      break;
  }

  return config;
};

export const getFormFields = ({
  entryValues,
  selectionOfField,
  formulaDescription,
  planValues,
}: {
  entryValues: ControlTypeFieldValue[];
  selectionOfField: Map<number, SelectionItem[]>;
  formulaDescription?: string;
  planValues: ControlTypeFieldValue[];
}): JSONObject<Field> => {
  const fields: JSONObject<Field> = {};

  if (!checkNullString(formulaDescription)) {
    fields[FORMULA_FIELD] = {
      order: 0,
      type: 'string',
      widget: 'custom',
      customComponent: ControlEntryFormulaDescription,
      options: {description: formulaDescription},
    };
  }

  if (planValues.length > 0) {
    fields[REFERENCE_FIELD] = {
      titleKey: 'Quality_ReferenceValues',
      order: 1,
      type: 'string',
      widget: 'custom',
      customComponent: ControlEntryReferenceValues,
      options: {values: planValues},
    };
  }

  getEntryFields(entryValues).forEach((_entryField, _index) => {
    fields[_entryField.code] = getValueField(
      _entryField,
      _index + 2,
      selectionOfField,
    );
  });

  return fields;
};

export const getFormDefaults = (
  entryValues: ControlTypeFieldValue[],
): JSONObject<ControlTypeFieldFormValue> =>
  Object.fromEntries(
    getEntryFields(entryValues).map(({value, code}) => [
      code,
      ControlTypeField.getFormValue(value),
    ]),
  );

export const mapFormToEntryValues = (
  entryValues: ControlTypeFieldValue[],
  objectState: JSONObject<ControlTypeFieldFormValue>,
): Partial<ControlTypeFieldValue>[] =>
  entryValues.map(_value => {
    const code = _value.controlTypeField?.code;

    return {
      id: _value.id,
      version: _value.version ?? _value.$version,
      ...(code == null
        ? {}
        : ControlTypeField.getSavedValue(_value, objectState?.[code])),
    };
  });
