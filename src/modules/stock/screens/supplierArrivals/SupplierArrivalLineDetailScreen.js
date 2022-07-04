import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, View, StyleSheet, ScrollView} from 'react-native';
import {Button, Icon, Screen, Text} from '@/components/atoms';
import {Badge, Picker} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  QuantityCard,
  StockMoveHeader,
  ProductCardInfo,
} from '@/modules/stock/components/organisms';
import StockMove from '@/modules/stock/types/stock-move';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';
import {addNewLine} from '../../features/supplierArrivalSlice';
import {updateSupplierArrivalLine} from '../../features/supplierArrivalLineSlice';
import {ColorHook} from '@/themeStore';

const SupplierArrivalLineDetailScreen = ({route, navigation}) => {
  const Colors = ColorHook();
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const trackingNumber = route.params.trackingNumber;
  const {loadingProductFromId, productFromId: product} = useSelector(
    state => state.product,
  );
  const {loadingSupplierCatalog, supplierProductInfo} = useSelector(
    state => state.supplierCatalog,
  );
  const [realQty, setRealQty] = useState(
    supplierArrivalLine != null ? supplierArrivalLine.realQty : 0,
  );
  const [conformity, setConformity] = useState({
    name: StockMove.getConformity(
      supplierArrivalLine != null
        ? supplierArrivalLine.conformitySelect
        : StockMove.conformity.None,
    ),
    id:
      supplierArrivalLine != null
        ? supplierArrivalLine.conformitySelect
        : StockMove.conformity.None,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductWithId(
        supplierArrivalLine != null
          ? supplierArrivalLine.product?.id
          : route.params.product.id,
      ),
    );
    dispatch(
      fetchProductForSupplier({
        supplierId: supplierArrival?.partner?.id,
        productId:
          supplierArrivalLine != null
            ? supplierArrivalLine.product?.id
            : route.params.product.id,
      }),
    );
  }, [dispatch, route.params.product, supplierArrival, supplierArrivalLine]);

  const handleQtyChange = value => {
    setRealQty(value);
  };

  const handleConformityChange = item => {
    if (item === null) {
      setConformity({
        name: StockMove.getConformity(StockMove.conformity.None),
        id: StockMove.conformity.None,
      });
    } else {
      setConformity({name: StockMove.getConformity(item), id: item});
    }
  };

  const handleValidate = () => {
    dispatch(
      updateSupplierArrivalLine({
        stockMoveLineId: supplierArrivalLine.id,
        version: supplierArrivalLine.version,
        realQty: realQty,
        conformity: conformity.id,
      }),
    );

    navigation.navigate('SupplierArrivalLineListScreen', {
      supplierArrival: supplierArrival,
    });
  };

  const handleShowProduct = () => {
    navigation.navigate('ProductNavigator', {
      screen: 'ProductStockDetailsScreen',
      params: {
        product: product,
      },
    });
  };

  const handleAddLine = () => {
    dispatch(
      addNewLine({
        stockMoveId: supplierArrival.id,
        productId: product.id,
        unitId: product.unit.id,
        trackingNumberId: trackingNumber != null ? trackingNumber.id : null,
        expectedQty: 0,
        realQty: realQty,
        conformity: conformity.id,
      }),
    );
    navigation.pop();
    if (product.trackingNumberConfiguration != null) {
      navigation.pop();
    }
    navigation.pop();
  };

  return (
    <Screen>
      {loadingProductFromId || loadingSupplierCatalog ? (
        <ActivityIndicator size="large" />
      ) : (
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
                  <Badge title="Incomplete" color={Colors.cautionColor_light} />
                )}
                {Number(supplierArrivalLine.qty) ===
                  Number(supplierArrivalLine.realQty) && (
                  <Badge title="Complete" color={Colors.primaryColor_light} />
                )}
              </View>
            )}
          </View>
          <ProductCardInfo
            onPress={handleShowProduct}
            pictureId={product?.picture.id}
            code={product?.code}
            name={product?.name}
            trackingNumber={trackingNumber?.trackingNumberSeq}
          />
          {supplierProductInfo == null ||
          Object.keys(supplierProductInfo).length === 0 ? null : (
            <View style={styles.supplierInfoContainer}>
              <Icon name="info-circle" size={20} />
              <View style={styles.supplierInfo}>
                <Text style={styles.text_important}>Supplier Catalog :</Text>
                <Text>{`Name : ${supplierProductInfo?.productSupplierName}`}</Text>
                <Text>{`Code : ${supplierProductInfo?.productSupplierCode}`}</Text>
              </View>
            </View>
          )}
          <QuantityCard
            labelQty="Received quantity"
            defaultValue={parseFloat(realQty).toFixed(2)}
            onValueChange={handleQtyChange}
            style={styles.quantityCard}
            editable={
              supplierArrival.statusSelect !== StockMove.status.Realized
            }>
            <Text style={styles.text}>
              {`Asked quantity : ${parseFloat(
                supplierArrivalLine != null ? supplierArrivalLine.qty : 0,
              ).toFixed(2)} ${
                supplierArrivalLine != null
                  ? supplierArrivalLine.unit.name
                  : product.unit.name
              }`}
            </Text>
          </QuantityCard>
          <Picker
            style={styles.picker}
            title="Conformity"
            onValueChange={item => handleConformityChange(item)}
            defaultValue={conformity?.id}
            listItems={StockMove.conformitySelection}
            labelField="name"
            valueField="id"
          />
          {supplierArrivalLine != null &&
            supplierArrival.statusSelect !== StockMove.status.Realized && (
              <Button
                style={styles.validateBtn}
                title="VALIDATE"
                onPress={handleValidate}
              />
            )}
          {supplierArrivalLine == null &&
            supplierArrival.statusSelect !== StockMove.status.Realized && (
              <Button
                style={styles.validateBtn}
                title="ADD"
                onPress={handleAddLine}
              />
            )}
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  supplierInfoContainer: {
    marginVertical: '1%',
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplierInfo: {
    marginLeft: '3%',
    flexDirection: 'column',
  },
  validateBtn: {
    width: '60%',
    marginTop: 10,
    borderRadius: 35,
    marginHorizontal: '20%',
  },
  picker: {
    marginHorizontal: 12,
  },
  quantityCard: {
    marginTop: '3%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '3%',
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
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
});

export default SupplierArrivalLineDetailScreen;
