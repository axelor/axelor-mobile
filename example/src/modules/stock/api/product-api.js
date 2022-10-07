import {
  axiosApiProvider,
  getApiResponseData,
  getFirstData,
} from '@aos-mobile/core';
import {fetchFileDetails} from './metafile-api';

const productFields = [
  'name',
  'code',
  'fullName',
  'picture',
  'trackingNumberConfiguration',
  'unit',
  'salesUnit',
  'purchasesUnit',
  'length',
  'height',
  'width',
  'lengthUnit',
  'description',
  'netMass',
  'grossMass',
  'massUnit',
  'productCategory',
  'procurementMethodSelect',
  'isUnrenewed',
  'isPrototype',
  'picture',
  'serialNumber',
  'trackingNumberConfiguration',
  'parentProduct',
  'productVariant',
];

const sortByFields = ['name'];

const createProductCriteria = searchValue => {
  let criterias = [];
  criterias.push(
    {
      fieldName: 'isModel',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'productTypeSelect',
      operator: '=',
      value: 'storable',
    },
    {
      fieldName: 'stockManaged',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'dtype',
      operator: '=',
      value: 'Product',
    },
  );

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
          fieldName: 'code',
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
  return criterias;
};

export async function searchProductsFilter({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Product/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createProductCriteria(searchValue),
          },
        ],
      },
      fields: productFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function searchProductWithId(productId) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.base.db.Product/${productId}/fetch`,
    data: {
      fields: productFields,
    },
  });
}

export function searchProductBySerialNumber(serialNumber) {
  return axiosApiProvider
    .post({
      url: '/ws/rest/com.axelor.apps.base.db.Product/search',
      data: {
        data: {
          criteria: [
            {
              fieldName: 'serialNumber',
              operator: '=',
              value: serialNumber,
            },
          ],
        },
        fields: productFields,
        limit: 1,
        offset: 0,
      },
    })
    .then(getApiResponseData)
    .then(getFirstData);
}

export async function updateLocker({
  productId,
  stockLocationId,
  newLocker,
  version,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-product/modify-locker/${productId}`,
    data: {
      stockLocationId: stockLocationId,
      newLocker: newLocker,
      version: version,
    },
  });
}

export async function fetchAttachedFiles(productId) {
  return axiosApiProvider
    .get({
      url: `/ws/dms/attachments/com.axelor.apps.base.db.Product/${productId}`,
    })
    .then(response => {
      if (response?.data?.data == null) {
        return response;
      } else {
        return fetchFileDetails(response?.data?.data);
      }
    });
}

export async function fetchVariants({productVariantParentId, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Product/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'parentProduct.id',
                operator: '=',
                value: productVariantParentId,
              },
            ],
          },
        ],
      },
      fields: productFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getProductStockIndicators({
  productId,
  companyId,
  stockLocationId,
  version,
}) {
  return axiosApiProvider.post({
    url: `/ws/aos/stock-product/fetch-product-with-stock/${productId}`,
    data: {
      companyId: companyId,
      stockLocationId: stockLocationId,
      version: version,
    },
  });
}

export async function fetchVariantAttributes({productVariantId, version}) {
  return axiosApiProvider.post({
    url: `/ws/aos/stock-product/get-variant-attributes/${productVariantId}`,
    data: {version: version},
  });
}
