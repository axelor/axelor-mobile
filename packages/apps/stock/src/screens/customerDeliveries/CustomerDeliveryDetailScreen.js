import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  Button,
  LabelText,
  PopUpOneButton,
  Screen,
  ScrollView,
  useThemeColor,
  ViewAllContainer,
  HeaderContainer,
  MovementIndicationCard,
  Icon,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {CustomerDeliveryLineCard, StockMoveHeader} from '../../components';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import {getRacks} from '../../features/racksListSlice';
import {realizeCustomerDelivery} from '../../features/customerDeliverySlice';
import StockMove from '../../types/stock-move';

const CustomerDeliveryDetailScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const {loadingCDLines, customerDeliveryLineList} = useSelector(
    state => state.customerDeliveryLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {mobileSettings} = useSelector(state => state.config);
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.StockMove"
          modelId={customerDelivery?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, customerDelivery]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        customerDelivery.statusSelect !== StockMove.status.Realized && (
          <Button onPress={handleRealize} title={I18n.t('Base_Realize')} />
        )
      }
      loading={loadingCDLines}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View>
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
                    color={Colors.errorColor}
                    title={I18n.t('Stock_StandardISPM')}
                    style={styles.ispmBadge}
                  />
                )}
              </View>
            </View>
          </View>
        }
      />
      <ScrollView>
        <MovementIndicationCard
          titleTop={customerDelivery.fromStockLocation?.name}
          iconTop={
            <Icon name="warehouse" color={Colors.primaryColor.background} />
          }
          titleDown={
            customerDelivery.toAddress?.fullName ||
            customerDelivery.toAddressStr
          }
          iconDown={<Icon name="map-marker-alt" />}
          disabledDown={false}
          onPressTitleDown={() => setVisiblePopup(true)}
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
