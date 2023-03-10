import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {formatDate, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DropdownCardSwitch,
  formatNumber,
  LabelText,
} from '@axelor/aos-mobile-ui';

const OpportunityDropdownInfo = ({}) => {
  const I18n = useTranslator();

  const {opportunity} = useSelector((state: any) => state.opportunity);

  const _formatNumber = useCallback(
    number =>
      formatNumber(
        number,
        I18n.t('Base_DecimalSpacer'),
        I18n.t('Base_ThousandSpacer'),
      ),
    [I18n],
  );

  const _expectedCloseDate = useMemo(
    () =>
      opportunity.expectedCloseDate
        ? formatDate(opportunity.expectedCloseDate, I18n.t('Base_DateFormat'))
        : null,
    [opportunity.expectedCloseDate, I18n],
  );

  const displayAmount = (_amount: string) =>
    `${_formatNumber(_amount)} ${opportunity.currency?.symbol}`;

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Crm_Informations'),
            key: 1,
            childrenComp: (
              <>
                {_expectedCloseDate && (
                  <LabelText
                    iconName="clock"
                    title={I18n.t('Crm_Opportunity_ExpectedCloseDate')}
                    value={_expectedCloseDate}
                  />
                )}
                {opportunity.assignedTo && (
                  <LabelText
                    title={I18n.t('Crm_Opportunity_AssignedTo')}
                    value={opportunity.assignedTo}
                  />
                )}
                {opportunity.amount && (
                  <LabelText
                    title={I18n.t('Crm_Opportunity_Amount')}
                    value={displayAmount(opportunity.amount)}
                  />
                )}
                {opportunity.recurrentAmount && (
                  <LabelText
                    title={I18n.t('Crm_Opportunity_RecurrentAmount')}
                    value={displayAmount(opportunity.recurrentAmount)}
                  />
                )}
              </>
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default OpportunityDropdownInfo;
