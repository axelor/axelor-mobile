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

import React, {useRef, useMemo, useEffect, useCallback} from 'react';
import {StyleSheet, View, Animated, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {ThemeColors, useThemeColor} from '@axelor/aos-mobile-ui';
import {authModule} from '../../auth';
import {
  PopupApplicationInformation,
  PopupMinimalRequiredVersion,
} from '../../components';
import {useOutdatedVersion} from '../../hooks';
import {MenuWithSubMenus, Module} from '../../app';
import {useActiveModule} from '../providers';
import {
  DrawerState,
  moduleHasMenus,
  NavigationObject,
  numberOfModules,
  getDefaultMenuKey,
  hasSubMenus,
} from '../helpers';
import {AuthMenu, Menu, MenuIconButton, MenuTitle} from './menu';

interface DrawerContentProps {
  state: DrawerState;
  modules: Module[];
  navigation: NavigationObject;
  onModuleClick: (name: string) => void;
  onRefresh: () => void;
  versionCheckConfig: any;
}

const DrawerContent = ({
  state,
  modules,
  navigation,
  onModuleClick,
  onRefresh,
  versionCheckConfig,
}: DrawerContentProps) => {
  const Colors = useThemeColor();
  const {isOutdated} = useOutdatedVersion(versionCheckConfig);

  useEffect(() => {
    navigation.dispatch(_state =>
      CommonActions.reset({
        ..._state,
        routes: modules
          ?.filter(_module => _module.menus)
          ?.flatMap(_module => {
            const result = [];

            for (const [key, menu] of Object.entries(_module.menus)) {
              result.push(key);

              if (hasSubMenus(menu)) {
                result.push(
                  ...Object.keys((menu as MenuWithSubMenus).subMenus),
                );
              }
            }

            return result;
          })
          .map(_key => _state.routes.find(_item => _item.name === _key)),
      }),
    );
  }, [modules, navigation]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;
  const {activeModule} = useActiveModule();

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

  const toggleSecondaryMenu = useCallback(() => {
    const openConfig = {toValue: 0, duration: 300};
    const closeConfig = {toValue: 100, duration: 0};

    Animated.timing(secondaryMenusLeft, {
      ...(innerMenuIsVisible ? openConfig : closeConfig),
      useNativeDriver: false,
    }).start();
  }, [innerMenuIsVisible, secondaryMenusLeft]);

  useEffect(() => {
    toggleSecondaryMenu();
  }, [toggleSecondaryMenu]);

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

  const handleModuleClick = (_module: Module) => {
    onModuleClick(_module.name);

    const defaultMenuKey = getDefaultMenuKey(_module);
    if (defaultMenuKey) {
      navigateToMenu(defaultMenuKey);
    }
  };

  const navigateToMenu = (menuKey: string) => {
    const route = state.routes.find(_route => _route.name === menuKey);

    if (route == null) {
      return;
    }

    const focused =
      state.routes.indexOf(route) === state.index &&
      Object.keys(activeModule.menus).includes(route.name);

    const event: any = navigation.emit({
      type: 'drawerItemPress' as never,
      target: route.key,
      canPreventDefault: true,
      data: {} as never,
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
        textKey="Base_NoAppConfigured"
        onRefresh={onRefresh}
      />
    );
  }

  if (isOutdated) {
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            {drawerModules.map(_module => (
              <View style={styles.globalContainer} key={_module.name}>
                <MenuIconButton
                  style={styles.menuItemContainer}
                  icon={_module.icon}
                  subtitle={_module.subtitle}
                  disabled={_module.disabled}
                  isActive={_module.name === activeModule?.name}
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
            <AuthMenu onPress={handleModuleClick} />
          </View>
        </View>
      )}
      <View style={styles.menusContainer}>
        <Animated.View
          style={[styles.secondaryMenusContainer, {left: innerMenuPosition}]}>
          <Menu
            activeModule={
              externalMenuIsVisible ? activeModule : drawerModules[0]
            }
            state={state}
            navigation={navigation}
            authMenu={
              <AuthMenu
                onPress={handleModuleClick}
                isVisible={!externalMenuIsVisible}
              />
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

const getStyles = (Colors: ThemeColors) =>
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
      zIndex: 3,
    },
    scrollView: {
      paddingBottom: 10,
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
