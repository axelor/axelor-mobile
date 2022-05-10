import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Screen, Text } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import { fetchProductVariants } from '@/modules/stock/features/productVariantSlice';
import { ProductCard } from '@/modules/stock/components/molecules';
import ProductCardVariable from '../../components/molecules/ProductCard/ProductCardVariable';

const ProductListVariables = ({ route }) => {

  const { loading, productListVariables } = useSelector(state => state.productVariant);
  const dispatch = useDispatch();
  const product = route.params.product;
  const [listPro, setListPro] = useState([]);

  useEffect(() => {
    dispatch(fetchProductVariants(product.productVariant.id))
    console.log(productListVariables);
    console.log("----------------------------------------------------------------------------------")
  }, [dispatch]);
  useEffect(()=>{
    setListPro([{ attribut: productListVariables[0]?.productVariantAttr1, value: productListVariables[0]?.productVariantValue1 }, { attribut: productListVariables[0]?.productVariantAttr2, value: productListVariables[0]?.productVariantValue2 }
      , { attribut: productListVariables[0]?.productVariantAttr3, value: productListVariables[0]?.productVariantValue3 }, { attribut: productListVariables[0]?.productVariantAttr4, value: productListVariables[0]?.productVariantValue4 }
      , { attribut: productListVariables[0]?.productVariantAttr5, value: productListVariables[0]?.productVariantValue5 }]);
  },[loading])

  const showProductDetails = product => {
    navigation.navigate('ProductStockDetailsScreen', { product: product });
  };
  return (
    <Screen style={styles.container}>
      <SearchBar
        style={styles.searchBar}
        placeholder="Product"
        onSearchPress={() => dispatch(fetchProducts())}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={listPro}
          renderItem={({ item }) => (item.attribut &&
            <ProductCardVariable
              style={styles.item}
              name={product.name}
              code={product.code}
              attribut={item.attribut?.name}
              value={item.value?.name}
              key={item.id}
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

export default ProductListVariables;
