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
import {} from '@axelor/aos-mobile-core';
import {Button, Icon, useThemeColor} from '@axelor/aos-mobile-ui';

const MODE = {
  bySample: '1',
  byCharacteristic: '2',
};

interface ControlEntryFormButtonsProps {
  handleNextSample: () => void;
  handlePrevSample: () => void;
  handleNextCharacteristic: () => void;
  handlePrevCharacteristic: () => void;
  isLastCharacteristic: boolean;
  isFirstCharacteristic: boolean;
  mode: string;
  handleNextControlPlan: () => void;
  handlePrevControlPLan: () => void;
  handleNextSampleLine: () => void;
  handlePrevSampleLine: () => void;
  isLastSampleLine: boolean;
  isFirstSampleLine: boolean;
}

const ControlEntryFormButtons = ({
  handleNextSample,
  handlePrevSample,
  handleNextCharacteristic,
  handlePrevCharacteristic,
  isLastCharacteristic,
  isFirstCharacteristic,
  mode,
  handleNextControlPlan,
  handlePrevControlPLan,
  handleNextSampleLine,
  handlePrevSampleLine,
  isLastSampleLine,
  isFirstSampleLine,
}: ControlEntryFormButtonsProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.childrenContainer}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={
              mode === MODE.bySample
                ? isFirstCharacteristic
                  ? handlePrevSample
                  : handlePrevCharacteristic
                : isFirstSampleLine
                ? handlePrevControlPLan
                : handlePrevSampleLine
            }
            color={Colors.secondaryColor}
            iconName={isFirstCharacteristic ? 'eyedropper' : 'palette2'}
          />
          <Icon name="chevron-left" style={styles.chevronLeft} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={
              mode === MODE.bySample
                ? isLastCharacteristic
                  ? handleNextSample
                  : handleNextCharacteristic
                : isLastSampleLine
                ? handleNextControlPlan
                : handleNextSampleLine
            }
            iconName={isLastCharacteristic ? 'eyedropper' : 'palette2'}
            color={Colors.secondaryColor}
          />
          <Icon name="chevron-right" style={styles.chevronRight} />
        </View>
      </View>
      <View style={styles.lastButton}>
        <Button
          onPress={() => console.log('Send button pressed.')}
          iconName="check-lg"
          color={Colors.successColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 24,
  },
  childrenContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronLeft: {
    position: 'absolute',
    left: '10%',
  },
  chevronRight: {
    position: 'absolute',
    right: '15%',
  },
  lastButton: {
    width: '15%',
  },
});

export default ControlEntryFormButtons;
