/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {StyleSheet} from 'react-native';
import {
  default as ReactNativeToast,
  BaseToast,
  ErrorToast,
} from 'react-native-toast-message';
import {Alert, Text, ThemeColors, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import toastProvider from './ToastProvider';

const Toast = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const isError = toastProvider.getType() === 'error';

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={[styles.success, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={[styles.error, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
  };

  return (
    <>
      <ReactNativeToast
        config={toastConfig}
        onPress={() => setIsAlertVisible(true)}
      />
      <Alert
        style={isError ? styles.errorAlert : styles.successAlert}
        visible={isAlertVisible}
        title={toastProvider.getTitle()}
        cancelButtonConfig={{
          width: 50,
          title: null,
          hide: !isError,
          onPress: () => setIsAlertVisible(false),
        }}
        confirmButtonConfig={{
          width: 50,
          title: null,
          hide: isError,
          onPress: () => setIsAlertVisible(false),
        }}
        translator={I18n.t}>
        <Text>{toastProvider.getMessage()}</Text>
      </Alert>
    </>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    error: {
      borderLeftColor: Colors.errorColor.background,
    },
    errorAlert: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.errorColor.background,
      paddingLeft: 13,
      paddingRight: 20,
    },
    success: {
      borderLeftColor: Colors.successColor.background,
    },
    successAlert: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.successColor.background,
      paddingLeft: 13,
      paddingRight: 20,
    },
    toast: {
      width: '90%',
      height: 90,
    },
    toastContent: {
      paddingVertical: 5,
    },
    title: {
      fontSize: 18,
      color: Colors.text,
      flex: 1,
    },
    detail: {
      fontSize: 16,
      color: Colors.text,
      flex: 3,
    },
  });

export default Toast;
