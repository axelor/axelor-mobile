import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon, Text} from '@/components/atoms';
import {useThemeColor} from '@/features/themeSlice';
import {useSelector} from 'react-redux';

const SearchContainer = ({style, children}) => {
  const {filterShowConfig} = useSelector(state => state.config);
  const [isVisible, setVisible] = useState();
  const Colors = useThemeColor();

  useEffect(() => {
    setVisible(filterShowConfig);
  }, [filterShowConfig]);

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
