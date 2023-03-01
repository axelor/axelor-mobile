import {axiosApiProvider} from './AxiosProvider';
import {getObjectFields, getSortFields} from './ObjectFieldsProvider';

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
    fieldKey,
    sortKey,
    page = 0,
    numberElementsByPage,
  }) => {
    if (model == null || fieldKey == null) {
      return null;
    }

    const limit = numberElementsByPage || this.requestLimit;

    return axiosApiProvider.post({
      url: `/ws/rest/${model}/search`,
      data: {
        data: {
          criteria: [
            {
              operator: 'and',
              criteria: criteria,
            },
          ],
        },
        fields: getObjectFields(fieldKey),
        sortBy: sortKey ? getSortFields(sortKey) : ['id'],
        limit: limit,
        offset: limit * page,
        translate: true,
      },
    });
  };

  createStandardFetch = ({model, fieldKey, id}) => {
    if (model == null || fieldKey == null) {
      return null;
    }

    return axiosApiProvider.post({
      url: `/ws/rest/${model}/${id}/fetch`,
      data: {
        fields: getObjectFields(fieldKey),
        translate: true,
      },
    });
  };
}

export const requestBuilder = new RequestBuilder();

export const createStandardSearch = ({
  model,
  criteria,
  fieldKey,
  sortKey,
  page,
  numberElementsByPage,
}) => {
  return requestBuilder.createStandardSearch({
    model,
    criteria,
    fieldKey,
    sortKey,
    page,
    numberElementsByPage,
  });
};

export const createStandardFetch = ({model, fieldKey, id}) => {
  return requestBuilder.createStandardFetch({model, fieldKey, id});
};
