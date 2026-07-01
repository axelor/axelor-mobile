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

import React, {useEffect, useMemo} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {
  ControlEntryDetailsButtons,
  ControlEntryDetailsHeader,
  ControlEntrySampleCard,
} from '../../components';
import {searchControlEntrySample} from '../../features/controlEntrySampleSlice';
import {fetchControlEntryById} from '../../features/controlEntrySlice';

const ControlEntryDetailsScreen = ({route}: any) => {
  const {controlEntryId} = route?.params ?? {};
  const dispatch = useDispatch();

  const {
    controlEntrySampleList,
    loadingControlEntrySampleList,
    moreLoading,
    isListEnd,
  } = useSelector(state => state.controlEntrySample);
  const {controlEntry} = useSelector(state => state.controlEntry);

  useEffect(() => {
    dispatch((fetchControlEntryById as any)({controlEntryId}));
  }, [controlEntryId, dispatch]);

  const sliceFunctionData = useMemo(
    () => ({controlEntryId: controlEntry?.id}),
    [controlEntry?.id],
  );

  if (controlEntry?.id !== controlEntryId) return null;

  return (
    <Screen removeSpaceOnTop fixedItems={<ControlEntryDetailsButtons />}>
      <SearchListView
        expandableFilter={false}
        topFixedItems={<ControlEntryDetailsHeader />}
        loading={loadingControlEntrySampleList}
        list={controlEntrySampleList}
        sliceFunction={searchControlEntrySample}
        sliceFunctionData={sliceFunctionData}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        displaySearchBar={false}
        renderListItem={({item}) => (
          <ControlEntrySampleCard
            controlEntrySampleId={item.id}
            resultSelect={item.resultSelect}
            samplefullName={item.fullName}
          />
        )}
      />
    </Screen>
  );
};

export default ControlEntryDetailsScreen;
