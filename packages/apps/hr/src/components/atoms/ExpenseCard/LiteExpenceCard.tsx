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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {checkNullString, ObjectCard, Text} from '@axelor/aos-mobile-ui';
import {
  AnomalyBubble,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {useTotalCurrency} from '../../../hooks';

interface LiteExpenseCardProps {
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
  const {Expense} = useTypes();
  const {getItemColor} = useTypeHelpers();
  const {displayCompanyCurrency, companyTotal, expenseTotal} = useTotalCurrency(
    {inTaxTotal, companyInTaxTotal, currency},
  );

  const renderTotal = useCallback(
    (
      config: {inTaxTotal: string; currency: string},
      wrapper: (_s: string) => string = _s => _s,
    ) => {
      return (
        <Text style={styles.price}>
          {wrapper(`${config.inTaxTotal} ${config.currency}`)}
        </Text>
      );
    },
    [],
  );

  return (
    <ObjectCard
      onPress={onPress}
      borderLeftColor={
        getItemColor(Expense?.statusSelect, statusSelect)?.background
      }
      style={styles.container}
      leftContainerFlex={2}
      iconLeftMargin={10}
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
                <Text writingType="title" style={styles.titleText}>
                  {expenseSeq}
                </Text>
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
      upperBadges={{
        fixedOnRightSide: true,
        items: [
          {
            customComponent: renderTotal(expenseTotal),
          },
          {
            customComponent: displayCompanyCurrency
              ? renderTotal(companyTotal, _s => ` (${_s})`)
              : null,
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
  },
  titleText: {
    alignSelf: 'center',
    marginLeft: 5,
  },
  price: {
    textAlign: 'right',
  },
});

export default LiteExpenseCard;
