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
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DropdownAddressView,
  DropdownContactView,
  DropdownEmployeeView,
  DropdownEventView,
  DropdownGeneralView,
  DropdownOpportunityView,
} from '../../../organisms';
import {searchContactById} from '../../../../features/contactSlice';
import {fetchPartnerEventById} from '../../../../features/eventSlice';

const ProspectDropdownCards = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {prospect} = useSelector(state => state.prospect);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);

  useEffect(() => {
    if (prospect.contactPartnerSet?.length > 0) {
      const idList = prospect.contactPartnerSet?.map(item => item.id);
      dispatch(searchContactById(idList));
    }
  }, [dispatch, prospect.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(prospect?.id));
  }, [dispatch, prospect]);

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
                address={prospect.mainAddress?.fullName}
                fixedPhone={prospect.fixedPhone}
                emailAddress={prospect.emailAddress?.address}
                webSite={prospect.webSite}
              />
            ),
          },
          {
            title: I18n.t('Crm_Addresses'),
            key: 2,
            childrenComp: (
              <DropdownAddressView
                partnerAddressList={prospect.partnerAddressList}
              />
            ),
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 3,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={prospect.user?.fullName}
                category={prospect.partnerCategory?.name}
                industrySector={prospect.industrySector?.name}
              />
            ),
          },
          {
            title: I18n.t('Crm_Employees'),
            key: 4,
            childrenComp: (
              <DropdownEmployeeView contactList={listContactById} />
            ),
          },
          {
            title: I18n.t('Crm_Events'),
            key: 5,
            childrenComp: <DropdownEventView eventList={listEventPartner} />,
          },
          {
            title: I18n.t('Crm_Opportunity'),
            key: 6,
            childrenComp: <DropdownOpportunityView partnerId={prospect?.id} />,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ProspectDropdownCards;
