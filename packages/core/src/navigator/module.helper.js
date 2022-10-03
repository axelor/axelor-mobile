import {isMenuEnabled} from './menu.helper';

export function moduleHasMenus(_module) {
  return _module.menus != null && Object.keys(_module.menus).length > 0;
}

export function filterEnabledMenus(_module, restrictedMenus, user) {
  if (moduleHasMenus(_module)) {
    const enabledMenus = {};
    const {menus} = _module;
    const menuKeys = Object.keys(menus);
    menuKeys.forEach(_key => {
      if (
        isMenuEnabled({listMenu: restrictedMenus, menuKey: _key, user: user})
      ) {
        enabledMenus[_key] = menus[_key];
      }
    });
    return enabledMenus;
  }
  return [];
}

export function updateAccessibleMenus(_module, restrictedMenus, user) {
  _module.menus = filterEnabledMenus(_module, restrictedMenus, user);
  return _module;
}

export function moduleInMenuFooter(_module) {
  return !!_module?.options?.isInMenuFooter;
}

export function getDefaultModule(modules, mainMenu) {
  if (modules == null || modules.length === 0) {
    return null;
  }
  if (mainMenu != null && modulesContainsMenu(modules, mainMenu)) {
    return findModuleWithMenu(modules, mainMenu);
  }
  return firstModulesWithMenus(modules);
}

function modulesContainsMenu(modules, menuKey) {
  return modules
    .filter(moduleHasMenus)
    .some(_module => _module.menus[menuKey] != null);
}

function findModuleWithMenu(modules, menuKey) {
  return modules
    .filter(moduleHasMenus)
    .find(_module => _module.menus[menuKey] != null);
}

function firstModulesWithMenus(modules) {
  return modules
    .filter(_module => _module.menus)
    .find(_module => Object.keys(_module.menus).length > 0);
}
