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

export function userHaveAccessToConfig({config, user}) {
  const {authorizedRoles} = config;
  const {roles} = user;

  if (
    authorizedRoles == null ||
    authorizedRoles.length === 0 ||
    roles == null ||
    roles.length === 0
  ) {
    return false;
  }

  const authorizedRoleIds = authorizedRoles.map(_role => _role.id);
  if (roles.some(_role => authorizedRoleIds.includes(_role.id))) {
    return true;
  }

  return false;
}
