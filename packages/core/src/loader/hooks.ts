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
import {processProvider} from './ProcessProvider';
import {processStorage} from './ProcessStorage';
import {ProcessItem} from './types';

export const useLoaderListener = () => {
  const [numberRunningProcesses, setNumberRunningProcesses] =
    useState<number>(0);
  const [numberUnreadProcess, setNumberUnreadProcess] = useState<number>(0);
  const [processList, setProcessList] = useState<ProcessItem[]>([]);

  useEffect(() => {
    setNumberRunningProcesses(processProvider.getNumberRunningProcess());

    const handleProcessChange = newNumber => {
      setNumberRunningProcesses(newNumber);
    };

    processProvider.subscribeNRProcess(handleProcessChange);

    return () => {
      processProvider.unsubscribeNRProcess(handleProcessChange);
    };
  }, []);

  const refreshData = useCallback(
    ({
      numberUnreadProcess: _numberUnreadProcess,
      processList: _processList,
    }) => {
      setNumberUnreadProcess(_numberUnreadProcess);
      setProcessList(_processList);
    },
    [],
  );

  useEffect(() => {
    processStorage.register(refreshData);
  }, [refreshData]);

  return useMemo(() => {
    return {
      numberRunningProcesses,
      numberUnreadProcess,
      processList,
    };
  }, [numberRunningProcesses, numberUnreadProcess, processList]);
};
