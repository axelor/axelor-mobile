import {axiosApiProvider} from '@axelor/aos-mobile-core';

const catalogFields = ['name', 'pdfFile', 'description', 'catalogType'];

const createCatalogCriteria = searchValue => {
  let criterias = [];
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
          fieldName: 'catalogType.name',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  return criterias;
};

const sortByFields = ['name', 'catalogType.name', 'createdOn'];

export async function searchCatalog({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Catalog/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createCatalogCriteria(searchValue),
          },
        ],
      },
      fields: catalogFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getCatalogType() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.crm.db.CatalogType/',
  });
}
