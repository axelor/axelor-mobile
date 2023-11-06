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

import React, {useCallback, useEffect} from 'react';
import {
  Screen,
  HeaderContainer,
  NotesCard,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {
  ClientBottom,
  ClientDropdownCards,
  ClientHeader,
} from '../../components';
import {getClientbyId} from '../../features/clientSlice';

const ClientDetailsScreen = ({route}) => {
  const {idClient} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, client} = useSelector(state => state.client);

  const getClient = useCallback(() => {
    dispatch(getClientbyId({clientId: idClient}));
  }, [dispatch, idClient]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  if (client?.id !== idClient) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<ClientHeader />} />
      <ScrollView refresh={{loading, fetcher: getClient}}>
        <NotesCard title={I18n.t('Crm_Notes')} data={client.description} />
        <ClientDropdownCards />
      </ScrollView>
      <ClientBottom idClient={idClient} />
    </Screen>
  );
};

export default ClientDetailsScreen;
