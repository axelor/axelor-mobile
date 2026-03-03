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
import {StyleSheet} from 'react-native';
import {
  PeriodInput,
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {PriceListCard, ProductHeader} from '../../components';
import {fetchPriceListLine} from '../../features/priceListLineSlice';

const ProductSalePriceListsScreen = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);

  const {product} = useSelector((state: any) => state.sale_product);
  const {loading, moreLoading, isListEnd, priceListLineList} = useSelector(
    (state: any) => state.sale_priceListLine,
  );

  const statuslist = useMemo(
    () => [
      {
        title: I18n.t('Sale_Active'),
        color: Colors.successColor,
        isActive: true,
        key: true,
      },
      {
        title: I18n.t('Sale_Unactive'),
        color: Colors.warningColor,
        isActive: false,
        key: false,
      },
    ],
    [Colors, I18n],
  );

  const sliceFunctionData = useMemo(
    () => ({
      productId: product?.id,
      isActive: selectedStatus[0]?.key,
      fromDate,
      toDate,
    }),
    [fromDate, product?.id, selectedStatus, toDate],
  );

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        list={priceListLineList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchPriceListLine}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        topFixedItems={<ProductHeader />}
        headerChildren={
          <PeriodInput
            style={styles.periodInput}
            startDateConfig={{
              date: fromDate,
              onDateChange: date => setFromDate(date),
            }}
            endDateConfig={{
              date: toDate,
              onDateChange: date => setToDate(date),
            }}
            showTitle={false}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setSelectedStatus}
            selectionItems={statuslist}
          />
        }
        renderListItem={({item}) => (
          <PriceListCard
            isActive={item.priceList?.isActive}
            title={item.priceList?.title}
            minQty={item.minQty}
            typeSelect={item.priceList?.typeSelect}
            startDate={item.priceList?.applicationBeginDate}
            endDate={item.priceList?.applicationEndDate}
            amount={item.amount}
            lineTypeSelect={item.typeSelect}
            amountTypeSelect={item.amountTypeSelect}
            currency={product.saleCurrency?.symbol}
            nonNegotiable={item.priceList?.nonNegotiable}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  periodInput: {
    alignSelf: 'center',
  },
});

export default ProductSalePriceListsScreen;
