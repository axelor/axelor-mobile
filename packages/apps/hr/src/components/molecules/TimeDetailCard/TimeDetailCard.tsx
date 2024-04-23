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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimeCard} from '../../atoms';

interface TimeDetailCardProps {
  statusSelect: number;
  project?: string;
  task?: string;
  manufOrder?: string;
  operation?: string;
  comments?: string;
  date: string;
  duration: number | string;
  durationUnit: string;
  isSmallCard?: boolean;
  isActions?: boolean;
  canEdit?: boolean;
  showTrash?: boolean;
  style?: any;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TimeDetailCard = ({
  statusSelect,
  project,
  task,
  manufOrder,
  operation,
  comments,
  date,
  duration,
  durationUnit,
  isSmallCard,
  showTrash = true,
  canEdit = true,
  isActions = true,
  style,
  onEdit = () => {},
  onDelete = () => {},
}: TimeDetailCardProps) => {
  const Colors = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      <TimeCard
        statusSelect={statusSelect}
        project={project}
        task={task}
        manufOrder={manufOrder}
        operation={operation}
        comments={comments}
        date={date}
        duration={duration}
        durationUnit={durationUnit}
        isSmallCard={isSmallCard}
        style={styles.cardContainer}
      />
      {isActions && (
        <View style={styles.iconContainer}>
          <CardIconButton
            iconName={canEdit ? 'pencil-fill' : 'file-earmark-text'}
            iconColor={Colors.secondaryColor_dark.background}
            onPress={onEdit}
            style={styles.cardIconButton}
          />
          {showTrash && (
            <CardIconButton
              iconName={'trash3-fill'}
              iconColor={Colors.errorColor.background}
              onPress={onDelete}
              style={styles.cardIconButton}
            />
          )}
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

export default TimeDetailCard;
