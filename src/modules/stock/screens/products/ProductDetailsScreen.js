import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, Card, Screen, Text} from '@/components/atoms';
import {DropdownMenuItem} from '@/components/molecules';
import {DropdownMenu} from '@/components/organisms';
import {
  ProductCharacteristics,
  SmallPropertyCard,
} from '@/modules/stock/components/organisms/';
import RenderHtml from 'react-native-render-html';
import {useThemeColor} from '@/features/themeSlice';

const ProductDetailsScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const {baseUrl} = useSelector(state => state.auth);
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
            placeholder="See attached files"
            onPress={() =>
              navigation.navigate('ProductAttachedFilesScreen', {
                product: product,
              })
            }
          />
        </DropdownMenu>
      ),
    });
  }, [navigation, product]);

  const [widthNotes, setWidthNotes] = useState();
  const PERCENTAGE_WIDTH_NOTES = 0.95;

  return (
    <Screen>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <ProductCharacteristics
            onPressImage={() => navigateToImageProduct()}
            pictureURI={
              product.picture == null
                ? null
                : {
                    uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${product.picture?.id}/content/download`,
                  }
            }
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
                title="STOCK"
                value={product.unit?.name}
              />
              <SmallPropertyCard
                style={styles.stockCard}
                title="SALE"
                value={
                  product.salesUnit
                    ? product.salesUnit?.name
                    : product.unit?.name
                }
              />
              <SmallPropertyCard
                style={styles.stockCard}
                title="PURCHASE"
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
                title="LENGTH"
                value={product.length}
                unit={
                  product.lengthUnit == null
                    ? 'Mètres'
                    : product.lengthUnit?.name
                }
                interactive={true}
              />
              <SmallPropertyCard
                style={styles.packingCard}
                title="WIDTH"
                value={product.width}
                unit={
                  product.lengthUnit == null
                    ? 'Mètres'
                    : product.lengthUnit?.name
                }
                interactive={true}
              />
              <SmallPropertyCard
                style={styles.packingCard}
                title="HEIGHT"
                value={product.height}
                unit={
                  product.lengthUnit == null
                    ? 'Mètres'
                    : product.lengthUnit?.name
                }
                interactive={true}
              />
              <SmallPropertyCard
                style={styles.packingCard}
                title="NET MASS"
                value={product.netMass}
                unit={
                  product.massUnit == null
                    ? 'Kilogrammes'
                    : product.massUnit?.name
                }
                interactive={true}
              />
              <SmallPropertyCard
                style={styles.packingCard}
                title="GROSS MASS"
                value={product.grossMass}
                unit={
                  product.massUnit == null
                    ? 'Kilogrammes'
                    : product.massUnit?.name
                }
                interactive={true}
              />
            </View>
          </View>
          {product.description && (
            <View style={styles.description}>
              <Text style={styles.titles}>DESCRIPTION</Text>
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
        {!product.productVariant ? null : (
          <View style={styles.buttonContainer}>
            <Button onPress={() => showProductVariables()} title="VARIANTS" />
          </View>
        )}
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '10%',
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
