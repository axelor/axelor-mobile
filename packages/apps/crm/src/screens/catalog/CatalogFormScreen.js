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

import React, {useCallback} from 'react';
import {FormView} from '@axelor/aos-mobile-core';
import {createCatalog} from '../../features/catalogSlice';

const CatalogFormScreen = ({navigation}) => {
  const createCatalogAPI = useCallback(
    (catalog, dispatch) => {
      dispatch(createCatalog(catalog));

      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      formKey="crm_catalog"
      defaultEditMode
      actions={[
        {
          key: 'create-catalog',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) =>
            createCatalogAPI(objectState, dispatch),
        },
      ]}
    />
  );
};

export default CatalogFormScreen;
