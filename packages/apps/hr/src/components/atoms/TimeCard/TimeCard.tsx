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

  const styles = useMemo(() => {
    const timeObject = mode === Time.mode.Timer ? Timer : Timesheet;

    return getStyles(
      getItemColor(timeObject?.statusSelect, statusSelect)?.background,
      isSmallCard,
    );
  }, [Timer, Timesheet, getItemColor, isSmallCard, mode, statusSelect]);

  return (
    <ObjectCard
      touchable={false}
      showArrow={false}
      leftContainerFlex={1.3}
      style={[styles.container, isBorderColor && styles.borderColor, style]}
      upperTexts={{
        items: [
          {
            displayText: (project || manufOrder) ?? '-',
            isTitle: true,
            numberOfLines: 2,
          },
          {
            displayText: !isSmallCard && ((task || operation) ?? '-'),
            numberOfLines: 2,
            hideIfNull: true,
            style: styles.subTitle,
          },
          {
            displayText: !isSmallCard && comments,
            numberOfLines: 2,
            hideIfNull: true,
            style: styles.subTitle,
          },
        ],
      }}
      sideBadges={{
        style: styles.badges,
        items: [
          {
            customComponent: <DateDisplay date={date} />,
          },
          {
            customComponent: (
              <TextUnit
                value={duration}
                unit={getDurationUnit(durationUnit, I18n)}
                style={styles.textUnit}
              />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string, isSmallCard: boolean) =>
  StyleSheet.create({
    container: {
      minHeight: isSmallCard ? 'auto' : 100,
      justifyContent: 'center',
      marginHorizontal: 1,
      marginVertical: 2,
    },
    borderColor: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    subTitle: {
      fontStyle: 'italic',
      marginTop: 5,
    },
    badges: {
      alignItems: 'flex-end',
    },
    textUnit: {
      marginTop: isSmallCard ? 0 : 5,
    },
  });

export default TimeCard;
