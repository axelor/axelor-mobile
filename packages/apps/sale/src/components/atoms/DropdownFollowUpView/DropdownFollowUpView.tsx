/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  formatDate,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {checkNullString, LabelText, Text} from '@axelor/aos-mobile-ui';
import {fetchOpportunityStatus, OpportunityCard} from '@axelor/aos-mobile-crm';

interface DropdownFollowUpViewProps {
  opportunity: any;
  salespersonUserName: string;
  teamName: string;
  creationDate: string;
  expectedRealisationDate: string;
  endOfValidityDate: string;
  lastReminderDate: string;
  lastReminderComments: string;
}

const DropdownFollowUpView = ({
  opportunity,
  salespersonUserName,
  teamName,
  creationDate,
  expectedRealisationDate,
  endOfValidityDate,
  lastReminderDate,
  lastReminderComments,
}: DropdownFollowUpViewProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {opportunityStatusList} = useSelector(state => state.opportunity);

  useEffect(() => {
    dispatch(fetchOpportunityStatus());
  }, [dispatch]);

  return (
    <View>
      {opportunity != null && (
        <>
          <Text>{I18n.t('Crm_Opportunity')}</Text>
          <OpportunityCard
            style={styles.opportunityCard}
            amount={opportunity.amount}
            expectedCloseDate={opportunity.expectedCloseDate}
            name={opportunity.name}
            opportunityScoring={opportunity.opportunityRating}
            reference={opportunity.opportunitySeq}
            allOpportunityStatus={opportunityStatusList}
            currencySymbol={
              opportunity.currency?.symbol || opportunity.currency?.name
            }
            opportunityStatus={opportunity.opportunityStatus}
            onPress={() =>
              navigation.navigate('OpportunityDetailsScreen', {
                opportunityId: opportunity.id,
              })
            }
          />
        </>
      )}
      <LabelText
        title={I18n.t('Sale_Salesperson')}
        value={salespersonUserName}
      />
      <LabelText title={I18n.t('Sale_Team')} value={teamName} />
      <LabelText
        title={I18n.t('Sale_CreationDate')}
        value={formatDate(creationDate, I18n.t('Base_DateFormat'))}
      />
      {!checkNullString(expectedRealisationDate) && (
        <LabelText
          title={I18n.t('Sale_ExpectedRealisationDate')}
          value={formatDate(expectedRealisationDate, I18n.t('Base_DateFormat'))}
        />
      )}
      <LabelText
        title={I18n.t('Sale_EndOfValidity')}
        value={formatDate(endOfValidityDate, I18n.t('Base_DateFormat'))}
      />
      {!checkNullString(lastReminderDate) && (
        <LabelText
          title={I18n.t('Sale_LastReminder')}
          value={formatDate(lastReminderDate, I18n.t('Base_DateFormat'))}
        />
      )}
      {!checkNullString(lastReminderComments) && (
        <LabelText
          title={I18n.t('Base_Comment')}
          value={lastReminderComments}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  opportunityCard: {
    width: '100%',
    marginHorizontal: 0,
  },
});

export default DropdownFollowUpView;
