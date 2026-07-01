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
import {useThemeColor} from '../../../theme';
import {IconTile} from '../../molecules';
import {Text} from '../../atoms';
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
          writingType={isSelected ? 'title' : undefined}
          fontSize={12}
          textColor={isSelected ? Colors.secondaryColor.background : undefined}>
          {line.name}
        </Text>
        <Text
          writingType={isSelected ? 'title' : undefined}
          fontSize={12}
          textColor={isSelected ? Colors.secondaryColor.background : undefined}>
          {line.qty} {line.unitName}
        </Text>
      </View>
      {!isSelected && handleEditLine && (
        <IconTile
          size={25}
          iconSize={12}
          icon="pencil-fill"
          onPress={() => handleEditLine(line)}
        />
      )}
      <IconTile
        size={25}
        iconSize={12}
        icon="x-lg"
        color={Colors.errorColor}
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
});

export default LineComponent;
