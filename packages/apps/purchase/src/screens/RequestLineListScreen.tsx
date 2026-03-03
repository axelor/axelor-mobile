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
  usePermitted,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {RequestHeader, RequestLineCard} from '../components';
import {searchPurchaseRequestLine} from '../features/purchaseRequestLineSlice';

const RequestLineListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {PurchaseRequestLine} = useTypes();
  const {getSelectionItems} = useTypeHelpers();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
  });

  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );
  const {
    loadingPurchaseRequestLines,
    moreLoadingPurchaseRequestLine,
    isListEndPurchaseRequestLine,
    purchaseRequestLineList,
  } = useSelector(state => state.purchase_purchaseRequestLine);

  const [selectedStatus, setSelectedStatus] = useState([]);

  const statusList = useMemo(
    () => getSelectionItems(PurchaseRequestLine?.newProduct, selectedStatus),
    [PurchaseRequestLine?.newProduct, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      purchaseRequestId: purchaseRequest.id,
      newProduct: selectedStatus[0]?.value,
    }),
    [purchaseRequest.id, selectedStatus],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        topFixedItems={<RequestHeader />}
        actionList={
          canCreate && [
            {
              iconName: 'plus',
              title: I18n.t('Purchase_AddProduct'),
              onPress: () => {
                navigation.navigate('RequestLineFormScreen');
              },
            },
          ]
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
        expandableFilter={false}
        searchPlaceholder={I18n.t('Base_Search')}
        list={purchaseRequestLineList}
        loading={loadingPurchaseRequestLines}
        moreLoading={moreLoadingPurchaseRequestLine}
        isListEnd={isListEndPurchaseRequestLine}
        sliceFunction={searchPurchaseRequestLine}
        sliceFunctionData={sliceFunctionData}
        renderListItem={({item}) => (
          <RequestLineCard
            id={item.id}
            productName={item.product?.fullName ?? item.productTitle}
            qty={item.quantity}
            unit={item.unit?.name}
            newProduct={item.newProduct}
          />
        )}
      />
    </Screen>
  );
};

export default RequestLineListScreen;
