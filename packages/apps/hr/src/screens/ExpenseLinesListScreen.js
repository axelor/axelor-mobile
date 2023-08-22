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

import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  CircleButton,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  headerActionsProvider,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchExpenseLine} from '../features/expenseLineSlice';
import {
  ExpenseAddPopup,
  ExpenseLineCard,
  ExpenseLineValidationButton,
} from '../components';
import {ExpenseLine} from '../types';

const ExpenseLinesListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {expenseLineList, loadingExpenseLine, moreLoading, isListEnd} =
    useSelector(state => state.expenseLine);
  const {userId} = useSelector(state => state.auth);
  const [selectedOnLongPress, setSelectedOnLongPress] = useState(null);

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleItemSelection = itemId => {
    setSelectedItems(_current => {
      if (_current.includes(itemId)) {
        return _current.filter(id => id !== itemId);
      } else {
        return [..._current, itemId];
      }
    });
  };

  const handleCancelButton = () => {
    setSelectedItems([]);
    setIsSelectionMode(false);
  };

  const fetchExpenseLineAPI = useCallback(
    (page = 0) => {
      dispatch(fetchExpenseLine({userId: userId, page: page}));
    },
    [dispatch, userId],
  );

  useEffect(() => {
    headerActionsProvider.registerModel('hr_expenseLine_list', {
      actions: [
        {
          key: 'newExpenseLines',
          order: 10,
          iconName: 'plus',
          hideIf: isSelectionMode,
          title: I18n.t('Hr_NewExpenseLine'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('ExpenseLineFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation, isSelectionMode]);

  return (
    <Screen
      fixedItems={
        isSelectionMode && (
          <ExpenseLineValidationButton
            onOpen={() => setAddPopupIsVisible(true)}
            selectedItems={selectedItems}
            onChangeMode={handleCancelButton}
          />
        )
      }>
      <ScrollList
        loadingList={loadingExpenseLine}
        data={expenseLineList}
        disabledRefresh={isSelectionMode}
        renderItem={({item}) => (
          <ExpenseLineCard
            onLongPress={() => {
              setIsSelectionMode(current => !current);
              setSelectedItems([]);
              setSelectedOnLongPress(item.id);
              handleItemSelection(item.id);
            }}
            isSelected={
              selectedItems.includes(item.id) || item.id === selectedOnLongPress
            }
            itemId={item.id}
            style={styles.item}
            onItemSelection={() => handleItemSelection(item.id)}
            expenseDate={item.expenseDate}
            projectName={item.project?.fullName}
            totalAmount={item.totalAmount}
            displayText={
              item.fromCity == null && item.toCity == null
                ? item.expenseProduct?.fullName
                : ExpenseLine.getKilomectricTypeSelect(
                    item.kilometricTypeSelect,
                    I18n,
                  )
            }
            isSelectionMode={isSelectionMode}
          />
        )}
        fetchData={fetchExpenseLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
      {!isSelectionMode && (
        <CircleButton
          style={styles.floatingButton}
          iconName="camera"
          onPress={() => {}}
          size={70}
        />
      )}
      <ExpenseAddPopup
        visible={addPopupIsVisible}
        onClose={() => {
          setAddPopupIsVisible(false);
          handleCancelButton();
        }}
      />
    </Screen>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    item: {
      marginHorizontal: 12,
      marginVertical: 4,
    },
    floatingButton: {
      backgroundColor: Colors.secondaryColor_dark.foreground,
      position: 'absolute',
      bottom: 25,
      elevation: 2,
      left: Dimensions.get('window').width / 2 - 25,
    },
  });

export default ExpenseLinesListScreen;
