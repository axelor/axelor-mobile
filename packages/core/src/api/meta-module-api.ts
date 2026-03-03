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

import {createStandardSearch} from '../apiProviders';

export async function getAllMetaModules({}) {
  return createStandardSearch({
    model: 'com.axelor.meta.db.MetaModule',
    fieldKey: 'core_module',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function getAllStudioApp({}) {
  return createStandardSearch({
    model: 'com.axelor.studio.db.App',
    fieldKey: 'core_app',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}
