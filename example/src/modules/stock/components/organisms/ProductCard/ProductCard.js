import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Badge, Card, Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {Image} from '@/components/molecules';

const ProductCard = ({
  style,
  name,
  code,
  pictureId,
  availableStock,
  onPress,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <Image
            generalStyle={styles.imageStyle}
            imageSize={styles.imageSize}
            resizeMode="contain"
            pictureId={pictureId}
            defaultIconSize={60}
          />
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
                  ? `${I18n.t('Stock_Calculing')}...`
                  : availableStock > 0
                  ? I18n.t('Stock_Available')
                  : I18n.t('Stock_Unavailable')
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
  imageSize: {
    height: 60,
    width: 60,
  },
  imageStyle: {
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
});

export default ProductCard;
