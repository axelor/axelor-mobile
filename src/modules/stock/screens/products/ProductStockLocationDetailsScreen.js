import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Screen} from '@/components/atoms';
import {ProductStockLocationCard} from '@/modules/stock/components/organisms';
import {fetchStockLocationLine} from '@/modules/stock/features/stockLocationLineSlice';
import {ScrollList} from '@/components/organisms';
import {fetchProductDistribution} from '../../features/productIndicatorsSlice';

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
  const dispatch = useDispatch();

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
    <Screen>
      <ScrollList
        loadingList={loadingLines}
        data={stockLocationLine}
        renderItem={({item, index}) => (
          <ProductStockLocationCard
            stockLocationName={item.stockLocation?.name}
            realQty={parseFloat(item.currentQty).toFixed(2)}
            futureQty={parseFloat(item.futureQty).toFixed(2)}
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

export default ProductStockLocationDetailsScreen;
