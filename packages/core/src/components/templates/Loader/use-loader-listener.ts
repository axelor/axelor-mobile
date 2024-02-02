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
import {LoaderStatus, useLoader} from './LoaderContext';

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
  const [start, setStart] = useState(false);

  const {
    setLoading,
    setNotifyMe,
    setShowPopup,
    setStatus,
    setMessage,
    setFinished,
    setDisabled,
    setOnSuccessCallBack,
    setOnErrorCallBack,
  } = useLoader();

  const onFinishCallBack = useCallback(
    (status: LoaderStatus, response: any) => {
      setLoading(false);
      setShowPopup(false);
      setStatus(status);
      setMessage(response);
      setFinished(true);
      onFinish(status);
    },
    [setLoading, setFinished, setShowPopup, setStatus, setMessage, onFinish],
  );

  const executeProcess = useCallback(async () => {
    setStart(false);
    setLoading(true);

    try {
      const response = await process();
      onFinishCallBack('ok', response);
    } catch (error) {
      onFinishCallBack('error', error);
    }
  }, [process, setLoading, onFinishCallBack]);

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
    setStart(true);
    setLoading(false);

    setNotifyMe(false);
    setShowPopup(false);
    setStatus(null);
    setMessage(null);
    setDisabled(disabled);

    setOnSuccessCallBack(onSuccess);
    setOnErrorCallBack(onError);
  }, [
    disabled,
    onSuccess,
    onError,
    setLoading,
    setNotifyMe,
    setShowPopup,
    setStatus,
    setMessage,
    setDisabled,
    setOnSuccessCallBack,
    setOnErrorCallBack,
  ]);

  useEffect(() => {
    processCallBack(start);
  }, [start, processCallBack]);

  return useMemo(() => ({listener: handleListener}), [handleListener]);
};

export default useLoaderListner;
