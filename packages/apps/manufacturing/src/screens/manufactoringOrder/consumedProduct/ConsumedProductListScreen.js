import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Chip,
  ChipSelect,
  Icon,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {areObjectsEquals} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  ConsumedProductGlobalCard,
} from '../../../components/organisms';
import {
  fetchConsumedProducts,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {ManufacturingOrder} from '../../../types';

const productScanKey = 'product_manufacturing-order-consumed-product-list';
const IS_INFINITE_SCROLL_ENABLED = false;

const ConsumedProductListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const {loadingConsumedProducts, consumedProductList} = useSelector(
    state => state.prodProducts,
  );
  const [missingStatus, setMissingStatus] = useState(false);
  const [partiallyStatus, setPartiallyStatus] = useState(false);
  const [finishedStatus, setFinishedStatus] = useState(false);
  const [filteredList, setFilteredList] = useState(consumedProductList);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const fetchConsumedProductsAPI = useCallback(() => {
    dispatch(
      fetchConsumedProducts({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
  }, [dispatch, manufOrder]);

  const updateConsumedProductQtyAPI = useCallback(
    (item, moreValue) => {
      dispatch(
        updateProdProductOfManufOrder({
          stockMoveLineVersion: item.stockMoveLineVersion,
          stockMoveLineId: item.stockMoveLineId,
          prodProductQty: parseFloat(item.realQty) + parseFloat(moreValue),
          type: 'consumed',
          manufOrderId: manufOrder?.id,
          manufOrderVersion: manufOrder?.version,
        }),
      );
    },
    [dispatch, manufOrder],
  );

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

  const filterOnProduct = useCallback((list, value) => {
    if (list == null || list?.length === 0) {
      return [];
    } else {
      if (value) {
        return list.filter(item => areObjectsEquals(item.productName, value));
      } else {
        return list;
      }
    }
  }, []);

  useEffect(() => {
    setFilteredList(
      filterOnStatus(filterOnProduct(consumedProductList, product)),
    );
  }, [filterOnStatus, consumedProductList, filterOnProduct, product]);

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
    <Screen removeSpaceOnTop={true}>
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
              {manufOrder?.statusSelect ===
                ManufacturingOrder.status.InProgress && (
                <Icon
                  name="plus"
                  size={20}
                  color={Colors.primaryColor.background}
                  touchable={true}
                  onPress={handleAddProduct}
                />
              )}
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
              selectedColor={Colors.errorColor}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
            <Chip
              selected={partiallyStatus}
              title={I18n.t('Manufacturing_Status_Planned')}
              onPress={handlePartiallyStatus}
              selectedColor={Colors.plannedColor}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
            <Chip
              selected={finishedStatus}
              title={I18n.t('Manufacturing_Status_Finished')}
              onPress={handleFinishedStatus}
              selectedColor={Colors.primaryColor}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loadingConsumedProducts}
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
            onMorePress={pressValue =>
              updateConsumedProductQtyAPI(item, pressValue)
            }
            disableMore={
              manufOrder?.statusSelect !== ManufacturingOrder.status.InProgress
            }
            onPress={() => handleViewItem(item)}
            onLocationPress={() => handleViewAvailability(item)}
            isSubOF={item.subManufOrderId != null}
            onSubOfPress={handleViewSubOF}
          />
        )}
        fetchData={fetchConsumedProductsAPI}
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
