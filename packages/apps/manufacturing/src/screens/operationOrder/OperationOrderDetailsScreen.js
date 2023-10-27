/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {HeaderContainer, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  OperationOrderDatesCard,
  OperationOrderHeader,
  OperationOrderLabelTextList,
  OperationOrderStopwatch,
} from '../../components';
import {fetchOperationOrderById} from '../../features/operationOrderSlice';

function OperationOrderDetailsScreen({route}) {
  const dispatch = useDispatch();

  const {loadingOrder, operationOrder} = useSelector(
    state => state.operationOrder,
  );

  const getOperationOrder = useCallback(() => {
    dispatch(
      fetchOperationOrderById({
        operationOrderId: route.params.operationOrderId,
      }),
    );
  }, [dispatch, route.params.operationOrderId]);

  useEffect(() => {
    getOperationOrder();
  }, [getOperationOrder]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <OperationOrderHeader
            manufOrderRef={operationOrder?.manufOrder?.manufOrderSeq}
            name={operationOrder?.operationName}
            status={operationOrder?.statusSelect}
            priority={operationOrder?.priority}
          />
        }
        expandableFilter={false}
      />
      <ScrollView refresh={{loading: loadingOrder, fetcher: getOperationOrder}}>
        <OperationOrderDatesCard />
        <OperationOrderLabelTextList />
        <OperationOrderStopwatch />
      </ScrollView>
    </Screen>
  );
}

export default OperationOrderDetailsScreen;
