import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Screen, Text} from '@/components/atoms';

const ProductImageScreen = ({route}) => {
  const product = route.params.product;
  return (
    <Screen>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.code}>{product.code}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={{
            uri: `${global.loggedUrl}ws/rest/com.axelor.meta.db.MetaFile/${product.picture?.id}/content/download`,
          }}
          style={styles.image}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '60%',
    width: '60%',
    marginHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductImageScreen;
