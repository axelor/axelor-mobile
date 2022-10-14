import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Picker,
  Screen,
  ScrollView,
  HeaderContainer,
  Text,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {ManufacturingOrderHeader} from '@/modules/manufacturing/components/organisms';
import {
  ProductCardInfo,
  QuantityCard,
} from '@/modules/stock/components/organisms';
import {fetchUnit} from '@/modules/stock/features/unitSlice';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';
import ManufacturingOrder from '@/modules/manufacturing/types/manufacturing-order';

const WasteProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const wasteProduct = route.params.wasteProduct;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = wasteProduct ? productFromId : route.params.product;
  const {unitList} = useSelector(state => state.unit);
  const [unit, setUnit] = useState(wasteProduct ? wasteProduct?.unit : null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit());
    if (wasteProduct != null) {
      dispatch(fetchProductWithId(wasteProduct?.product?.id));
    }
  }, [wasteProduct, dispatch]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<Button title={I18n.t('Base_Save')} onPress={() => {}} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
      />
      <ScrollView>
        {(product || !loadingProductFromId) && (
          <ProductCardInfo
            name={product.name}
            code={product.code}
            pictureId={product.picture?.id}
            onPress={handleShowProduct}
          />
        )}
        <QuantityCard
          labelQty={I18n.t('Manufacturing_WasteQty')}
          defaultValue={parseFloat(wasteProduct ? wasteProduct.qty : 0)
            .toFixed(2)
            .toString()}
          editable={
            manufOrder.statusSelect < ManufacturingOrder.status.Finished
          }
          onValueChange={() => {}}
        />
        {manufOrder.statusSelect >= ManufacturingOrder.status.Finished ? (
          <View>
            <View style={styles.reasonTitle}>
              <Text>{I18n.t('Stock_Unit')}</Text>
            </View>
            <Card style={styles.infosCard}>
              <Text>{unit.name}</Text>
            </Card>
          </View>
        ) : (
          <Picker
            style={styles.picker}
            styleTxt={unit?.id === null ? styles.picker_empty : null}
            title={I18n.t('Stock_Unit')}
            onValueChange={setUnit}
            defaultValue={unit?.id}
            listItems={unitList}
            labelField="name"
            valueField="id"
          />
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  infosCard: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  reasonTitle: {
    marginHorizontal: 20,
  },
  picker: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  picker_empty: {
    color: 'red',
  },
});

export default WasteProductDetailsScreen;
