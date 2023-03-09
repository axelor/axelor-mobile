import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import SmallPropertyCard from '../SmallPropertyCard/SmallPropertyCard';

const ProductSmallPropertyCardList = ({product}) => {
  const I18n = useTranslator();
  return (
    <>
      {product.unit ? (
        <View style={styles.stock}>
          <SmallPropertyCard
            style={styles.stockCard}
            title={I18n.t('Stock_Stock')}
            value={product.unit?.name}
          />
          <SmallPropertyCard
            style={styles.stockCard}
            title={I18n.t('Sale_Sale')}
            value={
              product.salesUnit ? product.salesUnit?.name : product.unit?.name
            }
          />
          <SmallPropertyCard
            style={styles.stockCard}
            title={I18n.t('Purchase_Purchase')}
            value={
              product.purchasesUnit
                ? product.purchasesUnit?.name
                : product.unit?.name
            }
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  stockCard: {
    marginHorizontal: '1.5%',
    minWidth: '20%',
  },
  stock: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductSmallPropertyCardList;
