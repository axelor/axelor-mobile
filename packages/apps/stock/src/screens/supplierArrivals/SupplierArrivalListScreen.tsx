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
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  PartnerSearchBar,
  StockLocationSearchBar,
  SupplierArrivalCard,
} from '../../components';
import {searchSupplierArrivals} from '../../features/supplierArrivalSlice';
import {displayStockMoveSeq} from '../../utils/displayers';

const stockLocationScanKey = 'stock-location_supplier-arrival-list';
const scanKey = 'stock-move_supplier-arrival-list';

const SupplierArrivalListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loadingList, moreLoading, isListEnd, supplierArrivalsList} =
    useSelector(state => state.supplierArrival);
  const {user} = useSelector(state => state.user);

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

  const statusList = useMemo(() => {
    const statusToDisplay = [
      StockMove?.statusSelect.Planned,
      StockMove?.statusSelect.Realized,
    ];

    return getSelectionItems(StockMove?.statusSelect, selectedStatus).filter(
      ({value}) => statusToDisplay.includes(value),
    );
  }, [StockMove?.statusSelect, getSelectionItems, selectedStatus]);

  const sliceFunctionData = useMemo(
    () => ({
      toStockLocationId: stockLocation?.id,
      partnerId: partner?.id,
      statusList: selectedStatus,
      companyId: user.activeCompany?.id,
    }),
    [partner?.id, selectedStatus, stockLocation?.id, user.activeCompany?.id],
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
        scanKeySearch={scanKey}
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
              placeholderKey="Stock_StockLocation"
              defaultValue={stockLocation}
              onChange={setStockLocation}
            />
            <PartnerSearchBar
              defaultValue={partner}
              onChange={setPartner}
              title="Stock_Supplier"
              partnerType="supplier"
            />
          </>
        }
        renderListItem={({item}) => (
          <SupplierArrivalCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={item.statusSelect}
            date={
              item.statusSelect === StockMove?.statusSelect.Planned
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
