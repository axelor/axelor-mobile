import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Checkbox,
  FormInput,
  NotesCard,
  Picker,
  Screen,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {fetchLeadById, updateLead} from '../../features/leadSlice';
import {fetchFunction} from '../../features/functionSlice';

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const {lead} = useSelector(state => state.lead);
  const {functionList} = useSelector(state => state.function);
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const [score, setScore] = useState(lead.leadScoringSelect);
  const [civility, setCivility] = useState(Number(lead.titleSelect));
  const [firstName, setFirstName] = useState(lead.firstName);

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

  const updateLeadAPI = useCallback(() => {
    dispatch(
      updateLead({
        leadId: lead.id,
        leadVersion: lead.version,
        leadCivility: civility,
        leadFirstname: firstName,
      }),
    );
  }, [dispatch, lead.id, lead.version, civility, firstName]);

  return (
    <Screen removeSpaceOnTop={true}>
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
                onPress={e => setScore(e)}
                editMode={true}
              />
              <Checkbox
                title={I18n.t('Crm_NoEmail')}
                isDefaultChecked={lead.isDoNotSendEmail}
                onChange={e => console.log('isDoNotSendEmail', e)}
              />
              <Checkbox
                title={I18n.t('Crm_NoPhoneCall')}
                isDefaultChecked={lead.isDoNotCall}
                onChange={e => console.log('isDoNotCall', e)}
              />
            </View>
          </View>
          <FormInput
            style={{width: '90%'}}
            title={I18n.t('Crm_FirstName')}
            onChange={e => setFirstName(e)}
            defaultValue={firstName}
          />
          <FormInput
            style={{width: '90%'}}
            title={I18n.t('Crm_Name')}
            onChange={e => console.log('name', e)}
            defaultValue={lead?.name !== null ? lead?.name : ''}
          />
          <FormInput
            style={{width: '90%'}}
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
              onValueChange={e => console.log('job', e)}
              listItems={functionList}
              labelField="name"
              valueField="id"
              defaultValue={
                functionList.find(
                  job => job.name === lead.jobTitleFunction.name,
                )?.id
              }
            />
          </View>
          <FormInput
            style={{width: '90%'}}
            title={I18n.t('Crm_Address')}
            onChange={e => console.log('Address', e)}
            defaultValue={
              lead?.primaryAddress !== null ? lead?.primaryAddress : ''
            }
          />
          <FormInput
            style={{width: '90%'}}
            title={I18n.t('Crm_FixedPhone')}
            onChange={e => console.log('fixedPhone', e)}
            defaultValue={lead?.fixedPhone !== null ? lead?.fixedPhone : ''}
          />
          <FormInput
            style={{width: '90%'}}
            title={I18n.t('Crm_MobilePhone')}
            onChange={e => console.log('mobilePhone', e)}
            defaultValue={
              lead?.mobilePhone !== null ? lead?.primamobilePhoneryAddress : ''
            }
          />
          <FormInput
            style={{width: '90%'}}
            title={I18n.t('Crm_EmailAddress')}
            onChange={e => console.log('emailAddress', e)}
            defaultValue={
              lead.emailAddress?.address !== null
                ? lead.emailAddress?.address
                : ''
            }
          />
          <FormInput
            style={{width: '90%'}}
            title={I18n.t('Crm_WebSite')}
            onChange={e => console.log('webSite', e)}
            defaultValue={lead.webSite !== null ? lead.webSite : ''}
          />
        </View>
        <NotesCard
          title={I18n.t('Crm_LeadNotes')}
          data={lead.description !== null ? lead.description : ''}
        />
      </ScrollView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={() => updateLeadAPI()} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
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
});

export default LeadFormScreen;
