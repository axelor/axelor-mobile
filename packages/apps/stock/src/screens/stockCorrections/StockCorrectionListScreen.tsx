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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ProductSearchBar,
  StockCorrectionCard,
  StockLocationSearchBar,
} from '../../components';
import {searchStockCorrections} from '../../features/stockCorrectionSlice';

const stockLocationScanKey = 'stock-location_stock-correction-list';
const productScanKey = 'product_stock-correction-list';

const StockCorrectionListScreen = () => {
  const {StockCorrection} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loadingList, moreLoading, isListEnd, stockCorrectionList} =
    useSelector(state => state.stockCorrection);

  const [stockLocation, setStockLocation] = useState<any>();
  const [product, setProduct] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);

  const statusList = useMemo(
    () => getSelectionItems(StockCorrection?.statusSelect, selectedStatus),
    [StockCorrection, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      stockLocationId: stockLocation?.id,
      productId: product?.id,
      statusList: selectedStatus,
    }),
    [product?.id, selectedStatus, stockLocation?.id],
  );

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        list={stockCorrectionList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchStockCorrections}
        sliceFunctionData={sliceFunctionData}
        displaySearchBar={false}
        renderListItem={({item}) => <StockCorrectionCard {...item} />}
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
        headerChildren={
          <>
            <StockLocationSearchBar
              scanKey={stockLocationScanKey}
              onChange={setStockLocation}
              defaultValue={stockLocation}
            />
            <ProductSearchBar
              scanKey={productScanKey}
              onChange={setProduct}
              defaultValue={product}
            />
          </>
        }
      />
    </Screen>
  );
};

export default StockCorrectionListScreen;
