import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({
  style,
  valueTxt,
  placeholder,
  onClearPress,
  onSearchPress,
  onScanPress,
  onChangeTxt,
  onSelection,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Input
        style={styles.input}
        value={valueTxt}
        placeholder={placeholder}
        onChange={onChangeTxt}
        onSelection={onSelection}
      />
      <View style={styles.actions}>
        {valueTxt === '' ? (
          <View style={styles.action}>{null}</View>
        ) : (
          <TouchableOpacity style={styles.action} onPress={onClearPress}>
            <Icon name="remove" style={styles.icon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.action} onPress={onSearchPress}>
          <Icon name="search" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onScanPress}>
          <Icon name="qrcode" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 13,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    width: '70%',
  },
  actions: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginLeft: 12,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.05,
    color: '#606060',
  },
});

export default SearchBar;
