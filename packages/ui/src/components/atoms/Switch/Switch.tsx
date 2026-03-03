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

import React from 'react';
import {Switch as RNSwitch} from 'react-native';
import {useThemeColor} from '../../../theme';

interface SwitchProps {
  style?: any;
  isEnabled: boolean;
  handleToggle: (value?: boolean) => void;
  readonly?: boolean;
}

const Switch = ({
  style,
  isEnabled,
  handleToggle,
  readonly = false,
}: SwitchProps) => {
  const Colors = useThemeColor();

  const toggleSwitch = () => {
    handleToggle(!isEnabled);
  };

  return (
    <RNSwitch
      style={style}
      trackColor={{
        false: Colors.secondaryColor.background_light,
        true: Colors.primaryColor.background_light,
      }}
      thumbColor={Colors.secondaryColor_dark.background}
      ios_backgroundColor={Colors.backgroundColor}
      onValueChange={toggleSwitch}
      value={isEnabled}
      disabled={readonly}
    />
  );
};

export default Switch;
