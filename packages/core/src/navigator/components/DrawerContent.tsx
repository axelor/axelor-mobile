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

import React, {useRef, useMemo, useEffect, useCallback, useState} from 'react';
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
import {useTranslator} from '../../i18n';
import {useActiveModule} from '../providers';
import {
  DrawerState,
  getMenuTitle,
  getModuleOfMenu,
  moduleHasMenus,
  NavigationObject,
  numberOfModules,
  getDefaultMenuKey,
  hasSubMenus,
} from '../helpers';
import {AuthMenu, Menu, MenuIconButton} from './menu';

interface DrawerContentProps {
  state: DrawerState;
  modules: Module[];
  navigation: NavigationObject;
  onModuleClick: (name?: string) => void;
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
  const I18n = useTranslator();
  const {isOutdated} = useOutdatedVersion(versionCheckConfig);

  const orderedMenuKeys = useMemo(
    () =>
      modules
        ?.filter(_module => _module.menus)
        ?.flatMap(_module => {
          const result = [];

          for (const [key, menu] of Object.entries(_module.menus ?? {})) {
            result.push(key);

            if (hasSubMenus(menu)) {
              result.push(...Object.keys((menu as MenuWithSubMenus).subMenus));
            }
          }

          return result;
        }) ?? [],
    [modules],
  );

  useEffect(() => {
    const getOrderedRoutes = (routes: DrawerState['routes']) =>
      orderedMenuKeys
        .map(_key => routes.find(_route => _route.name === _key))
        .filter(_route => _route != null);

    const orderedRoutesOnRender = getOrderedRoutes(state.routes);

    const isAlreadyOrdered =
      orderedRoutesOnRender.length === state.routes.length &&
      orderedRoutesOnRender.every((_route, _index) => {
        return _route.key === state.routes[_index].key;
      });

    if (orderedRoutesOnRender.length === 0 || isAlreadyOrdered) {
      return;
    }

    navigation.dispatch((currentState: DrawerState) => {
      const orderedRoutes = getOrderedRoutes(currentState.routes);
      const focusedKey = currentState.routes[currentState.index]?.key;
      const orderedKeys = new Set(orderedRoutes.map(_route => _route.key));

      return CommonActions.reset({
        ...currentState,
        routes: orderedRoutes,
        index: Math.max(
          orderedRoutes.findIndex(_route => _route.key === focusedKey),
          0,
        ),
        history: currentState.history?.filter(
          _entry => _entry.type !== 'route' || orderedKeys.has(_entry.key),
        ),
      });
    });
  }, [navigation, orderedMenuKeys, state.routes]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;
  const {activeModule} = useActiveModule();
  const [innerMenuDisabled, setInnerMenuDisabled] = useState<boolean>(false);

  const innerMenuIsVisible = useMemo(
    () => !innerMenuDisabled && activeModule?.name !== authModule.name,
    [activeModule?.name, innerMenuDisabled],
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

  const navigatedModule = useMemo(
    () => getModuleOfMenu(modules, state.routes?.[state.index]?.name),
    [modules, state.routes, state.index],
  );

  const showRestoreNavigatedModule = useMemo(
    () => externalMenuIsVisible && navigatedModule != null,
    [externalMenuIsVisible, navigatedModule],
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
    setInnerMenuDisabled(_module.quickNavigation ?? false);
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
      Object.keys(activeModule?.menus ?? {}).includes(route.name);

    const event: any = navigation.emit({
      type: 'drawerItemPress' as never,
      target: route.key,
      canPreventDefault: true,
      data: {} as never,
    });

    if (!event.defaultPrevented) {
      if (!focused) {
        navigation.dispatch({
          ...CommonActions.navigate(route.name, undefined, {merge: true}),
          target: state.key,
        });
      }

      navigation.dispatch({
        ...DrawerActions.closeDrawer(),
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {drawerModules.map(_module => (
              <MenuIconButton
                key={_module.name}
                icon={_module.icon ?? ''}
                title={getMenuTitle(_module, I18n)}
                showTitle={!innerMenuIsVisible}
                subtitle={_module.subtitle}
                disabled={_module.disabled}
                isActive={_module.name === activeModule?.name}
                onPress={() => handleModuleClick(_module)}
                compatibility={_module.compatibilityAOS}
              />
            ))}
          </ScrollView>
          <AuthMenu onPress={handleModuleClick} />
        </View>
      )}
      <View style={styles.menusContainer}>
        <Animated.View
          style={[styles.secondaryMenusContainer, {left: innerMenuPosition}]}>
          <Menu
            activeModule={
              externalMenuIsVisible ? activeModule! : drawerModules[0]
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
              externalMenuIsVisible
                ? undefined
                : drawerModules[0].compatibilityAOS
            }
            showClose={showRestoreNavigatedModule}
            onClose={() => {
              setInnerMenuDisabled(true);
              onModuleClick(navigatedModule?.name);
            }}
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
    menusContainer: {
      flex: 1,
    },
    iconsContainer: {
      justifyContent: 'space-between',
      marginHorizontal: 12,
      zIndex: 3,
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
