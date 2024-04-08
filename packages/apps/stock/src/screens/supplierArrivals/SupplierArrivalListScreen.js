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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
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

  const {loadingList, moreLoading, isListEnd, supplierArrivalsList} =
    useSelector(state => state.supplierArrival);

  const [stockLocation, setStockLocation] = useState(null);
  const [partner, setPartner] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [navigate, setNavigate] = useState(false);

  const navigateToSupplierDetail = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('SupplierArrivalDetailsScreen', {
        supplierArrivalId: item?.id,
      });
    }
  };

  const sliceFunctionData = useMemo(
    () => ({
      toStockLocationId: stockLocation?.id,
      partnerId: partner?.id,
      statusList: selectedStatus,
    }),
    [partner?.id, selectedStatus, stockLocation?.id],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={supplierArrivalsList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchSupplierArrivals}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={navigateToSupplierDetail}
        displaySearchValue={displayStockMoveSeq}
        searchPlaceholder={I18n.t('Stock_Ref')}
        searchNavigate={navigate}
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
        }
        headerChildren={
          <>
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
          </>
        }
        renderListItem={({item}) => (
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
          />
        )}
      />
    </Screen>
  );
};

export default SupplierArrivalListScreen;
