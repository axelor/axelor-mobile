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

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  AnomalyBubble,
  PeriodDisplay,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ObjectCard, TextUnit} from '@axelor/aos-mobile-ui';
import {Leave} from '../../../types';

interface LeaveCardProps {
  style?: any;
  mode: number;
  leaveId: number;
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
  leaveId,
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

  return (
    <ObjectCard
      borderLeftColor={
        getItemColor(LeaveRequest?.statusSelect, statusSelect)?.background
      }
      style={[styles.container, style]}
      leftContainerFlex={2}
      showArrow={false}
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
        style: styles.badgeContainer,
        items: [
          {
            customComponent: (
              <TextUnit
                value={duration}
                unit={getItemTitle(LeaveReason?.unitSelect, durationUnitSelect)}
              />
            ),
          },
          {
            customComponent: (
              <AnomalyBubble
                style={styles.anoBubble}
                textIndicationStyle={styles.anoBubbleText}
                indicatorPosition="left"
                objectName="leave-request"
                objectId={leaveId}
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
  badgeContainer: {
    alignItems: 'flex-end',
  },
  anoBubble: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  anoBubbleText: {
    width: Dimensions.get('window').width * 0.6,
    bottom: 0,
  },
});

export default LeaveCard;
