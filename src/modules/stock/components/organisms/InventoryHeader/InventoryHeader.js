import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import {formatDate} from '@/modules/stock/utils/formatters';
import {useThemeColor} from '@/features/themeSlice';
import Inventory from '@/modules/stock/types/inventory';
import useTranslator from '@/hooks/use-translator';

const InventoryHeader = ({reference, status, date, stockLocation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        <Text style={styles.text_important}>{reference}</Text>
        {date != null && (
          <Text style={styles.text_secondary}>
            {formatDate(date, 'MM/DD/YYYY')}
          </Text>
        )}
        {stockLocation && (
          <View style={styles.iconText}>
            <Icon name="warehouse" size={12} style={styles.icon} />
            <Text style={styles.text_secondary}>{stockLocation}</Text>
          </View>
        )}
      </View>
      <View style={styles.badgeContainer}>
        <Badge
          color={Inventory.getStatusColor(status, Colors).backgroundColor}
          title={Inventory.getStatus(status, I18n)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 24,
  },
  badgeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 32,
    flexDirection: 'row-reverse',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
  iconText: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default InventoryHeader;
