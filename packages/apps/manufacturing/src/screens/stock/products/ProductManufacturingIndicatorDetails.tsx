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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {ManufacturingQtyIndicatorActionCard} from '../../../components';
import {fetchManufacturingQtyIndicator} from '../../../features/productIndicatorsSlice';

const ProductManufacturingIndicatorDetails = ({route}: any) => {
  const {type: indicatorType, productId} = route?.params ?? {};
  const I18n = useTranslator();
  const dispatch: any = useDispatch();

  const {
    loadingManufacturingQty,
    moreLoadingManufacturingQty,
    isListEndManufacturingQty,
    manufacturingQtyList,
  } = useSelector(state => state.manufacturing_productIndicators);
  const {user} = useSelector(state => state.user);

  const fetchManufacturingQtyIndicatorAPI = useCallback(
    (page: number = 0) => {
      dispatch(
        (fetchManufacturingQtyIndicator as any)({
          indicatorType,
          productId: productId,
          companyId: user.activeCompany?.id,
          page,
        }),
      );
    },
    [dispatch, indicatorType, productId, user.activeCompany?.id],
  );

  return (
    <Screen removeSpaceOnTop>
      <ScrollList
        loadingList={loadingManufacturingQty}
        data={manufacturingQtyList}
        moreLoading={moreLoadingManufacturingQty}
        isListEnd={isListEndManufacturingQty}
        fetchData={fetchManufacturingQtyIndicatorAPI}
        renderItem={({item}) => (
          <ManufacturingQtyIndicatorActionCard {...item} />
        )}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default ProductManufacturingIndicatorDetails;
