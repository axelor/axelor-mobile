import React, { useEffect, useState, useRef } from 'react';
import { Button, CardStockInfo, Input, Screen, Text } from '@/components/atoms';
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductCardDetails from '../../components/molecules/ProductCard/ProductCardDetails';
import StockProprtiesCard from '../../components/molecules/ProductCard/StockProprtiesCard';

const ProductDetails = ({ route }) => {

    const { loading, productList } = useSelector(state => state.product);
    const product = route.params.product;
    useEffect(()=>{
        console.log(product);
    },[])

    return (
        <Screen>
            {loading ? (<ActivityIndicator size="large" />) : (
                <View style={styles.container}>
                    <ProductCardDetails image={product.image} categorie={product.productCategory} prototype={product.isPrototype} unrenewed={product.isUnrenewed} procurMethode={product.procurementMethodSelect}  code={product.code} name={product.name} style={styles.item} />
                    <View style={styles.lineStyle} />
                    <View style={styles.stock}>
                        <StockProprtiesCard style={styles.stockCard} title="STOCK" value={product.unit?.name} />
                        <StockProprtiesCard style={styles.stockCard} title="SALE" value={product.salesUnit?.name} />
                        <StockProprtiesCard style={styles.stockCard} title="PURCHASE" value={product.purchasesUnit?.name} />
                    </View>
                    <View style={styles.containerPack}>
                        <Text style={styles.titles}>PACKING</Text>
                        <View style={styles.packing}>
                            <StockProprtiesCard style={styles.packingCard} title="LENGHT" value={product.length} />
                            <StockProprtiesCard style={styles.packingCard} title="WIDTH" value={product.width} />
                            <StockProprtiesCard style={styles.packingCard} title="HEIGHT" value={product.height} />
                            <StockProprtiesCard style={styles.packingCard} title="NET MASS" value={product.netMass} />
                            <StockProprtiesCard style={styles.packingCard} title="GROSS MASS" value={product.grossMass} />
                        </View>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.titles}>DESCRIPTION</Text>
                        <View style={styles.submitArea}>
                            <Text style={styles.textArea}>{product.description}</Text>
                            <Button style={styles.variantsBtn} styleTxt={styles.btnText} title="VARIANTS"></Button>
                        </View>
                    </View>
                </View>
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerPack: {
        marginHorizontal: '5%',
        marginTop:18
    },
    stockCard: {
        marginHorizontal: '1.5%',
        minWidth: '20%',
    },
    btnText:{
        fontSize:15,
        fontWeight:'bold',
        color:'black'
    },
    variantsBtn: {
        width: '60%',
        backgroundColor: '#3ECF8E',
        borderRadius: 35,
    },
    description: {
        flex: 1,
        marginHorizontal: '5%',
        flexDirection: 'column',
        marginTop:'2%'
    },
    submitArea: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    textArea: {
        minHeight: '70%',
        width: '90%',
        backgroundColor: '#f3f7fc',
        borderRadius: 10,
        marginVertical:9
    },
    titles: {
        marginHorizontal: '5%',

    },
    packingCard: {
        marginHorizontal: '2%',
        marginTop: 5,
        minWidth: '28%',
        marginBottom: '2%'
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
    searchBar: {
        marginHorizontal: 12,
        marginBottom: 7,
        backgroundColor: '#f3f7fc',
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
    lineStyle: {
        borderWidth: 0.7,
        width: 280,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});

export default ProductDetails;

// <SelectOptions style={styles.selection} options={options} defaultValue="COMPANY" />