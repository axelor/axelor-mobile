import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import {useThemeColor} from '@/features/themeSlice';
import {useSelector} from 'react-redux';

const ProductCard = ({
  style,
  name,
  code,
  pictureId,
  availableStock,
  onPress,
}) => {
  const {baseUrl} = useSelector(state => state.auth);
  const Colors = useThemeColor();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          {pictureId == null ? (
            <Icon
              name="camera"
              color={Colors.secondaryColor_light}
              size={60}
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
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
            <Badge
              color={
                availableStock == null
                  ? Colors.secondaryColor_light
                  : availableStock > 0
                  ? Colors.primaryColor_light
                  : Colors.errorColor_light
              }
              title={
                availableStock == null
                  ? 'Calculing...'
                  : availableStock > 0
                  ? 'Available'
                  : 'Unavailable'
              }
            />
          </View>
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
});

export default ProductCard;
