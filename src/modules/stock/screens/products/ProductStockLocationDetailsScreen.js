import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Screen} from '@/components/atoms';
import {handleError} from '@/api/utils';
import {ProductStockLocationCard} from '@/modules/stock/components/organisms';
import {fetchStockLocationLine} from '@/modules/stock/features/stockLocationLineSlice';
import {getProductStockIndicators} from '@/modules/stock/api/product-api';
import {ScrollList} from '@/components/organisms';

const ProductStockLocationDetailsScreen = ({route}) => {
  const product = route.params.product;
  const companyId = route.params.companyId;
  const {
    loading: loadingLines,
    moreLoading,
    isListEnd,
    stockLocationLine,
  } = useSelector(state => state.stockLocationLine);
  const [availabilityList, setAvailabilityList] = useState(null);
  const dispatch = useDispatch();

  const fetchStockLines = useCallback(
    page => {
      dispatch(
        fetchStockLocationLine({
          productId: product.id,
          companyId: route.params.companyId,
          page: page,
        }),
      );
    },
    [dispatch, product.id, route.params],
  );

  useEffect(() => {
    if (stockLocationLine != null && stockLocationLine !== []) {
      let promises = [];

      async function getAvailability(stocklocationLine) {
        return getProductStockIndicators({
          version: product.version,
          productId: product.id,
          companyId: companyId,
          stockLocationId: stocklocationLine.stockLocation?.id,
        })
          .catch(function (error) {
            handleError(error, 'fetch product stock indicators');
          })
          .then(response => {
            return response.data.object;
          });
      }

      async function fetchData(stocklocationLine) {
        return await getAvailability(stocklocationLine);
      }

      stockLocationLine.forEach(line => {
        promises.push(fetchData(line));
      });
      Promise.all(promises).then(resultes => {
        return setAvailabilityList(resultes);
      });
    }
  }, [companyId, product, stockLocationLine]);

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
              availabilityList ? availabilityList[index]?.availableStock : null
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
