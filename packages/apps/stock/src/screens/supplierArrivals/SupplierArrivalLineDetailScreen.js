import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Badge,
  Button,
  HeaderContainer,
  Icon,
  Picker,
  Screen,
  ScrollView,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {QuantityCard, StockMoveHeader, ProductCardInfo} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';
import {addNewLine} from '../../features/supplierArrivalSlice';
import {updateSupplierArrivalLine} from '../../features/supplierArrivalLineSlice';
import StockMove from '../../types/stock-move';

const SupplierArrivalLineDetailScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
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
      I18n,
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
        name: StockMove.getConformity(StockMove.conformity.None, I18n),
        id: StockMove.conformity.None,
      });
    } else {
      setConformity({name: StockMove.getConformity(item, I18n), id: item});
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
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
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
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <>
          {supplierArrivalLine != null &&
            supplierArrival.statusSelect !== StockMove.status.Realized && (
              <Button
                title={I18n.t('Base_Validate')}
                onPress={handleValidate}
              />
            )}
          {supplierArrivalLine == null &&
            supplierArrival.statusSelect !== StockMove.status.Realized && (
              <Button title={I18n.t('Base_Add')} onPress={handleAddLine} />
            )}
        </>
      }
      loading={loadingProductFromId || loadingSupplierCatalog}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            lineRef={supplierArrivalLine?.name}
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
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={product?.picture}
          code={product?.code}
          name={product?.name}
          trackingNumber={trackingNumber?.trackingNumberSeq}
        />
        {supplierProductInfo == null ||
        Object.keys(supplierProductInfo).length === 0 ? null : (
          <View style={styles.supplierInfoContainer}>
            <Icon name="info-circle" size={20} />
            <View style={styles.supplierInfo}>
              <Text style={styles.text_important}>
                {I18n.t('Stock_SupplierCatalog')}
              </Text>
              <Text>{`${I18n.t('Stock_Name')} : ${
                supplierProductInfo?.productSupplierName
              }`}</Text>
              <Text>{`${I18n.t('Stock_Code')} : ${
                supplierProductInfo?.productSupplierCode
              }`}</Text>
            </View>
          </View>
        )}
        <QuantityCard
          labelQty={I18n.t('Stock_ReceivedQty')}
          defaultValue={parseFloat(realQty).toFixed(2)}
          onValueChange={handleQtyChange}
          editable={supplierArrival.statusSelect !== StockMove.status.Realized}>
          <View style={styles.headerQuantityCard}>
            <Text style={styles.text}>
              {`${I18n.t('Stock_AskedQty')} : ${parseFloat(
                supplierArrivalLine != null ? supplierArrivalLine.qty : 0,
              ).toFixed(2)} ${
                supplierArrivalLine != null
                  ? supplierArrivalLine?.unit?.name
                  : product?.unit?.name
              }`}
            </Text>
            {supplierArrivalLine != null && (
              <View>
                {parseFloat(supplierArrivalLine.qty) !==
                  parseFloat(supplierArrivalLine.realQty) && (
                  <Badge
                    title={I18n.t('Stock_Status_Incomplete')}
                    color={Colors.cautionColor}
                  />
                )}
                {parseFloat(supplierArrivalLine.qty) ===
                  parseFloat(supplierArrivalLine.realQty) && (
                  <Badge
                    title={I18n.t('Stock_Status_Complete')}
                    color={Colors.primaryColor}
                  />
                )}
              </View>
            )}
          </View>
        </QuantityCard>
        <Picker
          title={I18n.t('Stock_Conformity')}
          onValueChange={item => handleConformityChange(item)}
          defaultValue={conformity?.id}
          listItems={StockMove.getConformitySelection(I18n)}
          labelField="name"
          valueField="id"
          disabled={supplierArrival?.statusSelect === StockMove.status.Realized}
          disabledValue={conformity?.name}
        />
      </ScrollView>
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
  headerQuantityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SupplierArrivalLineDetailScreen;
