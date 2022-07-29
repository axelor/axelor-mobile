import React from 'react';
import {Icon} from '@/components/atoms';
import {StyleSheet, Text, View} from 'react-native';

const ModuleMenu = ({icon, title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={36} name={icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  iconContainer: {
    width: 54,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 1,
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default ModuleMenu;
