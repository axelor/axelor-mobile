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
import {StyleSheet, View} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const LineComponent = ({
  line,
  isSelected,
  setLines,
  handleEditLine,
}: {
  line: any;
  isSelected: boolean;
  setLines: (fct: (lines: any[]) => any[]) => void;
  handleEditLine: (line: any) => void;
}) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <Text
        style={styles.productName}
        writingType={isSelected ? 'title' : null}
        textColor={isSelected ? Colors.secondaryColor.background : null}
        fontSize={16}>
        {line.product.name}
      </Text>
      <Text
        style={styles.productQty}
        writingType={isSelected ? 'title' : null}
        textColor={isSelected ? Colors.secondaryColor.background : null}
        fontSize={16}>
        {line.realQty} {line.unit.name}
      </Text>
      <Icon
        style={styles.icon}
        name="pencil-fill"
        size={16}
        touchable={!isSelected}
        color={isSelected ? Colors.secondaryColor.background : null}
        onPress={() => handleEditLine(line)}
      />
      <Icon
        style={styles.icon}
        name="x-lg"
        size={20}
        touchable
        onPress={() =>
          setLines(prevLines => prevLines.filter(_line => _line.id !== line.id))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  productName: {
    flex: 4,
  },
  productQty: {
    flex: 2,
  },
  icon: {
    marginLeft: 3,
  },
});

export default LineComponent;
