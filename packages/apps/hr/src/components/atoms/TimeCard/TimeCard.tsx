/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {Color, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {DateDisplay, useTranslator} from '@axelor/aos-mobile-core';
import TextUnit from '../TextUnit/TextUnit';
import {Time} from '../../../types';
import {getDurationUnit} from '../../../utils';

interface TimeCardProps {
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
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(Time.getStatusColor(statusSelect, Colors), isSmallCard),
    [Colors, isSmallCard, statusSelect],
  );

  return (
    <View style={style}>
      <ObjectCard
        touchable={false}
        showArrow={false}
        leftContainerFlex={1.3}
        style={[styles.container, isBorderColor && styles.borderColor]}
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
    </View>
  );
};

const getStyles = (color: Color, isSmallCard: boolean) =>
  StyleSheet.create({
    container: {
      minHeight: isSmallCard ? 'auto' : 100,
      justifyContent: 'center',
      marginHorizontal: 1,
      marginVertical: 1,
    },
    borderColor: {
      borderLeftWidth: 7,
      borderLeftColor: color.background,
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
