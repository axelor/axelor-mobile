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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
  StarScore,
  formatNumber,
} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import {Opportunity} from '../../../types';

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
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const _expectedCloseDate = useMemo(
    () => formatDate(expectedCloseDate, I18n.t('Base_DateFormat')),
    [expectedCloseDate, I18n],
  );

  const borderStyle = useMemo(() => {
    const colorIndex = allOpportunityStatus?.findIndex(
      status => status.id === opportunityStatus?.id,
    );
    return getStyles(Opportunity.getStatusColor(colorIndex, Colors)?.background)
      ?.border;
  }, [Colors, allOpportunityStatus, opportunityStatus?.id]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.contentContainer}>
          <Text style={styles.txtImportant}>{reference}</Text>
          <Text style={styles.txtImportant}>{name}</Text>
          <LabelText
            title={I18n.t('Crm_Opportunity_Amount')}
            value={`${formatNumber(
              amount,
              I18n.t('Base_DecimalSpacer'),
              I18n.t('Base_ThousandSpacer'),
            )} ${currencySymbol}`}
          />
          <LabelText
            iconName="clock"
            title={I18n.t('Crm_Opportunity_ExpectedCloseDate')}
            value={_expectedCloseDate}
          />
        </View>
        <View>
          <StarScore score={opportunityScoring} showMissingStar={true} />
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
            style={styles.icon}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 5,
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OpportunityCard;
