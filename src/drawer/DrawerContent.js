import React, {useRef, useState, useMemo, createContext} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import IconButton from './IconButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Menu from './Menu';
import useTranslator from '@/hooks/use-translator';
import {getMenuTitle} from '@/navigators/Navigator';

const ACTIVE_COLOR = '#76DCAE';

export const AppDrawerContext = createContext();

const DrawerContent = ({state, modules, navigation}) => {
  const {routes, index} = state;
  const I18n = useTranslator();
  const [secondaryMenusVisible, setSecondaryMenusVisible] = useState(false);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;
  const activeRoute = useMemo(() => routes[index], [routes, index]);
  const activeModule = useMemo(
    () =>
      modules.find(module =>
        Object.keys(module.menus).find(
          menuName => menuName === activeRoute.name,
        ),
      ),
    [modules, activeRoute],
  );

  console.log(state);

  const toggleSecondaryMenusVisibility = () => {
    if (!secondaryMenusVisible) {
      Animated.timing(secondaryMenusLeft, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(secondaryMenusLeft, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setSecondaryMenusVisible(!secondaryMenusVisible);
  };

  return (
    <AppDrawerContext.Provider value={{activeModule, activeRoute, navigation}}>
      <View style={styles.container}>
        <View style={styles.iconsContainer}>
          <View style={styles.appIconsContainer}>
            {modules.map(module => (
              <View key={module.name} style={styles.menuItemContainer}>
                <IconButton
                  key={module.title}
                  icon={module.icon}
                  color={module === activeModule && '#76DCAE'}
                  onPress={() => console.log('press on', module.name)}
                />
              </View>
            ))}
          </View>
          <View style={styles.otherIconsContainer}>
            <IconButton
              icon="user"
              rounded
              onPress={toggleSecondaryMenusVisibility}
            />
          </View>
        </View>
        <View style={styles.menusContainer}>
          <View style={styles.primaryMenusContainer}>
            {modules.map(module => (
              <TouchableOpacity
                key={module.title}
                style={styles.menuItemContainer}
                onPress={() => console.log('Press on', module.name)}>
                <Text style={styles.primaryMenuTitle}>
                  {getMenuTitle(module, {I18n})}
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
              menus={activeModule.menus}
            />
          </Animated.View>
        </View>
      </View>
    </AppDrawerContext.Provider>
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
