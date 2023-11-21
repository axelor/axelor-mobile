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
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useThemeColor, ObjectCard, Icon} from '@axelor/aos-mobile-ui';
import {
  AnomalyBubble,
  getFullDateItems,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';

interface ExpenseLineCardProps {
  expenseId: number;
  expenseDate?: string;
  projectName?: string;
  totalAmount?: string;
  currency?: string;
  displayText?: string;
  fromCity?: string;
  toCity?: string;
  distance?: number;
  onLongPress: () => void;
  setCardHeight: (height: any) => void;
}

const ExpenseLineCard = ({
  expenseId,
  expenseDate,
  projectName,
  totalAmount,
  currency,
  displayText,
  fromCity,
  toCity,
  distance,
  onLongPress,
  setCardHeight,
}: ExpenseLineCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {user} = useSelector((state: any) => state.user);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const _date = useMemo(
    () => getFullDateItems(expenseDate, I18n),
    [I18n, expenseDate],
  );

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      delayLongPress={200}
      activeOpacity={1}
      onLayout={event => {
        const {height} = event.nativeEvent.layout;
        setCardHeight(_current => (_current == null ? height : _current));
      }}>
      <ObjectCard
        touchable={false}
        showArrow={false}
        style={styles.border}
        leftContainerFlex={2}
        upperTexts={{
          style: styles.text,
          items: [
            {
              displayText: displayText,
              isTitle: true,
              numberOfLines: 2,
              style: styles.title,
            },
            {
              indicatorText: _date.day,
              displayText: `${_date.date} ${_date.month}`,
              iconName: 'calendar-alt',
              hideIfNull: true,
              style: styles.details,
            },
            {
              indicatorText: projectName,
              hideIfNull: true,
              style: [styles.details, styles.italic],
            },
            {
              customComponent: (
                <View style={styles.cityContainer}>
                  <Text>{fromCity}</Text>
                  <Icon style={styles.arrowIcon} name="long-arrow-alt-right" />
                  <Text>{toCity}</Text>
                </View>
              ),
              hideIf: fromCity == null && toCity == null,
            },
            {
              indicatorText: ` ${distance?.toString()} ${I18n.t(
                'Hr_KilometerUnit',
              )}`,
              hideIf: distance == null || (fromCity == null && toCity == null),
              iconName: 'road',
            },
          ],
        }}
        sideBadges={{
          items: [
            {
              customComponent: (
                <Text
                  fontSize={22}
                  style={styles.amountText}
                  textColor={Colors.primaryColor.background}>{`${totalAmount} ${
                  currency != null
                    ? currency
                    : user.activeCompany?.currency?.symbol ||
                      user.activeCompany?.currency.name
                }`}</Text>
              ),
            },
            {
              customComponent: (
                <AnomalyBubble
                  objectName="expense-line"
                  objectId={expenseId}
                  indicatorPosition="left"
                  style={styles.anoBubble}
                  textIndicationStyle={styles.anoBubbleText}
                />
              ),
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    title: {
      marginBottom: 5,
    },
    cityContainer: {
      flexDirection: 'row',
    },
    arrowIcon: {
      marginHorizontal: 3,
    },
    amountText: {
      alignSelf: 'flex-end',
      fontWeight: '900',
    },
    italic: {
      fontStyle: 'italic',
      marginTop: 2,
    },
    details: {
      fontSize: 16,
    },
    text: {
      justifyContent: 'center',
      minHeight: 100,
    },
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.secondaryColor.background,
      marginHorizontal: 0,
      marginVertical: 0,
      paddingRight: 5,
    },
    anoBubble: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    anoBubbleText: {
      width: Dimensions.get('window').width * 0.7,
      bottom: 0,
    },
  });

export default ExpenseLineCard;
