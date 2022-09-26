import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card, Screen, ScrollView, Text} from '@/components/atoms';
import {Badge, InputBarCodeCard} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import StockMove from '@/modules/stock/types/stock-move';
import {useThemeColor} from '@aos-mobile/ui';
import {QuantityCard, StockMoveHeader} from '../../components/organisms';
import useTranslator from '@/hooks/use-translator';
import {useDispatch, useSelector} from 'react-redux';
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
  const Colors = useThemeColor();
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
      loading={loading}>
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
        <LocationsMoveCard
          fromStockLocation={supplierArrival.fromAddress?.fullName}
          toStockLocation={supplierArrival.toStockLocation?.name}
        />
        <View style={styles.stockView}>
          {supplierArrivalLine != null && (
            <View style={styles.stateLine}>
              <Text style={styles.text_secondary}>
                {supplierArrivalLine?.name}
              </Text>
              {Number(supplierArrivalLine.qty) !==
                Number(supplierArrivalLine.realQty) && (
                <Badge
                  title={I18n.t('Stock_Status_Incomplete')}
                  color={Colors.cautionColor_light}
                />
              )}
              {Number(supplierArrivalLine.qty) ===
                Number(supplierArrivalLine.realQty) && (
                <Badge
                  title={I18n.t('Stock_Status_Complete')}
                  color={Colors.primaryColor_light}
                />
              )}
            </View>
          )}
        </View>
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
  stateLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    marginVertical: '1%',
  },
  stockView: {
    marginTop: '2%',
  },
  text_secondary: {
    fontSize: 14,
  },
  input: {
    zIndex: 50,
  },
});

export default SupplierArrivalAddTrackingScreen;
