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

import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchProductDistribution} from '../features/productIndicatorsSlice';

export const useStockListWithAvailability = (companyId, product) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {availableStockList, listAvailabiltyDistribution} = useSelector(
    state => state.productIndicators,
  );

  useEffect(() => {
    if (availableStockList != null) {
      dispatch(
        fetchProductDistribution({
          stockLocationList: availableStockList?.map(
            _item => _item.stockLocation,
          ),
          product: product,
          companyId: companyId || user.activeCompany?.id,
        }),
      );
    }
  }, [
    availableStockList,
    dispatch,
    product,
    companyId,
    user.activeCompany?.id,
  ]);

  const updatedList = useMemo(() => {
    return availableStockList?.map((item, index) => {
      return {
        ...item,
        availableStock: listAvailabiltyDistribution?.[index]?.availableStock,
      };
    });
  }, [availableStockList, listAvailabiltyDistribution]);

  return useMemo(
    () => ({
      availableStockList: updatedList,
    }),
    [updatedList],
  );
};
