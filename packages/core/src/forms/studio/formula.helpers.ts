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

/**
 * Matches, in order of priority:
 * 1. a literal (string or number) : left untouched
 * 2. an optional accessor (`.` / `?.`) followed by an identifier and its
 *    access path (`field`, `field.sub`, `field?.sub.value`, ...)
 */
const TOKEN_REGEX =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d[\w.]*)|(\??\.\s*)?([A-Za-z_$][\w$]*)((?:\s*\??\.\s*[A-Za-z_$][\w$]*)*)/g;

const NON_FIELD_IDENTIFIERS = [
  'true',
  'false',
  'in',
  'of',
  'new',
  'void',
  'delete',
  'typeof',
  'instanceof',
  'this',
  'NaN',
  'Infinity',
  'Math',
  'Number',
  'String',
  'Boolean',
  'Array',
  'Object',
  'JSON',
  'Date',
  'parseInt',
  'parseFloat',
  'isNaN',
  'isFinite',
];

const toOptionalChain = (path: string): string =>
  (path ?? '').replace(/\??\./g, '?.');

/**
 * Replaces every field of the formula which has not been resolved from the
 * object state by `null`, so that a blank state does not throw on evaluation.
 * The access path is turned into an optional chain to keep the expression safe
 * (`unknown.indexOf('x')` becomes `null?.indexOf('x')`, ie. `undefined`).
 */
