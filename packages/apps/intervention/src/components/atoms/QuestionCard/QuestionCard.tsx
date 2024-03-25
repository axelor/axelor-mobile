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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {Question} from '../../../types';

interface QuestionCardProps {
  status: number;
  interventionRange: any;
  title: string;
  isPrivate?: boolean;
  onPress: () => void;
}

const QuestionCard = ({
  status,
  interventionRange,
  title,
  isPrivate = false,
  onPress,
}: QuestionCardProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(Question.getStatusColor(status, Colors)?.background),
    [Colors, status],
  );

  return (
    <ObjectCard
      style={styles.border}
      leftContainerFlex={6}
      onPress={onPress}
      upperTexts={{
        items: [
          {displayText: interventionRange?.rangeVal?.title, hideIfNull: true},
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
            customComponent: <Icon name="lock" />,
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    badges: {
      alignItems: 'flex-end',
    },
  });

export default QuestionCard;
