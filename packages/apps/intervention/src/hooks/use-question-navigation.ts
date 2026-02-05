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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation, useSelector} from '@axelor/aos-mobile-core';
import {fetchNextQuestion} from '../api/question-api';

export const useQuestionNavigation = () => {
  const navigation = useNavigation();

  const {intervention} = useSelector(state => state.intervention_intervention);
  const {question} = useSelector(state => state.intervention_question);

  const [nextQuestionId, setNextQuestionId] = useState<number>();

  const handleQuestionFetch = useCallback(
    (fct: (data: any) => Promise<any>, setter: (value: number) => void) => {
      if (
        question?.id &&
        question?.interventionRange?.orderSeq != null &&
        question?.orderSeq != null
      ) {
        fct({
          interventionId: intervention.id,
          currentRangeOrderSeq: question.interventionRange.orderSeq,
          currentQuestionOrderSeq: question.orderSeq,
        })
          .then(res => res?.data?.data?.[0]?.id)
          .then(setter)
          .catch(() => setter(null));
      }
    },
    [
      intervention.id,
      question?.id,
      question?.interventionRange?.orderSeq,
      question?.orderSeq,
    ],
  );

  useEffect(() => {
    handleQuestionFetch(fetchNextQuestion, setNextQuestionId);
  }, [handleQuestionFetch]);

  const handleNavigate = useCallback(
    (questionId: number) => {
      navigation.replace('InterventionQuestionFormScreen', {questionId});
    },
    [navigation],
  );

  const handleNavigateNext = useCallback(
    () => handleNavigate(nextQuestionId),
    [handleNavigate, nextQuestionId],
  );

  return useMemo(
    () => ({
      handleNavigateNext,
      nextQuestionId,
    }),
    [handleNavigateNext, nextQuestionId],
  );
};
