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
import {Keyboard, useConfig, useTheme} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../../redux/hooks';
import {getTranslations, selectLanguage, useTranslator} from '../../i18n';
import {
  disable,
  enable,
  useEffectOnline,
  useOnline,
} from '../../features/onlineSlice';
import {ApiProviderConfig} from '../../apiProviders';
import {useIsAdmin} from '../../permissions';
import {updateActiveUser} from '../features/userSlice';
import {
  uploadNavigationTools,
  uploadTranslations,
} from '../features/configSlice';
import {settingsProvider} from './SettingsProvider';
import {SettingsItemType} from './types';

export const useSettingsRegister = () => {
  usePickerSettings();
  useSwitchSettings();
  useButtonSettings();
};

const usePickerSettings = () => {
  const I18n = useTranslator();
  const Theme = useTheme();
  const dispatch = useDispatch();

  const {virtualKeyboardVisibility, setVirtualKeyboardVisibility} = useConfig();

  const {user} = useSelector(state => state.user);
  const {localizationList} = useSelector(state => state.localization);

  const isLanguagePicker = useMemo(
    () => localizationList?.length > 1,
    [localizationList?.length],
  );

  const isThemePicker = useMemo(
    () => !Theme.isColorBlind && Theme.themes?.length !== 1,
    [Theme.isColorBlind, Theme.themes?.length],
  );

  const keyboardVisibilityList = useMemo(() => {
    return Object.entries(Keyboard.visibility).map(([key, value]) => ({
      visibility: value,
      name: I18n.t(`User_KeyboardVisibility_${key}`),
    }));
  }, [I18n]);

  useEffect(() => {
    settingsProvider.registerPickerItem({
      key: 'language',
      type: SettingsItemType.picker,
      order: 10,
      showIf: isLanguagePicker,
      title: I18n.t('User_Language'),
      defaultValue: user.localization?.id,
      listItems: localizationList,
      labelField: 'name',
      valueField: 'id',
      onValueChange: (localization: number) =>
        dispatch(
          (updateActiveUser as any)({
            id: user.id,
            localization: {id: localization},
            version: user.version,
          }),
        ),
    });
  }, [I18n, dispatch, isLanguagePicker, localizationList, user]);

  useEffect(() => {
    settingsProvider.registerPickerItem({
      key: 'theme',
      type: SettingsItemType.picker,
      order: 20,
      showIf: isThemePicker,
      title: I18n.t('User_Theme'),
      defaultValue: Theme.activeTheme?.key,
      listItems: Theme.themes,
      labelField: 'name',
      valueField: 'key',
      onValueChange: (_theme: string) => Theme.changeTheme(_theme),
    });
  }, [I18n, Theme, isThemePicker]);

  useEffect(() => {
    settingsProvider.registerPickerItem({
      key: 'virtualKeyboardVisibility',
      type: SettingsItemType.picker,
      order: 30,
      title: I18n.t('User_VirtualKeyboardVisibility'),
      defaultValue: virtualKeyboardVisibility,
      listItems: keyboardVisibilityList,
      labelField: 'name',
      valueField: 'visibility',
      onValueChange: setVirtualKeyboardVisibility,
    });
  }, [
    I18n,
    keyboardVisibilityList,
    setVirtualKeyboardVisibility,
    virtualKeyboardVisibility,
  ]);
};

const useSwitchSettings = () => {
  const I18n = useTranslator();
  const Theme = useTheme();
  const online = useOnline();
  const dispatch = useDispatch();

  useEffectOnline();

  const {
    showFilter,
    toggleFilterConfig,
    setShowSubtitles,
    showSubtitles,
    showToolbox,
    setShowToolbox,
  } = useConfig();

  useEffect(() => {
    settingsProvider.registerSwitchItem({
      key: 'showFilter',
      type: SettingsItemType.switch,
      order: 10,
      title: I18n.t('User_ShowFilter'),
      defaultValue: showFilter,
      onToggle: toggleFilterConfig,
    });
  }, [I18n, showFilter, toggleFilterConfig]);

  useEffect(() => {
    settingsProvider.registerSwitchItem({
      key: 'colorBlind',
      type: SettingsItemType.switch,
      order: 20,
      title: I18n.t('User_ColorForColorBlind'),
      defaultValue: Theme.isColorBlind,
      onToggle: (state: boolean) =>
        state ? Theme.activateColorBlind() : Theme.desactivateColorBlind(),
    });
  }, [I18n, Theme]);

  useEffect(() => {
    settingsProvider.registerSwitchItem({
      key: 'blockConnection',
      type: SettingsItemType.switch,
      order: 30,
      showIf: ApiProviderConfig.allowConnectionBlock,
      title: I18n.t('User_BlockConnection'),
      defaultValue: !online.isEnabled,
      onToggle: (state: boolean) => dispatch(state ? disable() : enable()),
    });
  }, [I18n, dispatch, online.isEnabled]);

  useEffect(() => {
    settingsProvider.registerSwitchItem({
      key: 'showSubtitles',
      type: SettingsItemType.switch,
      order: 40,
      title: I18n.t('User_Show_Drawer_Subtitles'),
      defaultValue: showSubtitles,
      onToggle: setShowSubtitles,
    });
  }, [I18n, setShowSubtitles, showSubtitles]);

  useEffect(() => {
    settingsProvider.registerSwitchItem({
      key: 'showToolbox',
      type: SettingsItemType.switch,
      order: 50,
      title: I18n.t('User_ShowToolBox'),
      defaultValue: showToolbox,
      onToggle: setShowToolbox,
    });
  }, [I18n, setShowToolbox, showToolbox]);
};

const useButtonSettings = () => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const {setActivityIndicator} = useConfig();

  const {localization, language} = useSelector(selectLanguage);
  const {loading, loadingTranslations} = useSelector(state => state.config);

  useEffect(() => {
    setActivityIndicator(loadingTranslations);
  }, [loadingTranslations, setActivityIndicator]);

  useEffect(() => {
    if (!loading) {
      setActivityIndicator(false);
    }
  }, [loading, setActivityIndicator]);

  const handleSendTranslations = useCallback(() => {
    dispatch(
      (uploadTranslations as any)({
        language,
        translations: getTranslations(localization),
      }),
    );
  }, [dispatch, language, localization]);

  const handleSendNavigationTools = useCallback(() => {
    setActivityIndicator(true);
    dispatch((uploadNavigationTools as any)());
  }, [dispatch, setActivityIndicator]);

  useEffect(() => {
    settingsProvider.registerButtonItem({
      key: 'translations',
      type: SettingsItemType.button,
      order: 10,
      showIf: isAdmin,
      title: I18n.t('User_SendTranslations'),
      onPress: handleSendTranslations,
    });
  }, [I18n, handleSendTranslations, isAdmin]);

  useEffect(() => {
    settingsProvider.registerButtonItem({
      key: 'navigationTools',
      type: SettingsItemType.button,
      order: 20,
      showIf: isAdmin,
      title: I18n.t('User_SendNavigationInformations'),
      onPress: handleSendNavigationTools,
    });
  }, [I18n, handleSendNavigationTools, isAdmin]);
};
