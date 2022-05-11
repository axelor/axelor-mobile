import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Screen, Text } from '@/components/atoms';


const ProductImageScreen = ({ route }) => {

  const product = route.params.product

  return (
    <Screen style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.code}>{product.code}</Text>
      </View>
      <View style={styles.image} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  image: {
      height:'60%',
      backgroundColor: '#efefef',
      marginHorizontal: 20,
      
  },
  textContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical:18,
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
