import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {getRacks} from '../features/racksListSlice';

export const useSupplierLinesWithRacks = supplierArrival => {
  const dispatch = useDispatch();

  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {supplierArrivalLineList, totalNumberLines} = useSelector(
    state => state.supplierArrivalLine,
  );

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: supplierArrival?.toStockLocation?.id,
        LineList: supplierArrivalLineList,
      }),
    );
  }, [dispatch, supplierArrival, supplierArrivalLineList]);

  const updatedList = useMemo(() => {
    return supplierArrivalLineList?.map((item, index) => {
      const locker = !loadingRacks && (racksList?.[index]?.[0]?.rack ?? '');

      return {
        ...item,
        locker,
      };
    });
  }, [loadingRacks, racksList, supplierArrivalLineList]);

  return useMemo(
    () => ({
      supplierArrivalLineList: updatedList,
      totalNumberLines: totalNumberLines,
    }),
    [totalNumberLines, updatedList],
  );
};
