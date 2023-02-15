import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Button,
  FormHtmlInput,
  FormInput,
  Picker,
  Screen,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTranslator,
  AutoCompleteSearchInput,
} from '@axelor/aos-mobile-core';
import {getContact} from '../../features/contactSlice';
import {fetchClientAndProspect} from '../../features/partnerSlice';
import {updateContact} from '../../features/contactSlice';
import {useCivilityList} from '../../hooks/use-civility-list';

const ContactFormScreen = ({navigation, route}) => {
  const idContact = route.params.idContact;
  const {contact} = useSelector(state => state.contact);
  const {clientAndProspectList} = useSelector(state => state.partner);
  const {civilityList} = useCivilityList();
  const dispatch = useDispatch();
  const I18n = useTranslator();

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={180}>
        <ScrollView>
          <View style={styles.container}>
            <Picker
              style={[styles.picker, styles.marginPicker]}
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
            <AutoCompleteSearchInput
              style={[styles.picker, styles.marginPicker]}
              styleTxt={styles.marginTitle}
              title={I18n.t('Crm_ClientProspect')}
              objectList={clientAndProspectList}
              value={clientAndProspect}
              searchField="fullName"
              onChangeValue={setClientAndProspect}
              searchAPI={fetchClientAndProspect}
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
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={updateContactAPI} />
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
