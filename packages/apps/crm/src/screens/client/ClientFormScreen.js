import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Button, FormInput, HtmlInput, Screen} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';

import {getClientbyId, updateClient} from '../../features/clientSlice';

const ClientFormScreen = ({navigation, route}) => {
  const idClient = route.params.idClient;
  const {client} = useSelector(state => state.client);
  const dispatch = useDispatch();
  const I18n = useTranslator();
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
        emailVersion: client.emailAddress.$version,
        emailId: client.emailAddress.id,
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
    client.emailAddress.$version,
    client.emailAddress.id,
    description,
  ]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={200}>
        <ScrollView>
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
            <HtmlInput
              title={I18n.t('Crm_LeadNotes')}
              onChange={setDescription}
              defaultInput={description}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={() => updateClientAPI()} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
  },
  checkBoxContainer: {
    flexDirection: 'column',
    width: '50%',
    marginLeft: '10%',
  },
  halfHeader: {
    width: '50%',
  },
  picker: {
    width: '100%',
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
