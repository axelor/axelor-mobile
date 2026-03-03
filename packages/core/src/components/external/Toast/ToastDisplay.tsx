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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from 'react-native-toast-message';
import {useThemeColor} from '@axelor/aos-mobile-ui';

const ToastDisplay = ({type, ...props}: ToastConfigParams<any>) => {
  const Colors = useThemeColor();

  const Component = useMemo(
    () => (type === 'error' ? ErrorToast : BaseToast),
    [type],
  );

  const borderColor = useMemo(() => {
    switch (type) {
      case 'error':
        return Colors.errorColor;
      case 'success':
        return Colors.successColor;
      default:
        return Colors.secondaryColor;
    }
  }, [Colors, type]);

  const styles = useMemo(
    () => getStyles(borderColor.background, Colors.text),
    [Colors.text, borderColor],
  );

  return (
    <Component
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.title}
      text2Style={styles.detail}
      text2NumberOfLines={3}
    />
  );
};

const getStyles = (borderColor: string, textColor: string) =>
  StyleSheet.create({
    toast: {
      borderLeftColor: borderColor,
      width: '90%',
      height: 90,
    },
    toastContent: {
      paddingVertical: 5,
    },
    title: {
      fontSize: 18,
      color: textColor,
      flex: 1,
    },
    detail: {
      fontSize: 16,
      color: textColor,
      flex: 3,
    },
  });

export default ToastDisplay;
