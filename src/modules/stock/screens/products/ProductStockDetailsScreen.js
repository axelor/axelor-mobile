import React, {useEffect, useState} from 'react';
import {Screen} from '@/components/atoms';
import {StyleSheet, ActivityIndicator, View, Text, Image} from 'react-native';
import {ProductCardDetails} from '../../components/molecules';
import {ScrollView, Dimensions} from 'react-native';
import {EditableInput} from '@/components/molecules';
import {useSelector, useDispatch} from 'react-redux';
import CardStock from '@/components/molecules/Card/CardStock';
import {Picker} from '@/components/molecules';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {AutocompleteSearch} from '@/components/organisms';
import {fetchStockLocationLine} from '../../features/stockLocationLineSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';
import useStockLocationScanner from '@/modules/stock/hooks/use-stock-location-scanner';
import {updateProductLocker} from '../../features/productSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';

const stockLocationScanKey = 'stock-location_product-indicators';

const ProductStockDetailsScreen = ({route, navigation}) => {
  const product = route.params.product;
  const {companyList} = useSelector(state => state.company);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {stockLocationLine} = useSelector(state => state.stockLocationLine);
  const {activeCompanyId} = useSelector(
    state => state.user.userList[0]?.activeCompany,
  );
  const {loading, productIndicators} = useSelector(
    state => state.productIndicators,
  );
  const [stockLocation, setStockLocation] = useState(null);
  const [selectedCompanyId, setselectedCompanyId] = useState(activeCompanyId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductIndicators({
        productId: product.id,
        selectedCompanyId: selectedCompanyId,
        stockLocationId: stockLocation?.id,
      }),
    );
    if (stockLocation != null) {
      dispatch(
        fetchStockLocationLine({
          stockId: stockLocation.id,
          productId: product.id,
        }),
      );
    }
  }, [dispatch, product.id, stockLocation, selectedCompanyId]);

  const stockLocationScanned = useStockLocationScanner(stockLocationScanKey);
  useEffect(() => {
    if (stockLocationScanned) {
      setStockLocation(stockLocationScanned);
    }
  }, [stockLocationScanned]);

  const showProductDetails = () => {
    navigation.navigate('ProductDetailsScreen', {
      product: product,
      companyID: selectedCompanyId,
      stockLocationId: stockLocation?.id,
    });
  };

  const navigateToImageProduct = () => {
    navigation.navigate('ProductImageScreen', {product: product});
  };

  const handleLockerChange = input => {
    if (stockLocation != null) {
      dispatch(
        updateProductLocker({
          productId: product.id,
          stockLocationId: stockLocation.id,
          newLocker: input.toString(),
        }),
      );
    }
  };

  return (
    <Screen>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.scrollContainer}>
          <ScrollView>
            <View style={styles.infoContainer}>
              {product.picture == null ? (
                <Icon name="camera" style={styles.icon} />
              ) : (
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={navigateToImageProduct}
                  activeOpacity={0.9}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: `${global.loggedUrl}ws/rest/com.axelor.meta.db.MetaFile/${product.picture?.id}/content/download`,
                    }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              )}
              <ProductCardDetails
                style={styles.productContainer}
                name={product.name}
                code={product.code}
                onPress={showProductDetails}>
                <Text style={styles.text_important}>{product.name}</Text>
                <Text style={styles.text_secondary}>{product.code}</Text>
              </ProductCardDetails>
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.picker}>
              <Picker
                title="Company"
                defaultValue={selectedCompanyId}
                listItems={companyList}
                labelField="name"
                valueField="id"
                onValueChange={item => setselectedCompanyId(item)}
              />
            </View>
            <AutocompleteSearch
              objectList={stockLocationList}
              searchParam="name"
              placeholder="Stock location"
              displayValue={displayItemName}
              filter={filterItemByName}
              value={stockLocation}
              onChangeValue={item => setStockLocation(item)}
              scanKeySearch={stockLocationScanKey}
            />
            {stockLocation == null ? null : (
              <EditableInput
                style={styles.lockerContainer}
                placeholder="Locker"
                onValidate={input => handleLockerChange(input)}
                defaultValue={
                  stockLocationLine ? stockLocationLine[0]?.rack : 'CASIER'
                }
              />
            )}
            <View style={styles.row}>
              <View style={styles.cardStock}>
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
              </View>
              <View style={styles.cardStock}>
                <CardStock
                  title="SALE ORDER QUANTITY"
                  number={productIndicators?.saleOrderQty}
                />
                <CardStock
                  title="PURCHASE ORDER QUANTITY"
                  number={productIndicators?.purchaseOrderQty}
                />
                <CardStock
                  title="AVAILABLE STOCK"
                  number={productIndicators?.availableStock}
                />
              </View>
              <View style={styles.cardStock}>
                {productIndicators?.buildingQty ? (
                  <CardStock
                    title="BUILDING QUANTITY"
                    number={productIndicators?.buildingQty}
                  />
                ) : null}
                {productIndicators?.consumeManufOrderQty ? (
                  <CardStock
                    title="CONSUME M.O. QUANTITY"
                    number={productIndicators?.consumeManufOrderQty}
                  />
                ) : null}
                {productIndicators?.consumeManufOrderQty ? (
                  <CardStock
                    title="MISSING M.O. QUANTITY"
                    number={productIndicators?.missingManufOrderQty}
                  />
                ) : null}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  picker: {
    alignItems: 'center',
  },
  cardStock: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  scrollContainer: {
    alignContent: 'center',
    height: '100%',
  },
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
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text_important: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  lockerContainer: {
    marginHorizontal: 12,
    marginBottom: 7,
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
    width: Dimensions.get('window').width * 0.8,
    borderColor: 'black',
    marginHorizontal: '10%',
    marginBottom: '1%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    height: 60,
    width: 60,
  },
});

export default ProductStockDetailsScreen;
