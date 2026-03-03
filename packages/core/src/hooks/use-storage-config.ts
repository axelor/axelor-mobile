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

import {useCallback, useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Keyboard, useConfig, useTheme} from '@axelor/aos-mobile-ui';
import {storage} from '../storage/Storage';
import {useSelector} from '../redux/hooks';

const CONFIG_STORAGE_KEY = 'ui_config';
const SMALL_SCREEN_HEIGHT = 500;

export const useStorageUpdater = () => {
  const {showFilter, showSubtitles, showToolbox, virtualKeyboardVisibility} =
    useConfig();
  const {activeTheme, isColorBlind} = useTheme();

  const storageConfig = useMemo(
    () => ({
      showFilter,
      showSubtitles,
      showToolbox,
      virtualKeyboardVisibility,
      activeTheme,
      isColorBlind,
    }),
    [
      activeTheme,
      virtualKeyboardVisibility,
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
    setVirtualKeyboardVisibility,
  } = useConfig();
  const {activateColorBlind, addThemes, changeTheme} = useTheme();

  const updateConfigFromStorage = useCallback(() => {
    const _config = storage.getItem(CONFIG_STORAGE_KEY);

    if (_config != null) {
      setFilterConfig(_config.showFilter);
      setShowSubtitles(_config.showSubtitles);
      setShowToolbox(_config.showToolbox);
      setVirtualKeyboardVisibility(_config.virtualKeyboardVisibility);
      addThemes(_config.themes);
      if (_config.isColorBlind) {
        activateColorBlind();
      } else {
        changeTheme(_config.activeTheme?.key);
      }
    }
  }, [
    activateColorBlind,
    addThemes,
    changeTheme,
    setFilterConfig,
    setShowSubtitles,
    setShowToolbox,
    setVirtualKeyboardVisibility,
  ]);

  return useMemo(() => ({updateConfigFromStorage}), [updateConfigFromStorage]);
};

export const useCustomThemeOfUser = () => {
  const {activeTheme, themes, changeTheme} = useTheme();

  const {user} = useSelector(state => state.user);

  useEffect(() => {
    const _theme = themes.find(_t => Number(_t.key) === Number(user.theme));

    if (_theme?.isCustom) {
      changeTheme(_theme.key);
    }
  }, [changeTheme, themes, user.theme]);

  useEffect(() => {
    storage.setItem(CONFIG_STORAGE_KEY, {
      ...storage.getItem(CONFIG_STORAGE_KEY),
      themes: themes.filter(_t => _t.isCustom),
      activeTheme,
    });
  }, [activeTheme, themes]);
};

export const useDefaultValuesOfUser = () => {
  const {setFilterConfig, setVirtualKeyboardVisibility} = useConfig();
  useCustomThemeOfUser();

  useEffect(() => {
    const _config = storage.getItem(CONFIG_STORAGE_KEY);

    if (_config == null) {
      DeviceInfo.getManufacturer().then(manufacturer =>
        setVirtualKeyboardVisibility(
          manufacturer === 'Zebra Technologies'
            ? Keyboard.visibility.HiddenOnScannableInputs
            : Keyboard.visibility.Always,
        ),
      );
      setFilterConfig(Dimensions.get('window').height > SMALL_SCREEN_HEIGHT);
    }
  }, [setFilterConfig, setVirtualKeyboardVisibility]);
};
