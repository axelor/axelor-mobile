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

import React, {useMemo} from 'react';
import {
  displayItemName,
  SearchTreeView,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {
  SaleOrderHeader,
  SaleOrderLineCard,
  SaleOrderLineParentCard,
} from '../../components';
import {
  fetchSaleOrderLine,
  searchSubSaleOrderLine,
} from '../../features/saleOrderLineSlice';
import {searchSubSaleOrderLineApi} from '../../api';

const SaleOrderLineListScreen = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {saleOrder} = useSelector((state: any) => state.sale_saleOrder);
  const {
    saleOrderLineList,

    loadingsub,
    moreLoadingSub,
    isListEndSub,
    subSaleOrderLineList,
  } = useSelector((state: any) => state.sale_saleOrderLine);

  const sliceParentFunctionData = useMemo(
    () => ({
      saleOrderId: saleOrder.id,
    }),
    [saleOrder.id],
  );

  const sliceFunctionData = useMemo(
    () => ({
      saleOrderId: saleOrder.id,
    }),
    [saleOrder.id],
  );

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<SaleOrderHeader saleOrder={saleOrder} />}
      />
      <SearchTreeView
        headerChildren={<SaleOrderHeader saleOrder={saleOrder} />}
        parentList={saleOrderLineList}
        sliceParentFunction={fetchSaleOrderLine}
        sliceParentFunctionData={sliceParentFunctionData}
        sliceFunctionDataParentIdName="parentId"
        sliceFunctionDataNoParentName="noParent"
        list={subSaleOrderLineList}
        sliceFunction={searchSubSaleOrderLine}
        sliceFunctionData={sliceFunctionData}
        loading={loadingsub}
        moreLoading={moreLoadingSub}
        isListEnd={isListEndSub}
        displayParentSearchValue={displayItemName}
        fetchBranchData={branchId =>
          searchSubSaleOrderLineApi({
            saleOrderId: saleOrder.id,
            parentId: branchId,
          })
        }
        branchCondition={item => item.subSaleOrderLineList?.length > 0}
        searchParentPlaceholder={I18n.t('Sale_SaleOrderParent')}
        searchPlaceholder={I18n.t('Base_Search')}
        parentFieldName="parentSaleOrder"
        renderBranch={({item}) => {
          return (
            <SaleOrderLineParentCard
              typeSelect={item.typeSelect}
              product={item.product}
              productName={item.productName}
              price={item.price}
              unit={item.unit?.name}
              qty={item.qty}
              SOinAti={saleOrder.inAti}
              inTaxTotal={item.inTaxTotal}
              exTaxTotal={item.exTaxTotal}
              isShowEndOfPackTotal={item.isShowTotal}
              currencySymbol={saleOrder.currency?.symbol}
              description={item.description}
              onPress={() =>
                navigation.navigate('SaleOrderLineDetailsScreen', {
                  saleOrderLineId: item.id,
                })
              }
            />
          );
        }}
        renderLeaf={({item}) => (
          <SaleOrderLineCard
            typeSelect={item.typeSelect}
            product={item.product}
            productName={item.productName}
            price={item.price}
            unit={item.unit?.name}
            qty={item.qty}
            SOinAti={saleOrder.inAti}
            inTaxTotal={item.inTaxTotal}
            exTaxTotal={item.exTaxTotal}
            isShowEndOfPackTotal={item.isShowTotal}
            currencySymbol={saleOrder.currency?.symbol}
            description={item.description}
            onPress={() =>
              navigation.navigate('SaleOrderLineDetailsScreen', {
                saleOrderLineId: item.id,
              })
            }
          />
        )}
      />
    </Screen>
  );
};

export default SaleOrderLineListScreen;
