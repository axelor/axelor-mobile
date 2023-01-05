import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, LabelText, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface WasteProductCardProps {
  style?: any;
  productName: string;
  wasteQty: number;
  unitName?: string;
  onPress: () => void;
}

const WasteProductCard = ({
  style,
  productName,
  wasteQty,
  unitName,
  onPress,
}: WasteProductCardProps) => {
  const I18n = useTranslator();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.cardContainer, style]}>
        <Text style={styles.txtImportant}>{productName}</Text>
        <LabelText
          title={`${I18n.t('Manufacturing_WasteQty')}:`}
          value={`${
            wasteQty == null
              ? parseFloat('0').toFixed(2)
              : parseFloat(wasteQty.toString()).toFixed(2)
          } ${unitName != null ? unitName : ''}`}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WasteProductCard;
