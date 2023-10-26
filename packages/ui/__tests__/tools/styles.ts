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

export function getComputedStyles(componentStyles: any[]) {
  if (!Array.isArray(componentStyles)) {
    return componentStyles;
  }

  return componentStyles.flat(Infinity).reduce((previous, current) => {
    if (current == null) {
      return previous;
    }

    return {...previous, ...current};
  }, {});
}

export function getGlobalStyles(component: any, styleName: string = 'style') {
  return getComputedStyles(component.prop(styleName));
}
