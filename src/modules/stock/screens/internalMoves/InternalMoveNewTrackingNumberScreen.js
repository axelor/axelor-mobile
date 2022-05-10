import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import getFromList from '@/modules/stock/utils/get-from-list';

const InternalMoveNewTrackingNumberScreen = ({navigation, route}) => {
  const {trackingNumberList} = useSelector(state => state.trackingNumber);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrackingNumber(route.params.stockProduct.id));
  }, [dispatch, route.params.stockProduct.id]);

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveNewOriginalLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveNewDestinationLocationScreen', {
      fromStockLocation: route.params.fromStockLocation,
    });
  };

  const handleClearProduct = () => {
    navigation.navigate('InternalMoveNewProductScreen', {
      fromStockLocation: route.params.fromStockLocation,
      toStockLocation: route.params.toStockLocation,
    });
  };

  const handleTrackingNumberSelection = trackingNumberId => {
    if (trackingNumberId !== '') {
      const trackingNumber = getFromList(
        trackingNumberList,
        'id',
        trackingNumberId,
      );
      navigation.navigate('InternalMoveDetailsScreen', {
        fromStockLocation: route.params.fromStockLocation,
        toStockLocation: route.params.toStockLocation,
        stockProduct: route.params.product,
        trackingNumber: trackingNumber,
      });
    }
  };

  return (
    <Screen style={styles.container}>
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.fromStockLocation.name}
        onClearPress={handleClearOriginalLocation}
      />
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.toStockLocation.name}
        onClearPress={handleClearDestinationLocation}
      />
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.stockProduct.name}
        onClearPress={handleClearProduct}
      />
      <AutocompleteSearch
        objectList={trackingNumberList}
        searchName="Tracking Number"
        searchParam="trackingNumberSeq"
        setValueSearch={handleTrackingNumberSelection}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
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

export default InternalMoveNewTrackingNumberScreen;
