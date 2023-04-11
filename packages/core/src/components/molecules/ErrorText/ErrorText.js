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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

const ERROR_CODE_REGEX = /\d{3}$/g;
const LOGIN_ERROR = 401;
const URL_ERROR = 999;

const ErrorText = ({error}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(Colors.errorColor);
  }, [Colors.errorColor]);

  const errorCode = useMemo(() => {
    if (error?.message == null) {
      return null;
    }

    const regexResult = error.message.match(ERROR_CODE_REGEX)[0];

    return regexResult == null ? null : parseFloat(regexResult);
  }, [error]);

  const errorMessage = useMemo(() => {
    if (errorCode === LOGIN_ERROR) {
      return I18n.t('Auth_WrongPasswordOrUserName');
    }

    if (errorCode === URL_ERROR) {
      return `${I18n.t('Auth_InvalidUrl')}: ${error.url}`;
    }

    return error?.message;
  }, [I18n, error, errorCode]);

  if (error == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Icon
        name="warning"
        FontAwesome5={false}
        color={Colors.errorColor.foreground}
      />
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      width: '90%',
      borderColor: color.background_light,
      borderWidth: 1,
      borderRadius: 13,
      backgroundColor: '#f79696',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 10,
      marginHorizontal: 20,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    text: {
      marginLeft: 10,
      color: color.foreground,
      alignSelf: 'center',
    },
  });

export default ErrorText;
