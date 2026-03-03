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

import {axiosApiProvider} from '../apiProviders';
import defaultRoutes from './routes';

const checkError = field => {
  return (
    typeof field === 'string' &&
    field.includes('java.lang.ClassNotFoundException')
  );
};

export interface RouteSwitcher {
  AOS6: {
    [key: string]: string;
  };
  AOS7: {
    [key: string]: string;
  };
}

class RouterProvider {
  private retrocompatibilityAOS6: boolean = true;
  private routes: RouteSwitcher = defaultRoutes;

  constructor() {}

  public init(data: {
    retrocompatibility: boolean;
    routesDefinition: RouteSwitcher;
  }) {
    this.enableRetrocompatibilityWithAOSv6(data.retrocompatibility);
    this.addRoutes(data.routesDefinition);
  }

  public enableRetrocompatibilityWithAOSv6(value: boolean) {
    this.retrocompatibilityAOS6 = value;
  }

  public addRoutes(value: RouteSwitcher) {
    if (value?.AOS6 != null) {
      this.routes.AOS6 = {...this.routes.AOS6, ...value.AOS6};
    }

    if (value?.AOS7 != null) {
      this.routes.AOS7 = {...this.routes.AOS7, ...value.AOS7};
    }
  }

  public async get(resource: string): Promise<string> {
    if (!this.retrocompatibilityAOS6) {
      return this.routes.AOS7[resource];
    }

    const objectRoute = await axiosApiProvider
      .get({
        url: this.routes.AOS6[resource],
      })
      .then(res => {
        if (
          checkError(res?.data?.data?.cause) ||
          checkError(res?.data?.data?.causeClass)
        ) {
          return this.routes.AOS7[resource];
        }

        return this.routes.AOS6[resource];
      })
      .catch(() => {
        return this.routes.AOS7[resource];
      });

    return objectRoute;
  }
}

const routerProvider = new RouterProvider();

export default routerProvider;
