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

import {createStandardSearch, Criteria} from '../apiProviders';

const createCriteria = (listFiles): Criteria[] => {
  if (Array.isArray(listFiles)) {
    return [
      {
        operator: 'or',
        criteria: listFiles.map(item => {
          const criteria: Criteria = {
            fieldName: 'id',
            operator: '=',
            value: item.id,
          };

          return criteria;
        }),
      },
    ];
  }

  return [];
};

export async function fetchFileDetails({listFiles, isMetaFile}) {
  const model = isMetaFile
    ? 'com.axelor.meta.db.MetaFile'
    : 'com.axelor.dms.db.DMSFile';

  return createStandardSearch({
    model: model,
    criteria: createCriteria(listFiles),
    fieldKey: 'core_metaFile',
    numberElementsByPage: null,
    page: 0,
  });
}
