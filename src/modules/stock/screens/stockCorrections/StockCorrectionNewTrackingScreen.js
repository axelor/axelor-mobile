import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {InfosCard} from '@/components/molecules';
import getFromList from '@/modules/stock/utils/get-from-list';

const StockCorrectionNewTrackingScreen = ({navigation, route}) => {
  const {trackingNumberList} = useSelector(state => state.trackingNumber);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrackingNumber(route.params.product.id));
  }, [dispatch, route.params.product.id]);

  const handleClearLocation = () => {
    navigation.navigate('StockCorrectionNewLocationScreen', {
      product: route.params.product,
    });
  };

  const handleClearProduct = () => {
    navigation.navigate('StockCorrectionNewProductScreen', {
      stockLocation: route.params.stockLocation,
    });
  };

  const handleTrackingNumberSelection = trackingNumberId => {
    if (trackingNumberId !== '') {
      const trackingNumber = getFromList(
        trackingNumberList,
        'id',
        trackingNumberId,
      );
      navigation.navigate('StockCorrectionNewDraftScreen', {
        stockLocation: route.params.stockLocation,
        stockProduct: route.params.product,
        trackingNumber: trackingNumber,
      });
    }
  };

  return (
    <Screen style={styles.container}>
      <InfosCard
        style={styles.infosCard}
        valueTxt={route.params.stockLocation.name}
        onClearPress={handleClearLocation}
        editable={true}
      />
      <InfosCard
        style={styles.infosCard}
        valueTxt={route.params.product.name}
        onClearPress={handleClearProduct}
        editable={true}
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

export default StockCorrectionNewTrackingScreen;
