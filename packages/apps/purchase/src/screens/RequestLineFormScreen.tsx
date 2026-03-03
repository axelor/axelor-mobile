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
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  createPurchaseRequestLine,
  fetchPurchaseRequestLine,
  updatePurchaseRequestLine,
} from '../features/purchaseRequestLineSlice';

const RequestLineFormScreen = ({navigation, route}) => {
  const {purchaseRequestLineId} = route?.params ?? {};

  const _dispatch = useDispatch();

  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );
  const {purchaseRequestLine} = useSelector(
    state => state.purchase_purchaseRequestLine,
  );

  useEffect(() => {
    if (purchaseRequestLineId != null) {
      _dispatch((fetchPurchaseRequestLine as any)({id: purchaseRequestLineId}));
    }
  }, [_dispatch, purchaseRequestLineId]);

  const _defaultValue = useMemo(
    () => (purchaseRequestLineId != null ? {...purchaseRequestLine} : null),
    [purchaseRequestLineId, purchaseRequestLine],
  );

  const createPurchaseRequestLineAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        (createPurchaseRequestLine as any)({
          purchaseRequestLine: objectState,
          purchaseRequestId: purchaseRequest.id,
          purchaseRequestVersion: purchaseRequest.version,
        }),
      );
      navigation.pop();
    },
    [navigation, purchaseRequest.id, purchaseRequest.version],
  );

  const updatePurchaseRequestLineAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        (updatePurchaseRequestLine as any)({
          purchaseRequestLine: objectState,
          purchaseRequestId: purchaseRequest.id,
        }),
      );
      navigation.pop();
    },
    [navigation, purchaseRequest.id],
  );

  return (
    <FormView
      formKey="purchase_purchaseRequestLine"
      defaultValue={_defaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-purchase-line',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => purchaseRequestLineId != null,
          customAction: ({dispatch, objectState}) => {
            createPurchaseRequestLineAPI(objectState, dispatch);
          },
        },
        {
          key: 'update-purchase-line',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => purchaseRequestLineId == null,
          customAction: ({dispatch, objectState}) => {
            updatePurchaseRequestLineAPI(objectState, dispatch);
          },
        },
      ]}
    />
  );
};

export default RequestLineFormScreen;
