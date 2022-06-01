import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@/types/colors';

const SearchBar = ({
  style,
  valueTxt,
  placeholder,
  onClearPress,
  onScanPress,
  onChangeTxt,
  onSelection,
  scanIconColor,
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
            <Icon
              name="remove"
              style={styles.icon}
              color={Colors.icon.dark_grey}
            />
          </TouchableOpacity>
        )}

        <View style={styles.action}>
          <Icon
            name="search"
            style={styles.icon}
            color={Colors.icon.dark_grey}
          />
        </View>
        <TouchableOpacity style={styles.action} onPress={onScanPress}>
          <Icon name="qrcode" style={styles.icon} color={scanIconColor} />
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
  },
});

export default SearchBar;
