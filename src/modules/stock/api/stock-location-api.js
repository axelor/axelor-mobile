import axios from 'axios';
import {getApiResponseData, getFirstData} from '@/api/utils';
import StockLocation from '@/modules/stock/types/stock-location';

const stockLocationFields = [
  'name',
  'id',
  'serialNumber',
  'stockLocationLineList',
];

const createSearchCriteria = ({
  companyId,
  searchValue,
  defaultStockLocation,
}) => {
  let criterias = [];
  criterias.push({
    fieldName: 'typeSelect',
    operator: '=',
    value: StockLocation.type.internal,
  });
  if (companyId != null) {
    criterias.push({
      fieldName: 'company.id',
      operator: '=',
      value: companyId,
    });
  }
  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'name',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'serialNumber',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  if (defaultStockLocation != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'id',
          operator: '=',
          value: defaultStockLocation.id,
        },
        {
          fieldName: 'parentStockLocation.id',
          operator: '=',
          value: defaultStockLocation.id,
        },
      ],
    });
  }
  return criterias;
};

export async function searchStockLocationsFilter({
  searchValue = null,
  companyId = null,
  defaultStockLocation = null,
  page = 0,
}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockLocation/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: createSearchCriteria({
            companyId: companyId,
            searchValue: searchValue,
            defaultStockLocation: defaultStockLocation,
          }),
        },
      ],
    },
    fields: stockLocationFields,
    sortBy: ['id', 'name'],
    limit: 10,
    offset: 10 * page,
  });
}

export async function searchStockLocationBySerialNumber(serialNumber) {
  return axios
    .post('/ws/rest/com.axelor.apps.stock.db.StockLocation/search', {
      data: {
        criteria: [
          {
            fieldName: 'serialNumber',
            operator: '=',
            value: serialNumber,
          },
        ],
      },
      fields: stockLocationFields,
      limit: 1,
      offset: 0,
    })
    .then(getApiResponseData)
    .then(getFirstData);
}
