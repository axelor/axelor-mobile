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

import {Criteria, Domain, getModelApi} from '../Model';
import {axiosApiProvider} from './AxiosProvider';
import {getObjectFields, getSortFields} from './ObjectFieldsProvider';
import {Filter} from '../../header/FilterProvider';

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
  companyId?: number;
  isCompanyM2M?: boolean;
  companyFieldName?: string;
  companySetFieldName?: string;
  filter?: Filter;
}

interface HierarchicalSearchProps extends SearchProps {
  parentField: string;
  parentId: number;
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
    companyId,
    isCompanyM2M = false,
    companyFieldName,
    companySetFieldName,
    filter,
  }: SearchProps): Promise<any> => {
    if (model == null || fieldKey == null) {
      return null;
    }

    const limit =
      numberElementsByPage !== undefined
        ? numberElementsByPage
        : this.requestLimit;

    if (companyId && !isCompanyM2M) {
      criteria.push(getCompanyCriteria(companyId, companyFieldName));
    }

    const {
      criteria: _filterCriteria = [],
      domainContext: _filterContext,
      domains: _filterDomains,
    } = getFilterDomains(model, filter);

    let data: any = {
      criteria: [
        {
          operator: 'and',
          criteria: [...criteria, ..._filterCriteria],
        },
      ],
    };

    if (companyId && isCompanyM2M) {
      const companyDomain = getCompanyDomain(companyId, companySetFieldName);

      data._domain = companyDomain.domain;
      data._domainContext = companyDomain.domainContext;
    }

    if (domain != null && domain !== '') {
      if (data._domain != null) {
        data._domain = `(${data._domain}) AND (${domain})`;
        data._domainContext = {
          ...data._domainContext,
          ...domainContext,
        };
      } else {
        data._domain = domain;
        data._domainContext = domainContext;
      }
    }

    if (_filterDomains) {
      data._domains = _filterDomains;
      data._domainContext = {
        ...data._domainContext,
        ..._filterContext,
      };
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

  private getIdsHierarchicalSearch = async ({
    parentField,
    parentId,
    model,
    criteria = [],
    domain = '',
    domainContext = {},
    provider = 'axios',
    companyId,
    isCompanyM2M = false,
    companyFieldName,
    companySetFieldName,
  }: Partial<HierarchicalSearchProps>): Promise<number[]> => {
    const result = [parentId];

    const res = await this.createStandardSearch({
      model,
      criteria: [
        {
          fieldName: parentField + '.id',
          operator: '=',
          value: parentId,
        },
        ...(criteria ?? []),
      ],
      domain,
      domainContext,
      fieldKey: '',
      page: 0,
      numberElementsByPage: null,
      provider,
      companyId,
      isCompanyM2M,
      companyFieldName,
      companySetFieldName,
    });

    const children = res?.data?.data;

    if (Array.isArray(children) && children?.length > 0) {
      result.push(...children.map(child => child.id));

      for (const child of children) {
        const subTree = await this.getIdsHierarchicalSearch({
          parentField,
          parentId: child.id,
          model,
          criteria,
          domain,
          domainContext,
          provider,
          companyId,
          isCompanyM2M,
          companyFieldName,
          companySetFieldName,
        });
        result.push(...subTree);
      }
    }

    return result.filter((id, idx) => result.indexOf(id) === idx);
  };

  createHierarchicalSearch = async ({
    parentField,
    parentId,
    criteria = [],
    ...props
  }: HierarchicalSearchProps): Promise<any> => {
    let _criteria: Criteria[] = criteria;

    if (parentId != null) {
      const ids = await this.getIdsHierarchicalSearch({
        ...props,
        parentField,
        parentId,
        criteria,
      });

      if (!Array.isArray(ids) || ids.length === 0) {
        return null;
      }

      _criteria = [
        {
          fieldName: 'id',
          operator: 'in',
          value: ids,
        },
      ];
    }

    return this.createStandardSearch({...props, criteria: _criteria});
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

export const getCompanyCriteria = (
  companyId: number,
  companyFieldName: string = 'company',
): Criteria => {
  return {
    operator: 'or',
    criteria: [
      {
        fieldName: `${companyFieldName}`,
        operator: 'isNull',
      },
      {
        fieldName: `${companyFieldName}.id`,
        operator: '=',
        value: companyId,
      },
    ],
  };
};

export function getFilterDomains(
  model: string,
  filter?: Filter,
): {
  domains?: {type: string; name: string; domain: string; title: string}[];
  domainContext?: any;
  criteria?: Criteria[];
} {
  if (!filter) return {};

  if (filter.filterCustom) {
    try {
      const parsed = JSON.parse(filter.filterCustom);
      if (parsed?.criteria) {
        return {criteria: [parsed]};
      }

      return {};
    } catch (err) {
      console.warn('error while parsing filter criterias', err);
      return {};
    }
  }

  return {
    domains: [
      {
        type: filter.type,
        name: filter.name,
        domain: filter.domain,
        title: filter.title,
      },
    ],
    domainContext: {_model: model},
  };
}

export const getCompanyDomain = (
  companyId: number,
  companySetFieldName: string = 'companySet',
): Domain => {
  return {
    domain: `self.${companySetFieldName} IS EMPTY OR :company MEMBER OF self.${companySetFieldName}`,
    domainContext: {
      company: {
        id: companyId,
      },
    },
  };
};

export const createStandardSearch = (
  searchOptions: SearchProps,
): Promise<any> => {
  return requestBuilder.createStandardSearch({...searchOptions});
};

export const createHierarchicalSearch = (
  searchOptions: HierarchicalSearchProps,
): Promise<any> => {
  return requestBuilder.createHierarchicalSearch({...searchOptions});
};

export const createStandardFetch = (fetchOptions: FetchProps): Promise<any> => {
  return requestBuilder.createStandardFetch({...fetchOptions});
};
