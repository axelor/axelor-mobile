import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {default as CoreNavigator} from '../navigator/Navigator';
import {useConfig, useThemeColor} from '@axelor/aos-mobile-ui';
import {getNetInfo} from '../api/net-info-utils';
import useTranslator from '../i18n/hooks/use-translator';

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator = ({
  modules,
  mainMenu,
  version,
  showModulesSubtitle = false,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {
    isHeaderIndicatorVisible,
    setIsHeaderIndicatorVisible,
    setHeaderIndicatorState,
  } = useConfig();
  const {logged} = useSelector(state => state.auth);

  const AppNavigator = useCallback(
    () => (
      <CoreNavigator
        modules={modules}
        mainMenu={mainMenu}
        showModulesSubtitle={showModulesSubtitle}
      />
    ),
    [modules, mainMenu, showModulesSubtitle],
  );

  const checkInternetConnection = useCallback(async () => {
    const {isConnected} = await getNetInfo();
    if (!isConnected) {
      setHeaderIndicatorState({
        text: I18n.t('Base_NoConnection'),
        color: Colors.secondaryColor.background_light,
      });
      setIsHeaderIndicatorVisible(true);
    } else {
      if (isHeaderIndicatorVisible) {
        setHeaderIndicatorState({
          text: I18n.t('Base_Connected'),
          color: Colors.primaryColor.background,
          textColor: 'white',
        });
        setIsHeaderIndicatorVisible(false);
      }
    }
  }, [
    I18n,
    Colors.primaryColor,
    Colors.secondaryColor,
    isHeaderIndicatorVisible,
    setIsHeaderIndicatorVisible,
    setHeaderIndicatorState,
  ]);

  useEffect(() => {
    const interval = setInterval(checkInternetConnection, 2000);
    return () => clearInterval(interval.current);
  }, [checkInternetConnection]);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {!logged ? (
        <Screen
          name="LoginScreen"
          component={LoginScreen}
          initialParams={{version}}
        />
      ) : (
        <Screen name="AppNavigator" component={AppNavigator} />
      )}
    </Navigator>
  );
};

export default RootNavigator;
