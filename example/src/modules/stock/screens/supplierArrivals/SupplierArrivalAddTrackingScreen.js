import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Card,
  HeaderContainer,
  Screen,
  ScrollView,
  Text,
} from '@aos-mobile/ui';
import {
  InputBarCodeCard,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import StockMove from '@/modules/stock/types/stock-move';
import {QuantityCard, StockMoveHeader} from '../../components/organisms';
import {updateSupplierTrackingNumber} from '../../features/trackingNumberSlice';

const SupplierArrivalAddTrackingScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const product = route.params.product;
  const [sequence, setSequence] = useState(null);
  const [trackingQty, setTrackingQty] = useState(0);
  const {loading, createdTrackingNumber} = useSelector(
    state => state.trackingNumber,
  );
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleCreateTrackingNumber = useCallback(() => {
    dispatch(
      updateSupplierTrackingNumber({
        product: product,
        trackingNumberSeq: sequence,
        qty: trackingQty,
        stockMoveLineId: supplierArrivalLine.id,
        stockMoveLineVersion: supplierArrivalLine.version,
      }),
    );
  }, [dispatch, product, sequence, supplierArrivalLine, trackingQty]);

  useEffect(() => {
    if (!loading && createdTrackingNumber != null) {
      navigation.navigate('SupplierArrivalLineDetailScreen', {
        supplierArrivalLine: supplierArrivalLine,
        supplierArrival: supplierArrival,
        product: product,
        trackingNumber: createdTrackingNumber,
      });
    }
  }, [
    createdTrackingNumber,
    loading,
    navigation,
    product,
    supplierArrival,
    supplierArrivalLine,
  ]);

  return (
    <Screen
      fixedItems={
        trackingQty > 0 &&
        sequence != null &&
        sequence !== '' && (
          <Button
            title={I18n.t('Base_Create')}
            onPress={handleCreateTrackingNumber}
          />
        )
      }
      removeSpaceOnTop={true}
      loading={loading}>
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
      <ScrollView>
        <Card style={styles.cardProductInfo}>
          <Text>{product?.name}</Text>
        </Card>
        <InputBarCodeCard
          style={styles.input}
          title={I18n.t('Stock_TrackingSequence')}
          onChange={setSequence}
        />
        <QuantityCard
          labelQty={I18n.t('Stock_TrackingQty')}
          defaultValue={trackingQty}
          onValueChange={setTrackingQty}
          editable={true}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
  input: {
    zIndex: 50,
  },
});

export default SupplierArrivalAddTrackingScreen;
