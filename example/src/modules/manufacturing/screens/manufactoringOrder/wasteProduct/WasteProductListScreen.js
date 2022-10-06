import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
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
  WasteProductCard,
} from '@/modules/manufacturing/components/organisms';
import {filterList} from '@/utils/filters';
import {fetchWasteProducts} from '@/modules/manufacturing/features/wasteProductsSlice';

const productScanKey = 'product_manufacturing-order-waste-product-list';
const IS_INFINITE_SCROLL_ENABLED = false;

const WasteProductListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const {loading, wasteProductList} = useSelector(state => state.wasteProducts);
  const [filteredList, setFilteredList] = useState(wasteProductList);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const fetchWasteProductsAPI = useCallback(
    page => {
      if (
        manufOrder?.wasteProdProductList != null &&
        manufOrder?.wasteProdProductList.length > 0
      ) {
        dispatch(
          fetchWasteProducts({
            wasteProdProductList: manufOrder?.wasteProdProductList,
            page: page,
          }),
        );
      }
    },
    [dispatch, manufOrder],
  );

  useEffect(() => {
    setFilteredList(filterList(wasteProductList, 'productName', product));
  }, [wasteProductList, product]);

  const handleViewItem = item => {
    navigation.navigate('WasteProductDetailsScreen', {
      manufOrder: manufOrder,
      wasteProduct: item,
    });
  };

  const handleAddProduct = () => {
    navigation.navigate('WasteProductSelectProductScreen', {
      manufOrder: manufOrder,
    });
  };

  return (
    <Screen
      listScreen={true}
      fixedItems={<Button title={I18n.t('Base_Declare')} onPress={() => {}} />}>
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
              <Text>{I18n.t('Manufacturing_WasteDeclaration')}</Text>
              <Icon
                name="plus"
                size={20}
                color={Colors.primaryColor}
                touchable={true}
                onPress={handleAddProduct}
              />
            </View>
            <ScannerAutocompleteSearch
              objectList={wasteProductList}
              onChangeValue={() => {}}
              fetchData={setProduct}
              displayValue={item => item?.productName}
              placeholder={I18n.t('Manufacturing_Product')}
              scanKeySearch={productScanKey}
              oneFilter={true}
              isFocus={true}
            />
          </>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <WasteProductCard
            style={styles.item}
            productName={item?.product?.fullName}
            wasteQty={item?.qty}
            unitName={item?.unit?.name}
            onPress={() => handleViewItem(item)}
          />
        )}
        fetchData={fetchWasteProductsAPI}
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
});

export default WasteProductListScreen;
