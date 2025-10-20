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
import {
  LogisticalFormHeader,
  LogisticalFormPackagingCard,
  LogisticalFormPackagingLineActionCard,
} from '../../logisticalForm';
import {
  searchPackaging,
  searchParentPackaging,
} from '../../../../features/packagingSlice';
import {searchPackagingBranchApi} from '../../../../api';
import {usePackagingItemActions} from '../../../../hooks/use-packaging-item-actions';

const LogisticalFormPackagingView = () => {
  const I18n = useTranslator();

  const {logisticalForm} = useSelector(state => state.logisticalForm);
  const {
    loadingPackaging,
    moreLoadingPackaging,
    isListEndPackaging,
    packagingList,
    parentPackagingList,
  } = useSelector(state => state.stock_packaging);
  const {packagingLineList} = useSelector(state => state.stock_packagingLine);

  const [refreshKey, setRefreshKey] = useState(0);

  const {actionList, getPackagingActions, getPackagingLineActions} =
    usePackagingItemActions({
      logisticalForm,
      onRefresh: () => setRefreshKey(current => current + 1),
    });

  const sliceFunctionData = useMemo(
    () => ({logisticalFormId: logisticalForm?.id}),
    [logisticalForm?.id],
  );

  const content = useMemo(
    () => [...packagingList, ...packagingLineList],
    [packagingLineList, packagingList],
  );

  return (
    <SearchTreeView
      key={refreshKey}
      headerTopChildren={<LogisticalFormHeader {...logisticalForm} />}
      parentList={parentPackagingList}
      list={content}
      loading={loadingPackaging}
      moreLoading={moreLoadingPackaging}
      isListEnd={isListEndPackaging}
      sliceParentFunction={searchParentPackaging}
      sliceParentFunctionData={sliceFunctionData}
      sliceFunction={searchPackaging}
      sliceFunctionData={sliceFunctionData}
      sliceFunctionDataParentIdName="parentPackagingId"
      sliceFunctionDataNoParentName="noParent"
      actionList={actionList}
      fetchBranchData={parentPackagingId =>
        searchPackagingBranchApi({parentPackagingId})
      }
      branchCondition={item => item?.packagingNumber != null}
      getBranchActions={({item}) => getPackagingActions(item)}
      displayParentSearchValue={item => item?.packagingNumber ?? ''}
      searchParentPlaceholder={I18n.t('Stock_ParentPackaging')}
      searchPlaceholder={I18n.t('Base_Search')}
      parentFieldName="parentPackaging"
      renderBranch={({item}) => <LogisticalFormPackagingCard {...item} />}
      renderLeaf={({item}) => (
        <LogisticalFormPackagingLineActionCard
          {...item}
          actions={getPackagingLineActions(item)}
        />
      )}
      isHideableParentSearch={false}
    />
  );
};

export default LogisticalFormPackagingView;
