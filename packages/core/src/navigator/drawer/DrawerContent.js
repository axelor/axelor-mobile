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

import React, {
  useRef,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import {StyleSheet, View, Animated, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {useThemeColor, useConfig} from '@axelor/aos-mobile-ui';
import {ModuleNavigatorContext} from '../Navigator';
import MenuIconButton from './MenuIconButton';
import Menu from './Menu';
import {moduleHasMenus, numberOfModules} from '../module.helper';
import {useTranslator} from '../../i18n';
import {authModule} from '../../auth';
import AuthMenuIconButton from './AuthMenuIconButton';
import {useSelector} from '../../redux/hooks';
import {
  PopupApplicationInformation,
  PopupMinimalRequiredVersion,
} from '../../components';
import MenuTitle from './MenuTitle';
import {formatVersionString} from '../../utils/string';
import {getDefaultMenuKey, hasSubMenus} from '../menu.helper';

const DrawerContent = ({
  state,
  modules,
  navigation,
  onModuleClick,
  onRefresh,
  version,
  versionCheckConfig,
}) => {
  useEffect(() => {
    const generateRoutes = _state => {
      return [...modules]
        ?.filter(_module => _module.menus)
        ?.flatMap(_module => {
          const result = [];

          for (const [key, menu] of Object.entries(_module.menus)) {
            result.push(key);

            if (hasSubMenus(menu)) {
              Object.keys(menu.subMenus).forEach(_key => {
                result.push(_key);
              });
            }
          }

          return result;
        })
        .map(_key => _state.routes.find(_item => _item.name === _key));
    };

    navigation.dispatch(_state => {
      return CommonActions.reset({
        ..._state,
        routes: generateRoutes(_state),
      });
    });
  }, [modules, navigation]);

  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {showSubtitles} = useConfig();

  const styles = useMemo(() => getStyles(Colors), [Colors]);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;
  const {activeModule} = useContext(ModuleNavigatorContext);
  const {mobileSettings} = useSelector(_state => _state.config);
  const mobileVersion = formatVersionString(version);

  const minimalRequiredVersion = useMemo(
    () => formatVersionString(mobileSettings?.minimalRequiredMobileAppVersion),
    [mobileSettings],
  );

  const innerMenuIsVisible = useMemo(
    () => activeModule.name !== authModule.name,
    [activeModule],
  );

  const drawerModules = useMemo(
    () =>
      modules
        .filter(moduleHasMenus)
        .filter(_module => _module.name !== authModule.name),
    [modules],
  );

  const externalMenuIsVisible = useMemo(
    () => numberOfModules(drawerModules) > 1,
    [drawerModules],
  );

  useEffect(() => {
    if (innerMenuIsVisible) {
      openSecondaryMenu();
    } else {
      closeSecondaryMenu();
    }
  }, [closeSecondaryMenu, innerMenuIsVisible, openSecondaryMenu]);

  const openSecondaryMenu = useCallback(() => {
    Animated.timing(secondaryMenusLeft, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [secondaryMenusLeft]);

  const closeSecondaryMenu = useCallback(() => {
    Animated.timing(secondaryMenusLeft, {
      toValue: 100,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [secondaryMenusLeft]);

  const innerMenuPosition = useMemo(
    () =>
      externalMenuIsVisible
        ? secondaryMenusLeft.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          })
        : 0,
    [externalMenuIsVisible, secondaryMenusLeft],
  );

  const handleModuleClick = _module => {
    onModuleClick(_module.name);
    navigateToDefaultMenu(_module);
  };

  const navigateToDefaultMenu = selectedModule => {
    const defaultMenuKey = getDefaultMenuKey(selectedModule);
    if (defaultMenuKey) {
      navigateToMenu(defaultMenuKey);
    }
  };

  const navigateToMenu = menuKey => {
    const route = state.routes.find(_route => _route.name === menuKey);

    if (route == null) {
      return;
    }

    const focused =
      state.routes.indexOf(route) === state.index &&
      Object.keys(activeModule.menus).includes(route.name);

    const event = navigation.emit({
      type: 'drawerItemPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...(focused
          ? DrawerActions.closeDrawer()
          : CommonActions.navigate({name: route.name, merge: true})),
        target: state.key,
      });
    }
  };

  if (numberOfModules(drawerModules) === 0) {
    return (
      <PopupApplicationInformation
        textKey={'Base_NoAppConfigured'}
        onRefresh={onRefresh}
      />
    );
  }

  if (
    versionCheckConfig?.activate === true &&
    mobileVersion < minimalRequiredVersion
  ) {
    return (
      <PopupMinimalRequiredVersion
        versionCheckConfig={versionCheckConfig}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {externalMenuIsVisible && (
        <View style={styles.iconsContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {drawerModules.map(_module => (
              <View style={styles.globalContainer} key={_module.name}>
                <MenuIconButton
                  style={styles.menuItemContainer}
                  icon={_module.icon}
                  subtitle={showSubtitles && I18n.t(_module.subtitle)}
                  disabled={_module.disabled}
                  color={
                    _module === activeModule
                      ? Colors.primaryColor.background_light
                      : null
                  }
                  onPress={() => handleModuleClick(_module)}
                  compatibility={_module.compatibilityAOS}
                />
                {!innerMenuIsVisible && (
                  <MenuTitle
                    module={_module}
                    onPress={() => handleModuleClick(_module)}
                  />
                )}
              </View>
            ))}
          </ScrollView>
          <View style={styles.otherIconsContainer}>
            <AuthMenuIconButton
              isActive={authModule.name === activeModule.name}
              showModulesSubtitle={showSubtitles}
              onPress={() => handleModuleClick(authModule)}
            />
          </View>
        </View>
      )}
      <View style={styles.menusContainer}>
        <Animated.View
          style={[
            styles.secondaryMenusContainer,
            {
              left: innerMenuPosition,
            },
          ]}>
          <Menu
            activeModule={
              externalMenuIsVisible ? activeModule : drawerModules[0]
            }
            state={state}
            navigation={navigation}
            authMenu={
              !externalMenuIsVisible ? (
                <AuthMenuIconButton
                  isActive={authModule.name === activeModule.name}
                  showModulesSubtitle={showSubtitles}
                  onPress={() => handleModuleClick(authModule)}
                />
              ) : null
            }
            onItemClick={
              externalMenuIsVisible
                ? () => {}
                : () => onModuleClick(drawerModules[0]?.name)
            }
            compatibility={
              externalMenuIsVisible ? null : drawerModules[0].compatibilityAOS
            }
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.screenBackgroundColor,
      overflow: 'hidden',
      zIndex: 2,
    },
    globalContainer: {
      flexDirection: 'row',
    },
    menusContainer: {
      flex: 1,
    },
    iconsContainer: {
      justifyContent: 'space-between',
      marginHorizontal: 12,
      width: '100%',
      zIndex: 3,
    },
    otherIconsContainer: {
      marginVertical: 8,
    },
    menuItemContainer: {
      height: 60,
      marginVertical: 8,
      justifyContent: 'center',
      zIndex: 5,
    },
    secondaryMenusContainer: {
      position: 'absolute',
      backgroundColor: Colors.backgroundColor,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      elevation: 4,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
  });

export default DrawerContent;
