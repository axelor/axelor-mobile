import {
  axiosApiProvider,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createCatalogCriteria = searchValue => {
  return [getSearchCriterias('crm_catalog', searchValue)];
};

export async function searchCatalog({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Catalog',
    criteria: createCatalogCriteria(searchValue),
    fieldKey: 'crm_catalog',
    sortKey: 'crm_catalog',
    page,
  });
}

export async function getCatalogType() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.crm.db.CatalogType/',
  });
}
