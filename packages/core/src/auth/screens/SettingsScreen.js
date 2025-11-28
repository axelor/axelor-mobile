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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  HorizontalRule,
  Keyboard,
  Picker,
  Screen,
  ScrollView,
  SwitchCard,
  Text,
  useConfig,
  useTheme,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../i18n';
import {
  disable,
  enable,
  useEffectOnline,
  useOnline,
} from '../../features/onlineSlice';
import {updateActiveUser} from '../features/userSlice';
import {ApiProviderConfig} from '../../apiProviders/config';
import {NavigationToolsButton, TranslationsButton} from '../components';
import {useIsAdmin} from '../../permissions';
import {useStorageUpdater} from '../../hooks/use-storage-config';

const SettingsScreen = ({children}) => {
  const I18n = useTranslator();
  const Theme = useTheme();
  const online = useOnline();
  const isAdmin = useIsAdmin();
  const dispatch = useDispatch();

  const {
    showFilter,
    toggleFilterConfig,
    virtualKeyboardVisibility,
    setVirtualKeyboardVisibility,
    setShowSubtitles,
    showSubtitles,
    showToolbox,
    setShowToolbox,
  } = useConfig();

  useStorageUpdater();

  const {appVersion, baseUrl} = useSelector(state => state.auth);
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

  const handleChangeTheme = useCallback(
    newTheme => Theme.changeTheme(newTheme),
    [Theme],
  );

  const updateLanguage = useCallback(
    localization => {
      dispatch(
        updateActiveUser({
          id: user.id,
          localization: {id: localization},
          version: user.version,
        }),
      );
    },
    [dispatch, user],
  );

  const handleToggleConnection = useCallback(
    state => {
      if (!state) {
        dispatch(enable());
      } else {
        dispatch(disable());
      }
    },
    [dispatch],
  );

  useEffectOnline();

  const handleToggleColorBlind = useCallback(
    state => {
      if (state) {
        Theme.activateColorBlind();
      } else {
        Theme.desactivateColorBlind();
      }
    },
    [Theme],
  );

  const handleToggleSubtitles = useCallback(
    state => {
      setShowSubtitles(state);
    },
    [setShowSubtitles],
  );

  const handleToggleToolbox = useCallback(
    state => {
      setShowToolbox(state);
    },
    [setShowToolbox],
  );

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        {isLanguagePicker && (
          <Picker
            title={I18n.t('User_Language')}
            defaultValue={user.localization?.id}
            listItems={localizationList}
            labelField="name"
            valueField="id"
            onValueChange={updateLanguage}
            emptyValue={false}
          />
        )}
        {isThemePicker && (
          <Picker
            title={I18n.t('User_Theme')}
            defaultValue={Theme.activeTheme?.key}
            listItems={Theme.themes}
            labelField="name"
            valueField="key"
            onValueChange={handleChangeTheme}
            emptyValue={false}
          />
        )}
        {(isLanguagePicker || isThemePicker) && (
          <HorizontalRule style={styles.lineSeparator} />
        )}
        <Picker
          title={I18n.t('User_VirtualKeyboardVisibility')}
          defaultValue={virtualKeyboardVisibility}
          listItems={keyboardVisibilityList}
          labelField="name"
          valueField="visibility"
          onValueChange={setVirtualKeyboardVisibility}
          emptyValue={false}
        />
        <SwitchCard
          title={I18n.t('User_ShowFilter')}
          defaultValue={showFilter}
          onToggle={toggleFilterConfig}
          style={[styles.topSwitchCard, styles.switchCard]}
        />
        <SwitchCard
          title={I18n.t('User_ColorForColorBlind')}
          defaultValue={Theme.isColorBlind}
          onToggle={handleToggleColorBlind}
          style={styles.switchCard}
        />
        {ApiProviderConfig.allowConnectionBlock && (
          <SwitchCard
            title={I18n.t('User_BlockConnection')}
            defaultValue={!online.isEnabled}
            onToggle={handleToggleConnection}
            style={styles.switchCard}
          />
        )}
        <SwitchCard
          title={I18n.t('User_Show_Drawer_Subtitles')}
          defaultValue={showSubtitles}
          onToggle={handleToggleSubtitles}
          style={styles.switchCard}
        />
        <SwitchCard
          title={I18n.t('User_ShowToolBox')}
          defaultValue={showToolbox}
          onToggle={handleToggleToolbox}
          style={styles.switchCard}
        />
        {children}
        {isAdmin && <HorizontalRule style={styles.lineSeparator} />}
        <TranslationsButton />
        <NavigationToolsButton />
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text>{I18n.t('Base_Version', {appVersion: appVersion})}</Text>
        <Text>{`${I18n.t('Base_ConnectedOn')}:`}</Text>
        <Text numberOfLines={1}>{baseUrl}</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  lineSeparator: {
    alignSelf: 'center',
    width: '25%',
    marginVertical: 15,
  },
  topSwitchCard: {
    marginTop: 5,
  },
  switchCard: {
    alignSelf: 'center',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SettingsScreen;
