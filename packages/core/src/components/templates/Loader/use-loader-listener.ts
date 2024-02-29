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

import {useEffect, useMemo, useState} from 'react';
import {processProvider} from './ProcessProvider';
import {ProcessItem} from './types';

const useLoaderListener = () => {
  const [numberProcesses, setNumberProcesses] = useState<number>(0);
  const [allProcessList, setAllProcessList] = useState<ProcessItem[]>([]);

  useEffect(() => {
    setNumberProcesses(processProvider.numberOfRunningProcess);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processProvider.numberOfRunningProcess]);

  useEffect(() => {
    setAllProcessList(processProvider.allProcessList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processProvider.allProcessList]);

  return useMemo(
    () => ({numberProcesses, allProcessList}),
    [numberProcesses, allProcessList],
  );
};

export default useLoaderListener;
