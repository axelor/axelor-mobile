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

export interface CharacteristicProperty {
  id: number;
  name?: string;
}

export interface ControlTypeFieldDefinition {
  id: number;
  name?: string;
  code?: string;
  typeSelect?: number;
  isRequired?: boolean;
  valueSet?: CharacteristicProperty[];
}

export interface ControlTypeFieldValue {
  id: number;
  version?: number;
  $version?: number;
  sequence?: number;
  fieldTypeSelect?: number;
  decimalValue?: number | null;
  textValue?: string | null;
  booleanValue?: boolean | null;
  selectionValue?: CharacteristicProperty | null;
  displayValue?: string;
  controlTypeField?: ControlTypeFieldDefinition;
}

export interface ControlTypeFieldValueUpdate extends Omit<
  ControlTypeFieldValue,
  'selectionValue'
> {
  selectionValue?: number | null;
}

export type ControlTypeFieldFormValue = number | string | boolean | null;

class ControlTypeField {
  static fieldType = {
    Decimal: 1,
    Text: 2,
    Boolean: 3,
    Selection: 4,
  };

  static getFormValue = (
    value: ControlTypeFieldValue,
  ): ControlTypeFieldFormValue => {
    switch (value?.fieldTypeSelect) {
      case this.fieldType.Decimal:
        return value.decimalValue ?? null;
      case this.fieldType.Text:
        return value.textValue ?? null;
      case this.fieldType.Boolean:
        return value.booleanValue ?? null;
      case this.fieldType.Selection:
        return value.selectionValue?.id ?? null;
      default:
        console.warn(
          `Field type provided with value ${value?.fieldTypeSelect} is not supported by control type field`,
        );
        return null;
    }
  };

  static getSavedValue = (
    value: ControlTypeFieldValue,
    formValue: ControlTypeFieldFormValue,
  ): Partial<ControlTypeFieldValueUpdate> => {
    switch (value?.fieldTypeSelect) {
      case this.fieldType.Decimal:
        return {decimalValue: formValue as number};
      case this.fieldType.Text:
        return {textValue: formValue as string};
      case this.fieldType.Boolean:
        return {booleanValue: formValue as boolean};
      case this.fieldType.Selection:
        return {selectionValue: (formValue as number) ?? null};
      default:
        return {};
    }
  };
}

export default ControlTypeField;
