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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {StarScore, formatNumber, ObjectCard} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';

interface OpportunityCardProps {
  amount: string;
  expectedCloseDate: string;
  name: string;
  opportunityScoring: number;
  reference: string;
  allOpportunityStatus?: any;
  currencySymbol?: string;
  opportunityStatus?: any;
  style?: any;
  onPress: () => void;
}

const OpportunityCard = ({
  amount,
  expectedCloseDate,
  name,
  opportunityScoring,
  reference,
  allOpportunityStatus,
  opportunityStatus,
  currencySymbol = '$',
  style,
  onPress,
}: OpportunityCardProps) => {
  const I18n = useTranslator();
  const {getItemColorFromIndex} = useTypeHelpers();

  const _expectedCloseDate = useMemo(
    () =>
      expectedCloseDate
        ? formatDate(expectedCloseDate, I18n.t('Base_DateFormat'))
        : null,
    [expectedCloseDate, I18n],
  );

  const borderStyle = useMemo(
    () =>
      getStyles(
        getItemColorFromIndex(allOpportunityStatus, opportunityStatus)
          ?.background,
      )?.border,
    [allOpportunityStatus, getItemColorFromIndex, opportunityStatus],
  );

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      sideBadges={{
        items: [
          {
            customComponent: (
              <StarScore score={opportunityScoring} showMissingStar={true} />
            ),
          },
        ],
      }}
      upperTexts={{
        items: [
          {displayText: reference, isTitle: true},
          {displayText: name, isTitle: true},
          {
            indicatorText: I18n.t('Crm_Opportunity_Amount'),
            displayText: `${formatNumber(
              amount,
              I18n.t('Base_DecimalSpacer'),
              I18n.t('Base_ThousandSpacer'),
            )} ${currencySymbol}`,
            hideIf: amount == null,
          },
          {
            indicatorText: I18n.t('Crm_Opportunity_ExpectedCloseDate'),
            displayText: _expectedCloseDate,
            hideIf: _expectedCloseDate == null,
            iconName: 'clock-fill',
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

export default OpportunityCard;
