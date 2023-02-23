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
  Checkbox,
  FormHtmlInput,
  FormInput,
  Picker,
  Screen,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {
  fetchLeadById,
  updateLead,
  updateLeadScore,
} from '../../features/leadSlice';
import {fetchFunction} from '../../features/functionSlice';
import {useCivilityList} from '../../hooks/use-civility-list';

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const {lead} = useSelector(state => state.lead);
  const {functionList} = useSelector(state => state.function);
  const {civilityList} = useCivilityList();
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const [civility, setCivility] = useState(Number(lead.titleSelect));
  const [firstName, setFirstName] = useState(lead.firstName);
  const [name, setName] = useState(lead.name);
  const [leadJob, setLeadJob] = useState(lead.jobTitleFunction.id);
  const [leadAdress, setLeadAdress] = useState(lead.primaryAddress);
  const [fixedPhone, setFixedPhone] = useState(lead.fixedPhone);
  const [mobilePhone, setMobilePhone] = useState(lead.mobilePhone);
  const [email, setEmail] = useState(lead.emailAddress?.address);
  const [webSite, setWebSite] = useState(lead.webSite);
  const [leadNoCall, setLeadNoCall] = useState(lead.isDoNotCall);
  const [leadNoEmail, setLeadNoEmail] = useState(lead.isDoNotSendEmail);
  const [leadCompany, setLeadCompany] = useState(lead.enterpriseName);
  const [description, setDescription] = useState(lead.description);

  useEffect(() => {
    dispatch(fetchLeadById({leadId: idLead}));
    dispatch(fetchFunction());
  }, [dispatch, idLead]);

  const updateScoreLeadAPI = useCallback(
    newScore => {
      dispatch(
        updateLeadScore({
          leadId: lead.id,
          leadVersion: lead.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, lead.id, lead.version],
  );

  const updateLeadAPI = useCallback(() => {
    dispatch(
      updateLead({
        leadId: lead.id,
        leadVersion: lead.version,
        leadCivility: civility,
        leadFirstname: firstName,
        leadName: name,
        leadJob: leadJob,
        leadAdress: leadAdress !== '' ? leadAdress : null,
        leadFixedPhone: fixedPhone !== '' ? fixedPhone : null,
        leadMobilePhone: mobilePhone !== '' ? mobilePhone : null,
        leadWebsite: webSite !== '' ? webSite : null,
        leadNoCall: leadNoCall,
        leadNoEmail: leadNoEmail,
        leadCompany: leadCompany,
        leadEmail: email !== '' ? email : null,
        emailId: lead.emailAddress.id,
        emailVersion: lead.emailAddress.$version,
        leadDescription: description !== '' ? description : null,
      }),
    );

    navigation.navigate('LeadDetailsScreen', {
      idLead: lead.id,
    });
  }, [
    dispatch,
    lead.id,
    lead.version,
    civility,
    firstName,
    name,
    leadJob,
    leadAdress,
    fixedPhone,
    mobilePhone,
    webSite,
    leadNoCall,
    leadNoEmail,
    email,
    leadCompany,
    lead.emailAddress.id,
    lead.emailAddress.$version,
    description,
    navigation,
  ]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={180}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.halfHeader}>
                <Picker
                  pickerStyle={styles.civilityPicker}
                  title={I18n.t('Crm_Civility')}
                  onValueChange={setCivility}
                  listItems={civilityList}
                  labelField="name"
                  valueField="id"
                  defaultValue={civility}
                />
              </View>
              <View style={styles.checkBoxContainer}>
                <StarScore
                  score={lead.leadScoringSelect}
                  showMissingStar={true}
                  onPress={updateScoreLeadAPI}
                  editMode={true}
                />
                <Checkbox
                  title={I18n.t('Crm_NoEmail')}
                  isDefaultChecked={leadNoEmail}
                  onChange={setLeadNoEmail}
                  iconSize={20}
                />
                <Checkbox
                  title={I18n.t('Crm_NoPhoneCall')}
                  isDefaultChecked={leadNoCall}
                  onChange={setLeadNoCall}
                  iconSize={20}
                />
              </View>
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
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Company')}
              onChange={setLeadCompany}
              defaultValue={leadCompany}
            />
            <Picker
              title={I18n.t('Crm_JobTitle')}
              onValueChange={setLeadJob}
              listItems={functionList}
              labelField="name"
              valueField="id"
              defaultValue={leadJob}
              style={styles.picker}
              styleTxt={styles.pickerTitle}
            />
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Adress')}
              onChange={setLeadAdress}
              defaultValue={leadAdress}
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
              title={I18n.t('Crm_Description')}
              onChange={setDescription}
              defaultValue={description}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={updateLeadAPI} />
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
  halfHeader: {
    width: '50%',
  },
  checkBoxContainer: {
    flexDirection: 'column',
    width: '50%',
    marginLeft: '10%',
  },
  picker: {
    width: '100%',
    marginLeft: 5,
  },
  civilityPicker: {
    width: '100%',
    marginLeft: 12,
  },
  pickerTitle: {
    marginLeft: 5,
  },
  input: {
    width: '90%',
  },
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default LeadFormScreen;
