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
  createClient,
  getClientbyId,
  updateClient,
} from '../../features/clientSlice';

const ClientFormScreen = ({navigation, route}) => {
  const {clientId} = route?.params ?? {};
  const {Partner} = useTypes();
  const _dispatch = useDispatch();

  const {client} = useSelector(state => state.client);

  useEffect(() => {
    if (clientId != null) {
      _dispatch((getClientbyId as any)({clientId}));
    }
  }, [_dispatch, clientId]);

  const defaultValue = useMemo(
    () => (!clientId || clientId !== client?.id ? undefined : client),
    [client, clientId],
  );

  const creationDefaultValue = useMemo(
    () => ({
      isCustomer: true,
      partnerTypeSelect: Partner?.partnerTypeSelect?.Company,
    }),
    [Partner?.partnerTypeSelect?.Company],
  );

  const handleSaveAPI = useCallback(
    ({dispatch, objectState}) => {
      const isCreation = objectState?.id == null;
      const sliceFct: any = isCreation ? createClient : updateClient;

      dispatch(sliceFct(objectState)).then(res => {
        const _recordId = res?.payload?.id;
        if (_recordId) {
          navigation.replace('ClientDetailsScreen', {idClient: _recordId});
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
          key: 'create-client',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: handleSaveAPI,
        },
        {
          key: 'update-client',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: handleSaveAPI,
        },
      ]}
    />
  );
};

export default ClientFormScreen;
