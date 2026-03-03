/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {useSelector} from '@axelor/aos-mobile-core';
import {MassIndicator, MassIndicatorConfig, RegisterMethod} from './types';
import {massIndicatorProvider} from './mass-indicator-provider';

export const useMassIndicatorConfig = (): MassIndicatorConfig => {
  const [massIndicatorConfig, setMassIndicatorConfig] =
    useState<MassIndicatorConfig>(
      massIndicatorProvider.getMassIndicatorConfig(),
    );

  useEffect(() => {
    massIndicatorProvider.register(setMassIndicatorConfig);

    return () => massIndicatorProvider.unregister(setMassIndicatorConfig);
  }, []);

  return useMemo(() => massIndicatorConfig, [massIndicatorConfig]);
};

export const useMassIndicatorRegister = (
  config: MassIndicatorConfig,
  method?: RegisterMethod,
) => {
  useEffect(() => {
    massIndicatorProvider.registerConfig(config, method);
  }, [config, method]);
};

export const useMassIndicatorChecker = () => {
  const massIndicatorConfig = useMassIndicatorConfig();

  const {user} = useSelector(state => state.user);

  const getMassIndicator = useCallback(
    (massValue: number | string): MassIndicator => {
      if (Object.entries(massIndicatorConfig ?? {}).length === 0) {
        return undefined;
      }

      const _value: number =
        typeof massValue === 'string' ? parseFloat(massValue) : massValue;
      const entries = Object.values(massIndicatorConfig);

      const limited = entries
        .filter(e => e.limit != null)
        .sort((a, b) => a.limit - b.limit);

      for (let i = 0; i < limited.length; i++) {
        if (_value < limited[i].limit) return limited[i];
      }

      return entries.find(e => !e.limit);
    },
    [massIndicatorConfig],
  );

  return useMemo(
    () => ({
      getMassIndicator,
      massUnitLabel:
        user.activeCompany?.stockConfig?.customsMassUnit?.labelToPrinting,
    }),
    [getMassIndicator, user.activeCompany],
  );
};
