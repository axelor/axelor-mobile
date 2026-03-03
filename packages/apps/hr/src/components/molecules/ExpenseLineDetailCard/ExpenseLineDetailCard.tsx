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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {ActionCard, Checkbox, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  openFileInExternalApp,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {ExpenseLine as ExpenseLineType} from '../../../types';
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
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.ExpenseLine',
  });
  const {Expense, ExpenseLine} = useTypes();
  const {getItemTitle} = useTypeHelpers();

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
            outputRange: ['0%', '13%'],
          })
        : 0,
    [isSelectionMode, translateXAnim],
  );

  const handleDelete = useCallback(() => {
    dispatch(
      (deleteExpenseLine as any)({
        expenseLineId: item.id,
        userId: userId,
        expenseId: expense?.id,
      }),
    );
  }, [dispatch, expense?.id, item.id, userId]);

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
          <ActionCard
            translator={I18n.t}
            actionList={[
              {
                iconName: 'arrows-angle-expand',
                helper: I18n.t('Hr_ShowJustification'),
                large: true,
                onPress: handleShowFile,
                hidden:
                  ExpenseLineType.getExpenseMode(item) !==
                    ExpenseLineType.modes.general ||
                  item.justificationMetaFile == null,
              },
              {
                iconName: readonly ? 'file-earmark-text' : 'pencil-fill',
                helper: I18n.t(readonly ? 'Hr_See' : 'Hr_Edit'),
                onPress: onEdit,
                hidden:
                  expense != null &&
                  expense.statusSelect !== Expense?.statusSelect.Draft,
              },
              {
                iconName: 'trash3-fill',
                iconColor: Colors.errorColor.background,
                helper: I18n.t('Hr_Delete'),
                onPress: handleDelete,
                hidden:
                  (expense != null &&
                    expense.statusSelect !== Expense?.statusSelect.Draft) ||
                  !canDelete,
              },
            ]}>
            <ExpenseLineCard
              expenseId={item.id}
              expenseDate={item.expenseDate}
              projectName={item.project?.fullName}
              projectTaskName={item.projectTask?.fullName}
              totalAmount={item.totalAmount}
              currency={item.currency?.symbol || item.currency?.name}
              fromCity={item.fromCity}
              toCity={item.toCity}
              distance={item.distance}
              displayText={
                item.fromCity == null && item.toCity == null
                  ? item.expenseProduct?.name
                  : getItemTitle(
                      ExpenseLine?.kilometricTypeSelect,
                      item.kilometricTypeSelect,
                    )
              }
              onLongPress={onLongPress}
              setCardHeight={setCardHeight}
            />
          </ActionCard>
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
    minHeight: 90,
    marginVertical: 4,
  },
  checkbox: {
    marginHorizontal: 4,
  },
  animatedCard: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
  },
});

export default ExpenseLineDetailCard;
