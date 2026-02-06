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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useTranslator,
  useTypes,
  useTypeHelpers,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {InfoBubble, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';

interface QuestionCardProps {
  id: number;
  status: number;
  interventionRange: any;
  title: string;
  isPrivate?: boolean;
}

const QuestionCard = ({
  id,
  status,
  interventionRange,
  title,
  isPrivate = false,
}: QuestionCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {InterventionQuestion} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const styles = useMemo(
    () =>
      getStyles(
        getItemColor(InterventionQuestion?.statusSelect, status)?.background,
      ),
    [InterventionQuestion?.statusSelect, getItemColor, status],
  );

  if (status === InterventionQuestion?.statusSelect.Hidden) {
    return null;
  }

  return (
    <ObjectCard
      style={styles.border}
      leftContainerFlex={6}
      onPress={() =>
        navigation.navigate('InterventionQuestionFormScreen', {questionId: id})
      }
      upperTexts={{
        items: [
          {
            displayText: interventionRange?.rangeVal?.title,
            style: styles.details,
            hideIfNull: true,
          },
          {displayText: interventionRange?.equipment?.name, hideIfNull: true},
          {
            displayText: title,
            isTitle: true,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={{
        style: styles.badges,
        items: [
          isPrivate && {
            customComponent: (
              <InfoBubble
                coloredBubble={false}
                iconName="lock"
                badgeColor={Colors.secondaryColor_dark}
                indication={I18n.t('Intervention_PrivateQuestion')}
                position="left"
              />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    badges: {
      alignItems: 'flex-end',
    },
    details: {
      fontStyle: 'italic',
    },
  });

export default QuestionCard;
