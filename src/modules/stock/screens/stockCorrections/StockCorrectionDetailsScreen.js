import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, View, StyleSheet, ScrollView} from 'react-native';
import {Button, Card, Screen, Text} from '@/components/atoms';
import {Picker, Badge} from '@/components/molecules';
import {PopUpOneButton} from '@/components/organisms';
import {
  QuantityCard,
  ProductCardInfo,
} from '@/modules/stock/components/organisms';
import {fetchStockCorrectionReasons} from '@/modules/stock/features/stockCorrectionReasonSlice';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';
import {
  createCorrection,
  updateCorrection,
} from '@/modules/stock/features/stockCorrectionSlice';
import getFromList from '@/modules/stock/utils/get-from-list';
import StockCorrection from '@/modules/stock/types/stock-corrrection';
import {fetchProductIndicators} from '@/modules/stock/features/productIndicatorsSlice';
import {ColorHook} from '@/themeStore';

const StockCorrectionDetailsScreen = ({navigation, route}) => {
  const Colors = ColorHook();
  const {stockCorrectionReasonList} = useSelector(
    state => state.stockCorrectionReason,
  );
  const {loadingProduct, productFromId} = useSelector(state => state.product);
  const {id: activeCompanyId} = useSelector(
    state => state.user.user.activeCompany,
  );
  const {productIndicators} = useSelector(state => state.productIndicators);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrectionReasons());
    if (route.params.stockCorrection != null) {
      dispatch(fetchProductWithId(route.params.stockCorrection.product.id));
    }

    dispatch(
      fetchProductIndicators({
        version:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.product.$version
            : route.params.stockProduct.version,
        productId:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.product.id
            : route.params.stockProduct.id,
        companyId: activeCompanyId,
        stockLocationId:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.stockLocation.id
            : route.params.stockLocation.id,
      }),
    );
  }, [dispatch, activeCompanyId, route.params]);

  const [loading, setLoading] = useState(true); // Indicator for initialisation of variables
  const [saveStatus, setSaveStatus] = useState(); // Inidicator for changes

  const [status, setStatus] = useState();
  const [stockLocation, setStockLocation] = useState();
  const [stockProduct, setStockProduct] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const [databaseQty, setDatabaseQty] = useState();
  const [realQty, setRealQty] = useState();
  const [reason, setReason] = useState();

  const initVariables = useCallback(() => {
    if (route.params.stockCorrection == null) {
      setStatus(StockCorrection.status.Draft);
      setStockLocation(route.params.stockLocation);
      setStockProduct(route.params.stockProduct);
      setTrackingNumber(
        route.params.trackingNumber == null
          ? null
          : route.params.trackingNumber,
      );
      if (productIndicators.id !== route.params.stockProduct.id) {
        setLoading(true);
        return;
      } else {
        setDatabaseQty(productIndicators?.realQty);
        setRealQty(productIndicators?.realQty);
      }
      setReason({name: '', id: null});

      setSaveStatus(false);
    } else {
      const stockCorrection = route.params.stockCorrection;
      setStatus(stockCorrection.statusSelect);
      setStockLocation(stockCorrection.stockLocation);
      setStockProduct(productFromId);
      setTrackingNumber(stockCorrection.trackingNumber);

      //Need to access database qty once merged on AOS
      if (stockCorrection.statusSelect === StockCorrection.status.Validated) {
        setDatabaseQty(stockCorrection.realQty);
      } else {
        setDatabaseQty(productIndicators?.realQty);
      }

      setRealQty(stockCorrection.realQty);
      setReason(stockCorrection.stockCorrectionReason);

      setSaveStatus(true);
    }
    setLoading(false);
  }, [productFromId, productIndicators, route.params]);

  useEffect(() => {
    initVariables();
  }, [initVariables]);

  const handleShowProduct = () => {
    navigation.navigate('ProductNavigator', {
      screen: 'ProductStockDetailsScreen',
      params: {
        product: stockProduct,
      },
    });
  };

  const handleQtyChange = value => {
    setRealQty(value);
    setSaveStatus(false);
  };

  const handleReasonChange = reasonId => {
    if (reasonId === null) {
      setReason({name: '', id: null});
    } else {
      setReason(getFromList(stockCorrectionReasonList, 'id', reasonId));
    }
    setSaveStatus(false);
  };

  const handleSave = () => {
    if (reason.id === null) {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (route.params.stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      if (
        stockProduct.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            status: StockCorrection.status.Draft,
            realQty: realQty,
          }),
        );
      } else {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            trackingNumberId: trackingNumber.id,
            status: StockCorrection.status.Draft,
            realQty: realQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          version: route.params.stockCorrection.version,
          stockCorrectionId: route.params.stockCorrection.id,
          realQty: realQty,
          reasonId: reason.id,
        }),
      );
    }
    handleNavigation();
  };

  const handleValidate = () => {
    if (reason.id === null) {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (route.params.stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      if (
        stockProduct.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            status: StockCorrection.status.Validated,
            realQty: realQty,
          }),
        );
      } else {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            trackingNumberId: trackingNumber.id,
            status: StockCorrection.status.Validated,
            realQty: realQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          version: route.params.stockCorrection.version,
          stockCorrectionId: route.params.stockCorrection.id,
          realQty: saveStatus ? null : realQty,
          reasonId: saveStatus ? null : reason.id,
          status: StockCorrection.status.Validated,
        }),
      );
    }
    handleNavigation();
  };

  const handleNavigation = () => {
    if (route.params.externeNavigation === true) {
      navigation.pop();
    } else {
      navigation.popToTop();
    }
  };

  const [popUp, setPopUp] = useState(false);

  return (
    <Screen>
      {loading || loadingProduct ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View
            style={
              status === StockCorrection.status.Validated
                ? null
                : styles.scrollContainer
            }>
            <ScrollView>
              <PopUpOneButton
                visible={popUp}
                data="Stock correction reason is required, please complete the form"
                title="Caution"
                btnTitle="OK"
                onPress={() => setPopUp(!popUp)}
              />
              <View>
                <View style={styles.content}>
                  <View style={styles.textContainer}>
                    <Text style={styles.text_important}>
                      {stockLocation.name}
                    </Text>
                  </View>
                  <Badge
                    color={
                      StockCorrection.getStatusColor(
                        StockCorrection.getStatus(status),
                        Colors,
                      ).backgroundColor
                    }
                    title={StockCorrection.getStatus(status)}
                  />
                </View>
                <ProductCardInfo
                  name={stockProduct.name}
                  code={stockProduct.code}
                  pictureId={stockProduct.picture?.id}
                  trackingNumber={
                    stockProduct.trackingNumberConfiguration == null ||
                    trackingNumber == null
                      ? null
                      : trackingNumber.trackingNumberSeq
                  }
                  locker={null}
                  onPress={handleShowProduct}
                />
              </View>
              <QuantityCard
                labelQty="Real quantity"
                defaultValue={parseFloat(realQty).toFixed(2)}
                onValueChange={handleQtyChange}
                editable={status === StockCorrection.status.Draft}>
                <Text style={styles.text}>
                  {`Database quantity: ${parseFloat(databaseQty).toFixed(2)} ${
                    stockProduct.unit?.name
                  }`}
                </Text>
              </QuantityCard>
              {status === StockCorrection.status.Validated ? (
                <View>
                  <View style={styles.reasonTitle}>
                    <Text>Reason</Text>
                  </View>
                  <Card style={styles.infosCard}>
                    <Text>{reason.name}</Text>
                  </Card>
                </View>
              ) : (
                <Picker
                  style={styles.picker}
                  styleTxt={reason.id === null ? styles.picker_empty : null}
                  title="Reason"
                  onValueChange={handleReasonChange}
                  defaultValue={reason.id}
                  listItems={stockCorrectionReasonList}
                  labelField="name"
                  valueField="id"
                />
              )}
            </ScrollView>
          </View>
          <View style={styles.button_container}>
            {saveStatus ? null : (
              <Button
                title="SAVE"
                style={styles.button}
                color={Colors.secondaryColor_light}
                onPress={handleSave}
              />
            )}
            {status === StockCorrection.status.Validated ? null : (
              <Button
                title="VALIDATE"
                style={styles.button}
                onPress={handleValidate}
              />
            )}
          </View>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '86%',
  },
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentProduct: {
    width: '90%',
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 6,
  },
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
  infosCard: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  reasonTitle: {
    marginHorizontal: 20,
  },
  picker: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  picker_empty: {
    color: 'red',
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2%',
  },
  button: {
    width: '40%',
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  text: {
    fontSize: 16,
  },
});

export default StockCorrectionDetailsScreen;
