/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {ObjectCard, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import IconDate from '../IconDate/IconDate';
import {TimesheetLine} from '../../../types';

interface TimesheetLineCardProps {
  statusSelect: number;
  project?: string;
  task?: string;
  manufOrder?: string;
  operation?: string;
  date: string;
  duration: string;
  unitDuration: string;
  isBorderColor?: boolean;
  style?: any;
}

const TimesheetLineCard = ({
  statusSelect,
  project,
  task,
  manufOrder,
  operation,
  date,
  duration,
  unitDuration,
  isBorderColor = true,
  style,
}: TimesheetLineCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(TimesheetLine.getStatusColor(statusSelect, Colors)),
    [Colors, statusSelect],
  );

  return (
    <View style={style}>
      <ObjectCard
        touchable={false}
        showArrow={false}
        leftContainerFlex={2}
        style={[styles.container, isBorderColor && styles.borderColor]}
        upperTexts={{
          items: [
            {
              displayText: (project || manufOrder) ?? '-',
              isTitle: true,
              numberOfLines: 2,
            },
            {
              displayText: (task || operation) ?? '-',
              numberOfLines: 2,
              style: styles.subTitle,
            },
          ],
        }}
        sideBadges={{
          items: [
            {
              customComponent: <IconDate date={date} />,
            },
            {
              customComponent: (
                <Text
                  textColor={Colors.primaryColor.background}
                  fontSize={18}
                  style={styles.durationText}>
                  {duration} {TimesheetLine.getUnitDuration(unitDuration, I18n)}
                </Text>
              ),
            },
          ],
        }}
      />
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      minHeight: 100,
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
    dateContainer: {
      flexDirection: 'row',
    },
    durationText: {
      fontWeight: '900',
      marginTop: 5,
    },
  });

export default TimesheetLineCard;
