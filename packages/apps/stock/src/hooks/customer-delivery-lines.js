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

import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {getRacks} from '../features/racksListSlice';

export const useCustomerLinesWithRacks = customerDelivery => {
  const dispatch = useDispatch();

  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {customerDeliveryLineList, totalNumberLines} = useSelector(
    state => state.customerDeliveryLine,
  );

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: customerDelivery?.fromStockLocation?.id,
        LineList: customerDeliveryLineList,
      }),
    );
  }, [dispatch, customerDelivery, customerDeliveryLineList]);

  const updatedList = useMemo(() => {
    return customerDeliveryLineList?.map((item, index) => {
      const locker = !loadingRacks && (racksList?.[index]?.[0]?.rack ?? '');

      return {
        ...item,
        locker,
      };
    });
  }, [loadingRacks, racksList, customerDeliveryLineList]);

  return useMemo(
    () => ({
      customerDeliveryLineList: updatedList,
      totalNumberLines: totalNumberLines,
    }),
    [totalNumberLines, updatedList],
  );
};
