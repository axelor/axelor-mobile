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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useThemeColor, CardIconButton, Checkbox} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useDispatch,
  useSelector,
  openFileInExternalApp,
} from '@axelor/aos-mobile-core';
import {Expense, ExpenseLine} from '../../../types';
import {ExpenseLineCard} from '../../atoms';
import {deleteExpenseLine} from '../../../features/expenseLineSlice';

const ExpenseLineDetailCard = ({
  style,
  item,
  expense,
  onEdit,
  onLongPress,
  onItemSelection,
  isSelectionMode,
  isSelected,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userId} = useSelector((state: any) => state.auth);
  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

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

  const handleDelete = useCallback(() => {
    dispatch(
      (deleteExpenseLine as any)({ExpenseLineId: item.id, userId: userId}),
    );
  }, [dispatch, item, userId]);

  const handleShowFile = async () => {
    await openFileInExternalApp(
      {
        fileName: item.justificationMetaFile?.fileName,
        id: item.justificationMetaFile?.id,
        isMetaFile: true,
      },
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  return (
    <View style={[styles.globalContainer, {height: cardHeight}, style]}>
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
        <View style={styles.container}>
          <View style={styles.containerCard}>
            <ExpenseLineCard
              expenseDate={item.expenseDate}
              projectName={item.project?.fullName}
              totalAmount={item.totalAmount}
              currency={item.currency?.symbol || item.currency?.name}
              displayText={
                item.fromCity == null && item.toCity == null
                  ? item.expenseProduct?.name
                  : ExpenseLine.getKilomectricTypeSelect(
                      item.kilometricTypeSelect,
                      I18n,
                    )
              }
              onLongPress={onLongPress}
              setCardHeight={setCardHeight}
            />
          </View>
          {ExpenseLine.getExpenseMode(item) === ExpenseLine.modes.general &&
            item.justificationMetaFile != null && (
              <CardIconButton
                iconName={'expand-alt'}
                iconColor={Colors.secondaryColor_dark.background}
                onPress={handleShowFile}
                style={styles.cardIconButton}
              />
            )}
          {expense == null ||
          expense.statusSelect === Expense.statusSelect.Draft ? (
            <View style={styles.iconContainer}>
              <CardIconButton
                iconName={'pencil-alt'}
                iconColor={Colors.secondaryColor_dark.background}
                onPress={onEdit}
                style={styles.cardIconButton}
              />
              {expense == null && (
                <CardIconButton
                  iconName={'trash-alt'}
                  iconColor={Colors.errorColor.background}
                  onPress={handleDelete}
                  style={styles.cardIconButton}
                />
              )}
            </View>
          ) : null}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '96%',
    marginHorizontal: '2%',
    minHeight: 90,
    marginVertical: 4,
  },
  checkbox: {
    marginRight: 10,
  },
  animatedCard: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginVertical: 4,
  },
  containerCard: {
    flex: 6,
    margin: 2,
  },
  iconContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  cardIconButton: {
    flex: 1,
  },
});

export default ExpenseLineDetailCard;
