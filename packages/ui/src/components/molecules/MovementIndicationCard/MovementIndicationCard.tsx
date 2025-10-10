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

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../atoms';
import {DottedLine} from '../../atoms';

interface MovementIndicationCardProps {
  style?: any;
  titleTop: string;
  iconTop: React.ReactElement;
  onPressTitleTop?: () => void;
  disabledTop?: boolean;
  titleDown: string;
  iconDown: React.ReactElement;
  onPressTitleDown?: () => void;
  disabledDown?: boolean;
}

function MovementIndicationCard({
  style,
  titleTop,
  iconTop,
  onPressTitleTop,
  disabledTop = true,
  titleDown,
  iconDown,
  onPressTitleDown,
  disabledDown = true,
}: MovementIndicationCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        {React.cloneElement(iconTop, {style: styles.icon} as any)}
        <TouchableOpacity
          style={styles.title}
          onPress={onPressTitleTop}
          disabled={disabledTop}>
          <Text numberOfLines={2}>{titleTop}</Text>
        </TouchableOpacity>
      </View>
      <DottedLine style={styles.dottedLine} />
      <View style={styles.titleContainer}>
        {React.cloneElement(iconDown, {style: styles.icon} as any)}
        <TouchableOpacity
          style={styles.title}
          onPress={onPressTitleDown}
          disabled={disabledDown}>
          <Text numberOfLines={2}>{titleDown}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 5,
  },
  dottedLine: {
    marginHorizontal: '5%',
    alignSelf: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    flex: 9,
    width: '90%',
    marginLeft: 5,
  },
  icon: {
    flex: 1,
  },
});

export default MovementIndicationCard;
