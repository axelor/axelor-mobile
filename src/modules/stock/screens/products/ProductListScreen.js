import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch, ScrollList} from '@/components/organisms';
import {
  fetchProducts,
  searchProducts,
} from '@/modules/stock/features/productSlice';
import {ProductCard} from '@/modules/stock/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {getProductStockIndicators} from '../../api/product-api';
import {handleError} from '@/api/utils';

const productScanKey = 'product_product-list';

const ProductListScreen = ({navigation}) => {
  const {loadingProduct, moreLoading, isListEnd, productList} = useSelector(
    state => state.product,
  );
  const {activeCompany} = useSelector(state => state.user.user);
  const [availabilityList, setAvailabilityList] = useState([]);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    page => {
      if (filter != null && filter !== '') {
        dispatch(searchProducts({searchValue: filter}));
      } else {
        dispatch(fetchProducts({page: page}));
      }
    },
    [dispatch, filter],
  );

  const showProductDetails = useCallback(
    product => {
      if (product != null) {
        setNavigate(true);
        navigation.navigate('ProductStockDetailsScreen', {product: product});
      }
    },
    [navigation],
  );

  useEffect(() => {
    if (productList != null) {
      let promises = [];

      async function getAvailability(product) {
        return getProductStockIndicators({
          version: product.version,
          productId: product.id,
          companyId: activeCompany?.id,
          stockLocationId: null,
        })
          .catch(function (error) {
            handleError(error, 'fetch product stock indicators');
          })
          .then(response => {
            return response.data.object;
          });
      }

      async function fetchData(product) {
        return await getAvailability(product);
      }

      productList.forEach(line => {
        promises.push(fetchData(line));
      });
      Promise.all(promises).then(resultes => {
        return setAvailabilityList(resultes);
      });
    }
  }, [activeCompany, productList]);

  return (
    <Screen>
      <AutocompleteSearch
        objectList={productList}
        onChangeValue={item => showProductDetails(item)}
        fetchData={value => setFilter(value)}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder="Product"
        isFocus={true}
        oneFilter={true}
        navigate={navigate}
      />
      <ScrollList
        loadingList={loadingProduct}
        data={productList}
        renderItem={({item, index}) => (
          <ProductCard
            key={item.id}
            style={styles.item}
            name={item.name}
            code={item.code}
            pictureId={item.picture == null ? null : item.picture.id}
            availableStock={
              availabilityList ? availabilityList[index]?.availableStock : null
            }
            onPress={() => showProductDetails(item)}
          />
        )}
        fetchData={fetchProductsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={filter != null && filter !== ''}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ProductListScreen;
