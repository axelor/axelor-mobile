import {axiosApiProvider} from '../axios/AxiosApi';
import {getMobileConfigs} from './mobile-config-api';

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
  if (listMenus == null || listMenus?.length === 0) {
    return [];
  } else {
    return axiosApiProvider
      .post({
        url: '/ws/rest/com.axelor.apps.mobilesettings.db.MobileMenu/search',
        data: {
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
      })
      .then(res => res?.data?.data);
  }
}

export async function getModulesConfig() {
  const modulesConfig = await getMobileConfigs().then(res => res?.data?.data);
  let results = [];

  for (let index = 0; index < modulesConfig.length; index++) {
    const element = modulesConfig[index];
    if (element.customizeMenu) {
      const menuConfig = await searchMenu({listMenus: element.menus});
      results.push(menuConfig);
    }
  }

  const restrictedMenus = results.flat();
  return {data: {data: restrictedMenus}};
}
