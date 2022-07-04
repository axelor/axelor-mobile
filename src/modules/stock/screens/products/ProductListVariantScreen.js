import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {fetchProductVariants} from '@/modules/stock/features/productVariantSlice';
import {ProductVariantCard} from '@/modules/stock/components/organisms';
import {
  fetchVariantAttributes,
  getProductStockIndicators,
} from '../../api/product-api';
import {handleError} from '@/api/utils';
import {ScrollList} from '@/components/organisms';

const ProductListVariables = ({route, navigation}) => {
  const product = route.params.product;
  const companyID = route.params.companyID;
  const stockLocationId = route.params.stockLocationId;
  const parentProductId = useMemo(
    () => product?.parentProduct?.id,
    [product?.parentProduct?.id],
  );
  const {loading, moreLoading, isListEnd, productListVariables} = useSelector(
    state => state.productVariant,
  );
  const [availabilityList, setAvailabilityList] = useState([]);
  const [attributesList, setAttributesList] = useState([]);
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
    let promisesAvailability = [];

    async function getAvailability(dataProduct) {
      return getProductStockIndicators({
        version: dataProduct.version,
        productId: dataProduct.id,
        companyId: companyID !== 0 ? companyID : null,
        stockLocationId: stockLocationId,
      })
        .catch(function (error) {
          handleError(error, 'fetch product stock indicators');
        })
        .then(response => {
          return response.data.object;
        });
    }

    async function fetchDataAvailability(variant) {
      return await getAvailability(variant);
    }

    productListVariables.forEach(line => {
      promisesAvailability.push(fetchDataAvailability(line));
    });

    Promise.all(promisesAvailability).then(resultes => {
      return setAvailabilityList(resultes);
    });

    let promisesAttr = [];

    async function getAttributes(data) {
      return fetchVariantAttributes(data)
        .catch(function (error) {
          handleError(error, 'fetch product variant attributes');
        })
        .then(response => {
          return response.data.object;
        });
    }

    async function fetchDataAttributes(variant) {
      return await getAttributes(variant);
    }

    productListVariables.forEach(line => {
      promisesAttr.push(fetchDataAttributes(line));
    });

    Promise.all(promisesAttr).then(resultes => {
      return setAttributesList(resultes);
    });
  }, [companyID, productListVariables, stockLocationId]);

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
            attributesList={availabilityList ? attributesList[index] : null}
            key={item.id}
            picture={item.picture}
            stockAvailability={
              availabilityList ? availabilityList[index]?.availableStock : 0
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

export default ProductListVariables;
