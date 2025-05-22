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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Card, DoubleIcon, useThemeColor} from '@axelor/aos-mobile-ui';
import {useMassScanner} from '../../../hooks';

interface MassScannerButtonProps {
  style?: any;
  scanKey: string;
  backgroundAction: (scannedValue: string) => void;
  fallbackAction?: (error: any) => void;
  scanInterval?: number;
  iconSize?: number;
}

const MassScannerButton = ({
  style,
  scanKey,
  backgroundAction,
  fallbackAction,
  scanInterval,
  iconSize = 20,
}: MassScannerButtonProps) => {
  const Colors = useThemeColor();

  const {isEnabled, enableScan} = useMassScanner({
    scanKey,
    backgroundAction,
    fallbackAction,
    scanInterval,
  });

  const styles = useMemo(
    () => getStyles(Colors.secondaryColor.background),
    [Colors],
  );
  const position = useMemo(() => -iconSize / 4, [iconSize]);

  return (
    <Card style={[styles.container, style]}>
      <DoubleIcon
        predefinedPosition="bottom-right"
        topIconPosition={{bottom: position, right: position}}
        topIconConfig={{
          name: 'search',
          color: Colors.primaryColor.background,
        }}
        bottomIconConfig={{
          name: 'qr-code-scan',
          color: isEnabled ? Colors.successColor.background : undefined,
        }}
        size={iconSize}
        touchable
        onPress={enableScan}
      />
    </Card>
  );
};

const getStyles = (borderColor: string) =>
  StyleSheet.create({
    container: {
      borderColor: borderColor,
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingRight: 12,
      paddingVertical: 10,
      marginVertical: 3,
      borderRadius: 7,
    },
  });

export default MassScannerButton;
