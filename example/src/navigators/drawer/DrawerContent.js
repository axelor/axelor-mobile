import React, {useRef, useState, useContext} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import IconButton from './IconButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Menu from './Menu';
import useTranslator from '@/hooks/use-translator';
import {ModuleNavigatorContext} from '@/navigators/Navigator';
import {moduleHasMenus} from '@/navigators/module.helper';
import {getMenuTitle} from '@/navigators/menu.helper';
import {SafeAreaView} from 'react-native-safe-area-context';

const DrawerContent = ({state, modules, navigation, onModuleClick}) => {
  const I18n = useTranslator();
  const [secondaryMenusVisible, setSecondaryMenusVisible] = useState(false);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;
  const {activeModule} = useContext(ModuleNavigatorContext);

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
              <IconButton
                key={_module.title}
                icon={_module.icon}
                color={_module === activeModule && '#76DCAE'}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efefef',
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
    backgroundColor: '#fff',
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
