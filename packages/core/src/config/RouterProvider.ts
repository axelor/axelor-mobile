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

import routes from './routes';

class RouterProvider {
  private static instance: RouterProvider;
  private _retrocompatibilityAOS6: boolean = true;

  private constructor() {}

  public static getInstance() {
    if (!RouterProvider.instance) {
      RouterProvider.instance = new RouterProvider();
    }
    return RouterProvider.instance;
  }

  public set retrocompatibilityAOS6(value: boolean) {
    this._retrocompatibilityAOS6 = value;
  }

  public get(resource: string): string {
    return routes[this._retrocompatibilityAOS6 ? 'AOS6' : 'AOS7'][resource];
  }
}

const routerProvider = RouterProvider.getInstance();

export default routerProvider;
