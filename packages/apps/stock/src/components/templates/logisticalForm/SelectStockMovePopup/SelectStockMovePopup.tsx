/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {StockMoveSearchBar} from '../../../organisms';
import {
  addStockMoveToLogisticalForm,
  removeStockMoveFromLogisticalForm,
} from '../../../../features/logisticalFormSlice';

const stockMoveScanKey = 'stock-move_logistical-form-select-move-alert';

export enum PopupType {
  add = 'add',
  remove = 'remove',
}

type SelectStockMovePopupProps = {
  logisticalForm: any;
  type: PopupType;
  closePopup: () => void;
};

const SelectStockMovePopup = ({
  logisticalForm,
  type,
  closePopup,
}: SelectStockMovePopupProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  const [selectedStockMove, setSelectedStockMove] = useState<any>(null);

  const allowInternalMoves = useMemo(
    () =>
      user.activeCompany?.stockConfig?.allowInternalStockMoveOnLogisticalForm,
    [user.activeCompany?.stockConfig?.allowInternalStockMoveOnLogisticalForm],
  );

  const isMultiClientsEnabled = useMemo(
    () => user.activeCompany?.stockConfig?.isLogisticalFormMultiClientsEnabled,
    [user.activeCompany?.stockConfig?.isLogisticalFormMultiClientsEnabled],
  );

  const handleConfirm = useCallback(() => {
    const sliceFct: any =
      type === PopupType.add
        ? addStockMoveToLogisticalForm
        : removeStockMoveFromLogisticalForm;

    dispatch(sliceFct({...logisticalForm, stockMoveId: selectedStockMove.id}));
    setSelectedStockMove(null);
    closePopup();
  }, [closePopup, dispatch, logisticalForm, selectedStockMove, type]);

  return (
    <Alert
      visible={type != null}
      title={I18n.t(
        type === PopupType.add
          ? 'Stock_SelectStockMoveToAdd'
          : 'Stock_SelectStockMoveToRemove',
      )}
      translator={I18n.t}
      cancelButtonConfig={{onPress: closePopup}}
      confirmButtonConfig={{
        onPress: handleConfirm,
        disabled: !selectedStockMove?.id,
      }}>
      <StockMoveSearchBar
        defaultValue={selectedStockMove}
        onChange={setSelectedStockMove}
        stockMoveSet={logisticalForm.stockMoveList ?? []}
        excludeStockMoveSet={type === PopupType.add}
        allowInternalMoves={allowInternalMoves}
        partnerId={
          isMultiClientsEnabled
            ? undefined
            : logisticalForm.deliverToCustomerPartner?.id
        }
        logisticalFormId={logisticalForm.id}
        stockLocationId={logisticalForm.stockLocation?.id}
        scanKey={stockMoveScanKey}
      />
    </Alert>
  );
};

export default SelectStockMovePopup;
