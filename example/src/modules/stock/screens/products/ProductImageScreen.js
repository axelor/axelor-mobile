import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Screen, Text} from '@aos-mobile/ui';
import {AOSImage} from '@aos-mobile/core';

const ProductImageScreen = ({route}) => {
  const product = route.params.product;

  return (
    <Screen>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.code}>{product.code}</Text>
      </View>
      <View style={styles.imageContainer}>
        <AOSImage
          generalStyle={styles.imageStyle}
          imageSize={styles.imageSize}
          resizeMode="contain"
          metaFileId={product?.picture?.id}
          defaultIconSize={Dimensions.get('window').width * 0.8}
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
    height: Dimensions.get('window').width * 0.8,
    width: Dimensions.get('window').width * 0.8,
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
