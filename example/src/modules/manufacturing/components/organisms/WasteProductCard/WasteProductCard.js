import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, LabelText, Text} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const WasteProductCard = ({
  style,
  productName,
  wasteQty,
  unitName,
  onPress = () => {},
}) => {
  const I18n = useTranslator();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.cardContainer, style]}>
        <Text style={styles.txtImportant}>{productName}</Text>
        <LabelText
          title={`${I18n.t('Manufacturing_WasteQty')}:`}
          value={`${
            wasteQty == null
              ? parseFloat(0).toFixed(2)
              : parseFloat(wasteQty).toFixed(2)
          } ${unitName != null ? unitName : ''}`}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 12,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 15,
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WasteProductCard;
