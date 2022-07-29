import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import ModuleMenu from './ModuleMenu';
import IconMenu from './IconMenu';

const modules = [
  {
    icon: 'boxes',
    title: 'Stock',
  },
  {
    icon: 'cogs',
    title: 'Production',
  },
  {
    icon: 'tree',
    title: 'Human Ressources',
  },
];

const DrawerContent = () => {
  const [moduleMenusActive, setModuleMenusActive] = useState(false);
  const moduleMenusX = useRef(new Animated.Value(0)).current;
  const moduleMenusWith = useRef(null);

  const toggleMenusModule = () => {
    if (!moduleMenusActive) {
      setModuleMenusActive(true);
      Animated.timing(moduleMenusX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      setModuleMenusActive(false);
      Animated.timing(moduleMenusX, {
        toValue: -moduleMenusWith.current,
        useNativeDriver: false,
      }).start();
    }
  };

  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    if (moduleMenusWith.current === null) {
      moduleMenusWith.current = width;
      moduleMenusX.setValue(-width);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modulesView}>
        <View style={styles.moduleContainer}>
          {modules.map(module => (
            <ModuleMenu
              key={module.title}
              icon={module.icon}
              title={module.title}
            />
          ))}
        </View>
        <View style={styles.footerContainer}>
          <IconMenu icon="user" onPress={toggleMenusModule} />
        </View>
      </View>
      <Animated.View
        onLayout={onLayout}
        style={[styles.moduleMenusView, {right: moduleMenusX}]}>
        <Text>Hello world</Text>
      </Animated.View>
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
  modulesView: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingVertical: 16,
  },
  moduleMenusView: {
    backgroundColor: '#fff',
    elevation: 2,
    position: 'absolute',
    top: 0,
    right: 0,
    width: '72%',
    height: '100%',
  },
  moduleContainer: {},
  footerContainer: {
    flexDirection: 'row',
  },
});

export default DrawerContent;
