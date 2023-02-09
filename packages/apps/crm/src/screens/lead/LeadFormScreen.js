import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Checkbox,
  FormInput,
  Picker,
  Screen,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {fetchLeadById} from '../../features/leadSlice';
import {fetchFunction} from '../../features/functionSlice';

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const {lead} = useSelector(state => state.lead);
  const {functionList} = useSelector(state => state.function);
  const dispatch = useDispatch();
  const I18n = useTranslator();
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

  return (
    <Screen removeSpaceOnTop={true}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={{width: '50%'}}>
              <Picker
                pickerStyle={{width: '100%'}}
                title={I18n.t('Crm_Civility')}
                onValueChange={e => console.log('civility', e)}
                listItems={civilityList}
                labelField="name"
                valueField="id"
                defaultValue={
                  civilityList.find(
                    civ => civ.id.toString() === lead.titleSelect.toString(),
                  )?.id
                }
              />
            </View>
            <View style={styles.checkBoxContainer}>
              <StarScore
                score={lead.leadScoringSelect}
                showMissingStar={true}
                onPress={e => console.log('starScore', e)}
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
            onChange={e => console.log('Firstname', e)}
            defaultValue={lead?.firstName !== null ? lead?.firstName : ''}
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
              pickerStyle={{width: '100%'}}
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
        </View>
      </ScrollView>
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
});

export default LeadFormScreen;
