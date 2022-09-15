import getFromList from '@/modules/stock/utils/get-from-list';

export const isMenuEnabled = ({listMenu, menuName}) => {
  if (listMenu == null || listMenu === []) {
    return true;
  } else {
    const menuConfig = getFromList(listMenu, 'name', menuName);
    return menuConfig == null ? true : menuConfig.enabled;
  }
};
