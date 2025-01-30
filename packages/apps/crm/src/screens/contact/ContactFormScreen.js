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

import React, {useEffect, useState, useCallback} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Button,
  FormHtmlInput,
  FormInput,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {ClientProspectSearchBar} from '../../components';
import {getContact} from '../../features/contactSlice';
import {updateContact} from '../../features/contactSlice';
import {useCivilityList} from '../../hooks/use-civility-list';

const ContactFormScreen = ({navigation, route}) => {
  const idContact = route.params.idContact;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {contact} = useSelector(state => state.contact);
  const {civilityList} = useCivilityList();

  const [civility, setCivility] = useState(Number(contact.titleSelect));
  const [firstName, setFirstName] = useState(contact.firstName);
  const [name, setName] = useState(contact.name);
  const [fixedPhone, setFixedPhone] = useState(contact.fixedPhone);
  const [mobilePhone, setMobilePhone] = useState(contact.mobilePhone);
  const [email, setEmail] = useState(contact.emailAddress?.address);
  const [webSite, setWebSite] = useState(contact.webSite);
  const [description, setDescription] = useState(contact.description);
  const [clientAndProspect, setClientAndProspect] = useState(
    contact.mainPartner,
  );

  useEffect(() => {
    dispatch(getContact({contactId: idContact}));
  }, [dispatch, idContact]);

  const updateContactAPI = useCallback(() => {
    dispatch(
      updateContact({
        contactId: contact.id,
        contactVersion: contact.version,
        contactCivility: civility,
        contactFirstname: firstName,
        contactName: name,
        contactFixedPhone: fixedPhone,
        contactMobilePhone: mobilePhone,
        contactWebsite: webSite,
        contactDescription: description,
        mainPartnerId: clientAndProspect?.id,
        emailId: contact.emailAddress?.id,
        emailVersion: contact.emailAddress?.$version,
        contactEmail: email,
      }),
    );
    navigation.navigate('ContactDetailsScreen', {
      idContact: contact.id,
    });
  }, [
    dispatch,
    navigation,
    clientAndProspect,
    contact.id,
    contact.version,
    civility,
    firstName,
    name,
    fixedPhone,
    mobilePhone,
    webSite,
    description,
    contact.emailAddress,
    email,
  ]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <View
          style={[
            styles.container,
            Platform.OS === 'ios' ? styles.containerZIndex : null,
          ]}>
          <Picker
            styleTxt={styles.marginPicker}
            title={I18n.t('Crm_Civility')}
            onValueChange={setCivility}
            listItems={civilityList}
            labelField="name"
            valueField="id"
            defaultValue={civility}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_FirstName')}
            onChange={setFirstName}
            defaultValue={firstName}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Name')}
            onChange={setName}
            defaultValue={name}
          />
          <ClientProspectSearchBar
            titleKey="Crm_ClientProspect"
            placeholderKey="Crm_ClientProspect"
            defaultValue={clientAndProspect}
            onChange={setClientAndProspect}
            styleTxt={styles.marginTitle}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Phone')}
            onChange={setFixedPhone}
            defaultValue={fixedPhone}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_MobilePhone')}
            onChange={setMobilePhone}
            defaultValue={mobilePhone}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Email')}
            onChange={setEmail}
            defaultValue={email}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_WebSite')}
            onChange={setWebSite}
            defaultValue={webSite}
          />
          <FormHtmlInput
            title={I18n.t('Crm_Notes')}
            onChange={setDescription}
            defaultValue={description}
            style={styles.input}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={updateContactAPI} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerZIndex: {
    zIndex: 40,
  },
  marginPicker: {
    marginLeft: 5,
  },
  picker: {
    width: '100%',
  },
  marginTitle: {
    marginLeft: 28,
  },
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    width: '90%',
  },
});

export default ContactFormScreen;
