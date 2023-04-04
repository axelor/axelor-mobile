import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {getRacks} from '../features/racksListSlice';

export const useCustomerLinesWithRacks = customerDelivery => {
  const dispatch = useDispatch();

  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {customerDeliveryLineList, totalNumberLines} = useSelector(
    state => state.customerDeliveryLine,
  );

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: customerDelivery?.fromStockLocation?.id,
        LineList: customerDeliveryLineList,
      }),
    );
  }, [dispatch, customerDelivery, customerDeliveryLineList]);

  const updatedList = useMemo(() => {
    return customerDeliveryLineList?.map((item, index) => {
      const locker = !loadingRacks && (racksList?.[index]?.[0]?.rack ?? '');

      return {
        ...item,
        locker,
      };
    });
  }, [loadingRacks, racksList, customerDeliveryLineList]);

  return useMemo(
    () => ({
      customerDeliveryLineList: updatedList,
      totalNumberLines: totalNumberLines,
    }),
    [totalNumberLines, updatedList],
  );
};
