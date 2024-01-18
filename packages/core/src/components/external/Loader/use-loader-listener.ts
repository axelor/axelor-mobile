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
import {showToastMessage} from '../../../utils/show-toast-message';

interface LoaderListenerProps {
  process: () => Promise<any>;
  onPress?: () => void;
}

const useLoaderListner = ({process, onPress}: LoaderListenerProps) => {
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);

  const handleProcess = useCallback(async () => {
    try {
      setStart(false);
      setLoading(true);

      const response = await process();

      showToastMessage({
        type: 'success',
        position: 'top',
        topOffset: 30,
        text1: 'Success',
        text2: response,
        onPress,
      });
    } catch (error) {
      showToastMessage({
        type: 'error',
        position: 'top',
        topOffset: 30,
        text1: 'Error',
        text2: error.toString(),
        onPress,
      });
    } finally {
      setLoading(false);
    }
  }, [process, onPress]);

  useEffect(() => {
    if (!start && !loading) {
      return;
    }

    handleProcess();
  }, [start, loading, handleProcess]);

  return useMemo(() => ({loading, trigger: () => setStart(true)}), [loading]);
};

export default useLoaderListner;
