import React, {useEffect} from 'react';
import {Button, Screen, Text} from '@/components/atoms';
import {StyleSheet, ActivityIndicator, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ProductCardDetails from '../../components/molecules/ProductCard/ProductCardDetails';
import StockProprtiesCard from '../../components/molecules/ProductCard/StockProprtiesCard';

const ProductDetails = ({route, navigation}) => {
  const {loading} = useSelector(state => state.product);
  const product = route.params.product;
  useEffect(() => {}, []);

  const showProductVariables = () => {
    navigation.navigate('ProductVariables', {product: product});
  };
  const navigateToImageProduct = () => {
    navigation.navigate('ProductImage', {product: product});
  };

  return (
    <Screen>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.scrollContainer}>
          <ScrollView>
            <ProductCardDetails
              onPressImage={() => navigateToImageProduct()}
              picture={product.picture}
              categorie={product.productCategory}
              prototype={product.isPrototype}
              unrenewed={product.isUnrenewed}
              procurMethode={product.procurementMethodSelect}
              code={product.code}
              name={product.name}
              style={styles.item}
            />
            <View style={styles.lineContainer}>
              <View style={styles.lineStyle} />
            </View>
            {product.unit ? (
              <View style={styles.stock}>
                <StockProprtiesCard
                  style={styles.stockCard}
                  title="STOCK"
                  value={product.unit?.name}
                />
                <StockProprtiesCard
                  style={styles.stockCard}
                  title="SALE"
                  value={
                    product.salesUnit
                      ? product.salesUnit?.name
                      : product.unit?.name
                  }
                />
                <StockProprtiesCard
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
                <StockProprtiesCard
                  style={styles.packingCard}
                  title="LENGTH"
                  value={product.length}
                />
                <StockProprtiesCard
                  style={styles.packingCard}
                  title="WIDTH"
                  value={product.width}
                />
                <StockProprtiesCard
                  style={styles.packingCard}
                  title="HEIGHT"
                  value={product.height}
                />
                <StockProprtiesCard
                  style={styles.packingCard}
                  title="NET MASS"
                  value={product.netMass}
                />
                <StockProprtiesCard
                  style={styles.packingCard}
                  title="GROSS MASS"
                  value={product.grossMass}
                />
              </View>
            </View>
            <View style={styles.description}>
              <Text style={styles.titles}>DESCRIPTION</Text>
              <View style={styles.submitArea}>
                <Text style={styles.textArea} numberOfLines={3}>
                  {product.description}
                </Text>
              </View>
            </View>
            {true ? null : (
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
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
    backgroundColor: '#3ECF8E',
    borderRadius: 35,
  },
  variantsBtnDisabled: {
    backgroundColor: '#F4F7F7',
    disabled: true,
    borderRadius: 35,
  },
  description: {
    width: '90%',
    height: '40%',
    marginHorizontal: '5%',
    flexDirection: 'column',
    marginTop: '2%',
  },
  submitArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textArea: {
    minHeight: '52%',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 15,
    padding: 10,
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
  selection: {
    marginHorizontal: 12,
    marginBottom: 7,
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
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductDetails;

// <SelectOptions style={styles.selection} options={options} defaultValue="COMPANY" />
