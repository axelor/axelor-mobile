import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Screen, Text} from '@aos-mobile/ui';
import {ScannerAutocompleteSearch, useTranslator} from '@aos-mobile/core';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import StockMove from '@/modules/stock/types/stock-move';
import {StockMoveHeader} from '../../components/organisms';

const stockLocationScanKey = 'stock-location_supplier-arrival-change';

const SupplierArrivalChangeLocationScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const [stockLocation, setStockLocation] = useState(null);
  const {user} = useSelector(state => state.user);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [dispatch, user],
  );

  const validateChange = () => {
    navigation.navigate('SupplierArrivalDetailsScreen', {
      supplierArrival: supplierArrival,
      destinationStockLocation: stockLocation,
    });
  };
  return (
    <Screen>
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
        toStockLocation={
          stockLocation?.name == null
            ? supplierArrival.toStockLocation.name
            : stockLocation?.name
        }
      />
      <View style={styles.clientContainer}>
        <Text>{`${I18n.t('Stock_Supplier')} : ${
          supplierArrival.partner?.fullName
        }`}</Text>
        {supplierArrival.origin == null ? null : (
          <Text>{`${I18n.t('Stock_Origin')} : ${supplierArrival.origin}`}</Text>
        )}
        {supplierArrival.supplierShipmentRef == null ? null : (
          <Text>{`${I18n.t('Stock_SupplierShipmentRef')} : ${
            supplierArrival.supplierShipmentRef
          }`}</Text>
        )}
      </View>
      <View style={styles.stockView}>
        <Text style={styles.text_important}>
          {I18n.t('Stock_NewStockLocation')}
        </Text>
        <ScannerAutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder={I18n.t('Stock_StockLocation')}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          style={styles.validateBtn}
          title={I18n.t('Base_Validate')}
          onPress={() => validateChange()}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
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
  stockView: {
    marginTop: '2%',
    marginBottom: '50%',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
});

export default SupplierArrivalChangeLocationScreen;
