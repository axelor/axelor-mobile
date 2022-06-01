import Colors from '@/types/colors';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCardDetails = ({style, children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>{children}</View>
        </View>
        <Icon name="chevron-right" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '85%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.05,
    color: Colors.icon.dark_grey,
  },
});

export default ProductCardDetails;
