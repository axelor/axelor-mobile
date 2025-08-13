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

import React, {useCallback} from 'react';
import {EditableHtmlInput, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {updateInternalMoveLineDescription} from '../../../../features/internalMoveLineSlice';

interface CustomerDeliveryNotesProps {
  titleKey?: string;
  readonly?: boolean;
}

const InternalMoveLineDescription = ({
  titleKey = 'Base_Description',
  readonly = false,
}: CustomerDeliveryNotesProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly: isReadonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const {internalMoveLine} = useSelector(state => state.internalMoveLine);

  const handleValidate = useCallback(
    value => {
      dispatch(
        (updateInternalMoveLineDescription as any)({
          stockMoveLineId: internalMoveLine.id,
          version: internalMoveLine.version,
          realQty: internalMoveLine.realQty,
          description: value,
          fromStockLocation: internalMoveLine.fromStockLocation,
          unitId: internalMoveLine.unit?.id,
        }),
      );
    },
    [
      dispatch,
      internalMoveLine.fromStockLocation,
      internalMoveLine.id,
      internalMoveLine.realQty,
      internalMoveLine.unit?.id,
      internalMoveLine.version,
    ],
  );

  if (isReadonly || readonly) {
    return (
      <NotesCard
        title={I18n.t(titleKey)}
        data={internalMoveLine?.description}
      />
    );
  }

  return (
    <EditableHtmlInput
      title={I18n.t('Base_Description')}
      onValidate={handleValidate}
      defaultValue={internalMoveLine?.description}
    />
  );
};

export default InternalMoveLineDescription;
