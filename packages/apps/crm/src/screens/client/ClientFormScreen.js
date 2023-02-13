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
import {fetchPartner} from '../../features/partnerSlice';

const ClientFormScreen = ({navigation, route}) => {
  const idClient = route.params.idClient;
  const {partner} = useSelector(state => state.partner);
  const {functionList} = useSelector(state => state.function);
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const [name, setName] = useState(partner.name);
  const [fixedPhone, setFixedPhone] = useState(partner.fixedPhone);
  const [mobilePhone, setMobilePhone] = useState(partner.mobilePhone);
  const [email, setEmail] = useState(partner.emailAddress?.address);
  const [webSite, setWebSite] = useState(partner.webSite);
  const [description, setDescription] = useState(partner.description);

  useEffect(() => {
    dispatch(fetchPartner({partnerId: idClient}));
  }, [dispatch, idClient]);

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
            <HtmlInput
              title={I18n.t('Crm_LeadNotes')}
              onChange={setDescription}
              defaultInput={description}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={() => console.log('e')} />
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
