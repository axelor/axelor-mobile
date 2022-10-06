import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
  ProducedProductCard,
} from '@/modules/manufacturing/components/organisms';
import {fetchProducedProducts} from '../../../features/producedProductsSlice';
import {filterList} from '@/utils/filters';

const productScanKey = 'product_manufacturing-order-produced-product-list';
const IS_INFINITE_SCROLL_ENABLED = false;

const ProducedProductListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const {loading, producedProductList} = useSelector(
    state => state.producedProducts,
  );
  const [plannedStatus, setPlannedStatus] = useState(false);
  const [realizedStatus, setRealizedStatus] = useState(false);
  const [filteredList, setFilteredList] = useState(producedProductList);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const fetchProducedProductsAPI = useCallback(() => {
    dispatch(
      fetchProducedProducts({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
  }, [dispatch, manufOrder]);

  const handlePlannedStatus = () => {
    if (!plannedStatus && realizedStatus) {
      setRealizedStatus(false);
    }
    setPlannedStatus(!plannedStatus);
  };

  const handleRealizedStatus = () => {
    if (!realizedStatus && plannedStatus) {
      setPlannedStatus(false);
    }
    setRealizedStatus(!realizedStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (plannedStatus) {
          return list.filter(item => item?.plannedQty > item?.realQty);
        } else if (realizedStatus) {
          return list.filter(item => item?.plannedQty <= item?.realQty);
        } else {
          return list;
        }
      }
    },
    [plannedStatus, realizedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(filterList(producedProductList, 'productName', product)),
    );
  }, [filterOnStatus, producedProductList, product]);

  const handleViewItem = item => {
    navigation.navigate('ProducedProductDetailsScreen', {
      manufOrder: manufOrder,
      producedProduct: item,
    });
  };

  const handleAddProduct = () => {
    navigation.navigate('ProducedProductSelectProductScreen', {
      manufOrder: manufOrder,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="dumpster"
          color={Colors.primaryColor}
          size={24}
          style={styles.action}
          touchable={true}
          onPress={() => {
            navigation.navigate('WasteProductListScreen', {
              manufOrder: manufOrder,
            });
          }}
        />
      ),
    });
  }, [Colors, manufOrder, navigation]);

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
              <Text>{I18n.t('Manufacturing_ProducedProduct')}</Text>
              <Icon
                name="plus"
                size={20}
                color={Colors.primaryColor}
                touchable={true}
                onPress={handleAddProduct}
              />
            </View>
            <ScannerAutocompleteSearch
              objectList={producedProductList}
              onChangeValue={() => {}}
              fetchData={setProduct}
              displayValue={item => item?.productName}
              placeholder={I18n.t('Manufacturing_Product')}
              scanKeySearch={productScanKey}
            />
          </>
        }
        chipComponent={
          <ChipSelect>
            <Chip
              selected={plannedStatus}
              title={I18n.t('Manufacturing_Status_Planned')}
              onPress={handlePlannedStatus}
              selectedColor={{
                backgroundColor: Colors.plannedColor_light,
                borderColor: Colors.plannedColor,
              }}
            />
            <Chip
              selected={realizedStatus}
              title={I18n.t('Manufacturing_Status_Realized')}
              onPress={handleRealizedStatus}
              selectedColor={{
                backgroundColor: Colors.primaryColor_light,
                borderColor: Colors.primaryColor,
              }}
            />
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <ProducedProductCard
            style={styles.item}
            productName={item?.productName}
            plannedQty={item?.plannedQty}
            producedQty={item?.realQty}
            unitName={item?.unit?.unitName}
            trackingNumberSeq={item?.trackingNumber?.trackingNumberSeq}
            onPress={() => handleViewItem(item)}
          />
        )}
        fetchData={fetchProducedProductsAPI}
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
  item: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  action: {
    marginRight: 15,
  },
});

export default ProducedProductListScreen;
