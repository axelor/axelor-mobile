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
import {Icon, Text} from '../../atoms';
import {Alert} from '../../molecules';
import {CheckboxScrollList} from '../../organisms';
import {useThemeColor} from '../../../theme';
import {Line} from './ViewAllEditList';

interface AllLinesAlertProps {
  title: string;
  isAlertVisible: boolean;
  setIsAlertVisible: (visible: boolean) => void;
  lines: Line[];
  setLines: (lines: Line[]) => void;
  handleEditLine?: (line: Line) => void;
  translator: (key: string) => string;
}

const AllLinesAlert = ({
  title,
  isAlertVisible,
  setIsAlertVisible,
  lines,
  setLines,
  handleEditLine,
  translator,
}: AllLinesAlertProps) => {
  const Colors = useThemeColor();

  const [selectedLines, setSelectedLines] = useState([]);

  const renderChexboxItem = ({item}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.renderFirstLine}>
          <View style={styles.text}>
            <Text style={styles.productName} writingType="important">
              {item.name}
            </Text>
            <Text style={styles.productQty}>
              {item.qty} {item.unitName}
            </Text>
          </View>
          {handleEditLine && (
            <Icon
              name="pencil-fill"
              size={16}
              touchable
              onPress={() => {
                setIsAlertVisible(false);
                handleEditLine(item);
              }}
            />
          )}
        </View>
        {item.nameDetails && (
          <Text writingType="details">{item.nameDetails}</Text>
        )}
      </View>
    );
  };

  return (
    <Alert
      style={styles.alertContainer}
      visible={isAlertVisible}
      title={title}
      cancelButtonConfig={{
        showInHeader: true,
        onPress: () => setIsAlertVisible(false),
      }}
      confirmButtonConfig={{
        title: translator('Base_Remove'),
        iconName: 'trash3-fill',
        width: '45%',
        color: Colors.warningColor,
        onPress: () => {
          setLines(
            lines.filter(
              _line =>
                selectedLines.filter(
                  _selectedLine => _selectedLine.id === _line.id,
                ).length === 0,
            ),
          );
          setIsAlertVisible(false);
        },
      }}
      translator={translator}>
      <CheckboxScrollList
        data={lines}
        onCheckedChange={setSelectedLines}
        renderItem={renderChexboxItem}
        translator={translator}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    minHeight: 45,
    justifyContent: 'center',
  },
  renderFirstLine: {
    flexDirection: 'row',
    gap: 5,
  },
  text: {
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
  alertContainer: {
    height: '70%',
  },
});

export default AllLinesAlert;
