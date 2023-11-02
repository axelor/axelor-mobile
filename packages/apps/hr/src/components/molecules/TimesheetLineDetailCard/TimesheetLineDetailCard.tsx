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
import {TimeSheetLineCard} from '../../atoms';

interface TimesheetLineDetailCardProps {
  statusSelect: number;
  project?: string;
  task?: string;
  manufOrder?: string;
  operation?: string;
  date: string;
  duration: string;
  unitDuration: string;
  isActions?: boolean;
  style?: any;
}

const TimesheetLineDetailCard = ({
  statusSelect,
  project,
  task,
  manufOrder,
  operation,
  date,
  duration,
  unitDuration,
  isActions = false,
  style,
}: TimesheetLineDetailCardProps) => {
  const Colors = useThemeColor();

  const handleEdit = () => {
    console.log('handleEdit');
  };

  const handleDelete = () => {
    console.log('handleDelete');
  };

  return (
    <View style={[styles.container, style]}>
      <TimeSheetLineCard
        statusSelect={statusSelect}
        project={project}
        task={task}
        manufOrder={manufOrder}
        operation={operation}
        date={date}
        duration={duration}
        unitDuration={unitDuration}
        style={styles.cardContainer}
      />
      {!isActions && (
        <View style={styles.iconContainer}>
          <CardIconButton
            iconName={'pencil-alt'}
            iconColor={Colors.secondaryColor_dark.background}
            onPress={handleEdit}
            style={styles.cardIconButton}
          />
          <CardIconButton
            iconName={'trash-alt'}
            iconColor={Colors.errorColor.background}
            onPress={handleDelete}
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
    margin: 2,
  },
  iconContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  cardIconButton: {
    flex: 1,
  },
});

export default TimesheetLineDetailCard;
