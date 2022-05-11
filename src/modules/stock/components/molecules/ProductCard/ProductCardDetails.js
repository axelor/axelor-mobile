import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View ,Image } from 'react-native';
import { Card, Chip, Text } from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCardDetails = ({ style,onPressImage, onPress, ...product }) => {

  const Image_Http_URL = {
    uri: `http://192.168.122.1:8080/ws/rest/com.axelor.meta.db.MetaFile/${product.picture?.id}/content/download/`,
};
console.log(Image_Http_URL.url);
  return (
      <Card style={[styles.container, style]}>
        <View  style={styles.content}>
        <TouchableOpacity onPress={onPressImage}>
        <Image
              resizeMode="contain"
              source={Image_Http_URL}
              style={styles.image}
        />
        </TouchableOpacity>
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
