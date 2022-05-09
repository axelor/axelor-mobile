import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import getFromList from '@/modules/stock/utils/get-from-list';
import useScanner, {castIntent} from '../../utils/use-scanner';

const StockCorrectionNewProductScreen = ({navigation, route}) => {
  const {productList} = useSelector(state => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, route]);

  const handleNavigate = product => {
    if (product.trackingNumberConfiguration == null) {
      navigation.navigate('StockCorrectionDetailsScreen', {
        stockLocation: route.params.stockLocation,
        stockProduct: product,
      });
    } else {
      navigation.navigate('StockCorrectionNewTrackingScreen', {
        stockLocation: route.params.stockLocation,
        product: product,
      });
    }
  };

  const handleClearLocation = () => {
    navigation.navigate('StockCorrectionNewLocationScreen');
  };

  const handleProductSelection = productId => {
    if (productId !== '') {
      const product = getFromList(productList, 'id', productId);
      handleNavigate(product);
    }
  };

  const handleProductScan = intent => {
    console.log('Yes');
    const serialNumber = castIntent(intent).value;
    console.log(serialNumber);
    console.log(productList);
    if (serialNumber !== '') {
      const product = getFromList(productList, 'serialNumber', serialNumber);
      console.log(product);
      handleNavigate(product);
    }
  };

  //useScanner(handleProductScan);

  return (
    <Screen style={styles.container}>
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.stockLocation.name}
        onClearPress={handleClearLocation}
      />
      <AutocompleteSearch
        objectList={productList}
        searchName="Product"
        searchParam="name"
        setValueSearch={handleProductSelection}
        defaultQuery={
          typeof route.params.product !== 'undefined'
            ? route.params.product.name
            : null
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
  },
  infosCard: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
});

export default StockCorrectionNewProductScreen;
