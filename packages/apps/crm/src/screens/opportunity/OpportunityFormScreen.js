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

import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Button,
  FormHtmlInput,
  FormIncrementInput,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {
  DateInput,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  createOpportunity,
  getOpportunity,
  updateOpportunity,
} from '../../features/opportunitySlice';
import {fetchCrmConfigApi} from '../../features/crmConfigSlice';
import {ClientProspectSearchBar, ContactSearchBar} from '../../components';

const OpportunityFormScreen = ({navigation, route}) => {
  const idOpportunity = route.params.opportunityId;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {userId} = useSelector(state => state.auth);
  const {crmConfig} = useSelector(state => state.crmConfig);
  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

  const [score, setScore] = useState(
    idOpportunity != null ? opportunity.opportunityRating : 0,
  );
  const [partner, setPartner] = useState(
    idOpportunity != null ? opportunity.partner : null,
  );
  const [contact, setContact] = useState(
    idOpportunity != null ? opportunity.contact : null,
  );
  const [date, setDate] = useState(
    idOpportunity != null ? new Date(opportunity.expectedCloseDate) : null,
  );
  const [amount, setAmount] = useState(
    idOpportunity != null ? opportunity.amount : null,
  );
  const [recurrent, setRecurrent] = useState(
    idOpportunity != null ? opportunity.recurrentAmount : null,
  );
  const [description, setDescription] = useState(
    idOpportunity != null ? opportunity.description : null,
  );
  const [status, setStatus] = useState(
    idOpportunity != null ? opportunity.opportunityStatus?.id : null,
  );

  useEffect(() => {
    if (idOpportunity != null) {
      dispatch(
        getOpportunity({
          opportunityId: idOpportunity,
        }),
      );
    }
    dispatch(fetchCrmConfigApi());
  }, [dispatch, idOpportunity]);

  const createOpportinityAPI = useCallback(() => {
    dispatch(
      createOpportunity({
        opportunityStatusId: status,
        opportunityRecurrentAmount: recurrent,
        opportunityAmount: amount,
        opportunityDescription: description,
        idPartner: partner?.id,
        opportunityRating: score,
        opportunityCloseDate: date?.toISOString().split('T')[0],
        idContact: contact?.id,
        userId: userId,
        name: partner?.fullName,
      }),
    ).then(res => {
      navigation.navigate('OpportunityDetailsScreen', {
        opportunityId: res.payload?.id,
      });
    });
  }, [
    dispatch,
    status,
    recurrent,
    amount,
    description,
    partner,
    score,
    date,
    contact,
    userId,
    navigation,
  ]);

  const updateOpportunityAPI = useCallback(() => {
    dispatch(
      updateOpportunity({
        opportunityId: opportunity.id,
        opportunityVersion: opportunity.version,
        opportunityStatusId: status,
        opportunityRecurrentAmount: recurrent,
        opportunityAmount: amount,
        opportunityDescription: description,
        idPartner: partner?.id,
        opportunityRating: score,
        opportunityCloseDate: date?.toISOString().split('T')[0],
        idContact: contact?.id,
      }),
    );

    navigation.navigate('OpportunityDetailsScreen', {
      opportunityId: opportunity.id,
    });
  }, [
    dispatch,
    opportunity,
    status,
    recurrent,
    amount,
    description,
    partner,
    score,
    date,
    contact,
    navigation,
  ]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <View style={styles.headerContainer}>
          <StarScore
            style={styles.score}
            score={score}
            showMissingStar={true}
            onPress={setScore}
            editMode={true}
          />
        </View>
        <View
          style={[
            styles.container,
            Platform.OS === 'ios' ? styles.containerZIndex : null,
          ]}>
          <ClientProspectSearchBar
            titleKey="Crm_ClientProspect"
            placeholderKey="Crm_ClientProspect"
            defaultValue={partner}
            onChange={setPartner}
            style={[styles.picker, styles.marginPicker]}
            styleTxt={styles.marginTitle}
            required={true}
          />
          <ContactSearchBar
            titleKey="Crm_Contact"
            placeholderKey="Crm_Contact"
            defaultValue={contact}
            onChange={setContact}
            style={[styles.picker, styles.marginPicker]}
            styleTxt={styles.marginTitle}
            required={true}
          />
          <DateInput
            title={I18n.t('Crm_Opportunity_ExpectedCloseDate')}
            defaultDate={date}
            onDateChange={setDate}
            style={styles.input}
          />
          <FormIncrementInput
            title={I18n.t('Crm_Opportunity_Amount')}
            defaultValue={amount}
            onChange={setAmount}
            decimalSpacer={I18n.t('Base_DecimalSpacer')}
            thousandSpacer={I18n.t('Base_ThousandSpacer')}
          />
          {crmConfig?.isManageRecurrent && (
            <FormIncrementInput
              title={I18n.t('Crm_Opportunity_RecurrentAmount')}
              defaultValue={recurrent}
              onChange={setRecurrent}
              decimalSpacer={I18n.t('Base_DecimalSpacer')}
              thousandSpacer={I18n.t('Base_ThousandSpacer')}
            />
          )}
          <FormHtmlInput
            title={I18n.t('Base_Description')}
            onChange={setDescription}
            defaultValue={description}
          />
          <Picker
            style={[styles.picker, styles.marginPicker]}
            styleTxt={styles.marginPicker}
            title={I18n.t('Crm_Opportunity_Status')}
            defaultValue={status}
            listItems={opportunityStatusList}
            labelField="name"
            valueField="id"
            emptyValue={false}
            onValueChange={setStatus}
            isScrollViewContainer={true}
            required={true}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button
          title={I18n.t('Base_Save')}
          onPress={
            idOpportunity != null ? updateOpportunityAPI : createOpportinityAPI
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  score: {
    marginRight: '10%',
  },
  container: {
    alignItems: 'center',
  },
  containerZIndex: {
    zIndex: 40,
  },
  headerContainer: {
    flexDirection: 'row-reverse',
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

export default OpportunityFormScreen;
