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
import {RequestCard, SupplierSearchBar} from '../components';
import {searchPurchaseRequest} from '../features/purchaseRequestSlice';

const displayPurchaseRequestSeq = item => item.purchaseRequestSeq;

const RequestListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {PurchaseRequest} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {
    loadingPurchaseRequests,
    moreLoadingPurchaseRequest,
    isListEndPurchaseRequest,
    purchaseRequestList,
  } = useSelector(state => state.purchase_purchaseRequest);
  const {user} = useSelector(state => state.user);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [supplier, setSupplier] = useState();

  const statusList = useMemo(
    () => getSelectionItems(PurchaseRequest?.statusSelect, selectedStatus),
    [PurchaseRequest?.statusSelect, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      statusList: selectedStatus,
      supplier: supplier,
      companyId: user.activeCompany?.id,
    }),
    [selectedStatus, supplier, user.activeCompany?.id],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={purchaseRequestList}
        loading={loadingPurchaseRequests}
        moreLoading={moreLoadingPurchaseRequest}
        isListEnd={isListEndPurchaseRequest}
        sliceFunction={searchPurchaseRequest}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        displaySearchValue={displayPurchaseRequestSeq}
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
        headerChildren={
          <SupplierSearchBar onChange={setSupplier} defaultValue={supplier} />
        }
        renderListItem={({item}) => (
          <RequestCard
            onPress={() => {
              navigation.navigate('RequestDetailsView', {
                idRequest: item.id,
              });
            }}
            statusSelect={item.statusSelect}
            reference={item.purchaseRequestSeq}
            companyName={item.company?.name}
            supplierPartnerName={item.supplierPartner?.fullName}
          />
        )}
      />
    </Screen>
  );
};

export default RequestListScreen;
