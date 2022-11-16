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
} from '@aos-mobile/ui';
import {
  getTranslations,
  selectLanguage,
  showToastMessage,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {clearMessage, uploadTranslations} from '../features/configSlice';

const SettingsScreen = ({route}) => {
  const {message} = useSelector(state => state.config);
  const {
    showFilter,
    showVirtualKeyboard,
    setActivityIndicator,
    toggleFilterConfig,
    toggleVirtualKeyboardConfig,
  } = useConfig();
  const language = useSelector(selectLanguage);
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const Theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      showToastMessage({type: 'success', position: 'bottom', text1: message});
      setActivityIndicator(false);
      dispatch(clearMessage());
    }
  }, [message, dispatch, setActivityIndicator]);

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
          defaultValue={showVirtualKeyboard}
          onToggle={toggleVirtualKeyboardConfig}
        />
        <SwitchCard
          title={I18n.t('User_ColorForColorBlind')}
          defaultValue={Theme.isColorBlind}
          onToggle={state => handleToggleColorBlind(state)}
        />
        {route.params.user == null ||
        route.params.user.group.code !== 'admins' ? null : (
          <RightIconButton
            icon={<Icon name="chevron-right" color={Colors.primaryColor} />}
            style={styles.RightIconButton}
            title={I18n.t('User_SendTranslations')}
            onPress={handleSendTranslations}
          />
        )}
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
  RightIconButton: {
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    marginLeft: 18,
    paddingRight: 50,
    paddingLeft: 10,
  },
});

export default SettingsScreen;
