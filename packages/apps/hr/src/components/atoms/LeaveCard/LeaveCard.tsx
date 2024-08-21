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
import {PeriodDisplay, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {ObjectCard, TextUnit} from '@axelor/aos-mobile-ui';
import {Leave} from '../../../types';
import {StyleSheet} from 'react-native';

interface LeaveCardProps {
  style?: any;
  mode: number;
  statusSelect: number;
  startDate: string;
  endDate: string;
  duration: number;
  durationUnitSelect: number;
  reason: string;
  company: string;
  employee: string;
  onPress: () => void;
}

const LeaveCard = ({
  style,
  mode,
  statusSelect,
  startDate,
  endDate,
  duration,
  durationUnitSelect,
  reason,
  company,
  employee,
  onPress,
}: LeaveCardProps) => {
  const {LeaveReason, LeaveRequest} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const styles = useMemo(
    () =>
      getStyles(
        getItemColor(LeaveRequest?.statusSelect, statusSelect)?.background,
      ),
    [LeaveRequest?.statusSelect, getItemColor, statusSelect],
  );

  return (
    <ObjectCard
      style={[styles.container, style]}
      onPress={onPress}
      upperTexts={{
        items: [
          {
            customComponent: (
              <PeriodDisplay startDate={startDate} endDate={endDate} />
            ),
          },
          {
            iconName: 'tag-fill',
            indicatorText: reason,
          },
          {
            iconName: 'building-fill',
            indicatorText: company,
          },
          {
            iconName: 'person-fill',
            indicatorText: employee,
            hideIf: mode === Leave.mode.myLeaves,
          },
        ],
      }}
      sideBadges={{
        items: [
          {
            customComponent: (
              <TextUnit
                style={styles.textUnit}
                value={duration}
                unit={getItemTitle(LeaveReason?.unitSelect, durationUnitSelect)}
              />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderLeftWidth: 7,
      borderLeftColor: color,
      paddingRight: 10,
      marginHorizontal: 1,
      marginVertical: 2,
    },
    textUnit: {
      alignSelf: 'flex-end',
    },
  });

export default LeaveCard;
