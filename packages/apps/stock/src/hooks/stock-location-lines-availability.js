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

import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchProductDistribution} from '../features/productIndicatorsSlice';

export const useStockLocationLinesWithAvailability = (companyId, product) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {stockLocationLine: stockLocationLinelist} = useSelector(
    state => state.stockLocationLine,
  );
  const {listAvailabiltyDistribution} = useSelector(
    state => state.productIndicators,
  );

  useEffect(() => {
    if (stockLocationLinelist != null) {
      dispatch(
        fetchProductDistribution({
          stockLocationList: stockLocationLinelist?.map(
            _item => _item.stockLocation,
          ),
          product: product,
          companyId: companyId || user.activeCompany?.id,
        }),
      );
    }
  }, [
    dispatch,
    product,
    stockLocationLinelist,
    companyId,
    user.activeCompany?.id,
  ]);

  const updatedList = useMemo(() => {
    return stockLocationLinelist?.map((item, index) => {
      return {
        ...item,
        availableStock: listAvailabiltyDistribution?.[index]?.availableStock,
      };
    });
  }, [stockLocationLinelist, listAvailabiltyDistribution]);

  return useMemo(
    () => ({
      stockLocationLinelist: updatedList,
    }),
    [updatedList],
  );
};
