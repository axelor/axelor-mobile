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

import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ToggleSwitch,
  getCommonStyles,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

const MODES = {
  general: 'GeneralMode',
  kilometric: 'KilometricMode',
};

const ToggleSwitchMode = ({
  defaultValue = MODES.general,
  onChange = console.log,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [mode, setMode] = useState(defaultValue);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  console.log(mode);

  return (
    <ToggleSwitch
      styleContainer={[
        commonStyles.filter,
        commonStyles.filterSize,
        styles.toggleSwitchContainer,
      ]}
      styleToogle={styles.toggle}
      leftTitle={I18n.t('Hr_General')}
      rightTitle={I18n.t('Hr_Kilometric')}
      onSwitch={() => {
        setMode(_mode => {
          const newMode =
            _mode === MODES.general ? MODES.kilometric : MODES.general;
          console.log('newMede', newMode);
          onChange(newMode);
          return newMode;
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  toggleSwitchContainer: {
    alignSelf: 'center',
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default ToggleSwitchMode;
