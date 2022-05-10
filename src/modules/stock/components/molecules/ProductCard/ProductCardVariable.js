import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCardVariable = ({ style, name, code, attribut, value, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
          </View>
        </View>
        <View style={styles.attrView}>
          <View style={styles.textContainer}>
            <Text style={styles.attribute}>{attribut}</Text>
            <Text style={styles.attribute}>{value}</Text>
          </View>
          <Icon size={24} name="chevron-right" color="#e6e6e6" />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    marginBottom: 20
  },
  attrView: {
    flexDirection: 'row',
    alignItems: 'center'
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
    marginHorizontal: 6
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  attribute: {
    fontSize: 14,
    paddingVertical: 5
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCardVariable;
