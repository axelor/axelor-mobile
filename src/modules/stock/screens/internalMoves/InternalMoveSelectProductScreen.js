import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {searchProducts} from '@/modules/stock/features/productSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch, PopUpOneButton} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import {displayItemName} from '@/modules/stock/utils/displayers';
import StockMove from '../../types/stock-move';
import {LocationsMoveCard} from '../../components/molecules';
import {StockMoveHeader} from '../../components/organisms';

const productScanKey = 'product_internal-move-select';

const InternalMoveSelectProductScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const internalMoveLine = route.params.internalMoveLine;
  const {productList} = useSelector(state => state.product);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveSelectFromLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveSelectToLocationScreen', {
      fromStockLocation: route.params.fromStockLocation,
    });
  };

  const handleNavigate = useCallback(
    product => {
      if (product != null) {
        if (internalMove == null) {
          if (product.trackingNumberConfiguration == null) {
            navigation.navigate('InternalMoveLineDetailsScreen', {
              fromStockLocation: route.params.fromStockLocation,
              toStockLocation: route.params.toStockLocation,
              stockProduct: product,
            });
          } else {
            navigation.navigate('InternalMoveSelectTrackingScreen', {
              fromStockLocation: route.params.fromStockLocation,
              toStockLocation: route.params.toStockLocation,
              stockProduct: product,
            });
          }
        } else {
          if (product.id !== internalMoveLine?.product.id) {
            setVisible(true);
          } else {
            if (product.trackingNumberConfiguration == null) {
              navigation.navigate('InternalMoveLineDetailsScreen', {
                internalMove: internalMove,
                internalMoveLine: internalMoveLine,
              });
            } else {
              navigation.navigate('InternalMoveSelectTrackingScreen', {
                internalMove: internalMove,
                internalMoveLine: internalMoveLine,
                stockProduct: product,
              });
            }
          }
        }
      }
    },
    [internalMove, internalMoveLine, navigation, route.params],
  );

  return (
    <Screen>
      {internalMove != null ? (
        <View>
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={
              internalMove.statusSelect === StockMove.status.Draft
                ? internalMove.createdOn
                : internalMove.statusSelect === StockMove.status.Planned
                ? internalMove.estimatedDate
                : internalMove.realDate
            }
            availability={internalMove.availableStatusSelect}
          />
          <View style={styles.content}>
            <LocationsMoveCard
              fromStockLocation={internalMove.fromStockLocation.name}
              toStockLocation={internalMove.toStockLocation.name}
            />
          </View>
        </View>
      ) : (
        <View>
          <ClearableCard
            valueTxt={route.params.fromStockLocation.name}
            onClearPress={handleClearOriginalLocation}
          />
          <ClearableCard
            valueTxt={route.params.toStockLocation.name}
            onClearPress={handleClearDestinationLocation}
          />
        </View>
      )}
      <AutocompleteSearch
        objectList={productList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder="Product"
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title="Warning"
        data="This is not the right product."
        btnTitle="OK"
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default InternalMoveSelectProductScreen;
