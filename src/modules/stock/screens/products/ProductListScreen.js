import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {ProductCard} from '@/modules/stock/components/molecules';
import useProductScanner from '@/modules/stock/hooks/use-product-scanner';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';

const productScanKey = 'product_product-list';

const ProductListScreen = ({navigation}) => {
  const {loading, productList} = useSelector(state => state.product);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productScanned = useProductScanner(productScanKey);
  useEffect(() => {
    if (productScanned) {
      setProduct(productScanned);
    }
  }, [productScanned]);

  useEffect(() => {
    if (product) {
      showProductDetails(product);
    }
  }, [product]);

  const showProductDetails = product => {
    navigation.navigate('ProductStockDetailsScreen', {product: product});
  };

  return (
    <Screen style={styles.container}>
      <AutocompleteSearch
        objectList={productList}
        value={product}
        onChangeValue={item => setProduct(item)}
        displayValue={displayItemName}
        filter={filterItemByName}
        scanKeySearch={productScanKey}
        placeholder="Product"
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={productList}
          renderItem={({item}) => (
            <ProductCard
              style={styles.item}
              name={item.name}
              code={item.code}
              pictureId={item.picture == null ? null : item.picture.id}
              onPress={() => showProductDetails(item)}
            />
          )}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
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

export default ProductListScreen;
