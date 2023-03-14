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

import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ContactBottom,
  ContactDropdownCards,
  ContactHeader,
  ContactPartnerCard,
} from '../../components';
import {getContact} from '../../features/contactSlice';

const ContactDetailsScreen = ({navigation, route}) => {
  const idContact = route.params.idContact;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {contact} = useSelector(state => state.contact);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={contact?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={contact?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, contact]);

  useEffect(() => {
    dispatch(getContact({contactId: idContact}));
  }, [dispatch, idContact]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ContactHeader />}
      />
      <ScrollView>
        <ContactPartnerCard navigation={navigation} />
        <NotesCard title={I18n.t('Crm_Notes')} data={contact.description} />
        <ContactDropdownCards navigation={navigation} />
      </ScrollView>
      <ContactBottom idContact={idContact} navigation={navigation} />
    </Screen>
  );
};

export default ContactDetailsScreen;
