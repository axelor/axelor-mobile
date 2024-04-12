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

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  Alert,
  CheckboxScrollList,
  Icon,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface InternalMoveCreationAlertProps {
  isAlertVisible: boolean;
  setIsAlertVisible: (visible: boolean) => void;
  lines: any[];
  setLines: (lines: any[]) => void;
  handleEditLine: (line: any) => void;
}

const InternalMoveCreationAlert = ({
  isAlertVisible,
  setIsAlertVisible,
  lines,
  setLines,
  handleEditLine,
}: InternalMoveCreationAlertProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const [selectedLines, setSelectedLines] = useState([]);

  const renderChexboxItem = ({item}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.renderFirstLine}>
          <Text style={styles.productName} writingType="important">
            {item.product?.name}
          </Text>
          <Text style={styles.productQty}>
            {item.realQty} {item.unit?.name}
          </Text>
          <Icon
            name="pencil-fill"
            size={20}
            touchable
            onPress={() => {
              setIsAlertVisible(false);
              handleEditLine(item);
            }}
          />
        </View>
        {item.trackingNumber?.trackingNumberSeq && (
          <Text writingType="details">
            {item.trackingNumber?.trackingNumberSeq}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Alert
      visible={isAlertVisible}
      title={I18n.t('Stock_Products')}
      cancelButtonConfig={{
        showInHeader: true,
        onPress: () => setIsAlertVisible(false),
      }}
      confirmButtonConfig={{
        title: I18n.t('Stock_Remove'),
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
      translator={I18n.t}>
      <CheckboxScrollList
        data={lines}
        onCheckedChange={setSelectedLines}
        renderItem={renderChexboxItem}
        translator={I18n.t}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    flex: 4,
  },
  productQty: {
    flex: 2,
  },
});

export default InternalMoveCreationAlert;
