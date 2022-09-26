import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const LocationsMoveCard = ({
  style,
  fromStockLocation,
  toStockLocation,
  isLockerCard = false,
  editableFrom = false,
  editableTo = false,
  onPressFrom = () => {},
  onPressTo = () => {},
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.card}>
        {editableFrom ? (
          <TouchableOpacity
            onPress={onPressFrom}
            activeOpacity={0.9}
            style={styles.editableCard}>
            <View style={styles.editableText}>
              {isLockerCard && (
                <Text style={styles.text}>{I18n.t('Stock_FromLocker')}</Text>
              )}
              <Text numberOfLines={1} style={styles.text}>
                {fromStockLocation}
              </Text>
            </View>
            <Icon name="pencil-alt" size={14} />
          </TouchableOpacity>
        ) : (
          <View style={styles.editableText}>
            {isLockerCard && (
              <Text style={styles.text}>{I18n.t('Stock_FromLocker')}</Text>
            )}
            <Text numberOfLines={1} style={styles.text}>
              {fromStockLocation}
            </Text>
          </View>
        )}
      </View>
      <Icon
        name="chevron-right"
        color={Colors.primaryColor}
        size={Dimensions.get('window').width * 0.05}
        style={styles.icon}
      />
      <View style={styles.card}>
        {editableTo ? (
          <TouchableOpacity
            onPress={onPressTo}
            activeOpacity={0.9}
            style={styles.editableCard}>
            <View style={styles.editableText}>
              {isLockerCard && (
                <Text style={styles.text}>{I18n.t('Stock_ToLocker')}</Text>
              )}
              <Text numberOfLines={1} style={styles.text}>
                {toStockLocation}
              </Text>
            </View>
            <Icon name="pencil-alt" size={14} />
          </TouchableOpacity>
        ) : (
          <View style={styles.editableText}>
            {isLockerCard && (
              <Text style={styles.text}>{I18n.t('Stock_ToLocker')}</Text>
            )}
            <Text numberOfLines={1} style={styles.text}>
              {toStockLocation}
            </Text>
          </View>
        )}
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
    height: Dimensions.get('window').height * 0.05,
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
