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
import {EventType, ProcessItem, ProcessOption} from './types';
import {processProvider} from './ProcessProvider';
import {generateUniqueID} from './loader-helper';

const useProcessRegister = (
  processOptions: ProcessOption,
  onFinish = () => {},
) => {
  const [key, setKey] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [processItem, setProcessItem] = useState<ProcessItem>();

  const onFinishCallback = () => {
    setLoading(false);
    onFinish();
  };

  useEffect(() => {
    const unid = generateUniqueID();
    const p = processProvider.registerProcess(unid, processOptions);

    processProvider.on(unid, EventType.STARTED, () => setLoading(true));
    processProvider.on(unid, EventType.COMPLETED, onFinishCallback);
    processProvider.on(unid, EventType.FAILED, onFinishCallback);

    setKey(unid);
    setProcessItem(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({key, processItem, loading}),
    [key, processItem, loading],
  );
};

export default useProcessRegister;
