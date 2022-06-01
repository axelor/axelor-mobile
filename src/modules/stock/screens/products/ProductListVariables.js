import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {fetchProductVariants} from '@/modules/stock/features/productVariantSlice';
import {ProductVariantCard} from '@/modules/stock/components/molecules';
import {productStockLocation} from '../../api/stock-location-api';

const ProductListVariables = ({route, navigation}) => {
  const {loading, productListVariables} = useSelector(
    state => state.productVariant,
  );
  const [availabilityList, setAvailabilityList] = useState([]);
  const dispatch = useDispatch();
  const product = route.params.product;
  const companyID = route.params.companyID;
  const stockLocationId = route.params.stockLocationId;
  const parentProductId = useMemo(
    () => product?.parentProduct?.id,
    [product?.parentProduct?.id],
  );

  useEffect(() => {
    if (parentProductId) {
      dispatch(fetchProductVariants(parentProductId));
    }
  }, [dispatch, parentProductId]);

  async function getAvailability(productId) {
    return productStockLocation({
      productId: productId,
      companyId: companyID !== 0 ? companyID : null,
      stockLocationId: stockLocationId,
    }).then(response => {
      return response.data.object;
    });
  }

  async function fetchData(variant) {
    return await getAvailability(variant.id);
  }

  useEffect(() => {
    let promises = [];
    productListVariables.forEach(line => {
      promises.push(fetchData(line));
    });
    Promise.all(promises).then(resultes => {
      return setAvailabilityList(resultes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productListVariables]);

  const navigateToProductVariable = productVar => {
    navigation.navigate('ProductStockDetailsScreen', {product: productVar});
  };

  return (
    <Screen style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={productListVariables}
          renderItem={({item, index}) => (
            <ProductVariantCard
              style={styles.item}
              name={item.name}
              code={item.code}
              attribut={item.code}
              value={item.name}
              key={item.id}
              picture={item.picture}
              stockAvailability={
                availabilityList ? availabilityList[index]?.availableStock : 0
              }
              onPress={() => navigateToProductVariable(item)}
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
    paddingHorizontal: 25,
  },
});

export default ProductListVariables;
