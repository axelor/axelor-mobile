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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Card, Icon} from '../../atoms';
import {InfoButton} from '../../organisms';

interface BranchCardProps {
  onPress: () => void;
  children: any;
  isOpen: boolean;
  parent: any;
  onFilterPress: (branch: any) => void;
  infoButtonIndication: string;
}

const BranchCard = ({
  onPress,
  children,
  isOpen,
  parent,
  onFilterPress,
  infoButtonIndication,
}: BranchCardProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.flexOne}
        onPress={onPress}
        activeOpacity={0.9}>
        <Card style={styles.card}>
          <View style={styles.flexOne}>{children}</View>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </Card>
      </TouchableOpacity>
      <InfoButton
        style={styles.infoButton}
        iconName="filter"
        iconColor={Colors.secondaryColor_dark.background}
        onPress={() => onFilterPress(parent)}
        indication={infoButtonIndication}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 2,
    marginHorizontal: 10,
  },
  flexOne: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    paddingHorizontal: 15,
    paddingRight: 15,
  },
  infoButton: {
    width: 40,
  },
});

export default BranchCard;
