import React, {useEffect, useState, useRef} from 'react';
import {CardStockInfo, Screen, Text} from '@/components/atoms';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {ProductCard} from '../../components/molecules';
import {EditableInput, SearchBar} from '@/components/molecules';
import {useSelector, useDispatch} from 'react-redux';
import SelectOptions from '@/components/molecules/SelectOptions/SelectOptions';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import CardStock from '@/components/molecules/Card/CardStock';
import {Picker} from '@/components/molecules';
import {fetchCompanies} from '@/modules/auth/features/companySlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {AutocompleteSearch} from '@/components/organisms';
import {fetchStockLocationLine} from '../../features/stockLocationLineSlice';

const ProductStockDetailsScreen = ({route, navigation}) => {
  //const { loading } = useSelector(state => state.product);
  const {loadingUser, userList} = useSelector(state => state.user);
  const {loading, productIndicators} = useSelector(
    state => state.productIndicators,
  );
  const dispatch = useDispatch();
  const product = route.params.product;
  const [dataFilter, setDataFilter] = useState({
    productId: product.id,
    companyId: userList[0].activeCompany.id,
    stockLocationId: null,
  });
  const {companyList} = useSelector(state => state.company);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {stockLocationLine} = useSelector(state => state.stockLocationLine);
  //console.log(userList)
  const showProductDetails = product => {
    navigation.navigate('ProductDetails', {product: product});
  };
  const navigateToImageProduct = () => {
    navigation.navigate('ProductImage', {product: product});
  };
  useEffect(() => {
    dispatch(fetchProductIndicators(dataFilter));
    dispatch(fetchStockLocationLine({stockId: 1, productId: product.id}));
    console.log('error catch');
  }, [dispatch, dataFilter]);

  return (
    <Screen>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.container}>
          <ProductCard
            onPressImage={() => navigateToImageProduct()}
            onPress={() => showProductDetails(product)}
            pictureId={product.picture?.id}
            code={product.code}
            name={product.name}
            style={styles.item}
          />
          <View style={styles.lineStyle} />
          <Picker
            defaultValue={dataFilter.companyId}
            listItems={companyList}
            labelField="name"
            valueField="id"
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemIndex);
              setDataFilter({
                ...dataFilter,
                companyId: itemIndex == 0 ? null : itemIndex,
              });
            }}
          />
          <AutocompleteSearch
            objectList={stockLocationList}
            searchName="Stock Location"
            searchParam="name"
            placeholder="Stock location"
            defaultQuery={
              dataFilter.stockLocationName
                ? dataFilter.stockLocationName
                : userList[0].stockCorrection
            }
            setValueSearch={(locationId, locationName) => {
              console.log(locationId, locationName);
              setDataFilter({
                ...dataFilter,
                stockLocationId: locationId ? locationId : null,
                stockLocationName: locationName ? locationName : null,
              });
            }}
          />
          <EditableInput
            style={styles.searchBar}
            placeholder={
              stockLocationLine[0]?.rack ? stockLocationLine[0].rack : 'Casier'
            }
          />
          <View style={styles.row}>
            <CardStock
              title="REAL QUANTITY"
              number={productIndicators?.realQty}
            />
            <CardStock
              title="FUTURE QUANTITY"
              number={productIndicators?.futureQty}
            />
            <CardStock
              title="ALLOCATED QUANTITY"
              number={productIndicators?.allocatedQty}
            />
            <CardStock
              title="SALE ORDER QUANTITY"
              number={productIndicators?.saleOrderQty}
            />
            <CardStock
              title="PURCHASE ORDER QUANTITY"
              number={productIndicators?.purchaseOrderQty}
            />
            <CardStock
              title="AVIALABLE STOCK"
              number={productIndicators?.availableStock}
            />
            <CardStock
              title="BUILDING QUANTITY"
              number={productIndicators?.buildingQty}
            />
            <CardStock
              title="CONSUME MANUF QUANTITY"
              number={productIndicators?.consumeManufOrderQty}
            />
            <CardStock
              title="MISSING MANUF ORDER QUANTITY"
              number={productIndicators?.missingManufOrderQty}
            />
          </View>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 7,
    backgroundColor: '#f3f7fc',
  },
  item: {
    marginHorizontal: 12,
    borderRadius: 0,
    elevation: 0,
  },
  selection: {
    marginHorizontal: 12,
    marginBottom: 7,
    borderRadius: 0,
    elevation: 0,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: 280,
    borderColor: 'black',
    margin: 10,
    marginBottom: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductStockDetailsScreen;
