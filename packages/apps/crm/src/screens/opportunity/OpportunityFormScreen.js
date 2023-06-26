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
import {getOpportunity} from '../../features/opportunitySlice';
import {fetchCrmConfigApi} from '../../features/crmConfigSlice';
import {
  ClientProspectSearchBar,
  ContactSearchBar,
  ValidateButtonOpportunity,
} from '../../components';
import {fetchCompanyById} from '../../features/companySlice';
import lead from '../lead';

const hasRequiredField = object => {
  if (
    object.partner == null ||
    object.contact == null ||
    object.opportunityStatus == null
  ) {
    return true;
  }
  return false;
};

const OpportunityFormScreen = ({navigation, route}) => {
  const idOpportunity = route.params.opportunityId;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);
  const {company} = useSelector(state => state.company);

  const {crmConfig} = useSelector(state => state.crmConfig);
  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

  const [_opportunity, setOpportunity] = useState(
    idOpportunity != null ? opportunity : {amount: 0, recurrentAmount: 0},
  );
  const [disabledButton, setDisabledButton] = useState(
    idOpportunity != null ? hasRequiredField(opportunity) : true,
  );
  const [score, setScore] = useState(
    idOpportunity != null ? opportunity.opportunityRating : 0,
  );

  const handleOpportunityFieldChange = (newValue, fieldName) => {
    setOpportunity(current => {
      if (!current) {
        return {[fieldName]: newValue};
      }
      current[fieldName] = newValue;
      return current;
    });
    setDisabledButton(hasRequiredField(_opportunity));
  };

  const handleChangeScore = (newValue, fieldName) => {
    setScore(newValue);
    handleOpportunityFieldChange(newValue, fieldName);
  };

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
            onPress={value => handleChangeScore(value, 'opportunityRating')}
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
            defaultValue={_opportunity.partner}
            onChange={value => handleOpportunityFieldChange(value, 'partner')}
            style={[styles.picker, styles.marginPicker]}
            styleTxt={styles.marginTitle}
            required={true}
          />
          <ContactSearchBar
            titleKey="Crm_Contact"
            placeholderKey="Crm_Contact"
            defaultValue={_opportunity.contact}
            onChange={value =>
              handleOpportunityFieldChange({id: value?.id}, 'contact')
            }
            style={[styles.picker, styles.marginPicker]}
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
            style={[styles.picker, styles.marginPicker]}
            styleTxt={styles.marginPicker}
            title={I18n.t('Crm_Opportunity_Status')}
            defaultValue={_opportunity.opportunityStatus?.id}
            listItems={opportunityStatusList}
            labelField="name"
            valueField="id"
            emptyValue={false}
            onValueChange={value =>
              handleOpportunityFieldChange(value, 'opportunityStatus')
            }
            isScrollViewContainer={true}
            required={true}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <ValidateButtonOpportunity
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
