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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {LogisticalFormCard, LogisticalFormFilter} from '../../components';
import {searchLogisticalForms} from '../../features/logisticalFormSlice';
import {displayLogisticalForm} from '../../utils/displayers';

const stockLocationScanKey = 'stock-location_logistical-form-list';

const LogisticalFormListScreen = () => {
  const I18n = useTranslator();
  const {LogisticalForm} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {logisticalFormList, loadingList, moreLoading, isListEnd} = useSelector(
    state => state.logisticalForm,
  );
  const {user} = useSelector(state => state.user);

  const [carrier, setCarrier] = useState(null);
  const [stockLocation, setStockLocation] = useState(null);
  const [collectionDate, setCollectionDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const statusList = useMemo(
    () => getSelectionItems(LogisticalForm?.statusSelect, selectedStatus),
    [LogisticalForm?.statusSelect, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      carrierPartnerId: carrier?.id,
      stockLocationId: stockLocation?.id,
      collectionDate,
      statusList: selectedStatus,
      companyId: user.activeCompany?.id,
    }),
    [
      carrier?.id,
      collectionDate,
      selectedStatus,
      stockLocation?.id,
      user.activeCompany?.id,
    ],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={logisticalFormList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchLogisticalForms}
        sliceFunctionData={sliceFunctionData}
        displaySearchValue={displayLogisticalForm}
        searchPlaceholder={I18n.t('Stock_Ref')}
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
        headerChildren={
          <>
            <LogisticalFormFilter
              carrier={carrier}
              onCarrierChange={setCarrier}
              stockLocation={stockLocation}
              onStockLocationChange={setStockLocation}
              collectionDate={collectionDate}
              onCollectionDateChange={setCollectionDate}
              stockLocationScanKey={stockLocationScanKey}
            />
          </>
        }
        renderListItem={({item}) => (
          <LogisticalFormCard
            reference={item.deliveryNumberSeq}
            carrier={item.carrierPartner?.fullName}
            stockLocation={item.stockLocation?.name}
            collectionDate={item.collectionDate}
            status={item.statusSelect}
          />
        )}
      />
    </Screen>
  );
};

export default LogisticalFormListScreen;
