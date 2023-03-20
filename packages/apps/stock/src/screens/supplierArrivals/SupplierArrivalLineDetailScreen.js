/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  HeaderContainer,
  Icon,
  Picker,
  Screen,
  ScrollView,
  Text,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  StockMoveHeader,
  ProductCardInfo,
  SupplierArrivalLineDetailFixedItems,
  SupplierArrivalLineDetailQuantityCard,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';
import StockMove from '../../types/stock-move';

const SupplierArrivalLineDetailScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const trackingNumber =
    supplierArrivalLine != null
      ? supplierArrivalLine.trackingNumber
      : route.params.trackingNumber;
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

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <SupplierArrivalLineDetailFixedItems
          conformity={conformity}
          navigation={navigation}
          realQty={realQty}
          supplierArrival={supplierArrival}
          supplierArrivalLine={supplierArrivalLine}
          trackingNumber={trackingNumber}
        />
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
        <SupplierArrivalLineDetailQuantityCard
          realQty={realQty}
          setRealQty={setRealQty}
          supplierArrival={supplierArrival}
          supplierArrivalLine={supplierArrivalLine}
        />
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
