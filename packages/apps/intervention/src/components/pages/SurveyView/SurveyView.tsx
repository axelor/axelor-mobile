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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollList} from '@axelor/aos-mobile-ui';
import {QuestionCard} from '../../atoms';
import {InterventionHeader} from '../../molecules';
import {SurveyRangeNavigation} from '../../templates';
import {fetchQuestion, setSelectedRangeId} from '../../../features/questionSlice';
import {Question} from '../../../types';

const SurveyView = () => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {intervention} = useSelector(state => state.intervention_intervention);
  const {loading, moreLoading, isListEnd, questionlist, selectedRangeId} =
    useSelector(state => state.intervention_question);

  const handleChangeRangeId = useCallback(
    (rangeId: number) => {
      dispatch(setSelectedRangeId(rangeId));
    },
    [dispatch],
  );

  const fetchQuestionAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchQuestion as any)({
          interventionId: intervention.id,
          rangeId: selectedRangeId,
          page: page,
        }),
      );
    },
    [dispatch, intervention, selectedRangeId],
  );

  const getQuestionStatus = useCallback(
    question => {
      return Question.getStatus(
        question,
        questionlist.find(
          q => q.id === question.conditionalInterventionQuestion?.id,
        ),
      );
    },
    [questionlist],
  );

  return (
    <View style={styles.flexOne}>
      <HeaderContainer
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
      />
      <ScrollList
        loadingList={loading}
        data={questionlist}
        renderItem={({item}) => (
          <QuestionCard
            status={getQuestionStatus(item)}
            onPress={() =>
              navigation.navigate('InterventionQuestionFormScreen', {
                questionId: item.id,
              })
            }
            {...item}
          />
        )}
        fetchData={fetchQuestionAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

export default SurveyView;
