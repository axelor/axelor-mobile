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
  FormInput,
  HtmlInput,
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

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const {lead} = useSelector(state => state.lead);
  const {functionList} = useSelector(state => state.function);
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const [civility, setCivility] = useState(Number(lead.titleSelect));
  const [firstName, setFirstName] = useState(lead.firstName);
  const [name, setName] = useState(lead.name);
  const [leadJob, setLeadJob] = useState(lead.jobTitleFunction.id);
  const [leadAdress, setLeadAdress] = useState(
    lead.primaryAddress !== null ? lead.primaryAddress : '',
  );
  const [fixedPhone, setFixedPhone] = useState(
    lead.fixedPhone !== null ? lead.fixedPhone : '',
  );
  const [mobilePhone, setMobilePhone] = useState(
    lead?.mobilePhone !== null ? lead?.mobilePhone : '',
  );
  const [email, setEmail] = useState(
    lead.emailAddress?.address !== null ? lead.emailAddress?.address : '',
  );
  const [webSite, setWebSite] = useState(
    lead.webSite !== null ? lead.webSite : '',
  );
  const [leadNoCall, setLeadNoCall] = useState(lead.isDoNotCall);
  const [leadNoEmail, setLeadNoEmail] = useState(lead.isDoNotSendEmail);

  useEffect(() => {
    dispatch(fetchLeadById({leadId: idLead}));
    dispatch(fetchFunction());
  }, [dispatch, idLead]);

  const civilityList = [
    {id: 1, name: 'M.'},
    {id: 2, name: 'Mme.'},
    {id: 3, name: 'Dr'},
    {id: 4, name: 'Prof'},
  ];

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
        leadAdress: leadAdress,
        leadFixedPhone: fixedPhone !== '' ? fixedPhone : null,
        leadMobilePhone: mobilePhone !== '' ? mobilePhone : null,
        leadWebsite: webSite,
        leadNoCall: leadNoCall,
        leadNoEmail: leadNoEmail,
      }),
    );
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
  ]);

  return (
    <Screen removeSpaceOnTop={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={{width: '50%'}}>
                <Picker
                  pickerStyle={{width: '100%'}}
                  title={I18n.t('Crm_Civility')}
                  onValueChange={e => setCivility(e)}
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
                  onChange={e => setLeadNoEmail(e)}
                />
                <Checkbox
                  title={I18n.t('Crm_NoPhoneCall')}
                  isDefaultChecked={leadNoCall}
                  onChange={e => setLeadNoCall(e)}
                />
              </View>
            </View>
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_FirstName')}
              onChange={e => setFirstName(e)}
              defaultValue={firstName}
            />
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Name')}
              onChange={e => setName(e)}
              defaultValue={name}
            />
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Company')}
              onChange={e => console.log('company', e)}
              defaultValue={
                lead?.enterpriseName !== null ? lead?.enterpriseName : ''
              }
            />
            <View style={{width: '100%'}}>
              <Picker
                //pickerStyle={{width: '100%'}}
                title={I18n.t('Crm_JobTitle')}
                onValueChange={e => setLeadJob(e)}
                listItems={functionList}
                labelField="name"
                valueField="id"
                defaultValue={leadJob}
              />
            </View>
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Adress')}
              onChange={e => setLeadAdress(e)}
              defaultValue={leadAdress}
            />
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Phone')}
              onChange={e => setFixedPhone(e)}
              defaultValue={fixedPhone}
            />
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_MobilePhone')}
              onChange={e => setMobilePhone(e)}
              defaultValue={mobilePhone}
            />
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Email')}
              onChange={e => setEmail(e)}
              defaultValue={email}
            />
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_WebSite')}
              onChange={e => setWebSite(e)}
              defaultValue={webSite}
            />
          </View>
          {/*<HtmlInput
                title={I18n.t('Crm_LeadNotes')}
                onChange={e => console.log('test', e)}
                defaultInput={lead.description !== null ? lead.description : ''}
              />*/}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={() => updateLeadAPI()} />
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

export default LeadFormScreen;
