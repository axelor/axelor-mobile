import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Card, Screen, Text} from '@aos-mobile/ui';
import {DropdownMenuItem} from '@/components/molecules';
import {DropdownMenu} from '@/components/organisms';
import {
  ProductCharacteristics,
  SmallPropertyCard,
} from '@/modules/stock/components/organisms/';
import RenderHtml from 'react-native-render-html';
import {useThemeColor} from '@aos-mobile/ui';
import useTranslator from '@/hooks/use-translator';

const ProductDetailsScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const product = route.params.product;

  const showProductVariables = () => {
    navigation.navigate('ProductListVariantScreen', {product: product});
  };
  const navigateToImageProduct = () => {
    navigation.navigate('ProductImageScreen', {product: product});
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DropdownMenu>
          <DropdownMenuItem
            placeholder={I18n.t('Stock_AttachedFiles')}
            onPress={() =>
              navigation.navigate('ProductAttachedFilesScreen', {
                product: product,
              })
            }
          />
        </DropdownMenu>
      ),
    });
  }, [I18n, navigation, product]);

  const [widthNotes, setWidthNotes] = useState();
  const PERCENTAGE_WIDTH_NOTES = 0.95;

  return (
    <Screen
      fixedItems={
        product.productVariant != null && (
          <Button
            onPress={() => showProductVariables()}
            title={I18n.t('Stock_Variants')}
          />
        )
      }>
      <ScrollView>
        <ProductCharacteristics
          onPressImage={() => navigateToImageProduct()}
          pictureId={product?.picture?.id}
          category={product.productCategory?.name}
          prototype={product.isPrototype}
          unrenewed={product.isUnrenewed}
          procurMethod={product.procurementMethodSelect}
          code={product.code}
          name={product.name}
          style={styles.item}
        />
        <View style={styles.lineContainer}>
          <View style={styles.lineStyle} />
        </View>
        {product.unit ? (
          <View style={styles.stock}>
            <SmallPropertyCard
              style={styles.stockCard}
              title={I18n.t('Stock_Stock')}
              value={product.unit?.name}
            />
            <SmallPropertyCard
              style={styles.stockCard}
              title={I18n.t('Sale_Sale')}
              value={
                product.salesUnit ? product.salesUnit?.name : product.unit?.name
              }
            />
            <SmallPropertyCard
              style={styles.stockCard}
              title={I18n.t('Purchase_Purchase')}
              value={
                product.purchasesUnit
                  ? product.purchasesUnit?.name
                  : product.unit?.name
              }
            />
          </View>
        ) : null}
        <View style={styles.containerPack}>
          <Text style={styles.titles}>PACKING</Text>
          <View style={styles.packing}>
            <SmallPropertyCard
              style={styles.packingCard}
              title={I18n.t('Stock_Length')}
              value={product.length}
              unit={
                product.lengthUnit == null
                  ? I18n.t('Stock_Meters')
                  : product.lengthUnit?.name
              }
              interactive={true}
            />
            <SmallPropertyCard
              style={styles.packingCard}
              title={I18n.t('Stock_Width')}
              value={product.width}
              unit={
                product.lengthUnit == null
                  ? I18n.t('Stock_Meters')
                  : product.lengthUnit?.name
              }
              interactive={true}
            />
            <SmallPropertyCard
              style={styles.packingCard}
              title={I18n.t('Stock_Height')}
              value={product.height}
              unit={
                product.lengthUnit == null
                  ? I18n.t('Stock_Meters')
                  : product.lengthUnit?.name
              }
              interactive={true}
            />
            <SmallPropertyCard
              style={styles.packingCard}
              title={I18n.t('Stock_NetMass')}
              value={product.netMass}
              unit={
                product.massUnit == null
                  ? I18n.t('Stock_Kilograms')
                  : product.massUnit?.name
              }
              interactive={true}
            />
            <SmallPropertyCard
              style={styles.packingCard}
              title={I18n.t('Stock_GrossMass')}
              value={product.grossMass}
              unit={
                product.massUnit == null
                  ? I18n.t('Stock_Kilograms')
                  : product.massUnit?.name
              }
              interactive={true}
            />
          </View>
        </View>
        {product.description && (
          <View style={styles.description}>
            <Text style={styles.titles}>{I18n.t('Base_Description')}</Text>
            <Card
              style={styles.notes}
              onLayout={event => {
                const {width} = event.nativeEvent.layout;
                setWidthNotes(width);
              }}>
              <RenderHtml
                source={{html: product.description}}
                contentWidth={widthNotes * PERCENTAGE_WIDTH_NOTES}
                baseStyle={{color: Colors.text}}
              />
            </Card>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignContent: 'center',
    height: '100%',
  },
  containerPack: {
    marginHorizontal: '5%',
    marginTop: 18,
  },
  stockCard: {
    marginHorizontal: '1.5%',
    minWidth: '20%',
  },
  description: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'column',
    marginTop: '2%',
  },
  notes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  titles: {
    marginHorizontal: '5%',
  },
  packingCard: {
    marginHorizontal: '2%',
    marginTop: 5,
    minWidth: '28%',
    marginBottom: '2%',
  },
  packing: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stock: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    borderRadius: 0,
    elevation: 0,
  },
  lineContainer: {
    alignItems: 'center',
  },
  lineStyle: {
    borderWidth: 0.7,
    width: 280,
  },
});

export default ProductDetailsScreen;
