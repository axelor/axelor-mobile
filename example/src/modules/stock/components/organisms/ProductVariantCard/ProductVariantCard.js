import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Badge, Image} from '@/components/molecules';
import Product from '@/modules/stock/types/product';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const ProductVariantCard = ({
  style,
  name,
  code,
  attributesList,
  picture,
  stockAvailability,
  onPress,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const attr1 = attributesList?.attributes[0];
  const attr2 = attributesList?.attributes[1];
  const attr3 = attributesList?.attributes[2];
  const attr4 = attributesList?.attributes[3];
  const attr5 = attributesList?.attributes[4];

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={style}>
        <View style={styles.content}>
          <Image
            generalStyle={styles.imageStyle}
            imageSize={styles.imageSize}
            resizeMode="contain"
            pictureId={picture?.id}
            defaultIconSize={40}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
          </View>
          <Badge
            color={
              stockAvailability > 0
                ? Colors.primaryColor_light
                : Colors.errorColor_light
            }
            title={
              stockAvailability > 0
                ? I18n.t('Stock_Available')
                : I18n.t('Stock_Unavailable')
            }
          />
        </View>
        <View style={styles.attrView}>
          {attributesList == null ? (
            <View style={styles.textContainer} />
          ) : (
            <View style={styles.textContainer}>
              {attr1 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr1.attrName} : ${attr1.attrValue} `}
                    {attr1.priceExtra >= 0 && attr1.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr1.applicationPriceSelect,
                          I18n,
                        )} : +${parseFloat(attr1.priceExtra)})`
                      : null}
                  </Text>
                </View>
              )}
              {attr2 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr2.attrName} : ${attr2.attrValue} `}
                    {attr2.priceExtra > 0 && attr2.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr2.applicationPriceSelect,
                          I18n,
                        )} : +${parseFloat(attr2.priceExtra)})`
                      : null}
                  </Text>
                </View>
              )}
              {attr3 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr3.attrName} : ${attr3.attrValue} `}
                    {attr3.priceExtra > 0 && attr3.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr3.applicationPriceSelect,
                          I18n,
                        )} : +${parseFloat(attr3.priceExtra)})`
                      : null}
                  </Text>
                </View>
              )}
              {attr4 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr4.attrName} : ${attr4.attrValue} `}
                    {attr4.priceExtra > 0 && attr4.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr4.applicationPriceSelect,
                          I18n,
                        )} : +${parseFloat(attr4.priceExtra)})`
                      : null}
                  </Text>
                </View>
              )}
              {attr5 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr5.attrName} : ${attr5.attrValue} `}
                    {attr5.priceExtra > 0 && attr5.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr5.applicationPriceSelect,
                          I18n,
                        )} : +${parseFloat(attr5.priceExtra)})`
                      : null}
                  </Text>
                </View>
              )}
            </View>
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  attrView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSize: {
    height: 40,
    width: 40,
  },
  imageStyle: {
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
  },
  code: {
    fontSize: 12,
  },
});

export default ProductVariantCard;
