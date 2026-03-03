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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FormView,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  Badge,
  HeaderContainer,
  Screen,
  Text,
  useThemeColor,
  InfoBubble,
} from '@axelor/aos-mobile-ui';
import {InterventionHeader} from '../../components';
import {fetchQuestionById, updateQuestion} from '../../features/questionSlice';
import {Question as QuestionType} from '../../types';

const InterventionQuestionFormScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {InterventionQuestion} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const rangeId = route?.params?.rangeId;
  const [questionId] = useState(route?.params?.questionId);

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {question, questionlist} = useSelector(
    (state: any) => state.intervention_question,
  );

  const questionStatus = useMemo(
    () =>
      QuestionType.getStatus(
        question,
        questionlist.find(
          q => q.id === question.conditionalInterventionQuestion?.id,
        ),
      ),
    [question, questionlist],
  );

  const questionBadge = useMemo(() => {
    if (
      questionStatus === InterventionQuestion?.statusSelect.Required ||
      questionStatus === InterventionQuestion?.statusSelect.Conditional
    ) {
      return {
        title: getItemTitle(InterventionQuestion?.statusSelect, questionStatus),
        color: getItemColor(InterventionQuestion?.statusSelect, questionStatus),
      };
    } else {
      return null;
    }
  }, [
    InterventionQuestion?.statusSelect,
    getItemColor,
    getItemTitle,
    questionStatus,
  ]);

  useEffect(() => {
    dispatch((fetchQuestionById as any)({questionId}));
  }, [dispatch, questionId]);

  const updateQuestionAPI = useCallback(
    objectState => {
      dispatch(
        (updateQuestion as any)({
          question: objectState,
          interventionId: intervention?.id,
          rangeId: rangeId,
        }),
      );

      navigation.pop();
    },
    [dispatch, intervention?.id, navigation, rangeId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        style={styles.headerContainer}
        expandableFilter={false}
        fixedItems={<InterventionHeader intervention={intervention} />}
      />
      <View style={styles.questionContainer}>
        <View style={styles.questionTitleContainer}>
          <Text writingType="title" style={styles.questionTitle}>
            {question.title}
          </Text>
          {questionBadge && (
            <Badge
              style={styles.badge}
              title={questionBadge.title}
              color={questionBadge.color}
            />
          )}
          {question.isPrivate && (
            <InfoBubble
              coloredBubble={false}
              iconName="lock"
              badgeColor={Colors.secondaryColor_dark}
              indication={I18n.t('Intervention_PrivateQuestion')}
              position="left"
            />
          )}
        </View>
        {question.indication && (
          <Text writingType="details">{question.indication}</Text>
        )}
      </View>
      <FormView
        formKey="intervention_interventionQuestion"
        defaultValue={question}
        defaultEditMode
        actions={[
          {
            key: 'save-interventionQuestion',
            type: 'update',
            needValidation: true,
            needRequiredFields: true,
            hideIf: () =>
              question.answerTypeSelect ===
              InterventionQuestion?.answerTypeSelect.Indication,
            customAction: ({objectState}) => {
              updateQuestionAPI(objectState);
            },
          },
        ]}
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
  questionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionTitle: {
    flex: 4,
  },
  badge: {
    width: null,
    paddingHorizontal: 5,
  },
});

export default InterventionQuestionFormScreen;
