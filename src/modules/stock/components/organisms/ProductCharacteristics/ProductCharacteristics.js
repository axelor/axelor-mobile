import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Product from '@/modules/stock/types/product';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const ProductCharacteristics = ({
  style,
  pictureURI,
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
        {pictureURI == null ? (
          <Icon
            name="camera"
            size={120}
            color={Colors.secondaryColor_light}
            style={styles.icon}
          />
        ) : (
          <TouchableOpacity onPress={onPressImage}>
            <Image
              resizeMode="contain"
              source={pictureURI}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
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
  image: {
    width: 120,
    height: 120,
    marginRight: 32,
  },
  icon: {
    marginRight: 30,
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
