import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  PopUpOneButton,
  Screen,
  ScrollView,
  Text,
  ViewAllContainer,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  SupplierArrivalLineCard,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import {fetchSupplierArrivalLines} from '@/modules/stock/features/supplierArrivalLineSlice';
import StockMove from '@/modules/stock/types/stock-move';
import {getRacks} from '@/modules/stock/features/racksListSlice';
import {realizeSupplierArrival} from '../../features/supplierArrivalSlice';

const SupplierArrivalDetailsScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const {loadingSALines, supplierArrivalLineList} = useSelector(
    state => state.supplierArrivalLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const [isPopupVisible, setVisiblePopup] = useState(false);
  const I18n = useTranslator();
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
    <Screen
      fixedItems={
        supplierArrival.statusSelect !== StockMove.status.Realized && (
          <Button onPress={handleRealize} title={I18n.t('Base_Realize')} />
        )
      }
      loading={loadingSALines}>
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
        <View style={styles.clientContainer}>
          <Text>{`${I18n.t('Stock_Supplier')} : ${
            supplierArrival.partner?.fullName
          }`}</Text>
          {supplierArrival.origin == null ? null : (
            <Text>{`${I18n.t('Stock_Origin')} : ${
              supplierArrival.origin
            }`}</Text>
          )}
          {supplierArrival.supplierShipmentRef == null ? null : (
            <Text>{`${I18n.t('Stock_SupplierShipmentRef')} : ${
              supplierArrival.supplierShipmentRef
            }`}</Text>
          )}
        </View>
        <LocationsMoveCard
          fromStockLocation={supplierArrival.fromAddress?.fullName}
          touchableFrom={true}
          onPressFrom={() => setVisiblePopup(true)}
          toStockLocation={supplierArrival.toStockLocation?.name}
        />
        <ViewAllContainer
          isHeaderExist={
            supplierArrival.statusSelect !== StockMove.status.Realized
          }
          onNewIcon={handleNewLine}
          data={supplierArrivalLineList}
          renderFirstTwoItems={(item, index) => (
            <SupplierArrivalLineCard
              style={styles.item}
              productName={item.product?.fullName}
              deliveredQty={item?.realQty}
              askedQty={item.qty}
              trackingNumber={item?.trackingNumber}
              locker={
                !loadingRacks && racksList != null && racksList[index] != null
                  ? racksList[index][0]?.rack
                  : ''
              }
              onPress={() => handleShowLine(item)}
            />
          )}
          onViewPress={handleViewAll}
        />
      </ScrollView>
      <PopUpOneButton
        title={I18n.t('Stock_OriginalAdress')}
        visible={isPopupVisible}
        data={supplierArrival.fromAddress?.fullName}
        btnTitle={I18n.t('Base_OK')}
        onPress={() => setVisiblePopup(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
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

export default SupplierArrivalDetailsScreen;
