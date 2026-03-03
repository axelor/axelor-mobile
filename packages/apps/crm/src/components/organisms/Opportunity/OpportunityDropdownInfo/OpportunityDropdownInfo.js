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

  const {opportunity} = useSelector(state => state.opportunity);
  const {crm: crmConfig} = useSelector(state => state.appConfig);

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

  const displayAmount = _amount =>
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
                    iconName="clock-fill"
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
                {crmConfig?.isManageRecurrent &&
                  opportunity.recurrentAmount && (
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
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default OpportunityDropdownInfo;
