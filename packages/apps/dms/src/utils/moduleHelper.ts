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

import {Menu, Screen} from '@axelor/aos-mobile-core';
import {AllDocumentsScreen} from '../screens';

const createAllDocumentsScreenComponent = (defaultParent: any) => {
  return props => AllDocumentsScreen({...props, defaultParent});
};

type DMSFile = {
  id: number;
  fileName: string;
};

type Menus = {
  [menuKey: string]: Menu;
};

type Screens = {
  [screenKey: string]: Screen;
};

export const createMenusScreen = ({
  favouriteFolderSet,
  favouriteFileSet,
}: {
  favouriteFolderSet: DMSFile[];
  favouriteFileSet: DMSFile[];
}): {menus: Menus; screens: Screens} => {
  let menus: Menus = {};
  let screens: Screens = {};

  if (Array.isArray(favouriteFileSet) && favouriteFileSet.length > 0) {
    menus = {
      dms_menu_favoriteDocuments: {
        title: 'Dms_MyFavoriteDocuments',
        icon: 'folder-check',
        parent: 'app-dms',
        screen: 'FavoriteDocuments',
      },
    };
  }

  if (Array.isArray(favouriteFolderSet) && favouriteFolderSet.length > 0) {
    favouriteFolderSet.forEach(folder => {
      const screenKey = `DocumentsScreen_${folder.id}`;
      screens[screenKey] = {
        title: 'Dms_AllDocuments',
        component: createAllDocumentsScreenComponent(folder),
        options: {
          shadedHeader: false,
        },
      };

      const menuKey = `dms_menu_documents${folder.id}`;
      menus[menuKey] = {
        title: folder.fileName,
        icon: 'folder',
        parent: 'app-dms',
        screen: screenKey,
      };
    });
  }

  return {menus, screens};
};
