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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen, ScrollView, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  ProductCharacteristics,
  ProductFixedItems,
  ProductPacking,
  ProductSmallPropertyCardList,
} from '../../components';

const ProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const product = route.params.product;
  const {mobileSettings} = useSelector(state => state.config);

  const navigateToImageProduct = () => {
    navigation.navigate('ProductImageScreen', {product: product});
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Product"
          modelId={product.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
          attachedFileScreenTitle={product.name}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, product]);
  return (
    <Screen
      fixedItems={
        <ProductFixedItems navigation={navigation} product={product} />
      }>
      <ScrollView>
        <ProductCharacteristics
          onPressImage={() => navigateToImageProduct()}
          picture={product?.picture}
          category={product.productCategory?.name}
          prototype={product.isPrototype}
          unrenewed={product.isUnrenewed}
          procurMethod={product.procurementMethodSelect}
          code={product.code}
          name={product.name}
          style={styles.item}
        />
        <View style={styles.lineContainer}>
          <View style={styles.lineStyle} />
        </View>
        <ProductSmallPropertyCardList product={product} />
        <ProductPacking product={product} />
        <NotesCard
          title={I18n.t('Base_Description')}
          data={product.description}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  description: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'column',
    marginTop: '2%',
  },
  item: {
    borderRadius: 0,
    elevation: 0,
  },
  lineContainer: {
    alignItems: 'center',
  },
  lineStyle: {
    borderWidth: 0.7,
    width: 280,
  },
});

export default ProductDetailsScreen;
