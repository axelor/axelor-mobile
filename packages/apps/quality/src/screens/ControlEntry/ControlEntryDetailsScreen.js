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

import React, {useCallback, useEffect} from 'react';
import {HeaderContainer, ScrollList} from '@axelor/aos-mobile-ui';
import {
  FocusScreen,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {
  ControlEntryDetailsButtons,
  ControlEntryDetailsHeader,
  ControlEntrySampleCard,
} from '../../components';
import {searchControlEntrySample} from '../../features/controlEntrySampleSlice';
import {fetchControlEntryById} from '../../features/controlEntrySlice';
import {ControlEntry as ControlEntryType} from '../../types';

const ControlEntryDetailsScreen = ({route}) => {
  const {controlEntryId} = route.params;
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {ControlEntry} = useTypes();

  const {
    controlEntrySampleList,
    loadingControlEntrySampleList,
    moreLoading,
    isListEnd,
  } = useSelector(state => state.controlEntrySample);
  const {controlEntry} = useSelector(state => state.controlEntry);

  const fetchControlEntrySampleAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchControlEntrySample({
          page: page,
          controlEntryId: controlEntry?.id,
        }),
      );
    },
    [dispatch, controlEntry],
  );

  useEffect(() => {
    dispatch(fetchControlEntryById({controlEntryId: controlEntryId}));
  }, [controlEntryId, dispatch]);

  const handleSamplePress = useCallback(
    sampleId => {
      navigation.navigate('ControlEntryFormScreen', {
        selectedMode: ControlEntryType.fillingMethod.Sample,
        sampleId,
      });
    },
    [navigation],
  );

  if (controlEntry?.id !== controlEntryId) {
    return null;
  }

  return (
    <FocusScreen
      fetcher={fetchControlEntrySampleAPI}
      removeSpaceOnTop
      fixedItems={
        controlEntry.statusSelect === ControlEntry?.statusSelect.InProgress && (
          <ControlEntryDetailsButtons />
        )
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ControlEntryDetailsHeader
            name={controlEntry.name}
            statusSelect={controlEntry.statusSelect}
            entryDateTime={controlEntry.entryDateTime}
            sampleCount={controlEntry.sampleCount}
            controlPlanName={controlEntry.controlPlan?.name}
          />
        }
      />
      <ScrollList
        loadingList={loadingControlEntrySampleList}
        data={controlEntrySampleList}
        fetchData={fetchControlEntrySampleAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        renderItem={({item}) => (
          <ControlEntrySampleCard
            controlEntrySampleId={item.id}
            resultSelect={item.resultSelect}
            samplefullName={item.fullName}
            onPress={() => handleSamplePress(item.id)}
          />
        )}
      />
    </FocusScreen>
  );
};

export default ControlEntryDetailsScreen;
