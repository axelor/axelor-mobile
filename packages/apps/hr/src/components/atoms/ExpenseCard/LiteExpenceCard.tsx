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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  ObjectCard,
  Text,
  TextUnit,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  AnomalyBubble,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {useTotalCurrency} from '../../../hooks';

interface LiteExpenseCardProps {
  style?: any;
  statusSelect: number;
  expenseId: number;
  expenseSeq: string;
  onPress: () => void;
  periodeCode?: string;
  inTaxTotal?: string;
  companyInTaxTotal?: string;
  currency?: any;
  employeeName?: string;
}

const LiteExpenseCard = ({
  style,
  onPress,
  statusSelect,
  expenseId,
  expenseSeq,
  periodeCode,
  inTaxTotal,
  companyInTaxTotal,
  currency,
  employeeName,
}: LiteExpenseCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {Expense} = useTypes();
  const {getItemColor} = useTypeHelpers();
  const {displayCompanyCurrency, companyTotal, expenseTotal} = useTotalCurrency(
    {inTaxTotal, companyInTaxTotal, currency} as any,
  );

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={false}
      borderLeftColor={
        getItemColor(Expense?.statusSelect, statusSelect)?.background
      }
      style={[styles.container, style]}
      leftContainerFlex={2}
      upperTexts={{
        items: [
          {
            customComponent: (
              <View style={styles.titleContainer}>
                <AnomalyBubble
                  objectName="expense"
                  objectId={expenseId}
                  isIndicationDisabled
                />
                <Text writingType="title">{expenseSeq}</Text>
              </View>
            ),
          },
          {
            displayText: `${I18n.t('Hr_Period')} : ${periodeCode}`,
            hideIf: checkNullString(periodeCode),
          },
          {
            iconName: 'person-fill',
            indicatorText: employeeName,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={{
        style: styles.badgeContainer,
        items: [
          {
            customComponent: (
              <TextUnit
                value={expenseTotal.inTaxTotal}
                unit={expenseTotal.currency}
                fontSize={15}
              />
            ),
          },
          {
            showIf: displayCompanyCurrency,
            customComponent: (
              <TextUnit
                value={companyTotal.inTaxTotal}
                unit={companyTotal.currency}
                fontSize={12}
                color={Colors.secondaryColor}
              />
            ),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
    marginVertical: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
});

export default LiteExpenseCard;
