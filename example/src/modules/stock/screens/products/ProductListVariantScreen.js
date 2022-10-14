import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ScrollList} from '@aos-mobile/ui';
import {useDispatch, useSelector} from '@aos-mobile/core';
import {
  fetchProductsAttributes,
  fetchProductVariants,
} from '@/modules/stock/features/productVariantSlice';
import {ProductVariantCard} from '@/modules/stock/components/organisms';
import {fetchProductsAvailability} from '../../features/productIndicatorsSlice';

const ProductListVariantScreen = ({route, navigation}) => {
  const product = route.params.product;
  const companyID = route.params.companyID;
  const stockLocationId = route.params.stockLocationId;
  const parentProductId = useMemo(
    () => product?.parentProduct?.id,
    [product?.parentProduct?.id],
  );
  const {
    loading,
    moreLoading,
    isListEnd,
    productListVariables,
    listProductsAttributes,
  } = useSelector(state => state.productVariant);
  const {listAvailabilty} = useSelector(state => state.productIndicators);
  const dispatch = useDispatch();

  const fetchVariantsAPI = useCallback(
    page => {
      if (parentProductId) {
        dispatch(
          fetchProductVariants({
            productVariantParentId: parentProductId,
            page: page,
          }),
        );
      }
    },
    [dispatch, parentProductId],
  );

  useEffect(() => {
    if (productListVariables != null) {
      dispatch(
        fetchProductsAvailability({
          productList: productListVariables,
          companyId: companyID,
          stockLocationId: stockLocationId,
        }),
      );
      dispatch(fetchProductsAttributes({productList: productListVariables}));
    }
  }, [companyID, dispatch, productListVariables, stockLocationId]);

  const navigateToProductVariable = productVar => {
    navigation.navigate('ProductStockDetailsScreen', {product: productVar});
  };

  return (
    <Screen>
      <ScrollList
        loadingList={loading}
        data={productListVariables}
        renderItem={({item, index}) => (
          <ProductVariantCard
            style={styles.item}
            name={item.name}
            code={item.code}
            attributesList={
              listProductsAttributes ? listProductsAttributes[index] : null
            }
            key={item.id}
            picture={item.picture}
            stockAvailability={
              listAvailabilty ? listAvailabilty[index]?.availableStock : 0
            }
            onPress={() => navigateToProductVariable(item)}
          />
        )}
        fetchData={fetchVariantsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 25,
  },
});

export default ProductListVariantScreen;
