import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

interface LocationsMoveCardProps {
  style?: any;
  fromStockLocation: string;
  toStockLocation: string;
  isLockerCard?: boolean;
  touchableFrom?: boolean;
  editIconFrom?: boolean;
  touchableTo?: boolean;
  editIconTo?: boolean;
  onPressFrom?: () => void;
  onPressTo?: () => void;
}

const LocationsMoveCard = ({
  style,
  fromStockLocation,
  toStockLocation,
  isLockerCard = false,
  touchableFrom = false,
  editIconFrom = false,
  touchableTo = false,
  editIconTo = false,
  onPressFrom = () => {},
  onPressTo = () => {},
}: LocationsMoveCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={onPressFrom}
          activeOpacity={0.9}
          style={styles.editableCard}
          disabled={!touchableFrom}>
          <View style={styles.editableText}>
            {isLockerCard && (
              <Text style={styles.text}>{I18n.t('Stock_FromLocker')}</Text>
            )}
            <Text numberOfLines={3} style={styles.text}>
              {fromStockLocation}
            </Text>
          </View>
          {editIconFrom && <Icon name="pencil-alt" size={14} />}
        </TouchableOpacity>
      </View>
      <Icon
        name="chevron-right"
        color={Colors.primaryColor}
        size={Dimensions.get('window').width * 0.05}
        style={styles.icon}
      />
      <View style={styles.card}>
        <TouchableOpacity
          onPress={onPressTo}
          activeOpacity={0.9}
          style={styles.editableCard}
          disabled={!touchableTo}>
          <View style={styles.editableText}>
            {isLockerCard && (
              <Text style={styles.text}>{I18n.t('Stock_ToLocker')}</Text>
            )}
            <Text numberOfLines={3} style={styles.text}>
              {toStockLocation}
            </Text>
          </View>
          {editIconTo && <Icon name="pencil-alt" size={14} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.41,
  },
  editableCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editableText: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  icon: {
    marginHorizontal: '4%',
  },
});

export default LocationsMoveCard;
