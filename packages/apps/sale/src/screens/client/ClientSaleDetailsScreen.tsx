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
import {
  useDispatch,
  useIsFocused,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  HeaderContainer,
  NotesCard,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {ClientDropdownCards, getClientbyId} from '@axelor/aos-mobile-crm';
import {ClientHeader, DropDownSaleOrderView} from '../../components';
import {fetchCustomerById} from '../../features/customerSlice';

const ClientSaleDetailsScreen = ({route}) => {
  const {customerId} = route?.params;
  const I18n = useTranslator();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {loadingCustomer, customer} = useSelector(
    (state: any) => state.sale_customer,
  );
  const {client} = useSelector(state => state.client);

  const getCustomer = useCallback(() => {
    dispatch((fetchCustomerById as any)({customerId}));
    dispatch((getClientbyId as any)({clientId: customerId}));
  }, [dispatch, customerId]);

  useEffect(() => {
    if (isFocused) {
      getCustomer();
    }
  }, [getCustomer, isFocused]);

  if (customer?.id !== customerId || client?.id !== customerId || !isFocused) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ClientHeader customer={customer} />}
      />
      <ScrollView refresh={{loading: loadingCustomer, fetcher: getCustomer}}>
        <NotesCard title={I18n.t('Crm_Notes')} data={customer.description} />
        <ClientDropdownCards
          additionalDropdowns={[
            {
              childrenComp: <DropDownSaleOrderView customer={customer} />,
              title: I18n.t('Sale_LinkedQuotationsAndOrders'),
            },
          ]}
        />
      </ScrollView>
    </Screen>
  );
};

export default ClientSaleDetailsScreen;
