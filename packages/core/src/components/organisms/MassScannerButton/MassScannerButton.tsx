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

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  DoubleIcon,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useMassScanner} from '../../../hooks';

interface MassScannerButtonProps {
  style?: any;
  scanKey: string;
  backgroundAction: (scannedValue: string) => void;
  fallbackAction?: (error: any) => void;
  scanInterval?: number;
}

const MassScannerButton = ({
  style,
  scanKey,
  backgroundAction,
  fallbackAction,
  scanInterval = 1000,
}: MassScannerButtonProps) => {
  const Colors = useThemeColor();

  const [scannerActive, setScannerActive] = useState(false);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  useMassScanner({
    scanKey,
    backgroundAction,
    fallbackAction,
    scanInterval,
    onClose: () => setScannerActive(false),
    enabled: scannerActive,
  });

  const handleToggleScanner = () => {
    setScannerActive(prev => !prev);
  };

  return (
    <View style={[styles.container, style]}>
      <Card style={styles.card}>
        <DoubleIcon
          style={styles.doubleIcon}
          topIconConfig={{
            name: 'search',
            color: Colors.primaryColor.background,
          }}
          bottomIconConfig={{
            name: 'qr-code-scan',
            color: scannerActive
              ? Colors.successColor.background
              : Colors.defaultColor.background,
          }}
          predefinedPosition="bottom-right"
          size={32}
          touchable
          onPress={handleToggleScanner}
        />
      </Card>
    </View>
  );
};
const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: 80,
      height: 80,
    },
    card: {
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
    },
    doubleIcon: {
      alignSelf: 'center',
      paddingLeft: 20,
    },
  });

export default MassScannerButton;
