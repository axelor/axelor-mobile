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
import {StyleSheet, View} from 'react-native';
import {
  Text,
  useThemeColor,
  checkNullString,
  CardIconButton,
  ObjectCard,
} from '@axelor/aos-mobile-ui';
import {
  AnomalyBubble,
  useTranslator,
  useSelector,
} from '@axelor/aos-mobile-core';
import {Expense} from '../../../types';

interface ExpenseCardProps {
  style?: any;
  statusSelect: number;
  expenseId: number;
  expenseSeq: string;
  onPress: () => void;
  onValidate: () => void;
  onSend: () => void;
  periodeCode?: string;
  inTaxTotal?: string;
  employeeManagerId?: number;
  employeeName?: string;
}

const ExpenseCard = ({
  style,
  onPress,
  onValidate = () => {},
  onSend = () => {},
  statusSelect,
  expenseId,
  expenseSeq,
  periodeCode,
  inTaxTotal,
  employeeManagerId,
  employeeName,
}: ExpenseCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {user} = useSelector((state: any) => state.user);

  const userCanValidate = useMemo(() => {
    if (
      (user?.employee?.hrManager || employeeManagerId === user.id) &&
      statusSelect === Expense.statusSelect.WaitingValidation
    ) {
      return true;
    }
    return false;
  }, [employeeManagerId, statusSelect, user?.employee?.hrManager, user.id]);

  const isDefaultDisplay = useMemo(() => {
    if (
      (statusSelect === Expense.statusSelect.WaitingValidation &&
        userCanValidate) ||
      statusSelect === Expense.statusSelect.Draft
    ) {
      return false;
    }
    return true;
  }, [userCanValidate, statusSelect]);

  const borderStyle = useMemo(() => {
    return getBorderStyle(Expense.getStatusColor(statusSelect, Colors)).border;
  }, [Colors, statusSelect]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.containerCard}>
        <ObjectCard
          onPress={onPress}
          style={borderStyle}
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
                iconName: 'user',
                indicatorText: employeeName,
                hideIfNull: true,
              },
            ],
          }}
          sideBadges={{
            items: [
              {
                customComponent: !checkNullString(inTaxTotal) && (
                  <Text style={styles.price}>{`${inTaxTotal} ${
                    user?.activeCompany?.currency?.symbol != null
                      ? user?.activeCompany?.currency?.symbol
                      : user?.activeCompany?.currency?.code
                  }`}</Text>
                ),
              },
            ],
          }}
        />
      </View>
      {!isDefaultDisplay && (
        <View style={styles.iconContainer}>
          <CardIconButton
            iconName={
              statusSelect === Expense.statusSelect.Draft
                ? 'paper-plane'
                : 'check'
            }
            iconColor={Colors.primaryColor.foreground}
            onPress={() => {
              statusSelect === Expense.statusSelect.Draft
                ? onSend()
                : onValidate();
            }}
            style={styles.cardIconButton}
          />
        </View>
      )}
    </View>
  );
};

const getBorderStyle = Colors =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.background,
      marginHorizontal: 0,
      marginVertical: 0,
    },
  });

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '92%',
    marginHorizontal: 14,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  containerCard: {
    flex: 6,
  },
  cardIconButton: {
    flex: 1,
    margin: 0,
    marginLeft: 5,
  },
  iconContainer: {
    flex: 1,
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

export default ExpenseCard;
