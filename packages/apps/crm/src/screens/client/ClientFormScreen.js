/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {createClient, updateClient} from '../../features/clientSlice';

const ClientFormScreen = ({navigation, onCreate}) => {
  const {client} = useSelector(state => state.client);

  const updateClientAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        updateClient({
          ...objectState,
          emailVersion: objectState.emailAddress?.$version,
          emailId: objectState.emailAddress?.id,
        }),

        navigation.navigate('ClientDetailsScreen', {
          idClient: objectState.id,
        }),
      );
    },
    [navigation],
  );

  const createClientAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        createClient({
          client: {
            ...objectState,
            isContact: false,
            isCorporatePartner: false,
            isCustomer: true,
            isEmployee: false,
          },
        }),
      ).then(action => {
        if (action?.payload?.id) {
          if (onCreate) {
            onCreate(action?.payload?.id);
          }
          navigation.pop();
        }
      });
    },
    [onCreate, navigation],
  );

  const _defaultValue = useMemo(() => {
    return {
      ...client,
      email: client.emailAddress?.address,
    };
  }, [client]);

  return (
    <FormView
      formKey="crm_client"
      defaultValue={_defaultValue}
      defaultEditMode
      actions={[
        {
          key: 'update-client',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) =>
            updateClientAPI(objectState, dispatch),
        },
        {
          key: 'create-client',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) =>
            createClientAPI(objectState, dispatch),
        },
      ]}
    />
  );
};

export default ClientFormScreen;
