import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import SmallPropertyCard from '../SmallPropertyCard/SmallPropertyCard';

const ProductPacking = ({product}) => {
  const I18n = useTranslator();
  return (
    <View style={styles.containerPack}>
      <Text style={styles.titles}>PACKING</Text>
      <View style={styles.packing}>
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_Length')}
          value={product.length}
          unit={
            product.lengthUnit == null
              ? I18n.t('Stock_Meters')
              : product.lengthUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_Width')}
          value={product.width}
          unit={
            product.lengthUnit == null
              ? I18n.t('Stock_Meters')
              : product.lengthUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_Height')}
          value={product.height}
          unit={
            product.lengthUnit == null
              ? I18n.t('Stock_Meters')
              : product.lengthUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_NetMass')}
          value={product.netMass}
          unit={
            product.massUnit == null
              ? I18n.t('Stock_Kilograms')
              : product.massUnit?.name
          }
          interactive={true}
        />
        <SmallPropertyCard
          style={styles.packingCard}
          title={I18n.t('Stock_GrossMass')}
          value={product.grossMass}
          unit={
            product.massUnit == null
              ? I18n.t('Stock_Kilograms')
              : product.massUnit?.name
          }
          interactive={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPack: {
    marginHorizontal: '5%',
    marginTop: 18,
  },
  titles: {
    marginHorizontal: '5%',
  },
  packingCard: {
    marginHorizontal: '2%',
    marginTop: 5,
    minWidth: '28%',
    marginBottom: '2%',
  },
  packing: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductPacking;
