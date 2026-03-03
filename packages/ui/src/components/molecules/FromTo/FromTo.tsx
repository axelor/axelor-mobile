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
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Icon} from '../../atoms';

interface FromToProps {
  fromComponent: React.ReactNode;
  toComponent: React.ReactNode;
  style?: any;
}

function FromTo({fromComponent, toComponent, style}: FromToProps) {
  const Colors = useThemeColor();
  return (
    <View style={[styles.container, style]} testID="fromToContainer">
      {fromComponent}
      <View style={styles.panel}>
        <Icon
          name="chevron-right"
          size={35}
          color={Colors.primaryColor.background}
        />
      </View>
      {toComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  panel: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FromTo;
