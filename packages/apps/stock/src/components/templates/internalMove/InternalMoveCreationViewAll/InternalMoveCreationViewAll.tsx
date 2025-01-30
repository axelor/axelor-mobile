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
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  NumberBubble,
  Text,
  useThemeColor,
  ViewAllContainer,
} from '@axelor/aos-mobile-ui';
import LineComponent from './LineComponent';

interface InternalMoveCreationViewAllProps {
  lines: any[];
  currentLineId: number;
  setLines: (fct: (lines: any[]) => any[]) => void;
  setIsAlertVisible: (visible: boolean) => void;
  handleEditLine: (line: any) => void;
}

const InternalMoveCreationViewAll = ({
  lines,
  currentLineId,
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
          <LineComponent
            key={index}
            isSelected={currentLineId === line.id}
            line={line}
            setLines={setLines}
            handleEditLine={handleEditLine}
          />
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
});

export default InternalMoveCreationViewAll;
