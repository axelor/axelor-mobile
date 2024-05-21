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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Card, Icon} from '../../atoms';

interface BranchCardProps {
  onPress: () => void;
  children: any;
  isOpen: boolean;
}

const BranchCard = ({onPress, children, isOpen}: BranchCardProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors.secondaryColor), [Colors]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.cardContainer}>
        <View>{children}</View>
        <View style={styles.arrowContainer}>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = (color: Color) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 2,
      marginHorizontal: 10,
      paddingHorizontal: 15,
      paddingRight: 0,
    },
    arrowContainer: {
      width: 35,
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: color.background,
    },
  });

export default BranchCard;
