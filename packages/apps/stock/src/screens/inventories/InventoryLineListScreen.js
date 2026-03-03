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

import React, {useCallback, useMemo, useState} from 'react';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {InventoryHeader, InventoryLineActionCard} from '../../components';
import {fetchInventoryLines} from '../../features/inventoryLineSlice';
import {displayLine} from '../../utils/displayers';
import {useLineHandler} from '../../hooks';
import {LineVerification} from '../../types';

const STATUS = {
  done: 'doneStatus',
  diff: 'diffStatus',
  undone: 'unDoneStatus',
};

const scanKey = 'trackingNumber-or-product_inventory-line-list';

const InventoryLineListScreen = ({route}) => {
  const inventory = route.params.inventory;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {Inventory} = useTypes();
  const {showLine} = useLineHandler();

  const {loadingInventoryLines, moreLoading, isListEnd, inventoryLineList} =
    useSelector(state => state.inventoryLine);

  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = useCallback(
    (item, skipVerification = undefined) => {
      showLine({
        move: inventory,
        line: item,
        skipVerification,
        type: LineVerification.type.inventory,
      });
    },
    [inventory, showLine],
  );

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const sliceFunctionData = useMemo(
    () => ({
      inventoryId: inventory?.id,
    }),
    [inventory?.id],
  );

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === STATUS.done) {
            return item.realQty === item.currentQty;
          } else if (selectedStatus[0].key === STATUS.diff) {
            return item.realQty != null && item.realQty !== item.currentQty;
          } else if (selectedStatus[0].key === STATUS.undone) {
            return item.realQty == null;
          } else {
            return item;
          }
        });
      } else {
        return list;
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(inventoryLineList),
    [filterOnStatus, inventoryLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={filteredList}
        loading={loadingInventoryLines}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchInventoryLines}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={handleLineSearch}
        displaySearchValue={displayLine}
        searchPlaceholder={I18n.t('Stock_SearchLine')}
        scanKeySearch={scanKey}
        isHideableSearch
        fixedItems={
          <InventoryHeader
            reference={inventory.inventorySeq}
            status={inventory.statusSelect}
            date={
              inventory.statusSelect === Inventory?.statusSelect.Planned
                ? inventory.plannedStartDateT
                : inventory.plannedEndDateT
            }
            stockLocation={inventory.stockLocation?.name}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Stock_Complete'),
                color: Colors.successColor,
                key: STATUS.done,
              },
              {
                title: I18n.t('Stock_Difference'),
                color: Colors.cautionColor,
                key: STATUS.diff,
              },
              {
                title: I18n.t('Stock_NotDone'),
                color: Colors.secondaryColor,
                key: STATUS.undone,
              },
            ]}
          />
        }
        renderListItem={({item}) => (
          <InventoryLineActionCard
            onPress={() => handleShowLine(item)}
            inventoryLine={item}
          />
        )}
      />
    </Screen>
  );
};

export default InventoryLineListScreen;
