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

import {useEffect} from 'react';
import {useTranslator} from '../../../i18n';
import {showToastMessage} from '../../../utils/show-toast-message';
import {useLoader} from './LoaderContext';

const LoaderToastNotifier = () => {
  const I18n = useTranslator();

  const {
    notifyMe,
    status,
    message,
    finished,
    disabled,
    setFinished,
    onSuccessCallBack,
    onErrorCallBack,
  } = useLoader();

  useEffect(() => {
    if (finished) {
      if (!notifyMe) {
        status === 'ok' ? onSuccessCallBack() : onErrorCallBack();
      } else {
        if (status === 'ok') {
          showToastMessage({
            type: 'success',
            position: 'top',
            topOffset: 30,
            text1: I18n.t('Base_Success'),
            text2: message || I18n.t('Base_Loader_ProccessSuccessMessage'),
            onPress: () => !disabled && onSuccessCallBack(),
          });
        } else {
          showToastMessage({
            type: 'error',
            position: 'top',
            topOffset: 30,
            text1: I18n.t('Base_Error'),
            text2: message || I18n.t('Base_Loader_ProccessErrorMessage'),
            onPress: () => !disabled && onErrorCallBack(),
          });
        }
      }
      setFinished(false);
    }
  }, [
    notifyMe,
    status,
    message,
    finished,
    disabled,
    setFinished,
    onSuccessCallBack,
    onErrorCallBack,
    I18n,
  ]);

  return null;
};

export default LoaderToastNotifier;
