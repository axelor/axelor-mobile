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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {
  DropdownAddressesView,
  DropdownContactView,
  DropdownEmployeeView,
  DropdownEventView,
  DropdownGeneralView,
  DropdownOpportunityView,
} from '../../../organisms';
import {getClientbyId} from '../../../../features/clientSlice';
import {searchContactById} from '../../../../features/contactSlice';
import {fetchPartnerEventById} from '../../../../features/eventSlice';

const ClientDropdownCards = ({additionalDropdowns = []}) => {
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
  }, [dispatch, client]);

  const dropdownItems = useMemo(() => {
    const _dropdownItems = [
      {
        title: I18n.t('Crm_Contact'),
        key: 1,
        childrenComp: (
          <DropdownContactView
            isMainAddress={true}
            contact={{...client, address: client.mainAddress}}
            networkData={{company: client.simpleFullName}}
            refreshContactInfos={() =>
              dispatch(getClientbyId({clientId: client.id}))
            }
          />
        ),
        isDefaultVisible: true,
      },
      {
        title: I18n.t('Crm_Addresses'),
        key: 2,
        style: styles.zeroPadding,
        childrenComp: (
          <DropdownAddressesView
            partnerId={client.id}
            partnerVersion={client.version}
            refreshContactInfos={() =>
              dispatch(getClientbyId({clientId: client.id}))
            }
          />
        ),
      },
      {
        title: I18n.t('Crm_GeneralInformation'),
        key: 3,
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
        key: 4,
        childrenComp: <DropdownEmployeeView contactList={listContactById} />,
      },
      {
        title: I18n.t('Crm_Events'),
        key: 5,
        childrenComp: <DropdownEventView eventList={listEventPartner} />,
      },
      {
        title: I18n.t('Crm_Opportunity'),
        key: 6,
        childrenComp: <DropdownOpportunityView partnerId={client?.id} />,
      },
    ];

    if (additionalDropdowns?.length > 0) {
      additionalDropdowns.forEach((dropdown, index) => {
        _dropdownItems.push({
          title: dropdown.title,
          key: 6 + index,
          childrenComp: dropdown.childrenComp,
        });
      });
    }

    return _dropdownItems;
  }, [
    I18n,
    additionalDropdowns,
    client,
    dispatch,
    listContactById,
    listEventPartner,
  ]);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={dropdownItems}
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
  zeroPadding: {
    paddingRight: 0,
    paddingLeft: 0,
  },
});

export default ClientDropdownCards;
