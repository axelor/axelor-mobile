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

import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Checkbox,
  FormHtmlInput,
  FormInput,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {fetchLeadById} from '../../features/leadSlice';
import {fetchFunction} from '../../features/functionSlice';
import {useCivilityList} from '../../hooks/use-civility-list';
import {ValidateButtonLead} from '../../components';

const hasRequiredField = object => {
  if (object.name == null) {
    return true;
  }
  return false;
};

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {lead} = useSelector(state => state.lead);
  const {functionList} = useSelector(state => state.function);
  const {civilityList} = useCivilityList();

  const [_lead, setLead] = useState(idLead != null ? lead : {});
  const [disabledButton, setDisabledButton] = useState(
    idLead != null ? hasRequiredField(lead) : true,
  );
  const [score, setScore] = useState(
    idLead != null ? lead.leadScoringSelect : 0,
  );

  const handleLeadFieldChange = (newValue, fieldName) => {
    setLead(current => {
      if (!current) {
        return {[fieldName]: newValue};
      }
      current[fieldName] = newValue;
      return current;
    });
    setDisabledButton(hasRequiredField(_lead));
  };

  const handleChangeScore = (newValue, fieldName) => {
    setScore(newValue);
    handleLeadFieldChange(newValue, fieldName);
  };

  useEffect(() => {
    dispatch(fetchFunction());
  }, [dispatch]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView style={styles.scroll}>
        <View style={[styles.container, getZIndexStyles(30)]}>
          <View style={[styles.headerContainer, getZIndexStyles(35)]}>
            <View style={[styles.halfHeader, getZIndexStyles(40)]}>
              <Picker
                pickerStyle={styles.civilityPicker}
                title={I18n.t('Crm_Civility')}
                onValueChange={value =>
                  handleLeadFieldChange(value, 'titleSelect')
                }
                listItems={civilityList}
                labelField="name"
                valueField="id"
                defaultValue={Number(_lead.titleSelect)}
              />
            </View>
            <View style={styles.checkBoxContainer}>
              <StarScore
                score={score}
                showMissingStar={true}
                onPress={value => handleChangeScore(value, 'leadScoringSelect')}
                editMode={true}
              />
              <Checkbox
                title={I18n.t('Crm_NoEmail')}
                isDefaultChecked={_lead.isDoNotSendEmail}
                onChange={value =>
                  handleLeadFieldChange(value, 'isDoNotSendEmail')
                }
                iconSize={20}
              />
              <Checkbox
                title={I18n.t('Crm_NoPhoneCall')}
                isDefaultChecked={_lead.isDoNotCall}
                onChange={value => handleLeadFieldChange(value, 'isDoNotCall')}
                iconSize={20}
              />
            </View>
          </View>
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_FirstName')}
            onChange={value => handleLeadFieldChange(value, 'firstName')}
            defaultValue={_lead.firstName}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Name')}
            onChange={value => handleLeadFieldChange(value, 'name')}
            defaultValue={_lead.name}
            required={true}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Company')}
            onChange={value => handleLeadFieldChange(value, 'enterpriseName')}
            defaultValue={_lead.enterpriseName}
          />
          <Picker
            title={I18n.t('Crm_JobTitle')}
            onValueChange={value =>
              handleLeadFieldChange(
                {
                  id: value,
                },
                'jobTitleFunction',
              )
            }
            listItems={functionList}
            labelField="name"
            valueField="id"
            defaultValue={_lead.jobTitleFunction?.id}
            style={styles.picker}
            styleTxt={styles.pickerTitle}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Adress')}
            onChange={value => handleLeadFieldChange(value, 'primaryAddress')}
            defaultValue={_lead.primaryAddress}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Phone')}
            onChange={value => handleLeadFieldChange(value, 'fixedPhone')}
            defaultValue={_lead.fixedPhone}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_MobilePhone')}
            onChange={value => handleLeadFieldChange(value, 'mobilePhone')}
            defaultValue={_lead.mobilePhone}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_Email')}
            onChange={value =>
              handleLeadFieldChange({address: value}, 'emailAddress')
            }
            defaultValue={_lead.emailAddress?.address}
          />
          <FormInput
            style={styles.input}
            title={I18n.t('Crm_WebSite')}
            onChange={value => handleLeadFieldChange(value, 'webSite')}
            defaultValue={_lead.webSite}
          />
          <FormHtmlInput
            title={I18n.t('Crm_Description')}
            onChange={value => handleLeadFieldChange(value, 'description')}
            defaultValue={_lead.description}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <ValidateButtonLead
        _lead={_lead}
        idLead={idLead}
        disabled={disabledButton}
      />
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
