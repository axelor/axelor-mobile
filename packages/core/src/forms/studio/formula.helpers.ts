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

import {checkNullString, fetchJsonField, isEmpty} from '../../utils';

const RECORD = '$record';

const removeContextedFields = (fields: any[], object: any): any[] => {
  if (!Array.isArray(fields) || fields.length === 0) {
    return [];
  }

  return fields.filter(item => {
    if (item.contextField == null) {
      return true;
    }

    return (
      object[item.contextField]?.id === parseInt(item.contextFieldValue, 10)
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

export const createFormulaFunction = (formula: string) => {
  return ({objectState}) => {
    if (checkNullString(formula)) {
      return false;
    }

    let expr = `${formula}`;

    Object.entries(objectState).forEach(([_key, _value]) => {
      if (expr.includes(_key)) {
        expr = manageDottedFields(expr, _key, _value);
      }
    });

    try {
      // eslint-disable-next-line no-eval
      return eval(expr);
    } catch (error) {
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

const manageDottedFields = (formula: string, startKey: string, object: any) => {
  if (typeof object === 'object' && !isEmpty(object)) {
    const startIndex = formula.indexOf(startKey);

    let fieldToReplace = '';
    let objectValue = {...object};
    let currentIndex = startIndex + startKey.length;

    while (formula.charAt(currentIndex) === '.') {
      const subString = formula.slice(currentIndex + 1, formula.length);
      const fieldKey = findField(subString, objectValue);

      fieldToReplace += checkNullString(fieldToReplace)
        ? fieldKey
        : '.' + fieldKey;
      objectValue = objectValue[fieldKey];
      currentIndex += fieldKey.length + 1;
    }

    return formula.replaceAll(
      checkNullString(fieldToReplace)
        ? startKey
        : startKey + '.' + fieldToReplace,
      manageFieldValue(fetchJsonField(object, fieldToReplace)),
    );
  }

  return formula.replaceAll(startKey, manageFieldValue(object));
};

const manageFieldValue = (value: any) => {
  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return value;
};

const findField = (string: string, object: Object) => {
  for (const _key of Object.keys(object)) {
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

  fields.forEach(({name}) => {
    if (formula.includes(name)) {
      dependsOn[name] = createFormulaFunction(formula);
    }
  });

  return dependsOn;
};
