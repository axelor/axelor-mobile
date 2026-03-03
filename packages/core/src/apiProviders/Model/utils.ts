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

export const REQUEST_LIMIT = 10;

export type CriteriaField = {
  operator:
    | '='
    | '!='
    | '<'
    | '>'
    | '<='
    | '>='
    | 'like'
    | 'notLike'
    | 'between'
    | 'notBetween'
    | 'isNull'
    | 'notNull'
    | 'in';
  fieldName: string;
  value?: any;
  value2?: any;
};

export type CriteriaGroup = {
  operator: 'and' | 'or' | 'not';
  criteria: Criteria[];
};

export type Criteria = CriteriaField | CriteriaGroup;

export type CriteriaQuery = {
  criteria: Criteria[];
};

export type Query = {
  data: CriteriaQuery | CriteriaGroup;
  fields?: string[];
  sortBy?: string[];
  offset?: number;
  limit?: number;
};

export type ReadOptions = {
  fields: string[];
  related?: {
    [fieldName: string]: string[];
  };
};

export interface RequestResponse {
  data: {
    data: any[];
  };
}

export type Domain = {
  domain: string;
  domainContext: any;
};
