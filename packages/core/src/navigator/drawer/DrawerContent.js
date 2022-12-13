import React, {useRef, useState, useContext, useMemo} from 'react';
import {StyleSheet, View, Text, Animated, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeColor} from '@aos-mobile/ui';
import {ModuleNavigatorContext} from '../Navigator';
import MenuIconButton from './MenuIconButton';
import Menu from './Menu';
import {moduleHasMenus} from '../module.helper';
import {getMenuTitle} from '../menu.helper';
import useTranslator from '../../i18n/hooks/use-translator';

const DrawerContent = ({state, modules, navigation, onModuleClick}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const [secondaryMenusVisible, setSecondaryMenusVisible] = useState(false);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;
  const {activeModule} = useContext(ModuleNavigatorContext);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const openSecondaryMenu = () => {
    Animated.timing(secondaryMenusLeft, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSecondaryMenusVisible(true);
  };

  const closeSecondaryMenu = () => {
    Animated.timing(secondaryMenusLeft, {
      toValue: 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSecondaryMenusVisible(false);
  };

  // Will be used later with menu improvements
  // eslint-disable-next-line no-unused-vars
  const toggleSecondaryMenusVisibility = () => {
    if (!secondaryMenusVisible) {
      openSecondaryMenu();
    } else {
      closeSecondaryMenu();
    }
  };

  const handleModuleClick = moduleName => {
    onModuleClick(moduleName);
    openSecondaryMenu();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconsContainer}>
        <View style={styles.appIconsContainer}>
          {modules.filter(moduleHasMenus).map(_module => (
            <View key={_module.name} style={styles.menuItemContainer}>
              <MenuIconButton
                key={_module.title}
                icon={_module.icon}
                disabled={_module.disabled}
                color={
                  _module === activeModule
                    ? Colors.primaryColor.background_light
                    : null
                }
                onPress={() => handleModuleClick(_module.name)}
              />
            </View>
          ))}
        </View>
        <View style={styles.otherIconsContainer}>{/* TODO: UserScreen */}</View>
      </View>
      <View style={styles.menusContainer}>
        <View style={styles.primaryMenusContainer}>
          {modules.filter(moduleHasMenus).map(_module => (
            <TouchableOpacity
              key={_module.name}
              style={styles.menuItemContainer}
              onPress={() => handleModuleClick(_module.name)}>
              <Text style={styles.primaryMenuTitle}>
                {getMenuTitle(_module, {I18n})}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View
          style={[
            styles.secondaryMenusContainer,
            {
              left: secondaryMenusLeft.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}>
          <Menu
            title={getMenuTitle(activeModule, {I18n})}
            state={state}
            navigation={navigation}
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
    },
    menusContainer: {
      flex: 1,
    },
    iconsContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 12,
    },
    otherIconsContainer: {
      marginBottom: 8,
    },
    menuItemContainer: {
      height: 60,
      marginVertical: 8,
      justifyContent: 'center',
    },
    primaryMenuTitle: {
      marginHorizontal: 6,
      fontSize: 24,
      fontWeight: 'bold',
    },
    secondaryMenusContainer: {
      position: 'absolute',
      backgroundColor: Colors.backgroundColor,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      elevation: 4,
    },
    subMenuContainer: {
      padding: 8,
    },
  });

export default DrawerContent;
