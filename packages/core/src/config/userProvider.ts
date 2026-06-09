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

class UserProvider {
  private user: any = null;

  setUser(user: any): void {
    this.user = user ?? null;
  }

  clear(): void {
    this.user = null;
  }

  getUser(): any {
    return this.user;
  }

  getActiveCompany(): any {
    return this.user?.activeCompany ?? null;
  }
}

export const userProvider = new UserProvider();
