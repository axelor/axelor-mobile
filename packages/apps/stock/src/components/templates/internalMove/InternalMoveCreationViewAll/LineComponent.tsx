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
import {Icon, Text} from '@axelor/aos-mobile-ui';

const LineComponent = ({
  line,
  setLines,
  handleEditLine,
}: {
  line: any;
  setLines: (fct: (lines: any[]) => any[]) => void;
  handleEditLine: (line: any) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{line.product.name}</Text>
      <Text style={styles.productQty}>
        {line.realQty} {line.unit.name}
      </Text>
      <Icon
        style={styles.icon}
        name="pencil-fill"
        size={16}
        touchable
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
