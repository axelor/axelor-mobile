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
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ProductSearchBar} from '@axelor/aos-mobile-stock';
import {fetchManufacturingOrders} from '../../features/manufacturingOrderSlice';
import {ManufacturingOrderCard} from '../../components';
import {displayManufOrderSeq} from '../../utils/displayers';

const productScanKey = 'product_manufacturing-order-list';
const refScanKey = 'manufOrderSeq_manufacturing-order-list';

const ManufacturingOrderListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {ManufOrder} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {user} = useSelector(state => state.user);
  const {loading, moreLoading, isListEnd, manufOrderList} = useSelector(
    state => state.manufacturingOrder,
  );
  const {production: productionConfig} = useSelector(state => state.appConfig);

  const [product, setProduct] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [navigate, setNavigate] = useState(false);

  const navigateToManufOrder = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('ManufacturingOrderDetailsScreen', {
        manufacturingOrderId: item.id,
      });
    }
  };

  const sliceFunctionData = useMemo(
    () => ({
      companyId: user?.activeCompany?.id,
      manageWorkshop: productionConfig?.manageWorkshop,
      workshopId: user?.workshopStockLocation?.id,
      statusList: selectedStatus,
      productId: product?.id,
    }),
    [
      product?.id,
      productionConfig?.manageWorkshop,
      selectedStatus,
      user?.activeCompany?.id,
      user?.workshopStockLocation?.id,
    ],
  );

  const statusList = useMemo(() => {
    const statusToDisplay = [
      ManufOrder?.statusSelect.Planned,
      ManufOrder?.statusSelect.InProgress,
      ManufOrder?.statusSelect.StandBy,
      ManufOrder?.statusSelect.Finished,
    ];

    return getSelectionItems(ManufOrder?.statusSelect, selectedStatus).filter(
      ({value}) => statusToDisplay.includes(value),
    );
  }, [ManufOrder?.statusSelect, getSelectionItems, selectedStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={manufOrderList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchManufacturingOrders}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={navigateToManufOrder}
        displaySearchValue={displayManufOrderSeq}
        searchPlaceholder={I18n.t('Manufacturing_Ref')}
        searchNavigate={navigate}
        scanKeySearch={refScanKey}
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
            width={100}
          />
        }
        headerChildren={
          <ProductSearchBar
            scanKey={productScanKey}
            onChange={setProduct}
            defaultValue={product}
          />
        }
        renderListItem={({item}) => (
          <ManufacturingOrderCard
            reference={item.manufOrderSeq}
            status={item.statusSelect}
            style={styles.item}
            priority={item.prioritySelect}
            productName={item.product.fullName}
            qty={item.qty}
            unit={item.unit}
            link={{ordersRef: item.saleOrderSet, client: item.clientPartner}}
            plannedStartDate={item.plannedStartDateT}
            plannedEndDate={item.plannedEndDateT}
            realStartDate={item.realStartDateT}
            realEndDate={item.realEndDateT}
            onPress={() => navigateToManufOrder(item)}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ManufacturingOrderListScreen;
