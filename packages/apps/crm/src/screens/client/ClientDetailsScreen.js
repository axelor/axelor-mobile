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

import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
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

  const {client} = useSelector(state => state.client);

  useEffect(() => {
    dispatch(getClientbyId({clientId: idClient}));
  }, [dispatch, idClient]);

  if (client?.id !== idClient) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<ClientHeader />} />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Notes')} data={client.description} />
        <ClientDropdownCards />
      </ScrollView>
      <ClientBottom idClient={idClient} />
    </Screen>
  );
};

export default ClientDetailsScreen;
