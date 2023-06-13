/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  Checkbox,
  FormHtmlInput,
  FormInput,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {createLead, fetchLeadById, updateLead} from '../../features/leadSlice';
import {fetchFunction} from '../../features/functionSlice';
import {useCivilityList} from '../../hooks/use-civility-list';

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {lead} = useSelector(state => state.lead);
  const {functionList} = useSelector(state => state.function);
  const {civilityList} = useCivilityList();
  const {userId} = useSelector(state => state.auth);

  const [score, setScore] = useState(
    idLead != null ? lead.leadScoringSelect : 0,
  );
  const [civility, setCivility] = useState(Number(lead.titleSelect));
  const [firstName, setFirstName] = useState(
    idLead != null ? lead.firstName : null,
  );
  const [name, setName] = useState(idLead != null ? lead.name : null);
  const [leadJob, setLeadJob] = useState(
    idLead != null ? lead.jobTitleFunction?.id : null,
  );
  const [leadAdress, setLeadAdress] = useState(
    idLead != null ? lead.primaryAddress : null,
  );
  const [fixedPhone, setFixedPhone] = useState(
    idLead != null ? lead.fixedPhone : null,
  );
  const [mobilePhone, setMobilePhone] = useState(
    idLead != null ? lead.mobilePhone : null,
  );
  const [email, setEmail] = useState(
    idLead != null ? lead.emailAddress?.address : null,
  );
  const [webSite, setWebSite] = useState(idLead != null ? lead.webSite : null);
  const [leadNoCall, setLeadNoCall] = useState(
    idLead != null ? lead.isDoNotCall : false,
  );
  const [leadNoEmail, setLeadNoEmail] = useState(
    idLead != null ? lead.isDoNotSendEmail : false,
  );
  const [leadCompany, setLeadCompany] = useState(
    idLead != null ? lead.enterpriseName : null,
  );
  const [description, setDescription] = useState(
    idLead != null ? lead.description : null,
  );

  useEffect(() => {
    if (idLead != null) {
      dispatch(fetchLeadById({leadId: idLead}));
    }
    dispatch(fetchFunction());
  }, [dispatch, idLead]);

  const updateLeadAPI = useCallback(() => {
    dispatch(
      updateLead({
        leadId: lead.id,
        leadVersion: lead.version,
        leadScore: score,
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
        emailId: lead.emailAddress?.id,
        emailVersion: lead.emailAddress?.$version,
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
    lead.emailAddress?.id,
    lead.emailAddress?.$version,
    score,
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
    leadCompany,
    email,
    description,
    navigation,
  ]);

  const crealteLeadAPI = useCallback(() => {
    dispatch(
      createLead({
        leadScore: score,
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
        leadDescription: description !== '' ? description : null,
        contactDate: new Date().toISOString().split('T')[0],
        userId: userId,
      }),
    ).then(res => {
      navigation.navigate('LeadDetailsScreen', {
        idLead: res.payload?.id,
      });
    });
  }, [
    dispatch,
    score,
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
    leadCompany,
    email,
    description,
    userId,
    navigation,
  ]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView style={styles.scroll}>
        <View style={[styles.container, getZIndexStyles(30)]}>
          <View style={[styles.headerContainer, getZIndexStyles(35)]}>
            <View style={[styles.halfHeader, getZIndexStyles(40)]}>
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
                score={score}
                showMissingStar={true}
                onPress={setScore}
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
            required={true}
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
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button
          title={I18n.t('Base_Save')}
          onPress={idLead != null ? updateLeadAPI : crealteLeadAPI}
        />
      </View>
    </Screen>
  );
};

const getZIndexStyles = value =>
  Platform.OS === 'ios' ? {zIndex: value} : null;

const styles = StyleSheet.create({
  scroll: {
    height: null,
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
