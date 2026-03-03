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
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '../../atoms';
import {useThemeColor} from '../../../theme';
import {Line} from './ViewAllEditList';

interface LineComponentProps {
  line: Line;
  isSelected: boolean;
  handleEditLine?: (line: Line) => void;
  handleDeleteLine: (lineId: number) => void;
}

const LineComponent = ({
  line,
  isSelected,
  handleEditLine,
  handleDeleteLine,
}: LineComponentProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text
          style={styles.productName}
          writingType={isSelected ? 'title' : null}
          textColor={isSelected ? Colors.secondaryColor.background : null}
          fontSize={16}>
          {line.name}
        </Text>
        <Text
          style={styles.productQty}
          writingType={isSelected ? 'title' : null}
          textColor={isSelected ? Colors.secondaryColor.background : null}
          fontSize={16}>
          {line.qty} {line.unitName}
        </Text>
      </View>
      {handleEditLine && (
        <Icon
          name="pencil-fill"
          size={16}
          touchable={!isSelected}
          color={isSelected ? Colors.secondaryColor.background : null}
          onPress={() => handleEditLine(line)}
        />
      )}
      <Icon
        name="x-lg"
        size={20}
        touchable
        onPress={() => handleDeleteLine(line.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    gap: 5,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productName: {
    flex: 1,
  },
  productQty: {
    maxWidth: '25%',
  },
});

export default LineComponent;
