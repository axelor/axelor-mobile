import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCard = ({style, name, code, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
          </View>
        </View>
        <Icon size={24} name="chevron-right" color="#e6e6e6" />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#efefef',
    marginRight: 32,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCard;
