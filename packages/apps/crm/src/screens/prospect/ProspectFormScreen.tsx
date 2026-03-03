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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  useSelector,
  FormView,
  useDispatch,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  createProspect,
  fetchProspectById,
  updateProspect,
} from '../../features/prospectSlice';

const ProspectFormScreen = ({navigation, route}) => {
  const {prospectId} = route?.params ?? {};
  const {Partner} = useTypes();
  const _dispatch = useDispatch();

  const {prospect} = useSelector(state => state.prospect);

  useEffect(() => {
    if (prospectId != null) {
      _dispatch((fetchProspectById as any)({partnerId: prospectId}));
    }
  }, [_dispatch, prospectId]);

  const defaultValue = useMemo(
    () => (!prospectId || prospectId !== prospect?.id ? undefined : prospect),
    [prospect, prospectId],
  );

  const creationDefaultValue = useMemo(
    () => ({
      isProspect: true,
      partnerTypeSelect: Partner?.partnerTypeSelect?.Company,
    }),
    [Partner?.partnerTypeSelect?.Company],
  );

  const handleSaveAPI = useCallback(
    ({dispatch, objectState}) => {
      const isCreation = objectState?.id == null;
      const sliceFct: any = isCreation ? createProspect : updateProspect;

      dispatch(sliceFct(objectState)).then(res => {
        const _recordId = res?.payload?.id;
        if (_recordId) {
          navigation.replace('ProspectDetailsScreen', {idProspect: _recordId});
        } else {
          navigation.pop();
        }
      });
    },
    [navigation],
  );

  return (
    <FormView
      formKey="crm_partner"
      defaultValue={defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-prospect',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: handleSaveAPI,
        },
        {
          key: 'update-prospect',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: handleSaveAPI,
        },
      ]}
    />
  );
};
export default ProspectFormScreen;
