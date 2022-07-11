import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button, Card, Input, Screen, Text} from '@/components/atoms';
import {Picker} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  QuantityCard,
  ProductCardInfo,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import {fetchUnit} from '@/modules/stock/features/unitSlice';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';
import {fetchInternalMoveLines} from '@/modules/stock/features/internalMoveLineSlice';
import {fetchProductIndicators} from '@/modules/stock/features/productIndicatorsSlice';
import getFromList from '@/modules/stock/utils/get-from-list';
import StockMove from '@/modules/stock/types/stock-move';
import {
  createInternalMove,
  updateInternalMove,
} from '@/modules/stock/features/internalMoveSlice';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const InternalMoveLineDetailsScreen = ({navigation, route}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const {unitList} = useSelector(state => state.unit);
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit());
    if (
      route.params.internalMove != null &&
      route.params.internalMoveLine != null
    ) {
      dispatch(fetchInternalMoveLines(route.params.internalMove.id));
      dispatch(fetchProductWithId(route.params.internalMoveLine.product.id));
    }
  }, [dispatch, route.params]);

  useEffect(() => {
    if (
      route.params.internalMove != null &&
      route.params.internalMoveLine != null
    ) {
      dispatch(
        fetchProductIndicators({
          version: route.params.internalMoveLine.product.$version,
          productId: route.params.internalMoveLine.product.id,
          companyId: activeCompany?.id,
          stockLocationId: route.params.internalMove.fromStockLocation.id,
        }),
      );
    } else if (route.params.internalMove == null) {
      dispatch(
        fetchProductIndicators({
          version: route.params.stockProduct.version,
          productId: route.params.stockProduct.id,
          companyId: activeCompany?.id,
          stockLocationId: route.params.fromStockLocation.id,
        }),
      );
    }
  }, [activeCompany?.id, dispatch, route.params]);

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
  }, [route.params, productFromId, productIndicators, initVariables]);

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
        setMovedQty(0);
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
      if (productFromId == null || productFromId === {}) {
        setLoading(true);
      } else {
        const internalMoveLine = route.params.internalMoveLine;
        setStockProduct(productFromId);
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
      setSaveStatus(true);
    }
  }, [productIndicators, productFromId, route.params]);

  const handleShowProduct = () => {
    navigation.navigate('ProductNavigator', {
      screen: 'ProductStockDetailsScreen',
      params: {
        product: stockProduct,
      },
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
    if (unitId === null) {
      setUnit({name: '', id: null});
    } else {
      setUnit(getFromList(unitList, 'id', unitId));
    }
    setSaveStatus(false);
  };

  const handleRealize = () => {
    if (
      stockProduct.trackingNumberConfiguration == null ||
      trackingNumber == null
    ) {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    } else {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          trackingNumberId: trackingNumber.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    }
    navigation.popToTop();
  };

  const handleValidate = () => {
    if (
      stockProduct.trackingNumberConfiguration == null ||
      trackingNumber == null
    ) {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    } else {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          trackingNumberId: trackingNumber.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    }
    navigation.navigate('InternalMoveSelectProductScreen', {
      fromStockLocation: originalStockLocation,
      toStockLocation: destinationStockLocation,
    });
  };

  const handleSave = () => {
    dispatch(
      updateInternalMove({
        internalMoveId: route.params.internalMove.id,
        version: route.params.internalMove.$version,
        movedQty: movedQty,
        unitId: unit.id,
      }),
    );
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: route.params.internalMove,
    });
  };

  const handleCreateCorrection = () => {
    navigation.navigate('StockCorrectionNavigator', {
      screen: 'StockCorrectionDetailsScreen',
      params: {
        stockLocation: originalStockLocation,
        stockProduct: stockProduct,
        trackingNumber: trackingNumber,
        externeNavigation: true,
      },
    });
  };

  return (
    <Screen>
      {loading || loadingProductFromId ? (
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
                <StockMoveHeader
                  reference={route.params.internalMove?.stockMoveSeq}
                  status={status}
                  date={
                    route.params.internalMove?.statusSelect ===
                    StockMove.status.Draft
                      ? route.params.internalMove?.createdOn
                      : route.params.internalMove?.statusSelect ===
                        StockMove.status.Planned
                      ? route.params.internalMove?.estimatedDate
                      : route.params.internalMove?.realDate
                  }
                  availability={availability}
                />
                <View style={styles.content}>
                  <LocationsMoveCard
                    fromStockLocation={originalStockLocation.name}
                    toStockLocation={destinationStockLocation.name}
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
                labelQty={I18n.t('Stock_MovedQty')}
                defaultValue={parseFloat(movedQty).toFixed(2)}
                onValueChange={handleQtyChange}
                editable={
                  status === StockMove.status.Draft ||
                  status === StockMove.status.Planned
                }
                actionQty={
                  status === StockMove.status.Draft ||
                  status === StockMove.status.Planned
                }
                onPressActionQty={handleCreateCorrection}>
                <Text style={styles.text}>
                  {`${I18n.t('Stock_AvailableQty')}: ${parseFloat(
                    plannedQty,
                  ).toFixed(2)} ${stockProduct.unit?.name}`}
                </Text>
              </QuantityCard>
              {status === StockMove.status.Realized ||
              status === StockMove.status.Canceled ? (
                <View>
                  <View style={styles.reasonTitle}>
                    <Text>{I18n.t('Stock_Unit')}</Text>
                  </View>
                  <Card style={styles.infosCard}>
                    <Text>{unit.name}</Text>
                  </Card>
                </View>
              ) : (
                <Picker
                  style={styles.picker}
                  styleTxt={unit.id === null ? styles.picker_empty : null}
                  title={I18n.t('Stock_Unit')}
                  onValueChange={handleUnitChange}
                  defaultValue={unit.id}
                  listItems={unitList}
                  labelField="name"
                  valueField="id"
                />
              )}
              {status === StockMove.status.Draft && notes != null && (
                <View>
                  <View style={styles.reasonTitle}>
                    <Text>{I18n.t('Stock_NotesOnStockMove')}</Text>
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
                </View>
              )}
            </ScrollView>
          </View>
          {!saveStatus && route.params.internalMove == null && (
            <View style={styles.button_container}>
              <Button
                title={I18n.t('Base_Realize')}
                style={styles.button}
                color={Colors.secondaryColor_light}
                onPress={handleRealize}
              />
              <Button
                title={I18n.t('Base_RealizeContinue')}
                style={[styles.button, styles.bigBtn]}
                onPress={handleValidate}
              />
            </View>
          )}
          {!saveStatus && route.params.internalMove != null && (
            <View style={styles.button_container}>
              <Button
                title={I18n.t('Base_Save')}
                style={styles.button}
                onPress={handleSave}
              />
            </View>
          )}
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: Dimensions.get('window').height * 0.8,
  },
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    marginHorizontal: '3%',
  },
  bigBtn: {
    height: 50,
  },
  text: {
    fontSize: 16,
  },
});

export default InternalMoveLineDetailsScreen;
