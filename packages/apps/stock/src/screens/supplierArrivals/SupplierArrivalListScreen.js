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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AutoCompleteSearch,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {
  PartnerSearchBar,
  StockLocationSearchBar,
  SupplierArrivalCard,
} from '../../components';
import {searchSupplierArrivals} from '../../features/supplierArrivalSlice';
import {displayStockMoveSeq} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const stockLocationScanKey = 'stock-location_supplier-arrival-list';

const SupplierArrivalListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, supplierArrivalsList} = useSelector(
    state => state.supplierArrival,
  );

  const [stockLocation, setStockLocation] = useState(null);
  const [partner, setPartner] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);

  const filterOnStatus = useCallback(
    list => filterChip(list, selectedStatus, 'statusSelect'),
    [selectedStatus],
  );

  const filteredList = useMemo(
    () =>
      filterOnStatus(
        filterList(
          filterList(
            supplierArrivalsList,
            'toStockLocation',
            'id',
            stockLocation?.id ?? '',
          ),
          'partner',
          'id',
          partner?.id ?? '',
        ),
      ),
    [filterOnStatus, partner, stockLocation, supplierArrivalsList],
  );

  const navigateToSupplierDetail = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('SupplierArrivalDetailsScreen', {
        supplierArrivalId: item?.id,
      });
    }
  };

  const fetchSupplierArrivalsAPI = useCallback(
    page => {
      dispatch(
        searchSupplierArrivals({
          searchValue: filter,
          page: page,
        }),
      );
    },
    [dispatch, filter],
  );

  const handleRefChange = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      dispatch(
        searchSupplierArrivals({
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <AutoCompleteSearch
            placeholder={I18n.t('Stock_Ref')}
            objectList={supplierArrivalsList}
            displayValue={displayStockMoveSeq}
            onChangeValue={item => navigateToSupplierDetail(item)}
            oneFilter={true}
            fetchData={handleRefChange}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Stock_Status_Planned'),
                color: StockMove.getStatusColor(
                  StockMove.status.Planned,
                  Colors,
                ),
                key: StockMove.status.Planned,
              },
              {
                title: I18n.t('Stock_Status_Realized'),
                color: StockMove.getStatusColor(
                  StockMove.status.Realized,
                  Colors,
                ),
                key: StockMove.status.Realized,
              },
            ]}
          />
        }>
        <StockLocationSearchBar
          scanKey={stockLocationScanKey}
          placeholderKey="Stock_StockLocation"
          defaultValue={stockLocation}
          onChange={setStockLocation}
        />
        <PartnerSearchBar
          defaultValue={partner}
          onChange={setPartner}
          placeholderKey="Stock_Supplier"
          isClient={false}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <SupplierArrivalCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={item.statusSelect}
            date={
              item.statusSelect === StockMove.status.Planned
                ? item.estimatedDate
                : item.realDate
            }
            onPress={() => navigateToSupplierDetail(item)}
            origin={item.origin}
            style={styles.cardDelivery}
          />
        )}
        fetchData={fetchSupplierArrivalsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardDelivery: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default SupplierArrivalListScreen;
