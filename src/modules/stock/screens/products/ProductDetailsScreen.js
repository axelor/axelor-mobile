import React, {useState} from 'react';
import {Button, Screen, Text} from '@/components/atoms';
import {StyleSheet, ActivityIndicator, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ProductCharacteristics from '../../components/molecules/ProductCharacteristics/ProductCharacteristics';
import SmallPropertyCard from '../../components/molecules/SmallPropertyCard/SmallPropertyCard';
import RenderHtml from 'react-native-render-html';
import Colors from '@/types/colors';

const ProductDetailsScreen = ({route, navigation}) => {
  const {loading} = useSelector(state => state.product);
  const product = route.params.product;

  const showProductVariables = () => {
    navigation.navigate('ProductVariables', {product: product});
  };
  const navigateToImageProduct = () => {
    navigation.navigate('ProductImageScreen', {product: product});
  };

  const [widthNotes, setWidthNotes] = useState();
  const PERCENTAGE_WIDTH_NOTES = 0.95;

  return (
    <Screen>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.scrollContainer}>
          <ScrollView>
            <ProductCharacteristics
              onPressImage={() => navigateToImageProduct()}
              pictureURI={
                product.picture == null
                  ? null
                  : {
                      uri: `${global.loggedUrl}ws/rest/com.axelor.meta.db.MetaFile/${product.picture?.id}/content/download`,
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
                />
                <SmallPropertyCard
                  style={styles.packingCard}
                  title="WIDTH"
                  value={product.width}
                />
                <SmallPropertyCard
                  style={styles.packingCard}
                  title="HEIGHT"
                  value={product.height}
                />
                <SmallPropertyCard
                  style={styles.packingCard}
                  title="NET MASS"
                  value={product.netMass}
                />
                <SmallPropertyCard
                  style={styles.packingCard}
                  title="GROSS MASS"
                  value={product.grossMass}
                />
              </View>
            </View>
            <View style={styles.description}>
              <Text style={styles.titles}>DESCRIPTION</Text>
              <View
                style={styles.notes}
                onLayout={event => {
                  const {width} = event.nativeEvent.layout;
                  setWidthNotes(width);
                }}>
                <RenderHtml
                  source={{html: product.description}}
                  contentWidth={widthNotes * PERCENTAGE_WIDTH_NOTES}
                  baseStyle={{color: Colors.text.grey}}
                />
              </View>
            </View>
            {!product.productVariant ? null : (
              <Button
                onPress={() => showProductVariables()}
                style={styles.variantsBtn}
                styleTxt={styles.btnText}
                title="VARIANTS"
              />
            )}
          </ScrollView>
        </View>
      )}
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
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  variantsBtn: {
    width: '60%',
    backgroundColor: '#3ECF8E',
    borderRadius: 35,
    marginHorizontal: '20%',
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
    backgroundColor: '#FFFFFF',
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
