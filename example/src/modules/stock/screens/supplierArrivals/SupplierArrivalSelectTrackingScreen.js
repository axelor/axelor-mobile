import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Card,
  HeaderContainer,
  Icon,
  PopUpOneButton,
  Screen,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {displayItemTrackingNumber} from '@/modules/stock/utils/displayers';
import {filterTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import StockMove from '@/modules/stock/types/stock-move';
import {StockMoveHeader} from '../../components/organisms';

const trackingScanKey = 'tracking_supplier-arrival-select';

const SupplierArrivalSelectTrackingScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const product = route.params.product;
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const [isVisible, setVisible] = useState(false);
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
    if (item !== null) {
      if (
        supplierArrivalLine != null &&
        item.id !== supplierArrivalLine.trackingNumber?.id
      ) {
        setVisible(true);
      } else {
        navigation.navigate('SupplierArrivalLineDetailScreen', {
          supplierArrivalLine: supplierArrivalLine,
          supplierArrival: supplierArrival,
          product: product,
          trackingNumber: item,
        });
      }
    }
  };

  const handleAddTrackingNumber = () => {
    navigation.navigate('SupplierArrivalAddTrackingScreen', {
      supplierArrivalLine: supplierArrivalLine,
      supplierArrival: supplierArrival,
      product: product,
    });
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            lineRef={supplierArrivalLine?.name}
            status={supplierArrival.statusSelect}
            date={
              supplierArrival.statusSelect === StockMove.status.Draft
                ? supplierArrival.createdOn
                : supplierArrival.statusSelect === StockMove.status.Planned
                ? supplierArrival.estimatedDate
                : supplierArrival.realDate
            }
          />
        }
      />
      <View style={styles.stockView}>
        <Card style={styles.cardProductInfo}>
          <Text>{product?.name}</Text>
        </Card>
        <View style={styles.trackingNumber}>
          <Text style={styles.text_secondary}>
            {I18n.t('Stock_AddTrackingNumber')}
          </Text>
          <Icon
            name="plus"
            color={Colors.primaryColor}
            size={24}
            style={styles.action}
            touchable={true}
            onPress={handleAddTrackingNumber}
          />
        </View>
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
      </View>
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorTrackingNumber')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
  trackingNumber: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 5,
  },
  stockView: {
    marginTop: '2%',
  },
  text_secondary: {
    fontSize: 14,
  },
  action: {
    marginLeft: 10,
  },
});

export default SupplierArrivalSelectTrackingScreen;
