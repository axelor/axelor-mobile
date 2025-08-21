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
import {DeviceEventEmitter} from 'react-native';
import {FormView, useTypes} from '@axelor/aos-mobile-core';
import {createCustomer} from '../../features/customerSlice';

const ClientSaleFormScreen = ({navigation, route}) => {
  const {eventName} = route?.params ?? {};
  const {Partner} = useTypes();

  const creationDefaultValue = useMemo(
    () => ({
      isCustomer: true,
      partnerTypeSelect: Partner?.partnerTypeSelect?.Company,
    }),
    [Partner?.partnerTypeSelect?.Company],
  );

  const handleSaveAPI = useCallback(
    ({dispatch, objectState}) => {
      dispatch((createCustomer as any)(objectState)).then(res => {
        const _recordId = res?.payload?.id;
        if (_recordId) {
          if (eventName) {
            DeviceEventEmitter.emit(eventName, {id: _recordId});
            navigation.pop();
          } else {
            navigation.replace('ClientSaleDetailsScreen', {
              customerId: _recordId,
            });
          }
        }
      });
    },
    [eventName, navigation],
  );

  return (
    <FormView
      formKey="sale_client"
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
      ]}
    />
  );
};

export default ClientSaleFormScreen;
