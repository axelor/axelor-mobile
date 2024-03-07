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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  SwitchCard,
  useConfig,
  useTheme,
  Text,
  useThemeColor,
  BottomBar,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslator} from '../../i18n';
import {
  disable,
  enable,
  useEffectOnline,
  useOnline,
} from '../../features/onlineSlice';
import {ApiProviderConfig} from '../../apiProviders/config';
import {TranslationsButton} from '../components';

const SettingsScreen = ({children}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const Theme = useTheme();
  const online = useOnline();
  const dispatch = useDispatch();

  const {
    showFilter,
    hideVirtualKeyboard,
    toggleFilterConfig,
    toggleVirtualKeyboardConfig,
    setShowSubtitles,
    showSubtitles,
  } = useConfig();

  const {appVersion, baseUrl} = useSelector(state => state.auth);

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

  const EXEMPLE = [
    {
      iconName: 'house',
      viewComponent: <Screen title="House view component" />,
      color: Colors.secondaryColor_dark,
    },
    {
      iconName: 'clock-history',
      viewComponent: <Screen title="Clock history view component" />,
      indicator: 5,
      color: Colors.plannedColor,
    },
    {
      iconName: 'trash',
      viewComponent: <Screen title="Trash view component" />,
      color: Colors.infoColor,
    },
    {
      iconName: 'x-lg',
      viewComponent: <Screen title="X view component" />,
      color: Colors.progressColor,
    },
    {
      iconName: 'person-fill',
      viewComponent: <Screen title="Person view component" />,
    },
  ];

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <SwitchCard
          title={I18n.t('User_ShowFilter')}
          defaultValue={showFilter}
          onToggle={toggleFilterConfig}
        />
        <SwitchCard
          title={I18n.t('User_VirtualKeyboardConfig')}
          defaultValue={hideVirtualKeyboard}
          onToggle={toggleVirtualKeyboardConfig}
        />
        <SwitchCard
          title={I18n.t('User_ColorForColorBlind')}
          defaultValue={Theme.isColorBlind}
          onToggle={handleToggleColorBlind}
        />
        {ApiProviderConfig.allowConnectionBlock && (
          <SwitchCard
            title={I18n.t('User_BlockConnection')}
            defaultValue={!online.isEnabled}
            onToggle={handleToggleConnection}
          />
        )}
        <SwitchCard
          title={I18n.t('User_Show_Drawer_Subtitles')}
          defaultValue={showSubtitles}
          onToggle={handleToggleSubtitles}
        />
        {children}
        <TranslationsButton />
      </View>
      <BottomBar items={EXEMPLE} />
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
  container: {
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SettingsScreen;