const nullifyUnresolvedFields = (expr: string): string =>
  expr.replace(
    TOKEN_REGEX,
    (match, literal, accessor, identifier, path, offset, source) => {
      if (literal != null || accessor != null) {
        return match;
      }

      if (identifier === 'null' || identifier === 'undefined') {
        return identifier + toOptionalChain(path);
      }

      if (NON_FIELD_IDENTIFIERS.includes(identifier)) {
        return match;
      }

      const isFunctionCall =
        checkNullString(path) &&
        /^\s*\(/.test(source.slice(offset + match.length));

      return isFunctionCall ? match : 'null' + toOptionalChain(path);
    },
  );

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

export const getAttrsValue = (
  object: {[key: string]: string},
  fieldType?: string,
) => {
  if (isEmpty(object)) return {};

  if (fieldType != null) return JSON.parse(object[fieldType] ?? '{}');

  let result = {};

  Object.entries(object)
    .filter(([key]) => key.toLowerCase().includes('attrs'))
    .forEach(([_, value]: [string, string]) => {
      result = {...result, ...JSON.parse(value)};
    });

  return result;
};

const sortedStateKeys = new WeakMap<object, string[]>();

/**
 * The keys of the state have to be walked from the longest to the shortest, so
 * that `firstName` is substituted before `name`. Sorting them again for every
 * formula of the form is the dominant cost on a form with a thousand fields, so
 * the result is kept per state.
 *
 * The length of the key list is checked because the state is completed in place
 * while the `dependsOn` formulas are resolved: a new field means a new sort.
 */
const getSortedStateKeys = (objectState: any): string[] => {
  if (objectState == null) return [];

  const keys = Object.keys(objectState);
  const cached = sortedStateKeys.get(objectState);

  if (cached != null && cached.length === keys.length) return cached;

  const sorted = sortFieldsByLength(keys);
  sortedStateKeys.set(objectState, sorted);

  return sorted;
};

const sortedFieldNames = new WeakMap<any[], string[]>();

/**
 * Same reasoning for the field names, which were mapped and sorted again for
 * every field carrying a `valueExpr`.
 */
const getSortedFieldNames = (fields: any[]): string[] => {
  const cached = sortedFieldNames.get(fields);

  if (cached != null) return cached;

  const sorted = sortFieldsByLength(fields.map(item => item.name));
  sortedFieldNames.set(fields, sorted);

  return sorted;
};

const MAX_CACHED_EXPRESSIONS = 5000;
const evaluatedExpressions = new Map<string, any>();

const evaluateExpression = (expr: string): any => {
  if (evaluatedExpressions.has(expr)) {
    return evaluatedExpressions.get(expr);
  }

  let result: any;

  try {
    // eslint-disable-next-line no-eval
    result = eval(nullifyUnresolvedFields(expr));
  } catch (error) {
    console.warn('error while evaluating formula', error);
    result = false;
  }

  if (evaluatedExpressions.size >= MAX_CACHED_EXPRESSIONS) {
    const keys = [...evaluatedExpressions.keys()];

    keys.slice(0, Math.floor(keys.length / 2)).forEach(_key => {
      evaluatedExpressions.delete(_key);
    });
  }

  evaluatedExpressions.set(expr, result);

  return result;
};

const NO_CACHED_STATE = Symbol('formula-no-cached-state');

export const createFormulaFunction = (formula: string | undefined) => {
  if (checkNullString(formula)) return undefined;

  /**
   * The expression is resolved from the object state only, so two calls sharing
   * the same state reference always give the same result. Keeping the last one
   * avoids replaying the substitutions and the evaluation on every render which
   * is not caused by a form value change.
   */
  let cachedState: any = NO_CACHED_STATE;
  let cachedResult: any;

  /**
   * Keys of the state the formula mentions, and their value at the last real
   * evaluation. Every keystroke gives a new state object, which invalidates the
   * cache above for all the formulas of the form: comparing only the values which
   * can change the result avoids replaying the substitutions and the compilation
   * for the formulas the change does not concern.
   */
  let usedKeys: string[] | null = null;
  let usedValues: any[] = [];
  let knownKeyCount = -1;

  return ({objectState}: any) => {
    if (cachedState === objectState) return cachedResult;

    const stateKeys = getSortedStateKeys(objectState);

    if (
      usedKeys != null &&
      knownKeyCount === stateKeys.length &&
      usedKeys.every(
        (_key, _index) => objectState?.[_key] === usedValues[_index],
      )
    ) {
      cachedState = objectState;

      return cachedResult;
    }

    let expr = `${formula}`;

    // The used keys are collected by the substitution itself rather than by a
    // second scan of the state, which would double its cost.
    const nextUsedKeys: string[] = [];
    const nextUsedValues: any[] = [];

    stateKeys.forEach(_key => {
      if (expr.includes(_key)) {
        nextUsedKeys.push(_key);
        nextUsedValues.push(objectState[_key]);
        expr = manageDottedFields(expr, _key, objectState[_key]);
      }
    });

    const result = evaluateExpression(expr);

    usedKeys = nextUsedKeys;
    usedValues = nextUsedValues;
    knownKeyCount = stateKeys.length;
    cachedState = objectState;
    cachedResult = result;

    return result;
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
  if (checkNullString(string)) return null;

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
      const separator =
        getSubString(formula, currentIndex)?.match(SEPARATOR_REGEX)?.[0] ?? '';
      const subString = getSubString(formula, currentIndex + separator.length);
      const fieldKey = findField(subString, objectValue);

      if (checkNullString(fieldKey)) {
        objectValue = null;
        continue;
      }

      fieldToReplace += separator + fieldKey;
      objectValue = objectValue[fieldKey!];
      currentIndex += fieldKey!.length + 1;
    }

    return formula.replaceAll(
      checkNullString(getStringWithoutFirstSeparator(fieldToReplace))
        ? startKey
        : startKey + fieldToReplace,
      manageFieldValue(
        fetchJsonField(object, getStringWithoutFirstSeparator(fieldToReplace)!),
      ),
    );
  }

  if (object == null) {
    const escapedKey = startKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pathRegex = new RegExp(`${escapedKey}(\\??\\.\\w+)*`, 'g');
    return formula.replace(pathRegex, String(manageFieldValue(object)));
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
  ...allFormula: (string | undefined)[]
): string => {
  let expr = '';

  for (const formula of allFormula) {
    if (!checkNullString(formula)) {
      expr += checkNullString(expr) ? formula : ` ${separator} ` + formula;
    }
  }

  return expr;
};

export const reverseFormula = (
  formula: string | undefined,
): string | undefined => {
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

  let dependsOn: {[key: string]: any} = {};

  getSortedFieldNames(fields).forEach(name => {
    if (formula.includes(name)) {
      dependsOn[name] = createFormulaFunction(formula);
    }
  });

  return dependsOn;
};

const sortFieldsByLength = (fields: string[]): string[] => {
  return fields.sort((a, b) => b.length - a.length);
};
