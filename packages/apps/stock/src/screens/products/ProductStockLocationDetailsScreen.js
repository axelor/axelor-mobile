import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Chip,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {useSelector, useDispatch, useTranslator} from '@aos-mobile/core';
import {ProductStockLocationCard} from '../../components';
import {fetchStockLocationLine} from '../../features/stockLocationLineSlice';
import {fetchProductDistribution} from '../../features/productIndicatorsSlice';
import {fetchSupplychainConfigForStockApp} from '../../features/stockAppConfigSlice';

const ProductStockLocationDetailsScreen = ({route}) => {
  const product = route.params.product;
  const companyId = route.params.companyId;
  const {
    loading: loadingLines,
    moreLoading,
    isListEnd,
    stockLocationLine,
  } = useSelector(state => state.stockLocationLine);
  const {listAvailabiltyDistribution} = useSelector(
    state => state.productIndicators,
  );
  const {supplychainConfig} = useSelector(state => state.stockAppConfig);
  const [filteredList, setFilteredList] = useState(stockLocationLine);
  const [availableStatus, setAvailableStatus] = useState(false);
  const [unavailableStatus, setUnvailableStatus] = useState(false);
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSupplychainConfigForStockApp());
  }, [dispatch]);

  const handleAvailableStatus = () => {
    if (!availableStatus && unavailableStatus) {
      setUnvailableStatus(!unavailableStatus);
    }
    setAvailableStatus(!availableStatus);
  };

  const handleUnavailableStatus = () => {
    if (!unavailableStatus && availableStatus) {
      setAvailableStatus(!availableStatus);
    }
    setUnvailableStatus(!unavailableStatus);
  };

  const filterOnStatus = useCallback(
    (list, availabilityList) => {
      if (
        list == null ||
        list === [] ||
        availabilityList == null ||
        availabilityList === []
      ) {
        return list;
      } else {
        if (availableStatus) {
          return list.filter(
            (item, index) =>
              parseFloat(availabilityList[index]?.availableStock) > 0,
          );
        } else if (unavailableStatus) {
          return list.filter(
            (item, index) =>
              parseFloat(availabilityList[index]?.availableStock) === 0,
          );
        } else {
          return list;
        }
      }
    },
    [availableStatus, unavailableStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(stockLocationLine, listAvailabiltyDistribution),
    );
  }, [stockLocationLine, filterOnStatus, listAvailabiltyDistribution]);

  const fetchStockLines = useCallback(
    page => {
      dispatch(
        fetchStockLocationLine({
          productId: product.id,
          companyId: companyId,
          page: page,
        }),
      );
    },
    [companyId, dispatch, product.id],
  );

  useEffect(() => {
    if (stockLocationLine != null && stockLocationLine !== []) {
      dispatch(
        fetchProductDistribution({
          stockLocationList: stockLocationLine,
          product: product,
          companyId: companyId || 1,
        }),
      );
    }
  }, [dispatch, product, stockLocationLine, companyId]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<Text style={styles.title}>{product.fullName}</Text>}
        chipComponent={
          <ChipSelect>
            <Chip
              selected={availableStatus}
              title={I18n.t('Stock_Available')}
              onPress={handleAvailableStatus}
              selectedColor={Colors.primaryColor}
            />
            <Chip
              selected={unavailableStatus}
              title={I18n.t('Stock_Unavailable')}
              onPress={handleUnavailableStatus}
              selectedColor={Colors.errorColor}
            />
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loadingLines}
        data={filteredList}
        renderItem={({item, index}) => (
          <ProductStockLocationCard
            stockLocationName={item.stockLocation?.name}
            realQty={parseFloat(item.currentQty).toFixed(2)}
            futureQty={parseFloat(item.futureQty).toFixed(2)}
            reservedQty={
              supplychainConfig?.manageStockReservation &&
              parseFloat(item.reservedQty).toFixed(2)
            }
            availability={
              listAvailabiltyDistribution
                ? listAvailabiltyDistribution[index]?.availableStock
                : null
            }
            unit={item.unit?.name}
          />
        )}
        fetchData={fetchStockLines}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default ProductStockLocationDetailsScreen;
