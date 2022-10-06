import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Chip,
  ChipSelect,
  Icon,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {ScannerAutocompleteSearch, useTranslator} from '@aos-mobile/core';
import {
  ManufacturingOrderHeader,
  ConsumedProductGlobalCard,
} from '@/modules/manufacturing/components/organisms';
import {fetchConsumedProducts} from '../../../features/consumedProductsSlice';
import {filterList} from '@/utils/filters';
import {fetchChildrenOfManufacturingOrder} from '@/modules/manufacturing/features/manufacturingOrderSlice';

const productScanKey = 'product_manufacturing-order-consumed-product-list';
const IS_INFINITE_SCROLL_ENABLED = false;

const ConsumedProductListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const {loading, consumedProductList} = useSelector(
    state => state.consumedProducts,
  );
  const {childrenManufOrders} = useSelector(state => state.manufacturingOrder);
  const [missingStatus, setMissingStatus] = useState(false);
  const [partiallyStatus, setPartiallyStatus] = useState(false);
  const [finishedStatus, setFinishedStatus] = useState(false);
  const [filteredList, setFilteredList] = useState(consumedProductList);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchChildrenOfManufacturingOrder({parentManufOrderId: manufOrder?.id}),
    );
  }, [dispatch, manufOrder?.id]);

  const fetchCnsumedProductsAPI = useCallback(() => {
    dispatch(
      fetchConsumedProducts({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
  }, [dispatch, manufOrder]);

  const handleMissingStatus = () => {
    if (!missingStatus && (partiallyStatus || finishedStatus)) {
      setPartiallyStatus(false);
      setFinishedStatus(false);
    }
    setMissingStatus(!missingStatus);
  };

  const handlePartiallyStatus = () => {
    if (!partiallyStatus && (missingStatus || finishedStatus)) {
      setMissingStatus(false);
      setFinishedStatus(false);
    }
    setPartiallyStatus(!partiallyStatus);
  };

  const handleFinishedStatus = () => {
    if (!finishedStatus && (missingStatus || partiallyStatus)) {
      setMissingStatus(false);
      setPartiallyStatus(false);
    }
    setFinishedStatus(!finishedStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (missingStatus) {
          return list.filter(item => item.missingQty > 0);
        } else if (partiallyStatus) {
          return list.filter(item => item.plannedQty > item.realQty);
        } else if (finishedStatus) {
          return list.filter(item => item.plannedQty <= item.realQty);
        } else {
          return list;
        }
      }
    },
    [missingStatus, partiallyStatus, finishedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(filterList(consumedProductList, 'productName', product)),
    );
  }, [filterOnStatus, consumedProductList, product]);

  const handleViewItem = item => {
    navigation.navigate('ConsumedProductDetailsScreen', {
      manufOrder: manufOrder,
      consumedProduct: item,
    });
  };

  const handleViewSubOF = () => {
    navigation.navigate('ChildrenManufOrderListScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleAddProduct = () => {
    navigation.navigate('ConsumedProductSelectProductScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleViewAvailability = item => {
    navigation.navigate('ProductStockLocationDetailsScreen', {
      product: {id: item.productId, version: item.version},
      companyId: manufOrder?.company?.id,
    });
  };

  return (
    <Screen listScreen={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            <ManufacturingOrderHeader
              parentMO={manufOrder.parentMO}
              reference={manufOrder.manufOrderSeq}
              status={manufOrder.statusSelect}
              priority={manufOrder.prioritySelect}
            />
            <View style={styles.titleContainer}>
              <Text>{I18n.t('Manufacturing_ConsumedProduct')}</Text>
              <Icon
                name="plus"
                size={20}
                color={Colors.primaryColor}
                touchable={true}
                onPress={handleAddProduct}
              />
            </View>
            <ScannerAutocompleteSearch
              objectList={consumedProductList}
              onChangeValue={() => {}}
              fetchData={setProduct}
              displayValue={item => item?.productName}
              placeholder={I18n.t('Manufacturing_Product')}
              scanKeySearch={productScanKey}
              oneFilter={true}
            />
          </>
        }
        chipComponent={
          <ChipSelect>
            <Chip
              selected={missingStatus}
              title={I18n.t('Manufacturing_Status_Missing')}
              onPress={handleMissingStatus}
              selectedColor={{
                backgroundColor: Colors.errorColor_light,
                borderColor: Colors.errorColor,
              }}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
            <Chip
              selected={partiallyStatus}
              title={I18n.t('Manufacturing_Status_Planned')}
              onPress={handlePartiallyStatus}
              selectedColor={{
                backgroundColor: Colors.plannedColor_light,
                borderColor: Colors.plannedColor,
              }}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
            <Chip
              selected={finishedStatus}
              title={I18n.t('Manufacturing_Status_Finished')}
              onPress={handleFinishedStatus}
              selectedColor={{
                backgroundColor: Colors.primaryColor_light,
                borderColor: Colors.primaryColor,
              }}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <ConsumedProductGlobalCard
            productName={item?.productName}
            plannedQty={item?.plannedQty}
            consumedQty={item?.realQty}
            missingQty={item?.missingQty}
            availableQty={item?.availableStock}
            unitName={item?.unit?.unitName}
            trackingNumber={item?.trackingNumber?.trackingNumberSeq}
            onPress={() => handleViewItem(item)}
            onLocationPress={() => handleViewAvailability(item)}
            isSubOF={
              childrenManufOrders != null && childrenManufOrders?.length > 0
            }
            onSubOfPress={handleViewSubOF}
          />
        )}
        fetchData={fetchCnsumedProductsAPI}
        isListEnd={!IS_INFINITE_SCROLL_ENABLED}
        filter={IS_INFINITE_SCROLL_ENABLED}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
});

export default ConsumedProductListScreen;
