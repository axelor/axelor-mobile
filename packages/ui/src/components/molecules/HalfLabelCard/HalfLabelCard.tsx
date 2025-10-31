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
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '../../atoms';

interface HalfLabelCardProps {
  style?: any;
  iconName: string;
  title: string;
  onPress: () => void;
}

const HalfLabelCard = ({
  style,
  iconName,
  title,
  onPress,
}: HalfLabelCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      testID="halfLabelCardTouchable">
      <Card style={[styles.container, style]}>
        <Icon name={iconName} />
        <Text style={styles.text} numberOfLines={2}>
          {title}
        </Text>
        <Icon name="chevron-right" />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.45,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
    marginVertical: 5,
    marginLeft: 12,
    gap: 5,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});

export default HalfLabelCard;
