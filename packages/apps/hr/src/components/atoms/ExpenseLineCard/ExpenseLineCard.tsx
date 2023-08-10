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

interface ExpenseLineCardProps {
  style?: any;
  expenseDate?: string;
  projectName?: string;
  totalAmount?: string;
  displayText?: string | number;
  onPress: () => void;
  onLongPress: () => void;
  onItemSelection: (itemId, isChecked) => void;
  isSelectionMode?: boolean;
  itemId: number;
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
  itemId,
}: ExpenseLineCardProps) => {
  const Colors = useThemeColor();
  const translateXAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelectionMode) {
      Animated.timing(translateXAnim, {
        toValue: 60,
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
        onLongPress={onLongPress}
        onPress={onPress}
        style={styles.container}
        activeOpacity={0.8}>
        {isSelectionMode && (
          <Checkbox
            style={styles.checkbox}
            onChange={isChecked => {
              onItemSelection(itemId, isChecked);
            }}
          />
        )}
        <Card style={[styles.containerCard, styles.border, style]}>
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
    </Animated.View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerCard: {
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
    checkbox: {
      marginRight: 10,
    },
  });

export default ExpenseLineCard;
