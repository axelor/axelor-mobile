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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimesheetCard} from '../../atoms';

interface TimesheetDetailCardProps {
  isCompleted: boolean;
  startDate: string;
  endDate: string;
  company: string;
  totalDuration: string;
  isActions?: boolean;
  style?: any;
  onPress: () => void;
}

const TimesheetDetailCard = ({
  isCompleted,
  startDate,
  endDate,
  company,
  totalDuration,
  isActions = true,
  style,
  onPress,
}: TimesheetDetailCardProps) => {
  const Colors = useThemeColor();

  const handleSend = () => {
    console.log('handleSend');
  };

  return (
    <View style={[styles.container, style]}>
      <TimesheetCard
        isCompleted={isCompleted}
        startDate={startDate}
        endDate={endDate}
        company={company}
        totalDuration={totalDuration}
        style={styles.cardContainer}
        onPress={onPress}
      />
      {isActions && (
        <View style={styles.iconContainer}>
          <CardIconButton
            iconName={'paper-plane'}
            iconColor={Colors.secondaryColor_dark.background}
            onPress={handleSend}
            style={styles.cardIconButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 2,
  },
  cardContainer: {
    flex: 6,
  },
  iconContainer: {
    flex: 1,
  },
  cardIconButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default TimesheetDetailCard;
