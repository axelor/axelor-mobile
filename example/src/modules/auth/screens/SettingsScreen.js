import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Screen, SwitchCard, useConfig, useTheme} from '@aos-mobile/ui';
import {
  getTranslations,
  selectLanguage,
  showToastMessage,
  useTranslator,
} from '@aos-mobile/core';
import {clearMessage, uploadTranslations} from '../features/configSlice';

const SettingsScreen = ({route}) => {
  const {loading, message} = useSelector(state => state.config);
  const {
    showFilter,
    showVirtualKeyboard,
    toggleFilterConfig,
    toggleVirtualKeyboardConfig,
  } = useConfig();
  const language = useSelector(selectLanguage);
  const I18n = useTranslator();
  const Theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      showToastMessage({type: 'success', position: 'bottom', text1: message});
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

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

  const handleSendTranslations = useCallback(() => {
    const translations = getTranslations(language);
    dispatch(uploadTranslations({language, translations}));
  }, [dispatch, language]);

  return (
    <Screen
      style={styles.screen}
      fixedItems={
        route.params.user == null ||
        route.params.user.group.code !== 'admins' ? null : (
          <Button
            title={I18n.t('User_SendTranslations')}
            onPress={handleSendTranslations}
            disabled={loading}
          />
        )
      }>
      <View style={styles.container}>
        <SwitchCard
          title={I18n.t('User_ShowFilter')}
          defaultValue={showFilter}
          onToggle={toggleFilterConfig}
        />
        <SwitchCard
          title={I18n.t('User_VirtualKeyboardConfig')}
          defaultValue={showVirtualKeyboard}
          onToggle={toggleVirtualKeyboardConfig}
        />
        <SwitchCard
          title={I18n.t('User_ColorForColorBlind')}
          defaultValue={Theme.isColorBlind}
          onToggle={state => handleToggleColorBlind(state)}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
