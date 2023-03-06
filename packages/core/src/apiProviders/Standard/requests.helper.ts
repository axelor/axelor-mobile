import {Criteria} from '../Model';
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
}

interface FetchProps {
  model: string;
  fieldKey: string;
  id: number;
  relatedFields?: any;
}

class RequestBuilder {
  private requestLimit: number;

  constructor() {
    this.requestLimit = 10;
  }

  init(defaultRequestLimit: number) {
    this.requestLimit = defaultRequestLimit;
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

    return axiosApiProvider.post({
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
  };

  createStandardFetch = ({
    model,
    fieldKey,
    id,
    relatedFields = {},
  }: FetchProps): Promise<any> => {
    if (model == null || fieldKey == null) {
      return null;
    }

    return axiosApiProvider.post({
      url: `/ws/rest/${model}/${id}/fetch`,
      data: {
        fields: getObjectFields(fieldKey),
        related: relatedFields,
        translate: true,
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
