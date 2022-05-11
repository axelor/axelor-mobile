import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';

const setStyle = option => {
  return option ? styles.selected : styles.notSelected;
};

const Chip = ({style, selected, title, onPress}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, setStyle(selected)]}>
        <Text style={styles.chipTxt}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    marginBottom: 2,
    borderRadius: 20,
    elevation: 3,
  },
  notSelected: {
    backgroundColor: '#FFFFFF',
  },
  selected: {
    backgroundColor: '#84DCB7',
  },
  chipTxt: {
    fontSize: 14,
    color: '#606060',
  },
});

export default Chip;
