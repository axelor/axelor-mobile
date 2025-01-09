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
import {StyleSheet, View} from 'react-native';
import {
  Button,
  FormHtmlInput,
  FormInput,
  KeyboardAvoidingScrollView,
  Screen,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';

import {getClientbyId, updateClient} from '../../features/clientSlice';

const ClientFormScreen = ({navigation, route}) => {
  const idClient = route.params.idClient;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {client} = useSelector(state => state.client);

  const [name, setName] = useState(client.name);
  const [fixedPhone, setFixedPhone] = useState(client.fixedPhone);
  const [email, setEmail] = useState(client.emailAddress?.address);
  const [webSite, setWebSite] = useState(client.webSite);
  const [description, setDescription] = useState(client.description);

  useEffect(() => {
    dispatch(getClientbyId({clientId: idClient}));
  }, [dispatch, idClient]);

  const updateClientAPI = useCallback(() => {
    dispatch(
      updateClient({
        clientId: client.id,
        clientVersion: client.version,
        clientName: name,
        clientFixedPhone: fixedPhone,
        clientWebsite: webSite,
        clientEmail: email,
        emailVersion: client.emailAddress?.$version,
        emailId: client.emailAddress?.id,
        clientDescription: description,
      }),
      navigation.navigate('ClientDetailsScreen', {
        idClient: client.id,
      }),
    );
  }, [
    dispatch,
    client.id,
    client.version,
    name,
    fixedPhone,
    webSite,
    navigation,
    email,
    client.emailAddress?.$version,
    client.emailAddress?.id,
    description,
  ]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <View style={styles.container}>
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Name')}
            onChange={setName}
            defaultValue={name}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Phone')}
            onChange={setFixedPhone}
            defaultValue={fixedPhone}
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
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={updateClientAPI} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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

export default ClientFormScreen;
