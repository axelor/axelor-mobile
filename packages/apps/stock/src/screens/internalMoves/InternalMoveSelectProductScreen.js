import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {
  ClearableCard,
  HeaderContainer,
  PopUpOneButton,
  Screen,
} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {StockMoveHeader} from '../../components';
import {searchProducts} from '../../features/productSlice';
import {displayItemName} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const productScanKey = 'product_internal-move-select';

const InternalMoveSelectProductScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const internalMoveLine = route.params.internalMoveLine;
  const {productList} = useSelector(state => state.product);
  const [isVisible, setVisible] = useState(false);
  const I18n = useTranslator();
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
    <Screen removeSpaceOnTop={internalMove != null ? true : false}>
      {internalMove != null ? (
        <HeaderContainer
          expandableFilter={false}
          fixedItems={
            internalMove != null ? (
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
            ) : null
          }
        />
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
      <ScannerAutocompleteSearch
        objectList={productList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder={I18n.t('Stock_Product')}
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorProduct')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

export default InternalMoveSelectProductScreen;
