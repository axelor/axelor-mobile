/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState} from 'react';
import {
  SearchTreeView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ChipSelect, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  searchCheckListItems,
  searchParentCheckListItems,
} from '../../../features/checkListSlice';
import {searchCheckListItemsApi} from '../../../api';
import {useCheckListItemActions} from '../../../hooks';
import {CheckListItemType} from '../../../types';
import {CheckListItemActionCard} from '../../molecules';
import {ParentCheckListItemCard} from '../../atoms';

interface CheckListViewProps {
  headerTopChildren?: any;
  parentKey?: 'project' | 'projectTask';
  parentId: number;
  showActions?: boolean;
}

const CheckListView = ({
  headerTopChildren,
  parentKey = 'project',
  parentId,
  showActions = true,
}: CheckListViewProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {getItemActions} = useCheckListItemActions(() =>
    setSelectedStatus(current => [...current]),
  );

  const [selectedStatus, setSelectedStatus] = useState([]);

  const {
    loadingCheckLists,
    moreLoadingCheckList,
    isListEndCheckList,
    checkListItems,
    parentCheckListItems,
  } = useSelector(state => state.project_checkList);

  const sliceParentFunctionData = useMemo(
    () => ({
      parentKey,
      parentId,
      selectedStatus,
    }),
    [parentId, parentKey, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      parentKey,
      parentId,
      selectedStatus,
    }),
    [parentId, parentKey, selectedStatus],
  );

  return (
    <SearchTreeView
      parentList={parentCheckListItems}
      loading={loadingCheckLists}
      moreLoading={moreLoadingCheckList}
      isListEnd={isListEndCheckList}
      list={checkListItems}
      sliceFunction={searchCheckListItems}
      sliceFunctionData={sliceFunctionData}
      sliceParentFunction={searchParentCheckListItems}
      sliceParentFunctionData={sliceParentFunctionData}
      sliceFunctionDataParentIdName="parentItemId"
      sliceFunctionDataNoParentName="noParent"
      fetchBranchData={parentItemId =>
        searchCheckListItemsApi({
          parentKey,
          parentId,
          selectedStatus,
          parentItemId,
        })
      }
      branchCondition={item =>
        Array.isArray(item.projectCheckListItemList) &&
        item.projectCheckListItemList.length > 0
      }
      displayParentSearchValue={item => item.title}
      searchParentPlaceholder={I18n.t('Project_ParentItem')}
      searchPlaceholder={I18n.t('Base_Search')}
      parentFieldName="parentItem"
      renderBranch={({item}) => <ParentCheckListItemCard item={item} />}
      getBranchActions={({item}) => (showActions ? getItemActions(item) : null)}
      renderLeaf={({item}) => (
        <CheckListItemActionCard
          item={item}
          handleRefresh={() => setSelectedStatus(current => [...current])}
          showActions={showActions}
        />
      )}
      chipComponent={
        <ChipSelect
          mode="switch"
          selectionItems={CheckListItemType.getStatusList(Colors, I18n)}
          onChangeValue={setSelectedStatus}
        />
      }
      headerTopChildren={headerTopChildren}
    />
  );
};

export default CheckListView;
