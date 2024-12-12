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

import React, {useEffect} from 'react';
import {HeaderContainer, NotesCard, Screen} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {getPurchaseRequest} from '../features/purchaseRequestSlice';
import {
  PurchaseSeeLinesButton,
  RequestDropdownCards,
  RequestHeader,
} from '../components';
import {searchPurchaseRequestLine} from '../features/purchaseRequestLineSlice';

const RequestDetailsView = ({route}) => {
  const {idRequest} = route.params;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );
  const {totalPurchaseRequestLine} = useSelector(
    state => state.purchase_purchaseRequestLine,
  );

  useEffect(() => {
    dispatch((getPurchaseRequest as any)({id: idRequest}));
  }, [dispatch, idRequest]);

  useEffect(() => {
    dispatch(
      (searchPurchaseRequestLine as any)({purchaseRequestId: idRequest}),
    );
  }, [dispatch, idRequest]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={<RequestHeader />}
        expandableFilter={false}
      />
      <NotesCard
        title={I18n.t('Base_Description')}
        data={purchaseRequest.description}
      />
      <RequestDropdownCards />
      {totalPurchaseRequestLine > 0 && (
        <PurchaseSeeLinesButton numberLines={totalPurchaseRequestLine} />
      )}
    </Screen>
  );
};

export default RequestDetailsView;
