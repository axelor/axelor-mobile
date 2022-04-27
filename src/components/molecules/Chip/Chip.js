import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';

const setStyle = option => {
  if (option === true) {
    return styles.selected;
  } else {
    return styles.notSelected;
  }
};

const Chip = ({selected, title, onPress}) => {
  const chipStyle = setStyle(selected);

  useEffect(() => {
    setStyle(selected);
  }, [selected]);

  return (
    <View style={[styles.container, chipStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text style={[styles.chipTxt, chipStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
    margin: 5,
    height: '100%',
    width: '100%',
    borderRadius: 20,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  notSelected: {
    backgroundColor: '#FFFFFF',
    color: '#2A2A2A',
  },
  selected: {
    backgroundColor: '#84DCB7',
    color: '#2A2A2A',
  },
  chipTxt: {
    fontSize: 14,
  },
});

export default Chip;
