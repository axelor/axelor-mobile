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
