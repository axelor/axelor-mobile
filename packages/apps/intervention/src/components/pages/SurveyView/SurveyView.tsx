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

import React, {useCallback, useMemo} from 'react';
import {
  SearchListView,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {QuestionCard} from '../../atoms';
import {InterventionHeader} from '../../molecules';
import {SurveyRangeNavigation} from '../../templates';
import {
  fetchQuestion,
  setSelectedRangeId,
} from '../../../features/questionSlice';
import {Question} from '../../../types';

const SurveyView = () => {
  const dispatch = useDispatch();

  const {intervention} = useSelector(state => state.intervention_intervention);
  const {loading, moreLoading, isListEnd, questionlist, selectedRangeId} =
    useSelector(state => state.intervention_question);

  const handleChangeRangeId = useCallback(
    (rangeId: number) => dispatch(setSelectedRangeId(rangeId)),
    [dispatch],
  );

  const getQuestionStatus = useCallback(
    (_q: any) =>
      Question.getStatus(
        _q,
        questionlist.find(
          ({id}) => id === _q.conditionalInterventionQuestion?.id,
        ),
      ),
    [questionlist],
  );

  const sliceFunctionData = useMemo(
    () => ({
      interventionId: intervention.id,
      rangeId: selectedRangeId,
    }),
    [intervention.id, selectedRangeId],
  );

  return (
    <SearchListView
      list={questionlist}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={fetchQuestion}
      sliceFunctionData={sliceFunctionData}
      displaySearchBar={false}
      expandableFilter={false}
      fixedItems={
        <>
          <InterventionHeader intervention={intervention} />
          <SurveyRangeNavigation
            selectedRangeId={selectedRangeId}
            onChangeRangeId={handleChangeRangeId}
          />
        </>
      }
      renderListItem={({item}) => (
        <QuestionCard status={getQuestionStatus(item)} {...item} />
      )}
    />
  );
};

export default SurveyView;
