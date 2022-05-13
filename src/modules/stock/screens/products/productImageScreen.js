import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
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
            uri: `https://demo1.axelor.com/salon2/ws/rest/com.axelor.meta.db.MetaFile/${product.picture?.id}/content/download`,
          }}
          style={styles.image}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
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
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ProductImageScreen;
