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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  checkNullString,
  useThemeColor,
  Checkbox,
  Icon,
} from '@axelor/aos-mobile-ui';
import {
  getFullDateItems,
  useSelector,
  useTranslator,
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
  isSelected?: boolean;
  linkIcon?: boolean;
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
  isSelected,
  linkIcon = false,
}: ExpenseLineCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {user} = useSelector((state: any) => state.user);

  const [cardHeight, setCardHeight] = useState<number>();

  const translateXAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelectionMode) {
      Animated.timing(translateXAnim, {
        toValue: 10,
        duration: 800,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [isSelectionMode, translateXAnim]);

  const cardPosition = useMemo(
    () =>
      isSelectionMode
        ? translateXAnim.interpolate({
            inputRange: [0, 10],
            outputRange: ['0%', '10%'],
          })
        : 0,
    [isSelectionMode, translateXAnim],
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const _date = useMemo(
    () => getFullDateItems(expenseDate, I18n),
    [I18n, expenseDate],
  );

  return (
    <View style={[styles.container, {height: cardHeight}, style]}>
      <Checkbox
        style={styles.checkbox}
        isDefaultChecked={isSelected}
        onChange={onItemSelection}
      />
      <Animated.View
        style={[
          styles.animatedCard,
          {
            left: cardPosition,
          },
        ]}>
        <TouchableOpacity
          onLongPress={onLongPress}
          onPress={onPress}
          delayLongPress={200}
          activeOpacity={1}
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            setCardHeight(_current => (_current == null ? height : _current));
          }}>
          <Card style={[styles.containerCard, styles.border]}>
            {_date != null && (
              <View style={styles.date}>
                <Text>{_date.day}</Text>
                <Text>{`${_date.date} ${_date.month}`}</Text>
                <Text>{`${_date.year}`}</Text>
              </View>
            )}
            <View style={styles.verticalLine} />
            <View style={styles.column}>
              {!checkNullString(displayText) && (
                <Text style={styles.bold}>{displayText}</Text>
              )}
              {!checkNullString(projectName) && <Text>{projectName}</Text>}
            </View>
            <View style={styles.amount}>
              {!checkNullString(totalAmount) && (
                <Text style={styles.bold}>{`${totalAmount} ${
                  user?.activeCompany?.currency?.symbol != null
                    ? user?.activeCompany?.currency?.symbol
                    : user?.activeCompany?.currency?.code
                }`}</Text>
              )}
            </View>
            {linkIcon && (
              <Icon
                style={styles.linkIcon}
                name="external-link-alt"
                size={10}
              />
            )}
          </Card>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      width: '96%',
      marginHorizontal: '2%',
      minHeight: 90,
    },
    animatedCard: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
    },
    containerCard: {
      paddingHorizontal: 0,
      paddingRight: 0,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    bold: {
      fontWeight: 'bold',
    },
    column: {
      flexDirection: 'column',
      flex: 3,
      alignSelf: 'center',
    },
    date: {
      alignSelf: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    amount: {
      alignSelf: 'center',
      flex: 1,
    },
    verticalLine: {
      borderRightColor: Colors.secondaryColor.background,
      borderRightWidth: 1,
      height: 50,
      alignSelf: 'center',
      marginRight: 10,
    },
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.secondaryColor.background,
    },
    checkbox: {
      marginRight: 10,
    },
    linkIcon: {position: 'absolute', bottom: 5, right: 15},
  });

export default ExpenseLineCard;
