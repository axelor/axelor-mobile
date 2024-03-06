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
import {StyleSheet, View} from 'react-native';
import {Text} from '../../../../atoms';

interface InfoViewProps {
  innerRadius: number;
  selectedItem: any;
  isCentered: boolean;
}

const InfoView = ({selectedItem, innerRadius, isCentered}: InfoViewProps) => {
  const styles = useMemo(() => {
    return getStyles(innerRadius);
  }, [innerRadius]);

  return (
    <View style={isCentered ? styles.centeredView : styles.infoView}>
      <Text numberOfLines={isCentered ? 2 : 1} writingType="details">
        {selectedItem?.label}
      </Text>
      <Text numberOfLines={1}>{selectedItem?.value}</Text>
    </View>
  );
};

const getStyles = (innerRadius: number) =>
  StyleSheet.create({
    infoView: {
      position: 'absolute',
      top: 0,
      alignItems: 'center',
      width: '100%',
      zIndex: 1,
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: innerRadius * 2,
      maxHeight: innerRadius * 2,
      padding: 10,
    },
  });

export default InfoView;
