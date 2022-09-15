import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {filterTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import {Card, Screen, Text} from '@/components/atoms';
import {AutocompleteSearch, PopUpOneButton} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import {displayItemTrackingNumber} from '../../utils/displayers';
import StockMove from '../../types/stock-move';
import {LocationsMoveCard} from '../../components/molecules';
import {StockMoveHeader} from '../../components/organisms';
import useTranslator from '@/hooks/use-translator';

const trackingNumberScanKey = 'tracking-number_internal-move-new';

const InternalMoveSelectTrackingScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const internalMoveLine = route.params.internalMoveLine;
  const product = route.params.stockProduct;
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

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveSelectFromLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveSelectToLocationScreen', {
      fromStockLocation: route.params.fromStockLocation,
    });
  };

  const handleClearProduct = () => {
    navigation.navigate('InternalMoveSelectProductScreen', {
      fromStockLocation: route.params.fromStockLocation,
      toStockLocation: route.params.toStockLocation,
    });
  };

  const handleTrackingNumberSelection = useCallback(
    trackingNumber => {
      if (internalMove == null) {
        navigation.navigate('InternalMoveLineDetailsScreen', {
          fromStockLocation: route.params.fromStockLocation,
          toStockLocation: route.params.toStockLocation,
          stockProduct: route.params.stockProduct,
          trackingNumber: trackingNumber,
        });
      } else {
        if (trackingNumber.id !== internalMoveLine.trackingNumber?.id) {
          setVisible(true);
        } else {
          navigation.navigate('InternalMoveLineDetailsScreen', {
            internalMove: internalMove,
            internalMoveLine: internalMoveLine,
          });
        }
      }
    },
    [internalMove, internalMoveLine, navigation, route.params],
  );

  return (
    <Screen>
      {internalMove != null ? (
        <View>
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={
              internalMove.statusSelect === StockMove.status.Draft
                ? internalMove.createdOn
                : internalMove.statusSelect === StockMove.status.Planned
                ? internalMove.estimatedDate
                : internalMove.realDate
            }
            availability={internalMove.availableStatusSelect}
          />
          <View style={styles.content}>
            <LocationsMoveCard
              fromStockLocation={internalMove.fromStockLocation.name}
              toStockLocation={internalMove.toStockLocation.name}
            />
          </View>
          <Card style={styles.cardProductInfo}>
            <Text>{internalMoveLine.product?.fullName}</Text>
          </Card>
        </View>
      ) : (
        <View>
          <ClearableCard
            valueTxt={route.params.fromStockLocation.name}
            onClearPress={handleClearOriginalLocation}
          />
          <ClearableCard
            valueTxt={route.params.toStockLocation.name}
            onClearPress={handleClearDestinationLocation}
          />
          <ClearableCard
            valueTxt={route.params.stockProduct.name}
            onClearPress={handleClearProduct}
          />
        </View>
      )}
      <AutocompleteSearch
        objectList={trackingNumberList}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        fetchData={fetchTrackingAPI}
        displayValue={displayItemTrackingNumber}
        scanKeySearch={trackingNumberScanKey}
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
});

export default InternalMoveSelectTrackingScreen;
