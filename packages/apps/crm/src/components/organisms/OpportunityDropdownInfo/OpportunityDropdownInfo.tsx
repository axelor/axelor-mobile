import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCard, LabelText} from '@axelor/aos-mobile-ui';

interface OpportunityDropdownInfoProps {
  amount: string;
  currencySymbol: string;
  expectedCloseDate: string;
  assignedTo: string;
  recurrentAmount: string;
  style?: any;
}

const OpportunityDropdownInfo = ({
  amount,
  currencySymbol,
  expectedCloseDate,
  assignedTo,
  recurrentAmount,
  style,
}: OpportunityDropdownInfoProps) => {
  const I18n = useTranslator();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const _expectedCloseDate = useMemo(
    () =>
      expectedCloseDate
        ? formatDate(expectedCloseDate, I18n.t('Base_DateFormat'))
        : null,
    [expectedCloseDate, I18n],
  );

  const displayAmount = (_amount: string) => `${_amount} ${currencySymbol}`;

  return (
    <View style={[styles.container, style]}>
      <DropdownCard
        title={I18n.t('Crm_Informations')}
        styleText={styles.textTitle}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        DropdownIsOpen={isDropdownOpen}>
        {_expectedCloseDate && (
          <LabelText
            iconName="clock"
            title={I18n.t('Crm_Opportunity_ExpectedCloseDate')}
            value={_expectedCloseDate}
            style={styles.row}
          />
        )}
        {assignedTo && (
          <LabelText
            title={I18n.t('Crm_Opportunity_AssignedTo')}
            value={assignedTo}
            style={styles.row}
          />
        )}
        {amount && (
          <LabelText
            title={I18n.t('Crm_Opportunity_Amount')}
            value={displayAmount(amount)}
            style={styles.row}
          />
        )}
        {recurrentAmount && (
          <LabelText
            title={I18n.t('Crm_Opportunity_RecurrentAmount')}
            value={displayAmount(recurrentAmount)}
            style={styles.row}
          />
        )}
      </DropdownCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  row: {
    marginVertical: 5,
  },
});

export default OpportunityDropdownInfo;
