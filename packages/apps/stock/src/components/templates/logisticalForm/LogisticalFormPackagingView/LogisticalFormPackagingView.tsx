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

import React, {useMemo} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  SearchTreeView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  searchPackaging,
  searchParentPackaging,
} from '../../../../features/packagingSlice';
import LogisticalFormHeader from '../LogisticalFormHeader/LogisticalFormHeader';
import LogisticalFormPackagingCard from '../LogisticalFormPackagingCard/LogisticalFormPackagingCard';
import LogisticalFormPackagingLineCard from '../LogisticalFormPackagingLineCard/LogisticalFormPackagingLineCard';
import {searchPackagingBranchApi} from '../../../../api';

const LogisticalFormPackagingView = () => {
  const I18n = useTranslator();

  const {logisticalForm} = useSelector((state: any) => state.logisticalForm);
  const packagingState = useSelector((state: any) => state.stock_packaging) ?? {
    loadingPackaging: false,
    moreLoadingPackaging: false,
    isListEndPackaging: false,
    packagingList: [],
    parentPackagingList: [],
  };
  const {
    loadingPackaging,
    moreLoadingPackaging,
    isListEndPackaging,
    packagingList,
    parentPackagingList,
  } = packagingState;

  const logisticalFormId = logisticalForm?.id;
  const sliceFunctionData = useMemo(
    () => ({
      logisticalFormId,
    }),
    [logisticalFormId],
  );

  const sliceParentFunctionData = useMemo(
    () => ({
      logisticalFormId,
    }),
    [logisticalFormId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      {logisticalFormId != null && (
        <SearchTreeView
          topFixedItems={<LogisticalFormHeader {...(logisticalForm ?? {})} />}
          parentList={parentPackagingList}
          list={packagingList}
          loading={loadingPackaging}
          moreLoading={moreLoadingPackaging}
          isListEnd={isListEndPackaging}
          sliceParentFunction={searchParentPackaging}
          sliceParentFunctionData={sliceParentFunctionData}
          sliceFunction={searchPackaging}
          sliceFunctionData={sliceFunctionData}
          sliceFunctionDataParentIdName="parentPackagingId"
          sliceFunctionDataNoParentName="noParent"
          fetchBranchData={branchId =>
            searchPackagingBranchApi({
              parentPackagingId: branchId,
            })
          }
          branchCondition={item => item?.packagingNumber != null}
          displayParentSearchValue={item => item?.packagingNumber ?? ''}
          searchParentPlaceholder={I18n.t('Stock_ParentPackaging')}
          searchPlaceholder={I18n.t('Base_Search')}
          parentFieldName="parentPackaging"
          renderBranch={({item}) => (
            <LogisticalFormPackagingCard packaging={item} />
          )}
          renderLeaf={({item}) => (
            <LogisticalFormPackagingLineCard packagingLine={item} />
          )}
          isHideableParentSearch={false}
        />
      )}
    </Screen>
  );
};

export default LogisticalFormPackagingView;
