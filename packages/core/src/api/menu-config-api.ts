/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {createStandardSearch, Criteria} from '../apiProviders';
import {getMobileConfigs} from './mobile-config-api';

const createCriteria = (listMenus): Criteria[] => {
  if (Array.isArray(listMenus)) {
    return [
      {
        operator: 'or',
        criteria: listMenus.map(item => {
          const criteria: Criteria = {
            fieldName: 'id',
            operator: '=',
            value: item.id,
          };

          return criteria;
        }),
      },
    ];
  }

  return [];
};

async function searchMenu({listMenus}) {
  if (listMenus == null || listMenus?.length === 0) {
    return [];
  }

  return createStandardSearch({
    model: 'com.axelor.apps.mobilesettings.db.MobileMenu',
    criteria: createCriteria(listMenus),
    fieldKey: 'core_mobileMenu',
    numberElementsByPage: null,
    page: 0,
  }).then(res => res?.data?.data);
}

export async function getModulesConfig() {
  const modulesConfig = await getMobileConfigs().then(res => res?.data?.data);
  let results = [];

  for (let index = 0; index < modulesConfig.length; index++) {
    const element = modulesConfig[index];
    if (element.isCustomizeMenuEnabled) {
      const menuConfig = await searchMenu({listMenus: element.menus});
      results.push(menuConfig);
    }
  }

  const restrictedMenus = results.flat();
  return {data: {data: restrictedMenus}};
}
