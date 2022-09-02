export function getMenuTitle(menu, {I18n}) {
  if (typeof menu.title === 'function') {
    return menu.title(I18n.t);
  }
  if (menu.title != null) {
    return menu.title;
  }
  return menu.screen;
}
