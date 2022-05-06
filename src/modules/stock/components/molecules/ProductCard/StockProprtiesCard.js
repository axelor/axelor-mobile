import { Text } from '@/components/atoms';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const StockProprtiesCard = ({ style, title, value }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <Text>{value}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#f3f7fc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        alignItems:'center'
    },
    title:{
        fontWeight:'bold',
        color:'black'
    }
});

export default StockProprtiesCard;