import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Button, Card, Input, Screen, Text} from '@/components/atoms';
import {Picker, Badge} from '@/components/molecules';
import {QuantityCard} from '@/modules/stock/components/organisms';
import {fetchUnit} from '@/modules/stock/features/unitSlice';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {fetchInternalMoveLines} from '@/modules/stock/features/internalMoveLineSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import getFromList from '@/modules/stock/utils/get-from-list';
import {
  ProductCardDetails,
  LocationsMoveCard,
} from '../../components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createInternalStockMove,
  updateInternalStockMove,
} from '../../api/internal-move-api';
import StockMove from '@/modules/stock/types/stock-move';
import Colors from '@/types/colors';

const InternalMoveDetailsScreen = ({navigation, route}) => {
  // ------------  API --------------
  const {loadingInternalMoveLine, internalMoveLineList} = useSelector(
    state => state.internalMoveLine,
  );
  const {loadingProduct, productList} = useSelector(state => state.product);
  const {unitList} = useSelector(state => state.unit);
  const {activeCompanyId} = useSelector(
    state => state.user.userList[0]?.activeCompany.id,
  ); // à changer après error handling
  const {productIndicators} = useSelector(state => state.productIndicators);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit());
    if (route.params.internalMove != null) {
      dispatch(fetchInternalMoveLines(route.params.internalMove.id));
      dispatch(fetchProducts());
    }
  }, [dispatch, route.params.internalMove]);

  useEffect(() => {
    if (route.params.internalMove != null && internalMoveLineList != null) {
      dispatch(
        fetchProductIndicators({
          productId: internalMoveLineList[0]?.product.id,
          companyId: activeCompanyId,
          stockLocationId: route.params.internalMove.fromStockLocation.id,
        }),
      );
    } else if (route.params.internalMove == null) {
      dispatch(
        fetchProductIndicators({
          productId: route.params.stockProduct.id,
          companyId: activeCompanyId,
          stockLocationId: route.params.fromStockLocation.id,
        }),
      );
    }
  }, [activeCompanyId, dispatch, internalMoveLineList, route.params]);

  // ------------  VARIABLES --------------
  const [loading, setLoading] = useState(true); // Indicator for initialisation of variables
  const [saveStatus, setSaveStatus] = useState(); // Inidicator for changes

  const [status, setStatus] = useState();
  const [availability, setAvailabilty] = useState();
  const [originalStockLocation, setOriginalStockLocation] = useState();
  const [destinationStockLocation, setDestinationStockLocation] = useState();
  const [stockProduct, setStockProduct] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const [plannedQty, setPlannedQty] = useState();
  const [movedQty, setMovedQty] = useState();
  const [unit, setUnit] = useState();
  const [notes, setNotes] = useState();

  useEffect(() => {
    initVariables();
  }, [
    route.params,
    productList,
    productIndicators,
    internalMoveLineList,
    initVariables,
  ]);

  const initVariables = useCallback(() => {
    if (route.params.internalMove == null) {
      setStatus(StockMove.status.Draft);
      setAvailabilty(null);
      setOriginalStockLocation(route.params.fromStockLocation);
      setDestinationStockLocation(route.params.toStockLocation);
      setStockProduct(route.params.stockProduct);
      setTrackingNumber(
        route.params.trackingNumber == null
          ? null
          : route.params.trackingNumber,
      );
      if (productIndicators.id !== route.params.stockProduct.id) {
        return;
      } else {
        setPlannedQty(productIndicators?.availableStock);
        setMovedQty(productIndicators?.availableStock);
      }
      setUnit(route.params.stockProduct.unit);
      setNotes('');
      setSaveStatus(false);
      setLoading(false);
    } else {
      setStatus(route.params.internalMove.statusSelect);
      setAvailabilty(route.params.internalMove.availableStatusSelect);
      setOriginalStockLocation(route.params.internalMove.fromStockLocation);
      setDestinationStockLocation(route.params.internalMove.toStockLocation);
      setNotes(route.params.internalMove.note);
      if (
        productList == null ||
        internalMoveLineList == null ||
        productList.length === 0 ||
        internalMoveLineList.length === 0
      ) {
        setLoading(true);
      } else {
        const internalMoveLine = getFromList(
          internalMoveLineList,
          'id',
          route.params.internalMove.stockMoveLineList[0].id,
        );
        if (internalMoveLine == null) {
          setLoading(true);
        } else {
          setStockProduct(
            getFromList(productList, 'id', internalMoveLine.product.id),
          );
          setTrackingNumber(internalMoveLine.trackingNumber);
          if (
            route.params.internalMove.statusSelect === StockMove.status.Realized
          ) {
            setPlannedQty(internalMoveLine.realQty);
          } else {
            setPlannedQty(productIndicators?.availableStock);
          }
          setMovedQty(internalMoveLine.realQty);
          setUnit(internalMoveLine.unit);
          setLoading(false);
        }
      }
      setSaveStatus(true);
    }
  }, [internalMoveLineList, productIndicators, productList, route.params]);

  // ------------  HANDLERS --------------

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: stockProduct,
    });
  };

  const handleQtyChange = value => {
    setMovedQty(value);
    setSaveStatus(false);
  };

  const handleNotesChange = value => {
    setNotes(value);
    setSaveStatus(false);
  };

  const handleUnitChange = unitId => {
    if (unitId === 'empty') {
      setUnit({name: '', id: 'empty'});
    } else {
      setUnit(getFromList(unitList, 'id', unitId));
    }
    setSaveStatus(false);
  };

  const handleSave = () => {
    // Request AOS API
    if (route.params.internalMove == null) {
      // Stock move doesn't exsist yet : creation
      if (
        stockProduct.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createInternalStockMove({
            productId: stockProduct.id,
            companyId: 1,
            originStockLocationId: originalStockLocation.id,
            destStockLocationId: destinationStockLocation.id,
            unitId: unit.id,
            status: StockMove.status.Draft,
            movedQty: movedQty,
          }),
        );
      } else {
        dispatch(
          createInternalStockMove({
            productId: stockProduct.id,
            companyId: 1,
            originStockLocationId: originalStockLocation.id,
            destStockLocationId: destinationStockLocation.id,
            trackingNumberId: trackingNumber.id,
            unitId: unit.id,
            status: StockMove.status.Draft,
            movedQty: movedQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or unit
      dispatch(
        updateInternalStockMove({
          internalMoveId: route.params.internalMove.id,
          movedQty: movedQty,
          unitId: unit.id,
        }),
      );
    }
    navigation.navigate('StockCorrectionListScreen');
  };

  const handleValidate = () => {
    // Request AOS API
    if (route.params.internalMove == null) {
      // Stock move doesn't exsist yet : creation
      if (
        stockProduct.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createInternalStockMove({
            productId: stockProduct.id,
            companyId: 1,
            originStockLocationId: originalStockLocation.id,
            destStockLocationId: destinationStockLocation.id,
            unitId: unit.id,
            status: StockMove.status.Draft,
            movedQty: movedQty,
          }),
        );
      } else {
        dispatch(
          createInternalStockMove({
            productId: stockProduct.id,
            companyId: 1,
            originStockLocationId: originalStockLocation.id,
            destStockLocationId: destinationStockLocation.id,
            trackingNumberId: trackingNumber.id,
            unitId: unit.id,
            status: StockMove.status.Draft,
            movedQty: movedQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or unit
      dispatch(
        updateInternalStockMove({
          internalMoveId: route.params.internalMove.id,
          movedQty: movedQty,
          unitId: unit.id,
        }),
      );
    }
    navigation.navigate('InternalMoveNewProductScreen', {
      fromStockLocation: originalStockLocation,
      toStockLocation: destinationStockLocation,
    });
  };

  return (
    <Screen>
      {loading || loadingProduct || loadingInternalMoveLine ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View
            style={
              status === StockMove.status.Realized ||
              status === StockMove.status.Canceled
                ? null
                : styles.scrollContainer
            }>
            <ScrollView>
              <View>
                <View style={styles.badgeContainer}>
                  <Badge
                    style={[
                      styles.badge,
                      StockMove.getStatusColor(StockMove.getStatus(status)),
                    ]}
                    title={StockMove.getStatus(status)}
                  />
                  {availability == null ? null : (
                    <Badge
                      style={[
                        styles.badge,
                        StockMove.getAvailabilityColor(
                          StockMove.getAvailability(availability),
                        ),
                      ]}
                      title={StockMove.getAvailability(availability)}
                    />
                  )}
                </View>
                <View style={styles.content}>
                  <LocationsMoveCard
                    fromStockLocation={originalStockLocation.name}
                    toStockLocation={destinationStockLocation.name}
                    editable={false}
                  />
                </View>
                <View style={styles.contentProduct}>
                  {stockProduct.picture == null ? (
                    <Icon name="camera" style={styles.icon} />
                  ) : (
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: `${global.loggedUrl}ws/rest/com.axelor.meta.db.MetaFile/${stockProduct.picture.id}/content/download`,
                      }}
                      style={styles.image}
                    />
                  )}
                  <ProductCardDetails
                    name={stockProduct.name}
                    code={stockProduct.code}
                    onPress={handleShowProduct}>
                    <Text style={styles.text_important}>
                      {stockProduct.name}
                    </Text>
                    <Text style={styles.text_secondary}>
                      {stockProduct.code}
                    </Text>
                    {stockProduct.trackingNumberConfiguration == null ||
                    trackingNumber == null ? null : (
                      <Text style={styles.text_secondary}>
                        {trackingNumber.trackingNumberSeq}
                      </Text>
                    )}
                  </ProductCardDetails>
                </View>
              </View>
              <QuantityCard
                labelQty="Moved quantity"
                defaultValue={parseFloat(movedQty).toFixed(2)}
                onValueChange={handleQtyChange}
                editable={status === StockMove.status.Draft}>
                <Text style={styles.text}>
                  {'Available quantity: ' + parseFloat(plannedQty).toFixed(2)}
                </Text>
                <Text style={styles.text}>
                  {'Unit: ' + stockProduct.unit.name}
                </Text>
              </QuantityCard>
              {status === StockMove.status.Planned ||
              status === StockMove.status.Realized ||
              status === StockMove.status.Canceled ? (
                <View>
                  <View style={styles.reasonTitle}>
                    <Text>Unit</Text>
                  </View>
                  <Card style={styles.infosCard}>
                    <Text>{unit.name}</Text>
                  </Card>
                </View>
              ) : (
                <Picker
                  style={styles.picker}
                  styleTxt={unit.id === 'empty' ? styles.picker_empty : null}
                  title="Unit"
                  onValueChange={handleUnitChange}
                  defaultValue={unit.id}
                  listItems={unitList}
                  labelField="name"
                  valueField="id"
                />
              )}
              <View style={styles.reasonTitle}>
                <Text>Notes on Stock Move </Text>
              </View>
              <Card style={styles.infosCard}>
                {status === StockMove.status.Planned ||
                status === StockMove.status.Realized ||
                status === StockMove.status.Canceled ? (
                  <Text numberOfLines={3}>{notes}</Text>
                ) : (
                  <Input
                    value={notes}
                    onChange={handleNotesChange}
                    multiline={true}
                  />
                )}
              </Card>
            </ScrollView>
          </View>
          <View style={styles.button_container}>
            {saveStatus ? null : (
              <Button
                title="SAVE"
                style={[styles.button, styles.button_secondary]}
                styleTxt={styles.button_title}
                onPress={handleSave}
              />
            )}
            {saveStatus ? null : (
              <Button
                title="SAVE AND CONTINUE"
                style={[styles.button, styles.button_primary]}
                styleTxt={styles.button_title}
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
  container: {
    marginVertical: '2%',
  },
  scrollContainer: {
    height: Dimensions.get('window').height - 150,
  },
  badgeContainer: {
    marginTop: '2%',
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
  },
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  badge: {
    alignItems: 'center',
    height: 22,
    width: Dimensions.get('window').width * 0.3,
    borderRadius: 7,
    borderWidth: 1.5,
    marginHorizontal: '5%',
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
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    width: '40%',
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  button_primary: {
    backgroundColor: Colors.background.green,
  },
  button_secondary: {
    backgroundColor: '#FFFFFF',
  },
  button_title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.14,
    color: Colors.icon.dark_grey,
    marginRight: 6,
  },
  notesContainer: {
    height: '20%',
    marginHorizontal: 16,
  },
  notes: {},
});

export default InternalMoveDetailsScreen;
