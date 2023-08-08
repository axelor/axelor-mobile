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
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface ExpenseLineCardProps {
  style?: any;
  expenseDate?: string;
  projectName?: string;
  totalAmount?: string;
  displayText?: string | number;
  onPress: () => void;
  onLongPress: () => void;
}
const ExpenseLineCard = ({
  style,
  expenseDate,
  projectName,
  totalAmount,
  displayText,
  onPress,
  onLongPress,
}: ExpenseLineCardProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      activeOpacity={0.8}>
      <Card style={[styles.container, styles.border, style]}>
        <Text style={styles.date}>{expenseDate}</Text>
        <View style={styles.verticalLine} />
        <View style={styles.column}>
          {!checkNullString(displayText) && (
            <Text style={styles.bold}>{displayText}</Text>
          )}
          {!checkNullString(projectName) && <Text>{projectName}</Text>}
        </View>
        {!checkNullString(totalAmount) && (
          <Text style={styles.bold}>{`${totalAmount}$`}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    bold: {
      fontWeight: 'bold',
    },
    column: {
      flexDirection: 'column',
      flex: 6,
    },
    date: {
      flex: 3,
      alignSelf: 'center',
    },
    verticalLine: {
      height: '100%',
      width: 1,
      backgroundColor: Colors.secondaryColor.background,
      marginHorizontal: 10,
    },
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.secondaryColor.background,
    },
  });

export default ExpenseLineCard;
