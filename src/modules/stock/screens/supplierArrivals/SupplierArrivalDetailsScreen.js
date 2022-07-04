import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Screen, Text} from '@/components/atoms';
import {ViewAllContainer} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  SupplierArrivalLineCard,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import {fetchSupplierArrivalLines} from '@/modules/stock/features/supplierArrivalLineSlice';
import StockMove from '@/modules/stock/types/stock-move';
import {getRacks} from '@/modules/stock/features/racksListSlice';
import {realizeSupplierArrival} from '../../features/supplierArrivalSlice';

const SupplierArrivalDetailScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const newDestinationStockLocation = route.params.destinationStockLocation;
  const {loadingSALines, supplierArrivalLineList} = useSelector(
    state => state.supplierArrivalLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const [destinationStockLocation, setDestinationStockLocation] =
    useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (supplierArrival != null) {
      dispatch(
        fetchSupplierArrivalLines({
          supplierArrivalId: supplierArrival.id,
          page: 0,
        }),
      );
    }
  }, [dispatch, supplierArrival]);
  useEffect(() => {
    dispatch(
      getRacks({
        stockId: supplierArrival?.toStockLocation?.id,
        LineList: supplierArrivalLineList,
      }),
    );
  }, [dispatch, supplierArrival?.toStockLocation?.id, supplierArrivalLineList]);
  useEffect(() => {
    setDestinationStockLocation(
      newDestinationStockLocation
        ? newDestinationStockLocation
        : supplierArrival.toStockLocation,
    );
  }, [
    newDestinationStockLocation,
    route.params,
    supplierArrival.toStockLocation,
  ]);

  const handleViewAll = () => {
    navigation.navigate('SupplierArrivalLineListScreen', {
      supplierArrival: supplierArrival,
    });
  };

  const handleShowLine = item => {
    if (supplierArrival.statusSelect === StockMove.status.Realized) {
      navigation.navigate('SupplierArrivalLineDetailScreen', {
        supplierArrivalLine: item,
        supplierArrival: supplierArrival,
      });
    } else {
      navigation.navigate('SupplierArrivalSelectProductScreen', {
        supplierArrivalLine: item,
        supplierArrival: supplierArrival,
      });
    }
  };

  const handleChangeLocation = () => {
    navigation.navigate('SupplierArrivalChangeLocationScreen', {
      destinationStockLocation: destinationStockLocation,
      supplierArrival: supplierArrival,
    });
  };

  const handleRealize = () => {
    dispatch(
      realizeSupplierArrival({
        version: supplierArrival.version,
        stockMoveId: supplierArrival.id,
      }),
    );
    navigation.popToTop();
  };

  const handleNewLine = () => {
    navigation.navigate('SupplierArrivalSelectProductScreen', {
      supplierArrival: supplierArrival,
    });
  };

  return (
    <Screen>
      {loadingSALines ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            date={
              supplierArrival.statusSelect === StockMove.status.Draft
                ? supplierArrival.createdOn
                : supplierArrival.statusSelect === StockMove.status.Planned
                ? supplierArrival.estimatedDate
                : supplierArrival.realDate
            }
          />
          <LocationsMoveCard
            fromStockLocation={supplierArrival.fromAddress?.fullName}
            toStockLocation={destinationStockLocation?.name}
            editableTo={
              supplierArrival.statusSelect !== StockMove.status.Realized
            }
            onPressTo={handleChangeLocation}
          />
          <View style={styles.clientContainer}>
            <Text>{`Client : ${supplierArrival.partner?.fullName}`}</Text>
            {supplierArrival.origin == null ? null : (
              <Text>{`Origin : ${supplierArrival.origin}`}</Text>
            )}
            {supplierArrival.supplierShipmentRef == null ? null : (
              <Text>{`Supplier Shipment Ref : ${supplierArrival.supplierShipmentRef}`}</Text>
            )}
          </View>
          <ViewAllContainer
            isHeaderExist={
              supplierArrival.statusSelect !== StockMove.status.Realized
            }
            onNewIcon={handleNewLine}
            onPress={handleViewAll}>
            {supplierArrivalLineList == null ||
            supplierArrivalLineList[0] == null ? null : (
              <SupplierArrivalLineCard
                style={styles.item}
                productName={supplierArrivalLineList[0].product?.fullName}
                deliveredQty={supplierArrivalLineList[0]?.realQty}
                askedQty={supplierArrivalLineList[0].qty}
                trackingNumber={supplierArrivalLineList[0]?.trackingNumber}
                locker={
                  !loadingRacks && racksList != null && racksList[0] != null
                    ? racksList[0][0]?.rack
                    : ''
                }
                onPress={() => handleShowLine(supplierArrivalLineList[0])}
              />
            )}
            {supplierArrivalLineList == null ||
            supplierArrivalLineList[1] == null ? null : (
              <SupplierArrivalLineCard
                style={styles.item}
                productName={supplierArrivalLineList[1].product.fullName}
                deliveredQty={supplierArrivalLineList[1].realQty}
                askedQty={supplierArrivalLineList[1].qty}
                trackingNumber={supplierArrivalLineList[1]?.trackingNumber}
                locker={
                  !loadingRacks && racksList != null && racksList[1] != null
                    ? racksList[1][0]?.rack
                    : ''
                }
                onPress={() => handleShowLine(supplierArrivalLineList[1])}
              />
            )}
          </ViewAllContainer>
          {supplierArrival.statusSelect !== StockMove.status.Realized && (
            <Button
              style={styles.validateBtn}
              onPress={handleRealize}
              title="REALIZE"
            />
          )}
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  validateBtn: {
    width: '60%',
    marginTop: 10,
    borderRadius: 35,
    marginHorizontal: '20%',
  },
  clientContainer: {
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'column',
  },
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default SupplierArrivalDetailScreen;
