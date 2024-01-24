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

interface LoaderListenerProps {
  process: () => Promise<any>;
  onSuccess?: () => void;
  onError?: () => void;
}

const useLoaderListner = ({
  process,
  onSuccess = () => {},
  onError = () => {},
}: LoaderListenerProps) => {
  const I18n = useTranslator();

  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);

  const executeProcess = useCallback(async () => {
    try {
      setStart(false);
      setLoading(true);

      const response = await process();

      showToastMessage({
        type: 'success',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Success'),
        text2: response || I18n.t('Base_Loader_ProccessSuccessMessage'),
        onPress: onSuccess,
      });
    } catch (error) {
      showToastMessage({
        type: 'error',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Error'),
        text2: error || I18n.t('Base_Loader_ProccessErrorMessage'),
        onPress: onError,
      });
    } finally {
      setLoading(false);
    }
  }, [process, onSuccess, onError, I18n]);

  useEffect(() => {
    if (start && !loading) {
      executeProcess();
    }
  }, [start, loading, executeProcess]);

  return useMemo(() => ({loading, listener: () => setStart(true)}), [loading]);
};

export default useLoaderListner;
