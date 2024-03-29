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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen, Text} from '@axelor/aos-mobile-ui';
import {InterventionHeader} from '../../components';
import {fetchQuestionById, updateQuestion} from '../../features/questionSlice';

const InterventionQuestionFormScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  const rangeId = route?.params?.rangeId;
  const [questionId, setQuestionId] = useState(route?.params?.questionId);

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {question} = useSelector((state: any) => state.intervention_question);

  useEffect(() => {
    dispatch((fetchQuestionById as any)({questionId}));
  }, [dispatch, questionId]);

  const defaultValue = useMemo(() => {
    return {
      checkboxAnswer: question?.checkboxAnswer,
    };
  }, [question]);

  const updateQuestionAPI = useCallback(
    objectState => {
      const _question = {
        id: question?.id,
        version: question?.version,
        checkboxAnswer: objectState?.checkboxAnswer,
      };

      dispatch(
        (updateQuestion as any)({
          question: _question,
          interventionId: intervention?.id,
          rangeId: rangeId,
        }),
      );

      navigation.pop();
    },
    [dispatch, intervention?.id, navigation, question, rangeId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        style={styles.headerContainer}
        expandableFilter={false}
        fixedItems={<InterventionHeader intervention={intervention} />}
      />
      <View style={styles.questionContainer}>
        <Text writingType="title">{question.title}</Text>
        {question.indication && (
          <Text writingType="details">{question.indication}</Text>
        )}
      </View>
      <FormView
        defaultValue={defaultValue}
        actions={[
          {
            key: 'save-interventionQuestion',
            type: 'custom',
            needValidation: true,
            needRequiredFields: true,
            customAction: ({objectState}) => {
              updateQuestionAPI(objectState);
            },
          },
        ]}
        formKey="intervention_interventionQuestion"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
  },
  questionContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default InterventionQuestionFormScreen;
