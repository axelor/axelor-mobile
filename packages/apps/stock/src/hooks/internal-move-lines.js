import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {getRacks} from '../features/racksListSlice';

export const useInternalLinesWithRacks = internalMove => {
  const dispatch = useDispatch();

  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {internalMoveLineList, totalNumberLines} = useSelector(
    state => state.internalMoveLine,
  );

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: internalMove?.fromStockLocation?.id,
        LineList: internalMoveLineList,
      }),
    );
  }, [dispatch, internalMove, internalMoveLineList]);

  const updatedList = useMemo(() => {
    return internalMoveLineList.map((item, index) => {
      const locker = !loadingRacks && (racksList?.[index]?.[0]?.rack ?? '');

      return {
        ...item,
        locker,
      };
    });
  }, [loadingRacks, racksList, internalMoveLineList]);

  return useMemo(
    () => ({
      internalMoveLineList: updatedList,
      totalNumberLines: totalNumberLines,
    }),
    [totalNumberLines, updatedList],
  );
};
