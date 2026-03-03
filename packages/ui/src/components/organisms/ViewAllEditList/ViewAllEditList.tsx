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

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';
import {NumberBubble, ViewAllContainer} from '../../molecules';
import {useThemeColor} from '../../../theme';
import AllLinesAlert from './AllLinesAlert';
import LineComponent from './LineComponent';

export interface Line {
  id: number;
  name: string;
  nameDetails?: string;
  qty: number;
  unitName: string;
}

interface ViewAllEditListProps {
  title: string;
  lines: Line[];
  currentLineId: number;
  setLines: (lines: Line[]) => void;
  handleEditLine?: (line: Line) => void;
  translator: (key: string) => string;
}

const ViewAllEditList = ({
  title,
  lines,
  currentLineId,
  setLines,
  handleEditLine,
  translator,
}: ViewAllEditListProps) => {
  const Colors = useThemeColor();

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
    <>
      <ViewAllContainer
        style={styles.container}
        disabled={lines?.length === 0}
        onViewPress={() => setIsAlertVisible(true)}
        translator={translator}>
        <View style={styles.title}>
          <Text>{title}</Text>
          <NumberBubble
            style={styles.numberBubble}
            number={lines?.length ?? 0}
            color={Colors.primaryColor}
            isNeutralBackground
          />
        </View>
        {lines.slice(0, 3).map((line, index) => {
          return (
            <LineComponent
              key={index}
              line={line}
              isSelected={currentLineId === line.id}
              handleEditLine={handleEditLine}
              handleDeleteLine={lineId =>
                setLines(lines.filter(_line => _line.id !== lineId))
              }
            />
          );
        })}
      </ViewAllContainer>
      <AllLinesAlert
        title={title}
        isAlertVisible={isAlertVisible}
        setIsAlertVisible={setIsAlertVisible}
        lines={lines}
        setLines={setLines}
        handleEditLine={handleEditLine}
        translator={translator}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberBubble: {
    marginLeft: 10,
  },
});

export default ViewAllEditList;
