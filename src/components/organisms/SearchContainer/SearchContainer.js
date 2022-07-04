import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon, Text} from '@/components/atoms';
import {ColorHook} from '@/themeStore';

const SearchContainer = ({style, children}) => {
  const [isVisible, setVisible] = useState(global.filterConfig);
  const Colors = ColorHook();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => setVisible(!isVisible)}>
        <View style={styles.arrowContainer}>
          <Text>All filters</Text>
          <Icon
            name={isVisible ? 'angle-up' : 'angle-down'}
            size={24}
            color={Colors.primaryColor}
          />
        </View>
      </TouchableOpacity>
      {isVisible && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    width: '80%',
  },
});

export default SearchContainer;
