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

import React, {useCallback, useEffect, useState} from 'react';
import {
  DoubleIcon,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  CameraButton,
  headerActionsProvider,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchExpenseLine} from '../features/expenseLineSlice';
import {
  ExpenseAddPopup,
  ExpenseLineDetailCard,
  ExpenseLineValidationButton,
} from '../components';

const ExpenseLinesListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {expenseLineList, loadingExpenseLine, moreLoading, isListEnd} =
    useSelector(state => state.expenseLine);
  const {userId} = useSelector(state => state.auth);

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);

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
          order: 20,
          iconName: 'plus',
          hideIf: isSelectionMode,
          title: I18n.t('Hr_NewExpenseLine'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('ExpenseLineFormScreen', {}),
          showInHeader: true,
        },
        {
          key: 'openSelectionMode',
          order: 10,
          iconName: 'user',
          hideIf: isSelectionMode,
          title: I18n.t('Hr_OpenSelectionMode'),
          onPress: handleModeChange,
          showInHeader: true,
          customComponent: (
            <DoubleIcon
              topIconConfig={{
                name: 'plus',
                color: Colors.primaryColor.background,
                size: 16,
              }}
              bottomIconConfig={{
                name: 'credit-card',
                color: Colors.secondaryColor_dark.background,
              }}
              predefinedPosition={'top-right'}
              topIconPosition={{top: -9}}
            />
          ),
        },
      ],
    });
  }, [Colors, I18n, navigation, isSelectionMode]);

  const handleModeChange = (itemId = null) => {
    setIsSelectionMode(current => {
      const mode = !current;

      if (mode && itemId != null) {
        setSelectedItems([itemId]);
      } else {
        setSelectedItems([]);
      }

      return mode;
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
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
          <ExpenseLineDetailCard
            item={item}
            onEdit={() =>
              navigation.navigate('ExpenseLineFormScreen', {
                expenseLine: item,
              })
            }
            onLongPress={() => handleModeChange(item.id)}
            onItemSelection={() => handleItemSelection(item.id)}
            isSelectionMode={isSelectionMode}
            isSelected={selectedItems.includes(item.id)}
          />
        )}
        fetchData={fetchExpenseLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
      {!isSelectionMode && (
        <CameraButton
          cameraKey="expense-line_justication_picture"
          onUpload={_file =>
            navigation.navigate('ExpenseLineFormScreen', {
              justificationMetaFile: _file,
            })
          }
          getFileName={({user, extension, dateTime}) =>
            `Expense_${user.name}_${dateTime}.${extension}`
          }
        />
      )}
      <ExpenseAddPopup
        visible={addPopupIsVisible}
        onClose={() => {
          setAddPopupIsVisible(false);
          handleCancelButton();
        }}
        selectedItems={selectedItems}
      />
    </Screen>
  );
};

export default ExpenseLinesListScreen;
