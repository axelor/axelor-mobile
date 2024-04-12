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
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  Icon,
  NumberBubble,
  Text,
  useThemeColor,
  ViewAllContainer,
} from '@axelor/aos-mobile-ui';

interface InternalMoveCreationViewAllProps {
  lines: any[];
  setLines: (fct: (lines: any[]) => any[]) => void;
  setIsAlertVisible: (visible: boolean) => void;
  handleEditLine: (line: any) => void;
}

const InternalMoveCreationViewAll = ({
  lines,
  setLines,
  setIsAlertVisible,
  handleEditLine,
}: InternalMoveCreationViewAllProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <ViewAllContainer
      style={styles.container}
      disabled={lines?.length === 0}
      onViewPress={() => setIsAlertVisible(true)}
      translator={I18n.t}>
      <View style={styles.title}>
        <Text>{I18n.t('Stock_Products')}</Text>
        <NumberBubble
          style={styles.numberBubble}
          number={lines?.length ?? 0}
          color={Colors.primaryColor}
          isNeutralBackground
        />
      </View>
      {lines.slice(0, 3).map((line, index) => {
        return (
          <View style={styles.lineContainer} key={index}>
            <Text style={styles.productName}>{line.product.name}</Text>
            <Text style={styles.productQty}>
              {line.realQty} {line.unit.name}
            </Text>
            <Icon
              name="pencil-fill"
              size={20}
              touchable
              onPress={() => handleEditLine(line)}
            />
            <Icon
              name="x-lg"
              size={20}
              touchable
              onPress={() =>
                setLines(prevLines =>
                  prevLines.filter(_line => _line.id !== line.id),
                )
              }
            />
          </View>
        );
      })}
    </ViewAllContainer>
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
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  productName: {
    flex: 4,
  },
  productQty: {
    flex: 2,
  },
});

export default InternalMoveCreationViewAll;
