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
import {fetchCrmConfigApi} from '../../features/crmConfigSlice';
import {fetchCompanyById} from '../../features/companySlice';
import {
  ClientProspectSearchBar,
  ContactSearchBar,
  OpportunityValidateButton,
} from '../../components';

const isObjectMissingRequiredField = object =>
  object.partner == null ||
  object.contact == null ||
  object.opportunityStatus == null;

const OpportunityFormScreen = ({route}) => {
  const idOpportunity = route.params.opportunityId;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  const {crmConfig} = useSelector(state => state.crmConfig);
  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

  const [_opportunity, setOpportunity] = useState(
    idOpportunity != null
      ? opportunity
      : {
          amount: 0,
          recurrentAmount: 0,
          opportunityRating: 0,
          probability: '0',
          worstCase: '0',
          expectedDurationOfRecurringRevenue: 0,
          bestCase: '0',
        },
  );
  const [score, setScore] = useState(_opportunity.opportunityRating);
  const [partner, setPartner] = useState(_opportunity.partner);
  const [contact, setContact] = useState(_opportunity.contact);
  const [disabledButton, setDisabledButton] = useState(
    isObjectMissingRequiredField(_opportunity),
  );

  const handleOpportunityFieldChange = useCallback((newValue, fieldName) => {
    setOpportunity(current => {
      if (!current) {
        return {[fieldName]: newValue};
      }
      current[fieldName] = newValue;
      setDisabledButton(isObjectMissingRequiredField(current));
      return current;
    });
  }, []);

  const handleChangeScore = useCallback(
    newValue => {
      setScore(newValue);
      handleOpportunityFieldChange(newValue, 'opportunityRating');
    },
    [handleOpportunityFieldChange],
  );

  const handleChangePartner = useCallback(
    newValue => {
      setPartner(newValue);
      handleOpportunityFieldChange(newValue, 'partner');
    },
    [handleOpportunityFieldChange],
  );

  const handleChangeContact = useCallback(
    newValue => {
      setContact(newValue);
      handleOpportunityFieldChange(newValue, 'contact');
    },
    [handleOpportunityFieldChange],
  );

  useEffect(() => {
    dispatch(fetchCrmConfigApi());
  }, [dispatch]);

  useEffect(() => {
    if (user?.activeTeam?.id != null) {
      dispatch(
        fetchCompanyById({
          companyId: user?.activeCompany?.id,
        }),
      );
    }
  }, [dispatch, user]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <View style={styles.headerContainer}>
          <StarScore
            style={styles.score}
            score={score}
            showMissingStar={true}
            onPress={handleChangeScore}
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
            onChange={handleChangePartner}
            styleTxt={styles.marginTitle}
            required={true}
          />
          <ContactSearchBar
            titleKey="Crm_Contact"
            placeholderKey="Crm_Contact"
            defaultValue={contact}
            onChange={handleChangeContact}
            styleTxt={styles.marginTitle}
            required={true}
          />
          <DateInput
            title={I18n.t('Crm_Opportunity_ExpectedCloseDate')}
            defaultDate={
              _opportunity.expectedCloseDate != null
                ? new Date(_opportunity.expectedCloseDate)
                : null
            }
            onDateChange={value =>
              handleOpportunityFieldChange(
                value?.toISOString().split('T')[0],
                'expectedCloseDate',
              )
            }
            style={styles.input}
          />
          <FormIncrementInput
            title={I18n.t('Crm_Opportunity_Amount')}
            defaultValue={_opportunity.amount}
            onChange={value => handleOpportunityFieldChange(value, 'amount')}
            decimalSpacer={I18n.t('Base_DecimalSpacer')}
            thousandSpacer={I18n.t('Base_ThousandSpacer')}
            style={styles.input}
          />
          {crmConfig?.isManageRecurrent && (
            <FormIncrementInput
              title={I18n.t('Crm_Opportunity_RecurrentAmount')}
              defaultValue={_opportunity.recurrentAmount}
              onChange={value =>
                handleOpportunityFieldChange(value, 'recurrentAmount')
              }
              decimalSpacer={I18n.t('Base_DecimalSpacer')}
              thousandSpacer={I18n.t('Base_ThousandSpacer')}
            />
          )}
          <FormHtmlInput
            title={I18n.t('Base_Description')}
            onChange={value =>
              handleOpportunityFieldChange(value, 'description')
            }
            defaultValue={_opportunity.description}
          />
          <Picker
            title={I18n.t('Crm_Opportunity_Status')}
            defaultValue={_opportunity.opportunityStatus?.id}
            listItems={opportunityStatusList}
            labelField="name"
            valueField="id"
            emptyValue={false}
            onValueChange={value =>
              handleOpportunityFieldChange({id: value}, 'opportunityStatus')
            }
            isScrollViewContainer={true}
            required={true}
            style={styles.input}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <OpportunityValidateButton
        _opportunity={_opportunity}
        idOpportunity={idOpportunity}
        disabled={disabledButton}
      />
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
  input: {
    width: '90%',
  },
});

export default OpportunityFormScreen;
