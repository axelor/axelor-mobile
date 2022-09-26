import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge, Image} from '@/components/molecules';
import Product from '@/modules/stock/types/product';
import {useThemeColor} from '@aos-mobile/ui';
import useTranslator from '@/hooks/use-translator';

const ProductCharacteristics = ({
  style,
  pictureId,
  onPressImage,
  name,
  code,
  category,
  procurMethod,
  prototype,
  unrenewed,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPressImage}>
          <Image
            generalStyle={styles.imageStyle}
            imageSize={styles.imageSize}
            resizeMode="contain"
            pictureId={pictureId}
            defaultIconSize={120}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.code}>{code}</Text>
        </View>
      </View>
      <View style={styles.states}>
        {category && (
          <Badge color={Colors.primaryColor_light} title={category} />
        )}
        {procurMethod && (
          <Badge
            color={Colors.plannedColor_light}
            title={Product.getProcurementMethod(procurMethod, I18n)}
          />
        )}
        {prototype && (
          <Badge
            color={Colors.priorityColor_light}
            title={I18n.t('Stock_Prototype')}
          />
        )}
        {unrenewed && (
          <Badge
            color={Colors.cautionColor_light}
            title={I18n.t('Stock_Unrenewed')}
          />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: null,
  },
  content: {
    flexDirection: 'row',
  },
  states: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageSize: {
    height: 120,
    width: 120,
  },
  imageStyle: {
    marginRight: 32,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCharacteristics;
