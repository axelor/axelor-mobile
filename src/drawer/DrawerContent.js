import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import IconButton from './IconButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationContext} from '@react-navigation/native';
import Menu from './Menu';

const modules = [
  {
    icon: 'boxes',
    title: 'Stock',
    isActive: true,
  },
  {
    icon: 'cogs',
    title: 'Production',
  },
  {
    icon: 'sitemap',
    title: 'Human Ressources',
  },
];

const DrawerContent = props => {
  const [secondaryMenusVisible, setSecondaryMenusVisible] = useState(false);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;

  const navigation = useContext(NavigationContext);

  const state = navigation.getState();
  const actualRoute = state.routes[state.index];

  console.log({actualRoute});

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
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View style={styles.appIconsContainer}>
          {modules.map(module => (
            <View style={styles.menuItemContainer}>
              <IconButton
                key={module.title}
                icon={module.icon}
                color={module.isActive && '#76DCAE'}
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
              style={styles.menuItemContainer}>
              <Text style={styles.primaryMenuTitle}>{module.title}</Text>
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
          <Menu title="Stock" />
        </Animated.View>
      </View>
    </View>
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
