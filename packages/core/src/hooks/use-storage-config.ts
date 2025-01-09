/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {useCallback, useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useConfig, useTheme} from '@axelor/aos-mobile-ui';
import {storage} from '../storage/Storage';

const CONFIG_STORAGE_KEY = 'ui_config';
const SMALL_SCREEN_HEIGHT = 500;

export const useStorageUpdater = () => {
  const {showFilter, showSubtitles, showToolbox, hideVirtualKeyboard} =
    useConfig();
  const {activeTheme, isColorBlind} = useTheme();

  const storageConfig = useMemo(
    () => ({
      showFilter,
      showSubtitles,
      showToolbox,
      hideVirtualKeyboard,
      activeTheme,
      isColorBlind,
    }),
    [
      activeTheme,
      hideVirtualKeyboard,
      isColorBlind,
      showFilter,
      showSubtitles,
      showToolbox,
    ],
  );

  useEffect(() => {
    storage.setItem(CONFIG_STORAGE_KEY, storageConfig);
  }, [storageConfig]);
};

export const useConfigUpdater = (): {updateConfigFromStorage: () => void} => {
  const {
    setFilterConfig,
    setShowSubtitles,
    setShowToolbox,
    setVirtualKeyboardConfig,
  } = useConfig();
  const {activateColorBlind, changeTheme} = useTheme();

  const updateConfigFromStorage = useCallback(() => {
    const _config = storage.getItem(CONFIG_STORAGE_KEY);

    if (_config != null) {
      setFilterConfig(_config.showFilter);
      setShowSubtitles(_config.showSubtitles);
      setShowToolbox(_config.showToolbox);
      setVirtualKeyboardConfig(_config.hideVirtualKeyboard);
      if (_config.isColorBlind) {
        activateColorBlind();
      } else {
        changeTheme(_config.activeTheme?.key);
      }
    }
  }, [
    activateColorBlind,
    changeTheme,
    setFilterConfig,
    setShowSubtitles,
    setShowToolbox,
    setVirtualKeyboardConfig,
  ]);

  return useMemo(() => ({updateConfigFromStorage}), [updateConfigFromStorage]);
};

export const useDefaultValuesOfUser = () => {
  const {setFilterConfig, setVirtualKeyboardConfig} = useConfig();

  useEffect(() => {
    const _config = storage.getItem(CONFIG_STORAGE_KEY);

    if (_config == null) {
      DeviceInfo.getManufacturer().then(manufacturer =>
        setVirtualKeyboardConfig(manufacturer === 'Zebra Technologies'),
      );
      setFilterConfig(Dimensions.get('window').height > SMALL_SCREEN_HEIGHT);
    }
  }, [setFilterConfig, setVirtualKeyboardConfig]);
};
