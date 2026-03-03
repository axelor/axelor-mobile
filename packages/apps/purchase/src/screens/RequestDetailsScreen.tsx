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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  EditableHtmlInput,
  HeaderContainer,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  RequestSeeLinesButton,
  RequestDropdownCards,
  RequestHeader,
  RequestButtons,
} from '../components';
import {
  getPurchaseRequest,
  updatePurchaseRequest,
} from '../features/purchaseRequestSlice';
import {searchPurchaseRequestLine} from '../features/purchaseRequestLineSlice';

const RequestDetailsScreen = ({route}) => {
  const {idRequest} = route.params;
  const I18n = useTranslator();
  const {PurchaseRequest} = useTypes();
  const dispatch = useDispatch();

  const {loadingPurchaseRequest, purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );

  const handleDescriptionChange = useCallback(
    description => {
      dispatch(
        (updatePurchaseRequest as any)({
          purchaseRequest: {
            ...purchaseRequest,
            description,
          },
        }),
      );
    },
    [dispatch, purchaseRequest],
  );

  const getPurchaseRequestAPI = useCallback(() => {
    dispatch((getPurchaseRequest as any)({id: idRequest}));
    dispatch(
      (searchPurchaseRequestLine as any)({purchaseRequestId: idRequest}),
    );
  }, [dispatch, idRequest]);

  useEffect(() => {
    getPurchaseRequestAPI();
  }, [getPurchaseRequestAPI]);

  return (
    <Screen removeSpaceOnTop={true} fixedItems={<RequestButtons />}>
      <HeaderContainer
        fixedItems={<RequestHeader />}
        expandableFilter={false}
      />
      <ScrollView
        refresh={{
          loading: loadingPurchaseRequest,
          fetcher: getPurchaseRequestAPI,
        }}>
        <EditableHtmlInput
          placeholder={I18n.t('Base_Description')}
          defaultValue={purchaseRequest.description}
          readonly={
            purchaseRequest.statusSelect !==
              PurchaseRequest.statusSelect.Draft &&
            purchaseRequest.statusSelect !==
              PurchaseRequest.statusSelect.Requested
          }
          onValidate={handleDescriptionChange}
        />
        <RequestDropdownCards style={styles.margin} />
        <RequestSeeLinesButton />
      </ScrollView>
    </Screen>
  );
};

export default RequestDetailsScreen;

const styles = StyleSheet.create({
  margin: {
    marginVertical: 5,
  },
});
