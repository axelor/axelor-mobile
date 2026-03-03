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
import {Button, ProgressCircle, useThemeColor} from '@axelor/aos-mobile-ui';
import {useMassScanner, useTranslator} from '@axelor/aos-mobile-core';

interface MassScannerButtonProps {
  style?: any;
  progress?: number;
  titleKey?: string;
  scanKey: string;
  backgroundAction: (
    scannedValue: string,
    tools: {disableScan: () => void},
  ) => void;
  fallbackAction?: (error: any) => void;
  scanInterval?: number;
}

const MassScannerButton = ({
  style,
  progress,
  titleKey,
  scanKey,
  backgroundAction,
  fallbackAction,
  scanInterval,
}: MassScannerButtonProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {isEnabled, enableScan} = useMassScanner({
    scanKey,
    backgroundAction,
    fallbackAction,
    scanInterval,
  });

  return (
    <View style={[styles.wrapper, style]}>
      {progress >= 0 && (
        <ProgressCircle
          circleSize={50}
          strokeWidth={2}
          progress={progress}
          innerText={`${(progress * 100).toFixed(2)}%`}
          textStyle={styles.progressText}
        />
      )}
      <Button
        title={I18n.t(titleKey)}
        iconName="qr-code-scan"
        onPress={enableScan}
        color={isEnabled ? Colors.progressColor : Colors.secondaryColor}
        isNeutralBackground={!isEnabled}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: undefined,
  },
  button: {
    flex: 1,
    height: '100%',
    borderWidth: 1,
  },
});

export default MassScannerButton;
