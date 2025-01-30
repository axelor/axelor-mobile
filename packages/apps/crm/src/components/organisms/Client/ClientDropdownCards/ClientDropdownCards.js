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
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {
  DropdownContactView,
  DropdownEmployeeView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {searchContactById} from '../../../../features/contactSlice';
import {fetchPartnerEventById} from '../../../../features/eventSlice';

const ClientDropdownCards = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {client} = useSelector(state => state.client);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);

  useEffect(() => {
    if (client.contactPartnerSet?.length > 0) {
      const idList = client.contactPartnerSet?.map(item => item.id);
      dispatch(searchContactById(idList));
    }
  }, [dispatch, client.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(client?.id));
  }, [dispatch, client?.id]);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Crm_Contact'),
            key: 1,
            childrenComp: (
              <DropdownContactView
                address={client.mainAddress?.fullName}
                fixedPhone={client.fixedPhone}
                emailAddress={client.emailAddress?.address}
                webSite={client.webSite}
              />
            ),
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 2,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={client.user?.fullName}
                category={client.partnerCategory?.name}
                industrySector={client.industrySector?.name}
                priceList={client.salePartnerPriceList?.label}
              />
            ),
          },
          {
            title: I18n.t('Crm_Employees'),
            key: 3,
            childrenComp: (
              <DropdownEmployeeView contactList={listContactById} />
            ),
          },
          {
            title: I18n.t('Crm_Events'),
            key: 4,
            childrenComp: <DropdownEventView eventList={listEventPartner} />,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ClientDropdownCards;
