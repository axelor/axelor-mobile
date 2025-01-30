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

import {axiosApiProvider} from '../apiProviders';
import routes from './routes';

class RouterProvider {
  private retrocompatibilityAOS6: boolean = true;

  constructor() {}

  public enableRetrocompatibilityWithAOSv6(value: boolean) {
    this.retrocompatibilityAOS6 = value;
  }

  public async get(resource: string): Promise<string> {
    if (!this.retrocompatibilityAOS6) {
      return routes.AOS7[resource];
    }

    const objectRoute = await axiosApiProvider
      .get({
        url: routes.AOS6[resource],
      })
      .then(res => {
        if (
          typeof res?.data?.data?.cause === 'string' &&
          res.data.data.cause.includes('java.lang.ClassNotFoundException')
        ) {
          return routes.AOS7[resource];
        }

        return routes.AOS6[resource];
      })
      .catch(() => {
        return routes.AOS7[resource];
      });

    return objectRoute;
  }
}

const routerProvider = new RouterProvider();

export default routerProvider;
