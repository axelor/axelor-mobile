import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Icon, Text} from '@/components/atoms';
import {ProductCardDetails} from '@/modules/stock/components/molecules';
import {useThemeColor} from '@/features/themeSlice';
import {useSelector} from 'react-redux';

const ProductCardInfo = ({
  name,
  code,
  pictureId = null,
  trackingNumber = null,
  locker = null,
  onPress = () => {},
}) => {
  const {baseUrl} = useSelector(state => state.auth);
  const Colors = useThemeColor();
  return (
    <View style={styles.container}>
      {pictureId == null ? (
        <Icon
          name="camera"
          size={60}
          color={Colors.secondaryColor_light}
          style={styles.icon}
        />
      ) : (
        <Image
          resizeMode="contain"
          source={{
            uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${pictureId}/content/download`,
          }}
          style={styles.image}
        />
      )}
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
  image: {
    height: 60,
    width: 60,
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
  icon: {
    marginRight: 30,
  },
  labelText: {
    flexDirection: 'row',
  },
  picto: {
    marginRight: 5,
  },
});

export default ProductCardInfo;
