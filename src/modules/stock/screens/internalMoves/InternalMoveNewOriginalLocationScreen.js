import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import getFromList from '@/modules/stock/utils/get-from-list';
import useScanner, {castIntent} from '@/modules/stock/utils/use-scanner';

const InternalMoveNewOriginalLocationScreen = ({navigation, route}) => {
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockLocations());
  }, [dispatch, route]);

  const handleLocationSelection = locationId => {
    if (locationId !== '') {
      const location = getFromList(stockLocationList, 'id', locationId);
      handleNavigate(location);
    }
  };

  const handleLocationScan = intent => {
    console.log('here');
    const serialNumber = castIntent(intent).value;
    if (serialNumber !== '') {
      const location = getFromList(
        stockLocationList,
        'serialNumber',
        serialNumber,
      );
      console.log(location);
      handleNavigate(location);
    }
  };

  const handleNavigate = location => {
    navigation.navigate('InternalMoveNewDestinationLocationScreen', {
      fromStockLocation: location,
    });
  };

  useScanner(handleLocationScan);

  return (
    <Screen style={styles.container}>
      <AutocompleteSearch
        objectList={stockLocationList}
        searchName="Original Stock Location"
        searchParam="name"
        setValueSearch={handleLocationSelection}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
});

export default InternalMoveNewOriginalLocationScreen;
