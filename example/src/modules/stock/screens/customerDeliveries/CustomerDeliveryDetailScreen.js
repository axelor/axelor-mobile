import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ViewAllContainer} from '@/components/molecules';
import {CarrierCard, LocationsMoveCard} from '../../components/molecules';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import RenderHtml from 'react-native-render-html';
import StockMove from '../../types/stock-move';
import {
  CustomerDeliveryLineCard,
  StockMoveHeader,
} from '../../components/organisms';
import {getRacks} from '../../features/racksListSlice';
import {realizeCustomerDelivery} from '../../features/customerDeliverySlice';
import {Button, Card, Screen, Text} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const CustomerDeliveryDetailScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const {loadingCDLines, customerDeliveryLineList} = useSelector(
    state => state.customerDeliveryLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const [widthNotes, setWidthNotes] = useState();
  const PERCENTAGE_WIDTH_NOTES = 0.95;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    if (customerDelivery != null) {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: customerDelivery.id,
          page: 0,
        }),
      );
    }
  }, [customerDelivery, dispatch]);

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: customerDelivery?.fromStockLocation?.id,
        LineList: customerDeliveryLineList,
      }),
    );
  }, [
    dispatch,
    customerDeliveryLineList,
    customerDelivery?.fromStockLocation?.id,
  ]);

  const handleViewAll = () => {
    navigation.navigate('CustomerDeliveryLineListScreen', {
      customerDelivery: customerDelivery,
    });
  };

  const handleShowLine = (item, index) => {
    item = {
      ...item,
      locker:
        !loadingRacks && racksList != null && racksList[index] != null
          ? racksList[index][0]?.rack
          : '',
    };
    if (customerDelivery.statusSelect === StockMove.status.Realized) {
      navigation.navigate('CustomerDeliveryLineDetailScreen', {
        customerDeliveryLine: item,
        customerDelivery: customerDelivery,
      });
    } else {
      navigation.navigate('CustomerDeliverySelectProductScreen', {
        customerDeliveryLine: item,
        customerDelivery: customerDelivery,
      });
    }
  };

  const handleRealize = () => {
    dispatch(
      realizeCustomerDelivery({
        version: customerDelivery.version,
        stockMoveId: customerDelivery.id,
      }),
    );
    navigation.popToTop();
  };

  const handleNewLine = () => {
    navigation.navigate('CustomerDeliverySelectProductScreen', {
      customerDelivery: customerDelivery,
    });
  };

  return (
    <Screen
      fixedItems={
        customerDelivery.statusSelect !== StockMove.status.Realized && (
          <Button onPress={handleRealize} title={I18n.t('Base_Realize')} />
        )
      }
      loading={loadingCDLines}>
      <ScrollView>
        <StockMoveHeader
          reference={customerDelivery.stockMoveSeq}
          status={customerDelivery.statusSelect}
          date={
            customerDelivery.statusSelect === StockMove.status.Draft
              ? customerDelivery.createdOn
              : customerDelivery.statusSelect === StockMove.status.Planned
              ? customerDelivery.estimatedDate
              : customerDelivery.realDate
          }
          availability={customerDelivery.availableStatusSelect}
        />
        <LocationsMoveCard
          fromStockLocation={customerDelivery.fromStockLocation?.name}
          toStockLocation={customerDelivery?.toAddress.fullName}
        />
        <View style={styles.infoContainer}>
          <View style={styles.cardInfoContainer}>
            <Text>{customerDelivery.partner?.fullName}</Text>
            {customerDelivery?.origin && (
              <Text>{customerDelivery?.origin}</Text>
            )}
          </View>
          <CarrierCard />
        </View>
        <ViewAllContainer
          isHeaderExist={
            customerDelivery.statusSelect !== StockMove.status.Realized
          }
          onNewIcon={handleNewLine}
          onPress={handleViewAll}>
          {customerDeliveryLineList[0] != null && (
            <CustomerDeliveryLineCard
              style={styles.item}
              productName={customerDeliveryLineList[0].product?.fullName}
              pickedQty={customerDeliveryLineList[0]?.realQty}
              askedQty={customerDeliveryLineList[0]?.qty}
              locker={
                !loadingRacks && racksList != null && racksList[0] != null
                  ? racksList[0][0]?.rack
                  : ''
              }
              availability={
                customerDelivery.statusSelect !== StockMove.status.Realized
                  ? customerDeliveryLineList[0]?.availableStatusSelect
                  : null
              }
              trackingNumber={customerDeliveryLineList[0]?.trackingNumber}
              onPress={() => handleShowLine(customerDeliveryLineList[0], 0)}
            />
          )}
          {customerDeliveryLineList[1] != null && (
            <CustomerDeliveryLineCard
              style={styles.item}
              productName={customerDeliveryLineList[1]?.product.fullName}
              pickedQty={customerDeliveryLineList[1]?.realQty}
              askedQty={customerDeliveryLineList[1]?.qty}
              locker={
                !loadingRacks && racksList != null && racksList[1] != null
                  ? racksList[1][0]?.rack
                  : ''
              }
              availability={
                customerDelivery.statusSelect !== StockMove.status.Realized
                  ? customerDeliveryLineList[1]?.availableStatusSelect
                  : null
              }
              trackingNumber={customerDeliveryLineList[1]?.trackingNumber}
              onPress={() => handleShowLine(customerDeliveryLineList[1], 1)}
            />
          )}
        </ViewAllContainer>
        {customerDelivery.pickingOrderComments && (
          <View style={styles.description}>
            <Text style={styles.titles}>{I18n.t('Stock_NotesClient')}</Text>
            <Card
              style={styles.notes}
              onLayout={event => {
                const {width} = event.nativeEvent.layout;
                setWidthNotes(width);
              }}>
              <RenderHtml
                source={{
                  html: customerDelivery.pickingOrderComments,
                }}
                contentWidth={widthNotes * PERCENTAGE_WIDTH_NOTES}
              />
            </Card>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
    marginBottom: '3%',
    marginHorizontal: 16,
  },
  description: {
    marginHorizontal: 16,
    flexDirection: 'column',
    marginTop: '2%',
  },
  notes: {
    justifyContent: 'center',
    elevation: 0,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  titles: {
    marginHorizontal: '5%',
  },
  cardInfoContainer: {
    width: '58%',
  },
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default CustomerDeliveryDetailScreen;
