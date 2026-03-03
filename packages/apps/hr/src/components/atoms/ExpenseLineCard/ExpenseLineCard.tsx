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

import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  capitalizeFirstLetter,
  Icon,
  ObjectCard,
  Text,
  TextUnit,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  AnomalyBubble,
  DateDisplay,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';

interface ExpenseLineCardProps {
  expenseId: number;
  expenseDate?: string;
  projectName?: string;
  projectTaskName?: string;
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
  projectTaskName,
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
          style: styles.texts,
          items: [
            {
              displayText: displayText,
              isTitle: true,
              numberOfLines: 2,
              style: styles.title,
            },
            {
              customComponent: <DateDisplay date={expenseDate} size={16} />,
            },
            {
              indicatorText: projectName,
              hideIfNull: true,
              style: [styles.details, styles.italic],
            },
            {
              indicatorText: projectTaskName,
              hideIfNull: true,
              style: [styles.details, styles.italic],
            },
            {
              customComponent: (
                <View style={styles.cityContainer}>
                  <Text>{capitalizeFirstLetter(fromCity)}</Text>
                  <Icon style={styles.arrowIcon} name="arrow-right" />
                  <Text>{capitalizeFirstLetter(toCity)}</Text>
                </View>
              ),
              hideIf: fromCity == null && toCity == null,
            },
            {
              indicatorText: ` ${distance?.toString()} ${I18n.t(
                'Hr_KilometerUnit',
              )}`,
              hideIf: distance == null || (fromCity == null && toCity == null),
              iconName: 'signpost-split',
            },
          ],
        }}
        sideBadges={{
          style: styles.badges,
          items: [
            {
              customComponent: (
                <TextUnit
                  value={totalAmount}
                  unit={
                    currency != null
                      ? currency
                      : user.activeCompany?.currency?.symbol ||
                        user.activeCompany?.currency.name
                  }
                />
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
    italic: {
      fontStyle: 'italic',
      marginTop: 2,
    },
    details: {
      fontSize: 16,
    },
    texts: {
      justifyContent: 'center',
      minHeight: 100,
    },
    badges: {
      alignItems: 'flex-end',
    },
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.secondaryColor.background,
      marginHorizontal: 2,
      marginVertical: 2,
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
