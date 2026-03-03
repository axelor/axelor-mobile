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

import React, {useState} from 'react';
import {RadioSelect} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';

const ToggleSwitchModeAux = ({
  style = null,
  defaultValue = ExpenseLine.modes.general,
  onChange = () => {},
  readonly = false,
}) => {
  const I18n = useTranslator();

  const [, setMode] = useState(defaultValue);

  return (
    <RadioSelect
      style={style}
      defaultValue={defaultValue}
      items={[
        {id: ExpenseLine.modes.general, title: I18n.t('Hr_General')},
        {id: ExpenseLine.modes.kilometric, title: I18n.t('Hr_Kilometric')},
      ]}
      onChange={_mode => {
        onChange(_mode);
        setMode(_mode);
      }}
      readonly={readonly}
    />
  );
};

const ToggleSwitchMode = ({
  style = null,
  defaultValue = ExpenseLine.modes.general,
  onChange = () => {},
  readonly = false,
}) => {
  return (
    <ToggleSwitchModeAux
      style={style}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
    />
  );
};

export default ToggleSwitchMode;
