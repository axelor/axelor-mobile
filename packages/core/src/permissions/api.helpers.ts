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

import {axiosApiProvider, createStandardSearch} from '../apiProviders';

async function getAOPUserPerms({userId}) {
  return createStandardSearch({
    model: 'com.axelor.auth.db.Permission',
    domain:
      'self IN (SELECT p FROM User u join u.permissions p WHERE u.id = :userId) OR self IN (SELECT p FROM User u join u.group g join g.permissions p WHERE u.id = :userId) OR self IN (SELECT p FROM User u join u.roles r join r.permissions p WHERE u.id = :userId) OR self IN (SELECT p FROM User u join u.group g join g.roles r join r.permissions p WHERE u.id = :userId)',
    domainContext: {userId},
    fieldKey: 'core_permissions',
    numberElementsByPage: null,
    page: 0,
  });
}

async function getAOPUserMetaPerms({userId}) {
  return createStandardSearch({
    model: 'com.axelor.meta.db.MetaPermissionRule',
    criteria: [
      {fieldName: 'metaPermission.active', operator: '=', value: true},
    ],
    domain:
      'self.metaPermission IN (SELECT p FROM User u join u.metaPermissions p WHERE u.id = :userId) OR self.metaPermission IN (SELECT p FROM User u join u.group g join g.metaPermissions p WHERE u.id = :userId) OR self.metaPermission IN (SELECT p FROM User u join u.roles r join r.metaPermissions p WHERE u.id = :userId) OR self.metaPermission IN (SELECT p FROM User u join u.group g join g.roles r join r.metaPermissions p WHERE u.id = :userId)',
    domainContext: {userId},
    fieldKey: 'core_metaPermissionRule',
    numberElementsByPage: null,
    page: 0,
  });
}

async function getAOSUserPerms() {
  return axiosApiProvider.get({url: 'ws/aos/user/permissions'});
}

async function getAOSUserMetaPerms() {
  return axiosApiProvider.get({url: 'ws/aos/user/meta-permission-rules'});
}

export async function getAllPerms({userId}) {
  if (userId != null) {
    return getAOSUserPerms()
      .then(({data}) => ({data: {data: data?.permissionResponseList}}))
      .catch(() => getAOPUserPerms({userId}));
  }

  return null;
}

export async function getAllFieldsPerms({userId}) {
  if (userId != null) {
    return getAOSUserMetaPerms()
      .then(({data}) => ({data: {data: data?.metaPermissionRuleResponses}}))
      .catch(() => getAOPUserMetaPerms({userId}));
  }

  return null;
}
