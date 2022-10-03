import {axiosApiProvider, getFirstData} from '@aos-mobile/core';

const MobileMenuFields = ['name', 'technicalName', 'authorizedRoles'];

const createCriteria = listMenus => {
  if (listMenus != null) {
    let criterias = [];
    listMenus.forEach(item => {
      criterias.push({fieldName: 'id', operator: '=', value: item.id});
    });
    return criterias;
  }
};

async function searchMenu({listMenus}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.mobilesettings.db.MobileMenu/search',
    data:
      listMenus == null
        ? {
            fields: MobileMenuFields,
            limit: null,
            offset: 0,
          }
        : {
            data: {
              criteria: [
                {
                  operator: 'or',
                  criteria: createCriteria(listMenus),
                },
              ],
            },
            fields: MobileMenuFields,
            limit: null,
            offset: 0,
          },
  });
}

export async function getMenuConfig({AppSequence}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.mobilesettings.db.MobileConfig/search',
    data: {
      data: {
        criteria: [
          {
            fieldName: 'sequence',
            operator: '=',
            value: AppSequence,
          },
        ],
      },
      fields: ['menus', 'sequence'],
    },
  });
}

async function getModuleConfig({AppSequence}) {
  return getMenuConfig({AppSequence})
    .then(res => res?.data?.data)
    .then(getFirstData)
    .then(data => searchMenu({listMenus: data.menus}));
}

export async function getStockMenuConfig() {
  return getModuleConfig({AppSequence: 1});
}
