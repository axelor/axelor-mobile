import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Card,
  HeaderContainer,
  PopUpOneButton,
  Screen,
  Text,
} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {StockMoveHeader} from '../../components';
import {filterTrackingNumber} from '../../features/trackingNumberSlice';
import {displayItemTrackingNumber} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const trackingScanKey = 'tracking_customer-delivery-select';

const CustomerDeliverySelectTrackingScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const customerDeliveryLine = route.params.customerDeliveryLine;
  const product = route.params.product;
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const [isVisible, setVisible] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  const handleTrackingNumberSelection = item => {
    if (item != null) {
      if (
        customerDeliveryLine != null &&
        item.id !== customerDeliveryLine.trackingNumber?.id
      ) {
        setVisible(true);
      } else {
        navigation.navigate('CustomerDeliveryLineDetailScreen', {
          customerDeliveryLine: customerDeliveryLine,
          customerDelivery: customerDelivery,
          product: product,
          trackingNumber: item,
        });
      }
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            lineRef={customerDeliveryLine?.name}
            date={
              customerDelivery.statusSelect === StockMove.status.Draft
                ? customerDelivery.createdOn
                : customerDelivery.statusSelect === StockMove.status.Planned
                ? customerDelivery.estimatedDate
                : customerDelivery.realDate
            }
            availability={customerDelivery.availableStatusSelect}
          />
        }
      />
      <View style={styles.container}>
        <Card style={styles.cardProductInfo}>
          <Text>{product.name}</Text>
        </Card>
        <ScannerAutocompleteSearch
          objectList={trackingNumberList}
          onChangeValue={item => handleTrackingNumberSelection(item)}
          fetchData={fetchTrackingAPI}
          displayValue={displayItemTrackingNumber}
          scanKeySearch={trackingScanKey}
          placeholder={I18n.t('Stock_TrackingNumber')}
          isFocus={true}
          changeScreenAfter={true}
        />
        <PopUpOneButton
          visible={isVisible}
          title={I18n.t('Auth_Warning')}
          data={I18n.t('Stock_ErrorTrackingNumber')}
          btnTitle={I18n.t('Auth_Close')}
          onPress={() => setVisible(false)}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
  },
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
});

export default CustomerDeliverySelectTrackingScreen;
