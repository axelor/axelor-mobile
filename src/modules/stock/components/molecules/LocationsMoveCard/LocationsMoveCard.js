import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const LocationsMoveCard = ({
  style,
  fromStockLocation,
  toStockLocation,
  editable,
  onPressFrom,
  onPressTo,
}) => {
  return (
    <View style={[styles.container, style]}>
      {editable ? (
        <TouchableOpacity onPress={onPressFrom} activeOpacity={0.9}>
          <View style={[styles.card, styles.editableCard]}>
            <Text numberOfLines={1} style={styles.text}>
              {fromStockLocation}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          <Text numberOfLines={1} style={styles.text}>
            {fromStockLocation}
          </Text>
        </View>
      )}
      <Icon name="chevron-right" style={styles.icon} />
      {editable ? (
        <TouchableOpacity onPress={onPressTo} activeOpacity={0.9}>
          <View style={[styles.card, styles.editableCard]}>
            <Text numberOfLines={1} style={styles.text}>
              {toStockLocation}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          <Text numberOfLines={1} style={styles.text}>
            {toStockLocation}
          </Text>
        </View>
      )}
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
  editableCard: {
    paddingVertical: '1%',
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.41,
    height: Dimensions.get('window').height * 0.05,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: '4%',
    fontSize: Dimensions.get('window').width * 0.05,
    color: '#3ECF8E',
  },
});

export default LocationsMoveCard;
