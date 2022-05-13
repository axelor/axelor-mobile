import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Card, Chip, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCardDetails = ({style, onPressImage, onPress, ...product}) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPressImage}>
          <Image
            resizeMode="contain"
            source={{
              uri: `https://demo1.axelor.com/salon2/ws/rest/com.axelor.meta.db.MetaFile/${product.picture?.id}/content/download`,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.code}>{product.code}</Text>
          <View style={styles.states}>
            {product.categorie && (
              <Badge color="#88DFB8" title={product.categorie.name} />
            )}
            {product.procurMethode && (
              <Badge color="#D0C4E9" title={product.procurMethode} />
            )}
            {product.prototype && <Badge color="#84CBEA" title="Prototype" />}
            {product.prototype && <Badge color="#F5BE8B" title="Unrenewed" />}
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
    backgroundColor: null,
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
    justifyContent: 'space-evenly',
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
