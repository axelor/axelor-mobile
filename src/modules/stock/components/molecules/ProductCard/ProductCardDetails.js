import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip, Text } from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCardDetails = ({ style, onPress, ...product }) => {
  useEffect(() => {

  }, [])

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.code}>{product.code}</Text>
            <View style={styles.states}>
              {product.categorie && <Chip color="#88DFB8">{product.categorie.name}</Chip>}
              {product.procurMethode && <Chip color="#D0C4E9">{product.procurMethode}</Chip>}
              {product.prototype && <Chip color="#84CBEA">Prototype</Chip>}
              {product.prototype && <Chip color="#F5BE8B">Unrenewed</Chip>}
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  content: {
    flexDirection: 'row',
  },
  states: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: '#efefef',
    marginRight: 32,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCardDetails;
