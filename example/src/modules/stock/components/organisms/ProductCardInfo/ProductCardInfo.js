import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '@aos-mobile/ui';
import {AOSImage} from '@aos-mobile/core';
import {ProductCardDetails} from '@/modules/stock/components/molecules';

const ProductCardInfo = ({
  name,
  code,
  pictureId = null,
  trackingNumber = null,
  locker = null,
  onPress = () => {},
}) => {
  return (
    <View style={styles.container}>
      <AOSImage
        generalStyle={styles.imageStyle}
        imageSize={styles.imageSize}
        resizeMode="contain"
        metaFileId={pictureId}
        defaultIconSize={60}
      />
      <ProductCardDetails style={styles.textContainer} onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.code}>{code}</Text>
        {trackingNumber && (
          <View style={styles.labelText}>
            <Icon
              name="qrcode"
              FontAwesome5={false}
              size={15}
              style={styles.picto}
            />
            <Text style={styles.code}>{trackingNumber}</Text>
          </View>
        )}
        {locker && (
          <View style={styles.labelText}>
            <Icon name="map-marker-alt" size={15} style={styles.picto} />
            <Text style={styles.code}>{locker}</Text>
          </View>
        )}
      </ProductCardDetails>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  imageSize: {
    height: 60,
    width: 60,
  },
  imageStyle: {
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
  labelText: {
    flexDirection: 'row',
  },
  picto: {
    marginRight: 5,
  },
});

export default ProductCardInfo;
