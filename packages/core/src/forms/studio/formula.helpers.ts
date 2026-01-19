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

import {checkNullString, fetchJsonField, isEmpty} from '../../utils';

const RECORD = '$record';

const SEPARATOR_REGEX = /^(\.|\?\.)/g;

const removeContextedFields = (fields: any[], object: any): any[] => {
  if (!Array.isArray(fields) || fields.length === 0) {
    return [];
  }

  return fields.filter(item => {
    if (item.contextField == null) {
      return true;
    }

    return (
      object?.[item.contextField]?.id === parseInt(item.contextFieldValue, 10)
    );
  });
};

export const mapStudioFieldsWithFormula = (
  fields: any[],
  object: any,
): any[] => {
  return removeContextedFields(fields, object).map(item => ({
    ...item,
    requiredIf: evaluateFormulaWithObject(item.requiredIf, object),
    readonlyIf: evaluateFormulaWithObject(item.readonlyIf, object),
    showIf: evaluateFormulaWithObject(item.showIf, object),
    hideIf: evaluateFormulaWithObject(item.hideIf, object),
    valueExpr: evaluateFormulaWithObject(item.valueExpr, object),
  }));
};

export const getAttrsValue = (object: Object, fieldType?: string) => {
  if (isEmpty(object)) {
    return {};
  }

  if (fieldType != null) {
    return object[fieldType] != null ? JSON.parse(object[fieldType]) : {};
  }

  let result = {};

  Object.entries(object)
    .filter(([key]) => key.toLowerCase().includes('attrs'))
    .forEach(([_, value]: [string, string]) => {
      result = {...result, ...JSON.parse(value)};
    });

  return result;
};

export const createFormulaFunction = (formula: string) => {
  return ({objectState}) => {
    if (checkNullString(formula)) {
      return false;
    }

    let expr = `${formula}`;

    sortFieldsByLength(Object.keys(objectState)).forEach(_key => {
      if (expr.includes(_key)) {
        expr = manageDottedFields(expr, _key, objectState[_key]);
      }
    });

    try {
      // eslint-disable-next-line no-eval
      return eval(expr);
    } catch (error) {
      console.warn('error while evaluating formula', error);
      return false;
    }
  };
};

export const evaluateFormulaWithObject = (formula: string, object: Object) => {
  if (!checkNullString(formula)) {
    let expr = `${formula}`;

    if (!isEmpty(object)) {
      while (expr.includes(RECORD)) {
        expr = manageDottedFields(expr, RECORD, object);
      }
    }

    return expr;
  }

  return undefined;
};

const getSubString = (formula: string, startIndex: number) => {
  return formula.slice(startIndex, formula.length);
};

const getStringWithoutFirstSeparator = (string: string) => {
  if (checkNullString(string)) {
    return null;
  }

  return string.replace(SEPARATOR_REGEX, '');
};

const manageDottedFields = (formula: string, startKey: string, object: any) => {
  if (typeof object === 'object' && !isEmpty(object)) {
    const startIndex = formula.indexOf(startKey);

    let fieldToReplace = '';
    let objectValue = {...object};
    let currentIndex = startIndex + startKey.length;

    while (
      SEPARATOR_REGEX.test(getSubString(formula, currentIndex)) &&
      !isEmpty(objectValue)
    ) {
      const separator = getSubString(formula, currentIndex).match(
        SEPARATOR_REGEX,
      )[0];
      const subString = getSubString(formula, currentIndex + separator.length);
      const fieldKey = findField(subString, objectValue);

      if (checkNullString(fieldKey)) {
        objectValue = null;
        continue;
      }

      fieldToReplace += separator + fieldKey;
      objectValue = objectValue[fieldKey];
      currentIndex += fieldKey.length + 1;
    }

    return formula.replaceAll(
      checkNullString(getStringWithoutFirstSeparator(fieldToReplace))
        ? startKey
        : startKey + fieldToReplace,
      manageFieldValue(
        fetchJsonField(object, getStringWithoutFirstSeparator(fieldToReplace)),
      ),
    );
  }

  return formula.replaceAll(startKey, manageFieldValue(object));
};

const manageFieldValue = (value: any) => {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  if (Array.isArray(value)) {
    let _value = '[';

    value.forEach((_i, index, self) => {
      _value += manageFieldValue(_i) + (index === self.length - 1 ? '' : ', ');
    });

    _value += ']';

    return _value;
  }

  if (typeof value === 'object') {
    let _value = '{';

    Object.entries(value).forEach(([_key, _v], index, self) => {
      _value +=
        `"${_key}": ` +
        manageFieldValue(_v) +
        (index === self.length - 1 ? '' : ', ');
    });

    _value += '}';

    return _value;
  }

  return value;
};

const findField = (string: string, object: Object) => {
  if (object == null) {
    return null;
  }

  for (const _key of sortFieldsByLength(Object.keys(object))) {
    if (string.length >= _key.length) {
      if (string.slice(0, _key.length) === _key) {
        return _key;
      }
    }
  }
};

export const combinedFormula = (
  separator: string,
  ...allFormula: string[]
): string => {
  let expr = '';

  for (const formula of allFormula) {
    if (!checkNullString(formula)) {
      expr += checkNullString(expr) ? formula : ` ${separator} ` + formula;
    }
  }

  return expr;
};

export const reverseFormula = (formula: string): string => {
  if (checkNullString(formula)) {
    return undefined;
  }

  return `!(${formula})`;
};

export const manageDependsOnFormula = (formula: string, fields: any[]) => {
  if (
    checkNullString(formula) ||
    !Array.isArray(fields) ||
    fields.length === 0
  ) {
    return undefined;
  }

  let dependsOn = {};

  sortFieldsByLength(fields.map(item => item.name)).forEach(name => {
    if (formula.includes(name)) {
      dependsOn[name] = createFormulaFunction(formula);
    }
  });

  return dependsOn;
};

const sortFieldsByLength = (fields: string[]): string[] => {
  return fields.sort((a, b) => b.length - a.length);
};
