import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '@/components/atoms';
import {Badge, LabelText} from '@/components/molecules';
import {ColorHook} from '@/themeStore';

const ProductStockLocationCard = ({
  stockLocationName,
  unit,
  realQty,
  futureQty,
  availability,
}) => {
  const Colors = ColorHook();
  const container = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={container}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Icon name="warehouse" size={18} style={styles.icon} />
          <Text>{stockLocationName}</Text>
        </View>
        <LabelText title="Real Quantity :" value={`${realQty} ${unit}`} />
        <LabelText title="Future Quantity :" value={`${futureQty} ${unit}`} />
      </View>
      <View style={styles.badgeContainer}>
        <Badge
          title={
            availability == null
              ? 'Calculing...'
              : availability > 0
              ? 'Available'
              : 'Unavailable'
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
