import React from 'react';
import {StyleSheet, View} from 'react-native';
import ModuleMenu from './ModuleMenu';
import IconMenu from './IconMenu';

const DrawerContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.moduleContainer}>
        <ModuleMenu icon="boxes" title="Stock" />
        <ModuleMenu icon="cog" title="Production" />
        <ModuleMenu icon="tree" title="Human Ressources" />
      </View>
      <View style={styles.footerContainer}>
        <IconMenu icon="user" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#efefef',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  moduleContainer: {},
  footerContainer: {
    flexDirection: 'row',
  },
});

export default DrawerContent;
