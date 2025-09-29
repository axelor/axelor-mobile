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
import {WarningCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {StyleSheet} from 'react-native';

const ERROR_CODE_REGEX = /\d{3}$/g;
const LOGIN_ERROR = 401;
const URL_ERROR = 999;
const NO_CONNECTION_CODE = 418;

const ErrorText = ({error, style}) => {
  const I18n = useTranslator();

  const errorCode = useMemo(() => {
    if (error?.message == null) {
      return null;
    }

    const regexResult = error.message.match(ERROR_CODE_REGEX)?.[0];

    return regexResult == null ? null : parseFloat(regexResult);
  }, [error]);

  const errorMessage = useMemo(() => {
    if (errorCode === LOGIN_ERROR) {
      return I18n.t('Base_Connection_WrongPasswordOrUserName');
    }

    if (errorCode === URL_ERROR) {
      return `${I18n.t('Base_Connection_InvalidUrl')}: ${error.url}`;
    }

    if (errorCode === NO_CONNECTION_CODE) {
      return I18n.t('Base_NoConnection');
    }

    return error?.message;
  }, [I18n, error, errorCode]);

  if (error == null) {
    return null;
  }

  return (
    <WarningCard style={[styles.card, style]} errorMessage={errorMessage} />
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});

export default ErrorText;
