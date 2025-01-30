/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  getOpportunity,
  updateOpportunity,
} from '../../features/opportunitySlice';
import {fetchCrmConfigApi} from '../../features/crmConfigSlice';
import {ClientProspectSearchBar} from '../../components';

const OpportunityFormScreen = ({navigation, route}) => {
  const idOpportunity = route.params.opportunityId;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {crmConfig} = useSelector(state => state.crmConfig);
  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

  const [score, setScore] = useState(opportunity.opportunityRating);
  const [partner, setPartner] = useState(opportunity.partner);
  const [date, setDate] = useState(new Date(opportunity.expectedCloseDate));
  const [amount, setAmount] = useState(opportunity.amount);
  const [recurrent, setRecurrent] = useState(opportunity.recurrentAmount);
  const [description, setDescription] = useState(opportunity.description);
  const [status, setStatus] = useState(opportunity.opportunityStatus?.id);

  useEffect(() => {
    dispatch(
      getOpportunity({
        opportunityId: idOpportunity,
      }),
    );
    dispatch(fetchCrmConfigApi());
  }, [dispatch, idOpportunity]);

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
            styleTxt={styles.marginTitle}
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
            style={styles.input}
          />
          <Picker
            styleTxt={styles.marginPicker}
            title={I18n.t('Crm_Opportunity_Status')}
            defaultValue={status}
            listItems={opportunityStatusList}
            labelField="name"
            valueField="id"
            emptyValue={false}
            onValueChange={setStatus}
            isScrollViewContainer={true}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={updateOpportunityAPI} />
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
  marginTitle: {
    marginLeft: 28,
  },
  marginPicker: {
    marginLeft: 5,
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
