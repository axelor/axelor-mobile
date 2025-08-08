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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useSelector, FormView, useDispatch} from '@axelor/aos-mobile-core';
import {fetchProspectById, updateProspect} from '../../features/prospectSlice';

const ProspectFormScreen = ({navigation, route}) => {
  const {prospectId} = route?.params ?? {};
  const _dispatch = useDispatch();

  const {prospect} = useSelector(state => state.prospect);

  useEffect(() => {
    _dispatch((fetchProspectById as any)({partnerId: prospectId}));
  }, [_dispatch, prospectId]);

  const defaultValue = useMemo(
    () => (prospectId !== prospect?.id ? undefined : prospect),
    [prospect, prospectId],
  );

  const updateProspectAPI = useCallback(
    (objectState, dispatch) => {
      dispatch((updateProspect as any)(objectState));

      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      formKey="crm_partner"
      defaultValue={defaultValue}
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
