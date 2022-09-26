import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen} from '@/components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {activateColorBlind, desactivateColorBlind} from '@/features/themeSlice';
import {
  clearMessage,
  toggleFilterShowConfig,
  toggleZebraConfig,
  uploadTranslations,
} from '../features/configSlice';
import useTranslator from '@/hooks/use-translator';
import {getTranslations, selectLanguage} from '@aos-mobile/core';
import Toast from 'react-native-toast-message';
import {SwitchCard} from '@/components/molecules';

const SettingsScreen = ({route}) => {
  const {isColorBlind} = useSelector(state => state.theme);
  const {loading, zebraConfig, filterShowConfig, message} = useSelector(
    state => state.config,
  );
  const language = useSelector(selectLanguage);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      Toast.show({position: 'bottom', text1: message});
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  const handleToggleColorBlind = useCallback(
    state => {
      if (state) {
        dispatch(activateColorBlind());
      } else {
        dispatch(desactivateColorBlind());
      }
    },
    [dispatch],
  );

  const handleToggleFilter = useCallback(() => {
    dispatch(toggleFilterShowConfig());
  }, [dispatch]);

  const handleToggleZebra = useCallback(() => {
    dispatch(toggleZebraConfig());
  }, [dispatch]);

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
          defaultValue={filterShowConfig}
          onToggle={handleToggleFilter}
        />
        <SwitchCard
          title={I18n.t('User_ZebraDevice')}
          defaultValue={zebraConfig}
          onToggle={handleToggleZebra}
        />
        <SwitchCard
          title={I18n.t('User_ColorForColorBlind')}
          defaultValue={isColorBlind}
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
