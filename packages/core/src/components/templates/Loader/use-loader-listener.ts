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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslator} from '../../../i18n';
import {showToastMessage} from '../../../utils/show-toast-message';
import {useLoader} from './LoaderContext';

export type LoaderStatus = 'error' | 'ok' | undefined;

interface LoaderListenerProps {
  process: () => Promise<any>;
  onFinish?: (status: LoaderStatus) => void;
  onSuccess?: () => void;
  onError?: () => void;
  disabled?: boolean;
}

const useLoaderListner = ({
  process,
  onFinish = () => {},
  onSuccess = () => {},
  onError = () => {},
  disabled = false,
}: LoaderListenerProps) => {
  const I18n = useTranslator();

  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);

  const {getCurrentNotifyMe, setNotifyMe, setShowPopup} = useLoader();

  const onFinishCallBack = useCallback(
    (status: LoaderStatus, response: any) => {
      const notifyMe = getCurrentNotifyMe();

      setShowPopup(false);
      onFinish(status);

      console.log('notifyMe######', notifyMe);

      if (!notifyMe) {
        status === 'ok' ? onSuccess() : onError();
        return;
      }

      if (status === 'ok') {
        showToastMessage({
          type: 'success',
          position: 'top',
          topOffset: 30,
          text1: I18n.t('Base_Success'),
          text2: response || I18n.t('Base_Loader_ProccessSuccessMessage'),
          onPress: () => !disabled && onSuccess(),
        });
      } else {
        showToastMessage({
          type: 'error',
          position: 'top',
          topOffset: 30,
          text1: I18n.t('Base_Error'),
          text2: response || I18n.t('Base_Loader_ProccessErrorMessage'),
          onPress: () => !disabled && onError(),
        });
      }
    },
    [
      disabled,
      getCurrentNotifyMe,
      setShowPopup,
      onSuccess,
      onError,
      onFinish,
      I18n,
    ],
  );

  const executeProcess = useCallback(async () => {
    setStart(false);
    setLoading(true);

    try {
      const response = await process();

      setLoading(false);
      onFinishCallBack('ok', response);
    } catch (error) {
      setLoading(false);
      onFinishCallBack('error', error);
    }
  }, [process, onFinishCallBack]);

  const processCallBack = useCallback(
    (_start: boolean) => {
      if (!_start) {
        return;
      }

      executeProcess();
    },
    [executeProcess],
  );

  const handleListener = useCallback(() => {
    setNotifyMe(false);
    setStart(true);
  }, [setNotifyMe]);

  useEffect(() => {
    processCallBack(start);
  }, [start, processCallBack]);

  return useMemo(
    () => ({loading, listener: handleListener}),
    [loading, handleListener],
  );
};

export default useLoaderListner;
