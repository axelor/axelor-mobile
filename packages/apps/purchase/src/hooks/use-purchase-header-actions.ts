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

import {useEffect} from 'react';
import {headerActionsProvider, useSelector} from '@axelor/aos-mobile-core';

export const usePurchaseHeaders = () => {
  usePurchaseRequestDetailsActions();
  usePurchaseRequestLineDetailsActions();
};

const usePurchaseRequestDetailsActions = () => {
  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );
  useEffect(() => {
    headerActionsProvider.registerModel('purchase_purchaseRequest_details', {
      model: 'com.axelor.apps.purchase.db.PurchaseRequest',
      modelId: purchaseRequest?.id,
    });
  }, [purchaseRequest?.id]);
};

const usePurchaseRequestLineDetailsActions = () => {
  const {purchaseRequestLine} = useSelector(
    state => state.purchase_purchaseRequestLine,
  );

  useEffect(() => {
    headerActionsProvider.registerModel(
      'purchase_purchaseRequestLine_details',
      {
        model: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
        modelId: purchaseRequestLine?.id,
      },
    );
  }, [purchaseRequestLine?.id]);
};
