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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  Screen,
  SwitchCard,
  useConfig,
  useTheme,
  RightIconButton,
  Icon,
  useThemeColor,
  Text,
} from '@axelor/aos-mobile-ui';
import {clearMessage, uploadTranslations} from '../features/configSlice';
import {useDispatch, useSelector} from 'react-redux';
import {getTranslations, selectLanguage, useTranslator} from '../../i18n';
import {showToastMessage} from '../../utils';
import {
  disable,
  enable,
  useEffectOnline,
  useOnline,
} from '../../features/onlineSlice';
import {ApiProviderConfig} from '../../apiProviders/config';

const SettingsScreen = ({children}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const Theme = useTheme();
  const online = useOnline();
  const dispatch = useDispatch();

  const {
    showFilter,
    hideVirtualKeyboard,
    setActivityIndicator,
    toggleFilterConfig,
    toggleVirtualKeyboardConfig,
    setShowSubtitles,
    showSubtitles,
  } = useConfig();
  const language = useSelector(selectLanguage);

  const {message} = useSelector(state => state.config);
  const {user} = useSelector(state => state.user);
  const {baseUrl} = useSelector(state => state.auth);

  useEffect(() => {
    if (message) {
      showToastMessage({type: 'success', position: 'bottom', text1: message});
      setActivityIndicator(false);
      dispatch(clearMessage());
    }
  }, [message, dispatch, setActivityIndicator]);

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

  const handleSendTranslations = useCallback(() => {
    setActivityIndicator(true);
    const translations = getTranslations(language);
    dispatch(uploadTranslations({language, translations}));
  }, [dispatch, language, setActivityIndicator]);

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
        {user?.group?.code !== 'admins' ? null : (
          <RightIconButton
            icon={
              <Icon
                name="chevron-right"
                color={Colors.primaryColor.background}
              />
            }
            style={styles.RightIconButton}
            title={I18n.t('User_SendTranslations')}
            onPress={handleSendTranslations}
          />
        )}
      </View>
      <View style={styles.footerContainer}>
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
  RightIconButton: {
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    marginLeft: 18,
    paddingRight: 50,
    paddingLeft: 10,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SettingsScreen;
