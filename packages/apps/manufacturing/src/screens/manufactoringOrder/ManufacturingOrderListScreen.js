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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ChipSelect,
  Screen,
  ScrollList,
  HeaderContainer,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {ProductSearchBar} from '@axelor/aos-mobile-stock';
import ManufacturingOrder from '../../types/manufacturing-order';
import {fetchManufacturingOrders} from '../../features/manufacturingOrderSlice';
import {ManufacturingOrderCard} from '../../components';
import {displayManufOrderSeq} from '../../utils/displayers';

const productScanKey = 'product_manufacturing-order-list';
const refScanKey = 'manufOrderSeq_manufacturing-order-list';

const ManufacturingOrderListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {loading, moreLoading, isListEnd, manufOrderList} = useSelector(
    state => state.manufacturingOrder,
  );
  const {production: productionConfig} = useSelector(state => state.appConfig);

  const [product, setProduct] = useState(null);
  const [filteredList, setFilteredList] = useState(manufOrderList);
  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [navigate, setNavigate] = useState(false);

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(
        filterList(manufOrderList, 'product', 'id', product?.id ?? ''),
      ),
    );
  }, [filterOnStatus, manufOrderList, product?.id]);

  const navigateToManufOrder = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('ManufacturingOrderDetailsScreen', {
        manufacturingOrderId: item.id,
      });
    }
  };

  const fetchManufOrderAPI = useCallback(
    page => {
      dispatch(
        fetchManufacturingOrders({
          companyId: user?.activeCompany?.id,
          manageWorkshop: productionConfig?.manageWorkshop,
          workshopId: user?.workshopStockLocation?.id,
          searchValue: filter,
          page: page,
        }),
      );
    },
    [
      dispatch,
      filter,
      productionConfig?.manageWorkshop,
      user?.activeCompany?.id,
      user?.workshopStockLocation?.id,
    ],
  );

  const handleRefChange = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      dispatch(
        fetchManufacturingOrders({
          companyId: user?.activeCompany?.id,
          manageWorkshop: productionConfig?.manageWorkshop,
          workshopId: user?.workshopStockLocation?.id,
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [
      dispatch,
      productionConfig?.manageWorkshop,
      user?.activeCompany?.id,
      user?.workshopStockLocation?.id,
    ],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <ScannerAutocompleteSearch
            objectList={manufOrderList}
            onChangeValue={item => navigateToManufOrder(item)}
            fetchData={handleRefChange}
            displayValue={displayManufOrderSeq}
            placeholder={I18n.t('Manufacturing_Ref')}
            scanKeySearch={refScanKey}
            oneFilter={true}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Manufacturing_Status_Planned'),
                color: ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.Planned,
                  Colors,
                ),
                key: ManufacturingOrder.status.Planned,
              },
              {
                title: I18n.t('Manufacturing_Status_InProgress'),
                color: ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.InProgress,
                  Colors,
                ),
                key: ManufacturingOrder.status.InProgress,
              },
              {
                title: I18n.t('Manufacturing_Status_StandBy'),
                color: ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.StandBy,
                  Colors,
                ),
                key: ManufacturingOrder.status.StandBy,
              },
              {
                title: I18n.t('Manufacturing_Status_Finished'),
                color: ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.Finished,
                  Colors,
                ),
                key: ManufacturingOrder.status.Finished,
              },
            ]}
            width={100}
          />
        }>
        <ProductSearchBar
          scanKey={productScanKey}
          onChange={setProduct}
          defaultValue={product}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
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
        fetchData={fetchManufOrderAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
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
