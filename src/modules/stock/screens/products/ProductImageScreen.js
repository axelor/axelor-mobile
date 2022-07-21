import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen, Text} from '@/components/atoms';
import {Image} from '@/components/molecules';

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
          generalStyle={styles.imageStyle}
          imageSize={styles.imageSize}
          resizeMode="contain"
          pictureId={product?.picture?.id}
          defaultIconSize={200}
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
  imageSize: {
    height: '60%',
    width: '60%',
  },
  imageStyle: {
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
