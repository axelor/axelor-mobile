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
  default as ReactNativeToast,
  BaseToast,
  ErrorToast,
} from 'react-native-toast-message';
import {
  Alert,
  Icon,
  Text,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import toastProvider from './ToastProvider';

const Toast = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const toastData = toastProvider.getData();

  const isError = useMemo(() => toastData.type === 'error', [toastData]);

  const alertColor = useMemo(
    () =>
      isError ? Colors.errorColor.background : Colors.successColor.background,
    [Colors, isError],
  );

  const styles = useMemo(
    () => getStyles(Colors, alertColor),
    [Colors, alertColor],
  );

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={[styles.toast, styles.success]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={[styles.toast, styles.error]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
    neutral: (props: any) => (
      <BaseToast
        {...props}
        style={[styles.toast, styles.neutral]}
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
        visible={isAlertVisible}
        title={toastData.title}
        titleStyle={styles.alertTitle}
        cancelButtonConfig={{
          showInHeader: true,
          onPress: () => setIsAlertVisible(false),
        }}
        translator={I18n.t}>
        <View style={styles.alertContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name={isError ? 'x-lg' : 'check-lg'}
              size={25}
              color={alertColor}
            />
          </View>
          <Text style={styles.alertText}>{toastData.message}</Text>
        </View>
      </Alert>
    </>
  );
};

const getStyles = (Colors: ThemeColors, alertColor: string) =>
  StyleSheet.create({
    toast: {
      width: '90%',
      height: 90,
    },
    error: {
      borderLeftColor: Colors.errorColor.background,
    },
    success: {
      borderLeftColor: Colors.successColor.background,
    },
    neutral: {
      borderLeftColor: Colors.secondaryColor.background,
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
    alertContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: alertColor,
    },
    alertTitle: {
      color: alertColor,
    },
    alertText: {
      flexShrink: 1,
    },
  });

export default Toast;
