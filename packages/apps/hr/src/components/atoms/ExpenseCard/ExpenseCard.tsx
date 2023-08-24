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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  useThemeColor,
  checkNullString,
  CardIconButton,
  ObjectCard,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {Expense} from '../../../types';

interface ExpenseCardProps {
  style?: any;
  statusSelect: number;
  expenseSeq?: string;
  onPress: () => void;
  onValidate: () => void;
  onSend: () => void;
  periodeCode?: string;
  inTaxTotal?: string;
  employeeManagerId?: number;
}

const ExpenseCard = ({
  style,
  onPress,
  onValidate = () => {},
  onSend = () => {},
  statusSelect,
  expenseSeq,
  periodeCode,
  inTaxTotal,
  employeeManagerId,
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
          upperTexts={{
            items: [
              {displayText: expenseSeq, isTitle: true},
              {
                displayText: `${I18n.t('Hr_Period')} : ${periodeCode}`,
                hideIf: checkNullString(periodeCode),
              },
            ],
          }}
          sideBadges={{
            items: [
              {
                customComponent: !checkNullString(inTaxTotal) && (
                  <Text>{inTaxTotal}</Text>
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
                ? onValidate()
                : onSend();
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
  },
  iconContainer: {flex: 1},
});

export default ExpenseCard;
