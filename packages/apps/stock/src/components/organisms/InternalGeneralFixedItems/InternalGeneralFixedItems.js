import React, {useCallback} from 'react';
import {useTranslator, useDispatch} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {updateInternalMove} from '../../../features/internalMoveSlice';
import StockMove from '../../../types/stock-move';

const InternalGeneralFixedItems = ({internalMove}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleRealizeStockMove = useCallback(() => {
    dispatch(
      updateInternalMove({
        internalMoveId: internalMove.id,
        version: internalMove.version,
        status: StockMove.status.Realized,
      }),
    );
  }, [dispatch, internalMove]);

  return (
    internalMove.statusSelect === StockMove.status.Planned && (
      <Button title={I18n.t('Base_Realize')} onPress={handleRealizeStockMove} />
    )
  );
};

export default InternalGeneralFixedItems;
