import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Badge,
  Button,
  LabelText,
  PopUpOneButton,
  Screen,
  useThemeColor,
  ViewAllContainer,
} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {LocationsMoveCard, NotesCard} from '../../components/molecules';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import StockMove from '../../types/stock-move';
import {
  CustomerDeliveryLineCard,
  StockMoveHeader,
} from '../../components/organisms';
import {getRacks} from '../../features/racksListSlice';
import {realizeCustomerDelivery} from '../../features/customerDeliverySlice';

const CustomerDeliveryDetailScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const {loadingCDLines, customerDeliveryLineList} = useSelector(
    state => state.customerDeliveryLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const [isPopupVisible, setVisiblePopup] = useState(false);
  const I18n = useTranslator();
  const Colors = useThemeColor();
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
        <View style={styles.generalInfoContainer}>
          <View style={styles.clientInfos}>
            <LabelText
              iconName="user"
              title={customerDelivery.partner?.fullName}
            />
            {customerDelivery?.origin && (
              <LabelText iconName="tag" title={customerDelivery?.origin} />
            )}
          </View>
          <View style={styles.ispmInfos}>
            {customerDelivery?.isIspmRequired && (
              <Badge
                color={Colors.errorColor_light}
                title={I18n.t('Stock_StandardISPM')}
                style={styles.ispmBadge}
              />
            )}
          </View>
        </View>
        <LocationsMoveCard
          fromStockLocation={customerDelivery.fromStockLocation?.name}
          toStockLocation={
            customerDelivery.toAddress?.fullName ||
            customerDelivery.toAddressStr
          }
          touchableTo={true}
          onPressTo={() => setVisiblePopup(true)}
        />
        <ViewAllContainer
          isHeaderExist={
            customerDelivery.statusSelect !== StockMove.status.Realized
          }
          onNewIcon={handleNewLine}
          data={customerDeliveryLineList}
          renderFirstTwoItems={(item, index) => (
            <CustomerDeliveryLineCard
              style={styles.item}
              productName={item.product?.fullName}
              pickedQty={item?.realQty}
              askedQty={item?.qty}
              locker={
                !loadingRacks && racksList != null && racksList[index] != null
                  ? racksList[index][0]?.rack
                  : ''
              }
              availability={
                customerDelivery.statusSelect !== StockMove.status.Realized
                  ? item?.availableStatusSelect
                  : null
              }
              trackingNumber={item?.trackingNumber}
              onPress={() => handleShowLine(item, index)}
            />
          )}
          onViewPress={handleViewAll}
        />
        <NotesCard
          title={I18n.t('Stock_NotesClient')}
          data={customerDelivery.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_DeliveryCondition')}
          data={customerDelivery.deliveryCondition}
        />
      </ScrollView>
      <PopUpOneButton
        title={I18n.t('Stock_DestinationAdress')}
        data={
          customerDelivery.toAddress?.fullName || customerDelivery.toAddressStr
        }
        visible={isPopupVisible}
        btnTitle={I18n.t('Base_OK')}
        onPress={() => setVisiblePopup(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
    marginHorizontal: 16,
  },
  generalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  clientInfos: {
    flex: 3,
  },
  ispmInfos: {
    flex: 2,
    flexDirection: 'row-reverse',
  },
  ispmBadge: {
    width: '90%',
  },
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default CustomerDeliveryDetailScreen;
