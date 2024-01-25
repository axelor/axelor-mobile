/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback} from 'react';
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ControlEntryHeader, ControlEntrySampleCard} from '../components';
import {searchControlEntrySample} from '../features/controlEntrySampleSlice';

const ControlEntryDetailsScreen = ({route}) => {
  const {controlEntryId} = route.params;

  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {
    controlEntrySampleList,
    loadingControlEntrySampleList,
    moreLoading,
    isListEnd,
  } = useSelector(state => state.controlEntrySample);

  const fetchControlEntryAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchControlEntrySample({
          page: page,
          controlEntryId: controlEntryId,
        }),
      );
    },
    [dispatch, controlEntryId],
  );

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ControlEntryHeader controlEntryId={controlEntryId} />}
      />
      <ScrollList
        loadingList={loadingControlEntrySampleList}
        data={controlEntrySampleList}
        fetchData={fetchControlEntryAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        renderItem={({item}) => (
          <ControlEntrySampleCard
            controlPlanId={item.id}
            resultSelect={item.resultSelect}
            samplefullName={item.fullName}
          />
        )}
      />
    </Screen>
  );
};

export default ControlEntryDetailsScreen;
