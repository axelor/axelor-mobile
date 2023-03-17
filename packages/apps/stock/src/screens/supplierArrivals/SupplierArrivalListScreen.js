/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  AutoCompleteSearch,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  filterList,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {SupplierArrivalCard} from '../../components';
import {searchStockLocations} from '../../features/stockLocationSlice';
import {filterSuppliers} from '../../features/partnerSlice';
import {searchSupplierArrivals} from '../../features/supplierArrivalSlice';
import {displayPartner, displayStockMoveSeq} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const stockLocationScanKey = 'stock-location_supplier-arrival-list';

const SupplierArrivalListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const [stockLocation, setStockLocation] = useState(null);
  const {supplierList} = useSelector(state => state.partner);
  const {user} = useSelector(state => state.user);
  const [partner, setPartner] = useState(null);
  const {loading, moreLoading, isListEnd, supplierArrivalsList} = useSelector(
    state => state.supplierArrival,
  );
  const [filteredList, setFilteredList] = useState(supplierArrivalsList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(
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
    );
  }, [filterOnStatus, partner, stockLocation, supplierArrivalsList]);

  const navigateToSupplierDetail = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('SupplierArrivalDetailsScreen', {
        supplierArrival: item,
      });
    }
  };

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [dispatch, user],
  );

  const fetchPartnerAPI = useCallback(
    filterValue => {
      dispatch(filterSuppliers({searchValue: filterValue}));
    },
    [dispatch],
  );

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
    searchValue => {
      setFilter(searchValue);
      dispatch(
        searchSupplierArrivals({
          searchValue: searchValue,
          page: 0,
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
        <ScannerAutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder={I18n.t('Stock_StockLocation')}
        />
        <AutoCompleteSearch
          objectList={supplierList}
          value={partner}
          onChangeValue={item => setPartner(item)}
          fetchData={fetchPartnerAPI}
          displayValue={displayPartner}
          placeholder={I18n.t('Stock_Supplier')}
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
