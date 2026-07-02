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
import {ObjectCard, TextUnit} from '@axelor/aos-mobile-ui';
import {
  DateDisplay,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {Time} from '../../../types';
import {getDurationUnit} from '../../../utils';

interface TimeCardProps {
  mode: number;
  statusSelect: number;
  project?: string;
  task?: string;
  manufOrder?: string;
  operation?: string;
  comments?: string;
  date: string;
  duration: number | string;
  durationUnit: string;
  isBorderColor?: boolean;
  isSmallCard?: boolean;
  style?: any;
}

const TimeCard = ({
  mode,
  statusSelect,
  project,
  task,
  manufOrder,
  operation,
  comments,
  date,
  duration,
  durationUnit,
  isBorderColor = true,
  isSmallCard = false,
  style,
}: TimeCardProps) => {
  const I18n = useTranslator();
  const {Timer, Timesheet} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const cardColor = useMemo(() => {
    const timeObject = mode === Time.mode.Timer ? Timer : Timesheet;

    return getItemColor(timeObject?.statusSelect, statusSelect)?.background;
  }, [Timer, Timesheet, getItemColor, mode, statusSelect]);

  return (
    <ObjectCard
      touchable={false}
      showArrow={false}
      leftContainerFlex={2}
      borderLeftColor={isBorderColor ? cardColor : undefined}
      style={[styles.container, style]}
      upperTexts={{
        items: [
          {
            displayText: project ?? manufOrder ?? '-',
            isTitle: true,
            numberOfLines: 2,
          },
          {
            displayText: task ?? operation ?? '-',
            numberOfLines: 2,
            hideIfNull: true,
            hideIf: isSmallCard,
            style: styles.subTitle,
          },
          {
            displayText: comments,
            numberOfLines: 2,
            hideIfNull: true,
            hideIf: isSmallCard,
            style: styles.subTitle,
          },
        ],
      }}
      sideBadges={{
        style: styles.badgeContainer,
        items: [
          {
            customComponent: <DateDisplay date={date} size={15} />,
          },
          {
            customComponent: (
              <TextUnit
                value={duration}
                unit={getDurationUnit(durationUnit, I18n)}
              />
            ),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
    marginVertical: 2,
  },
  subTitle: {
    fontStyle: 'italic',
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
});

export default TimeCard;
