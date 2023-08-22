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

import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  checkNullString,
  useThemeColor,
  Checkbox,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  getDay,
  getMonth,
} from '@axelor/aos-mobile-core';

interface ExpenseLineCardProps {
  style?: any;
  expenseDate?: string;
  projectName?: string;
  totalAmount?: string;
  displayText?: string | number;
  onPress: () => void;
  onLongPress: () => void;
  onItemSelection: () => void;
  isSelectionMode?: boolean;
}

const ExpenseLineCard = ({
  style,
  expenseDate,
  projectName,
  totalAmount,
  displayText,
  onPress,
  onLongPress,
  isSelectionMode,
  onItemSelection,
}: ExpenseLineCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {user} = useSelector((state: any) => state.user);

  const translateXAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelectionMode) {
      Animated.timing(translateXAnim, {
        toValue: 30,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelectionMode, translateXAnim]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Animated.View style={{transform: [{translateX: translateXAnim}]}}>
      <TouchableOpacity
        onLongPress={() => onLongPress()}
        onPress={onPress}
        style={styles.container}
        activeOpacity={0.8}>
        {isSelectionMode && (
          <Checkbox style={styles.checkbox} onChange={onItemSelection} />
        )}
        <Card style={[styles.containerCard, styles.border]}>
          <View style={styles.date}>
            <Text>{getDay(expenseDate, I18n)}</Text>
            <Text>{`${new Date(expenseDate).getDay()} ${getMonth(
              expenseDate,
              I18n,
            )}`}</Text>
            <Text>{`${new Date(expenseDate).getFullYear()}`}</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.column}>
            {!checkNullString(displayText) && (
              <Text style={styles.bold}>{displayText}</Text>
            )}
            {!checkNullString(projectName) && <Text>{projectName}</Text>}
          </View>
          <View style={styles.amount}>
            {!checkNullString(totalAmount) && (
              <Text
                style={
                  styles.bold
                }>{`${totalAmount} ${user?.activeCompany?.currency?.code}`}</Text>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      alignSelf: 'center',
    },
    containerCard: {
      flexDirection: 'row',
      width: '92%',
    },
    bold: {
      fontWeight: 'bold',
    },
    column: {
      flexDirection: 'column',
      width: '60%',
    },
    date: {
      alignSelf: 'center',
      marginLeft: '-5%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    amount: {
      alignSelf: 'center',
      marginLeft: 10,
    },
    verticalLine: {
      borderRightColor: Colors.secondaryColor.background,
      borderRightWidth: 1,
      height: 50,
      alignSelf: 'center',
      marginHorizontal: 10,
    },
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.secondaryColor.background,
    },
    checkbox: {
      marginRight: 10,
    },
  });

export default ExpenseLineCard;
