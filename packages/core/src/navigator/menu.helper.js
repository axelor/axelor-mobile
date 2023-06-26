/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {checkNullString} from '@axelor/aos-mobile-ui';
import {userHaveAccessToConfig} from './roles.helper';

const userHaveAccessToMenu = ({menuConfig, user}) => {
  return userHaveAccessToConfig({config: menuConfig, user: user});
};

const areMenusRestricted = ({listMenu}) => {
  if (listMenu == null || listMenu.length === 0) {
    return false;
  }
  return true;
};

const doesMenuHasRestriction = ({menuConfig}) => {
  if (menuConfig == null) {
    return false;
  }
  return true;
};

export const isMenuEnabled = ({listMenu, menuKey, user}) => {
  if (areMenusRestricted({listMenu})) {
    const menuConfig = listMenu.find(menu => menu.technicalName === menuKey);
    if (doesMenuHasRestriction({menuConfig})) {
      return userHaveAccessToMenu({menuConfig, user});
    }
    return true;
  }
  return true;
};

export function getMenuTitle(menu, {I18n}) {
  if (menu.title != null) {
    return I18n.t(menu.title);
  }
  return menu.screen;
}

export function isModuleNotFound(compatibility) {
  return compatibility?.moduleVersion == null;
}

export function isMenuIncompatible(compatibility) {
  if (compatibility == null) {
    return false;
  }

  if (isModuleNotFound(compatibility)) {
    return true;
  }

  const moduleVersion = Number(compatibility.moduleVersion.replace(/\D/g, ''));

  if (
    !checkNullString(compatibility.downToVersion) &&
    moduleVersion < Number(compatibility.downToVersion.replace(/\D/g, ''))
  ) {
    return true;
  }

  if (
    !checkNullString(compatibility.upToVersion) &&
    moduleVersion >= Number(compatibility.upToVersion.replace(/\D/g, ''))
  ) {
    return true;
  }

  return false;
}
