import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, Icon, LabelText, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const ProductStockLocationCard = ({
  stockLocationName,
  unit,
  realQty,
  futureQty,
  availability,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const container = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={container}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Icon name="warehouse" size={18} style={styles.icon} />
          <Text>{stockLocationName}</Text>
        </View>
        <LabelText
          title={`${I18n.t('Stock_RealQty')} :`}
          value={`${realQty} ${unit}`}
        />
        <LabelText
          title={`${I18n.t('Stock_FutureQty')} :`}
          value={`${futureQty} ${unit}`}
        />
      </View>
      <View style={styles.badgeContainer}>
        <Badge
          title={
            availability == null
              ? `${I18n.t('Stock_Calculing')}...`
              : availability > 0
              ? I18n.t('Stock_Available')
              : I18n.t('Stock_Unavailable')
          }
          color={
            availability == null
              ? Colors.secondaryColor_light
              : availability > 0
              ? Colors.primaryColor_light
              : Colors.errorColor_light
          }
        />
      </View>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: Colors.secondaryColor_dark,
    borderBottomWidth: 1.5,
  });

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 3,
    flexDirection: 'column',
    marginBottom: 15,
  },
  badgeContainer: {
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default ProductStockLocationCard;
