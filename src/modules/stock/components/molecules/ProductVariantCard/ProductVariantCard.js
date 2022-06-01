import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Card, Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Badge} from '@/components/molecules';
import Colors from '@/types/colors';

function getAvailabilityColor(availability) {
  if (availability > 0) {
    return {
      backgroundColor: '#84DCB7',
      borderColor: '#3ECF8E',
    };
  } else {
    return {
      backgroundColor: 'rgba(229, 77, 29, 0.6)',
      borderColor: '#E54D1D',
    };
  }
}

const ProductVariantCard = ({
  style,
  name,
  code,
  attribut,
  picture,
  value,
  stockAvailability,
  onPress,
}) => {
  const Image_Http_URL = {
    uri: `http://wip-api-mobile-preview.cloud-sw1.axelor.io/ws/rest/com.axelor.meta.db.MetaFile/${picture?.id}/content/download/`,
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <Image
            resizeMode="contain"
            source={Image_Http_URL}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
          </View>
          <View>
            {stockAvailability > 0 ? (
              <Badge
                style={[
                  styles.statusBadge,
                  getAvailabilityColor(stockAvailability),
                ]}
                title="Available"
              />
            ) : (
              <Badge
                style={[
                  styles.statusBadge,
                  getAvailabilityColor(stockAvailability),
                ]}
                title="Not Available"
              />
            )}
          </View>
        </View>
        <View style={styles.attrView}>
          <View style={styles.textContainer}>
            <Text style={styles.attribute}>{attribut}</Text>
            <Text style={styles.attribute}>{value}</Text>
          </View>
          <Icon size={24} name="chevron-right" color={Colors.icon.light_grey} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  attrView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 15,
    width: 87,
    height: 22,
    borderWidth: 1.5,
    marginBottom: 2,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  attribute: {
    fontSize: 14,
    paddingVertical: 5,
  },
  code: {
    fontSize: 12,
  },
});

export default ProductVariantCard;
