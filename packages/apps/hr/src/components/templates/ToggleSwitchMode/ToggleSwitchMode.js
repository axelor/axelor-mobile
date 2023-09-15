/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useState} from 'react';
import {SwitchCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';

const ToggleSwitchMode = ({
  defaultValue = ExpenseLine.modes.general,
  onChange = () => {},
}) => {
  const I18n = useTranslator();

  const [, setMode] = useState(defaultValue);

  return (
    <SwitchCard
      title={I18n.t('Hr_Kilometric')}
      onToggle={() => {
        setMode(_mode => {
          const newMode =
            _mode === ExpenseLine.modes.general
              ? ExpenseLine.modes.kilometric
              : ExpenseLine.modes.general;
          onChange(newMode);
          return newMode;
        });
      }}
    />
  );
};

export default ToggleSwitchMode;
