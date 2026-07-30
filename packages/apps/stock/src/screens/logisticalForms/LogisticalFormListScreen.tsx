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
import {searchLogisticalForms} from '../../features/logisticalFormSlice';
import {displayLogisticalForm} from '../../utils';
import {LogisticalFormCard, LogisticalFormFilter} from '../../components';

const stockLocationScanKey = 'stock-location_logistical-form-list';

const LogisticalFormListScreen = ({navigation}: any) => {
  const I18n = useTranslator();
  const {LogisticalForm} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {logisticalFormList, loadingList, moreLoading, isListEnd} = useSelector(
    state => state.logisticalForm,
  );
  const {user} = useSelector(state => state.user);

  const [carrier, setCarrier] = useState<any>();
  const [stockLocation, setStockLocation] = useState<any>();
  const [collectionDate, setCollectionDate] = useState<Date>();
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);

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
    <Screen>
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
          <LogisticalFormFilter
            carrier={carrier}
            onCarrierChange={setCarrier}
            stockLocation={stockLocation}
            onStockLocationChange={setStockLocation}
            collectionDate={collectionDate}
            onCollectionDateChange={setCollectionDate}
            stockLocationScanKey={stockLocationScanKey}
          />
        }
        renderListItem={({item}) => (
          <LogisticalFormCard
            {...item}
            onPress={() =>
              navigation.navigate('LogisticalFormDetailsScreen', {
                logisticalFormId: item.id,
              })
            }
          />
        )}
      />
    </Screen>
  );
};

export default LogisticalFormListScreen;
