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

import React, {useCallback, useMemo} from 'react';
import {useSelector, FormView} from '@axelor/aos-mobile-core';
import {updateProspect} from '../../features/prospectSlice';

const ProspectFormScreen = ({navigation}) => {
  const {prospect} = useSelector(state => state.prospect);

  const updateProspectAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        updateProspect({
          ...objectState,
          emailVersion: objectState.emailAddress?.$version,
          emailId: objectState.emailAddress?.id,
        }),
      );

      navigation.navigate('ProspectDetailsScreen', {
        idProspect: objectState.id,
      });
    },
    [navigation],
  );

  const _defaultValue = useMemo(
    () => ({
      ...prospect,
      email: prospect.emailAddress?.address,
    }),
    [prospect],
  );

  return (
    <FormView
      formKey="crm_prospect"
      defaultValue={_defaultValue}
      defaultEditMode
      actions={[
        {
          key: 'update-prospect',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) =>
            updateProspectAPI(objectState, dispatch),
        },
      ]}
    />
  );
};
export default ProspectFormScreen;
