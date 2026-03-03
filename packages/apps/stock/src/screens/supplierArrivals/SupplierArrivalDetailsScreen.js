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

import React, {useCallback, useEffect} from 'react';
import {
  HeaderContainer,
  Screen,
  KeyboardAvoidingScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {
  SupplierArrivalHeader,
  SupplierArrivalButtons,
  SupplierArrivalMovementIndicationCard,
  SupplierArrivalSearchLineContainer,
} from '../../components';
import {fetchSupplierArrival} from '../../features/supplierArrivalSlice';

const SupplierArrivalDetailsScreen = ({route}) => {
  const supplierArrivalId = route.params.supplierArrivalId;
  const dispatch = useDispatch();
  useContextRegister({
    models: [
      {model: 'com.axelor.apps.stock.db.StockMove', id: supplierArrivalId},
    ],
  });

  const {loading, supplierArrival} = useSelector(
    state => state.supplierArrival,
  );

  const getSupplierArrival = useCallback(() => {
    dispatch(fetchSupplierArrival({supplierArrivalId: supplierArrivalId}));
  }, [dispatch, supplierArrivalId]);

  useEffect(() => {
    getSupplierArrival();
  }, [getSupplierArrival]);

  if (supplierArrival?.id !== supplierArrivalId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<SupplierArrivalButtons supplierArrival={supplierArrival} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<SupplierArrivalHeader supplierArrival={supplierArrival} />}
      />
      <KeyboardAvoidingScrollView
        refresh={{loading, fetcher: getSupplierArrival}}>
        <SupplierArrivalMovementIndicationCard
          supplierArrival={supplierArrival}
        />
        <SupplierArrivalSearchLineContainer />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default SupplierArrivalDetailsScreen;
