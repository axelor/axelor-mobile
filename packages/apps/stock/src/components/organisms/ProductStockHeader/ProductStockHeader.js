import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslator, AOSImage} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {ProductCardDetails} from '../../molecules';

const ProductStockHeader = ({
  product,
  navigateToImageProduct,
  showProductDetails,
}) => {
  const I18n = useTranslator();

  return (
    <View style={styles.infoContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={navigateToImageProduct}
        activeOpacity={0.9}>
        <AOSImage
          generalStyle={styles.imageStyle}
          imageSize={styles.imageSize}
          resizeMode="contain"
          metaFile={product?.picture}
          defaultIconSize={60}
        />
      </TouchableOpacity>
      <ProductCardDetails
        style={styles.productContainer}
        name={product.name}
        code={product.code}
        onPress={showProductDetails}>
        <Text style={styles.text_important}>{product.name}</Text>
        <Text style={styles.text_secondary}>{product.code}</Text>
        <Text style={styles.text_secondary}>
          {`${I18n.t('Stock_StockUnit')} : ${product.unit?.name}`}
        </Text>
      </ProductCardDetails>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_important: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 16,
  },
  imageSize: {
    height: 60,
    width: 60,
  },
});

export default ProductStockHeader;
