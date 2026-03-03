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

import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DropdownContactPartnerView,
  DropdownContactView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {getContact} from '../../../../features/contactSlice';
import {fetchContactEventById} from '../../../../features/eventSlice';

const ContactDropdownCards = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {contact} = useSelector(state => state.contact);
  const {listEventContact} = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchContactEventById(contact?.id));
  }, [dispatch, contact]);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Crm_Contact'),
            key: 0,
            childrenComp: (
              <DropdownContactView
                contact={{...contact, address: contact.mainAddress}}
                networkData={{
                  fullName: contact.simpleFullName,
                  company: contact.mainPartner?.simpleFullName,
                }}
                refreshContactInfos={() =>
                  dispatch(getContact({contactId: contact.id}))
                }
              />
            ),
            isDefaultVisible: true,
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 10,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={contact.user?.fullName}
                language={contact.language?.name}
              />
            ),
          },
          {
            title: I18n.t('Crm_Events'),
            key: 20,
            childrenComp: <DropdownEventView eventList={listEventContact} />,
          },
          {
            title: I18n.t('Crm_LinkedPartnersOfContact'),
            key: 30,
            childrenComp: <DropdownContactPartnerView idContact={contact.id} />,
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

export default ContactDropdownCards;
