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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, ActionType} from '@axelor/aos-mobile-ui';
import {useDispatch, useTypes} from '@axelor/aos-mobile-core';
import {StockMoveSearchBar} from '../../../organisms';
import {
  addStockMoveToLogisticalForm,
  removeStockMoveFromLogisticalForm,
} from '../../../../features/logisticalFormSlice';

const popupActionTypes = {
  add: 'add',
  remove: 'remove',
} as const;

type PopupActionType = (typeof popupActionTypes)[keyof typeof popupActionTypes];

type LogisticalFormSelectStockMovePopupProps = {
  logisticalForm: any;
  stockConfig: any;
  companyId?: number;
  translator: (key: string) => string;
  colors: any;
  onActionListChange: (actions: ActionType[]) => void;
};

const LogisticalFormSelectStockMovePopup = ({
  logisticalForm,
  stockConfig,
  companyId,
  translator,
  colors,
  onActionListChange,
}: LogisticalFormSelectStockMovePopupProps) => {
  const dispatch = useDispatch();
  const {StockMove, LogisticalForm} = useTypes();

  const [popupAction, setPopupAction] = useState<PopupActionType | null>(null);
  const [selectedStockMove, setSelectedStockMove] = useState<any>(null);

  const closePopup = useCallback(() => {
    setPopupAction(null);
    setSelectedStockMove(null);
  }, []);

  useEffect(() => {
    if (!popupAction) {
      setSelectedStockMove(null);
    }
  }, [popupAction]);

  const selectedStockMoveIds = useMemo(
    () => logisticalForm?.stockMoveList?.map((_m: any) => _m.id) ?? [],
    [logisticalForm?.stockMoveList],
  );

  const allowInternalMoves =
    stockConfig?.allowInternalStockMoveOnLogisticalForm === true;
  const isMultiClientsEnabled =
    stockConfig?.isLogisticalFormMultiClientsEnabled === true;

  const addStockMoveTypeList = useMemo(() => {
    const typeSelectList: number[] = [];

    if (StockMove?.typeSelect?.outgoing != null) {
      typeSelectList.push(StockMove?.typeSelect?.outgoing);
    }

    if (allowInternalMoves && StockMove?.typeSelect?.internal != null) {
      typeSelectList.push(StockMove?.typeSelect?.internal);
    }

    return typeSelectList;
  }, [
    StockMove?.typeSelect?.internal,
    StockMove?.typeSelect?.outgoing,
    allowInternalMoves,
  ]);

  const addStockMoveSearchFilters = useMemo(() => {
    if (addStockMoveTypeList.length === 0) {
      return null;
    }

    const filters: any = {
      typeSelectList: addStockMoveTypeList,
      excludeStockMoveIds: selectedStockMoveIds,
    };

    if (
      !isMultiClientsEnabled &&
      logisticalForm?.deliverToCustomerPartner?.id != null
    ) {
      filters.partnerId = logisticalForm?.deliverToCustomerPartner?.id;
    }

    if (companyId != null) {
      filters.companyId = companyId;
    }

    return filters;
  }, [
    addStockMoveTypeList,
    companyId,
    isMultiClientsEnabled,
    logisticalForm?.deliverToCustomerPartner?.id,
    selectedStockMoveIds,
  ]);

  const isCollected =
    logisticalForm?.statusSelect === LogisticalForm?.statusSelect?.Collected;
  const actionsDisabled = logisticalForm == null || isCollected;
  const canAddStockMove = !actionsDisabled && addStockMoveSearchFilters != null;
  const canRemoveStockMove =
    !actionsDisabled && (logisticalForm?.stockMoveList?.length ?? 0) > 0;

  const openAddPopup = useCallback(() => {
    if (!canAddStockMove) return;
    setPopupAction(popupActionTypes.add);
  }, [canAddStockMove]);

  const openRemovePopup = useCallback(() => {
    if (!canRemoveStockMove) return;
    setPopupAction(popupActionTypes.remove);
  }, [canRemoveStockMove]);

  const actionList = useMemo<ActionType[]>(() => {
    if (actionsDisabled) return [];

    const actions = [];

    if (canAddStockMove) {
      actions.push({
        iconName: 'plus-lg',
        title: translator('Stock_AddStockMove'),
        color: colors.primaryColor,
        onPress: openAddPopup,
      });
    }

    if (canRemoveStockMove) {
      actions.push({
        iconName: 'dash-lg',
        title: translator('Stock_RemoveStockMove'),
        color: colors.errorColor,
        onPress: openRemovePopup,
      });
    }

    return actions;
  }, [
    actionsDisabled,
    canAddStockMove,
    canRemoveStockMove,
    colors.errorColor,
    colors.primaryColor,
    openAddPopup,
    openRemovePopup,
    translator,
  ]);

  useEffect(() => {
    onActionListChange(actionList);
  }, [actionList, onActionListChange]);

  const popupTitle =
    popupAction === popupActionTypes.add
      ? translator('Stock_SelectStockMoveToAdd')
      : translator('Stock_SelectStockMoveToRemove');

  const popupSearchFilters =
    popupAction === popupActionTypes.add
      ? (addStockMoveSearchFilters ?? undefined)
      : undefined;

  const popupStockMoveSet =
    popupAction === popupActionTypes.remove
      ? (logisticalForm?.stockMoveList ?? [])
      : [];

  const logisticalFormVersion = logisticalForm?.version;

  const confirmDisabled =
    selectedStockMove?.id == null || logisticalFormVersion == null;

  const handleConfirm = useCallback(() => {
    if (
      popupAction == null ||
      logisticalForm?.id == null ||
      confirmDisabled ||
      selectedStockMove?.id == null
    ) {
      closePopup();
      return;
    }

    const thunk =
      popupAction === popupActionTypes.add
        ? addStockMoveToLogisticalForm
        : removeStockMoveFromLogisticalForm;

    dispatch(
      (thunk as any)({
        logisticalFormId: logisticalForm.id,
        stockMoveId: selectedStockMove.id,
        version: logisticalFormVersion,
      }),
    );
    closePopup();
  }, [
    closePopup,
    confirmDisabled,
    dispatch,
    logisticalForm?.id,
    logisticalFormVersion,
    popupAction,
    selectedStockMove?.id,
  ]);

  if (popupAction == null) {
    return null;
  }

  return (
    <Alert
      visible={popupAction != null}
      title={popupTitle}
      translator={translator}
      cancelButtonConfig={{
        onPress: closePopup,
      }}
      confirmButtonConfig={{
        onPress: handleConfirm,
        disabled: confirmDisabled,
      }}>
      <StockMoveSearchBar
        defaultValue={selectedStockMove}
        onChange={setSelectedStockMove}
        stockMoveSet={popupStockMoveSet}
        searchFilters={popupSearchFilters}
        showDetailsPopup={false}
        isScrollViewContainer={true}
      />
    </Alert>
  );
};

export default LogisticalFormSelectStockMovePopup;
