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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  useThemeColor,
  checkNullString,
  Icon,
  CardIconButton,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {Expense} from '../../../types';

interface ExpenseCardProps {
  style?: any;
  statusSelect: number;
  expenseSeq?: string;
  onPress: () => void;
  periodeCode?: string;
  inTaxTotal?: string;
}

const ExpenseCard = ({
  style,
  onPress,
  statusSelect,
  expenseSeq,
  periodeCode,
  inTaxTotal,
}: ExpenseCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {user} = useSelector((state: any) => state.user);

  const userCanValidate = useMemo(() => {
    if (
      (user?.employee?.hrManager ||
        user.employee?.managerUser?.id === user.id) &&
      statusSelect === Expense.statusSelect.WaitingValidation
    ) {
      return true;
    }
    return false;
  }, [
    statusSelect,
    user.employee?.hrManager,
    user.employee?.managerUser?.id,
    user.id,
  ]);

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

  const styles = useMemo(() => {
    return getStyles(isDefaultDisplay);
  }, [isDefaultDisplay]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Card style={[styles.containerCard, borderStyle]}>
          <View style={styles.column}>
            {!checkNullString(expenseSeq) && (
              <Text style={styles.bold}>{expenseSeq}</Text>
            )}
            {!checkNullString(periodeCode) && (
              <Text>{`${I18n.t('Hr_Period')} : ${periodeCode}`}</Text>
            )}
          </View>
          <View style={styles.middleCard}>
            {!checkNullString(inTaxTotal) && <Text>{inTaxTotal}</Text>}
          </View>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </Card>
      </TouchableOpacity>
      {(userCanValidate || statusSelect === Expense.statusSelect.Draft) && (
        <CardIconButton
          iconName={
            statusSelect === Expense.statusSelect.Draft
              ? 'paper-plane'
              : 'check'
          }
          iconColor={Colors.primaryColor.foreground}
          onPress={() => {}}
          style={styles.cardIconButton}
        />
      )}
    </View>
  );
};

const getBorderStyle = Colors =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.background,
    },
  });

const getStyles = isDefaultDisplay =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      width: '92%',
      marginHorizontal: 14,
      alignSelf: 'center',
    },
    middleCard: {
      width: '25%',
    },
    containerCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: isDefaultDisplay ? '98%' : '92%',
      flex: 5,
    },
    column: {
      flexDirection: 'column',
      width: '75%',
    },
    bold: {
      fontWeight: 'bold',
    },
    cardIconButton: {
      flex: 1,
      marginLeft: '-5%',
    },
  });

export default ExpenseCard;
