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
  FormInput,
  HtmlInput,
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

const ContactFormScreen = ({navigation, route}) => {
  const idContact = route.params.idContact;
  const {contact} = useSelector(state => state.contact);
  const {clientAndProspectList} = useSelector(state => state.partner);
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
  const [adress, setAdress] = useState(contact.mainAddress?.fullName);
  const [clientAndProspect, setClientAndProspect] = useState(
    contact.mainPartner,
  );
  useEffect(() => {
    dispatch(getContact({contactId: idContact}));
  }, [dispatch, idContact]);

  const civilityList = [
    {id: 1, name: 'M.'},
    {id: 2, name: 'Mme.'},
    {id: 3, name: 'Dr'},
    {id: 4, name: 'Prof'},
  ];

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
      }),
    );
    navigation.navigate('ContactDetailsScreen', {
      idContact: contact.id,
      contactMainPartner: clientAndProspect,
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
  ]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={200}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.picker}>
              <Picker
                title={I18n.t('Crm_Civility')}
                onValueChange={e => setCivility(e)}
                listItems={civilityList}
                labelField="name"
                valueField="id"
                defaultValue={civility}
              />
            </View>
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

            <View style={styles.picker}>
              <AutoCompleteSearchInput
                title={I18n.t('Crm_ClientProspect')}
                objectList={clientAndProspectList}
                value={clientAndProspect}
                searchField="fullName"
                onChangeValue={setClientAndProspect}
                searchAPI={fetchClientAndProspect}
              />
            </View>
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Adress')}
              onChange={setAdress}
              defaultValue={adress}
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
        <Button
          title={I18n.t('Base_Save')}
          onPress={() => updateContactAPI()}
        />
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

export default ContactFormScreen;
