/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import {Criteria, getModelApi} from '../Model';
import {axiosApiProvider} from './AxiosProvider';
import {getObjectFields, getSortFields} from './ObjectFieldsProvider';

interface SearchProps {
  model: string;
  criteria?: Criteria[];
  domain?: string;
  domainContext?: any;
  fieldKey: string;
  sortKey?: string;
  page: number;
  numberElementsByPage?: number;
  provider?: 'axios' | 'model';
}

interface FetchProps {
  model: string;
  fieldKey: string;
  id: number;
  relatedFields?: any;
  provider?: 'axios' | 'model';
}

class RequestBuilder {
  private requestLimit: number;

  constructor() {
    this.requestLimit = 10;
  }

  init(defaultRequestLimit: number) {
    this.requestLimit = defaultRequestLimit;
  }

  getRequestLimit() {
    return this.requestLimit;
  }

  createStandardSearch = ({
    model,
    criteria = [],
    domain = '',
    domainContext = {},
    fieldKey,
    sortKey,
    page = 0,
    numberElementsByPage,
    provider = 'axios',
  }: SearchProps): Promise<any> => {
    if (model == null || fieldKey == null) {
      return null;
    }

    const limit =
      numberElementsByPage !== undefined
        ? numberElementsByPage
        : this.requestLimit;

    let data: any = {
      criteria: [
        {
          operator: 'and',
          criteria: criteria,
        },
      ],
    };

    if (domain != null && domain !== '') {
      data._domain = domain;
      data._domainContext = domainContext;
    }

    if (provider === 'axios') {
      axiosApiProvider.post({
        url: `/ws/rest/${model}/search`,
        data: {
          data: data,
          fields: getObjectFields(fieldKey),
          sortBy: sortKey ? getSortFields(sortKey) : ['id'],
          limit: limit,
          offset: limit * page,
          translate: true,
        },
      });
    }

    return getModelApi().search({
      modelName: model,
      query: {
        data: data,
        fields: getObjectFields(fieldKey),
        sortBy: sortKey ? getSortFields(sortKey) : ['id'],
        limit: limit,
        offset: limit * page,
      },
    });
  };

  createStandardFetch = ({
    model,
    fieldKey,
    id,
    relatedFields = {},
    provider = 'axios',
  }: FetchProps): Promise<any> => {
    if (model == null || fieldKey == null) {
      return null;
    }

    if (provider === 'axios') {
      axiosApiProvider.post({
        url: `/ws/rest/${model}/${id}/fetch`,
        data: {
          fields: getObjectFields(fieldKey),
          related: relatedFields,
          translate: true,
        },
      });
    }

    return getModelApi().fetch({
      modelName: model,
      id: id,
      query: {
        fields: getObjectFields(fieldKey),
        related: relatedFields,
      },
    });
  };
}

export const requestBuilder = new RequestBuilder();

export const createStandardSearch = (
  searchOptions: SearchProps,
): Promise<any> => {
  return requestBuilder.createStandardSearch({...searchOptions});
};

export const createStandardFetch = (fetchOptions: FetchProps): Promise<any> => {
  return requestBuilder.createStandardFetch({...fetchOptions});
};
