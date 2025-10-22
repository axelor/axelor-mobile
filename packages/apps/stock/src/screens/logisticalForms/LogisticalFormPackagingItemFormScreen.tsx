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

import React, {useCallback, useMemo} from 'react';
import {FormView, useSelector} from '@axelor/aos-mobile-core';
import {PackagingType} from '../../types';
import {
  createPackagingLine,
  updatePackagingLine,
} from '../../features/packagingLineSlice';
import {createPackaging, updatePackaging} from '../../features/packagingSlice';

const LogisticalFormPackagingItemFormScreen = ({navigation, route}: any) => {
  const {parentPackaging, packaging, packagingLine} = route?.params ?? {};

  const {logisticalForm} = useSelector(state => state.logisticalForm);

  const defaultValue = useMemo(() => {
    if (packaging != null)
      return {
        ...packaging,
        packagingType: PackagingType.Packaging,
        stockMoveSet: logisticalForm?.stockMoveList ?? [],
      };

    if (packagingLine != null)
      return {
        ...packagingLine,
        quantity: packagingLine.qty,
        parentPackaging: packagingLine.packaging,
        packagingType: PackagingType.Product,
        stockMoveSet: logisticalForm?.stockMoveList ?? [],
      };

    return null;
  }, [logisticalForm?.stockMoveList, packaging, packagingLine]);

  const creationDefaultValue = useMemo(
    () => ({
      packagingType: PackagingType.Packaging,
      parentPackaging,
      stockMoveSet: logisticalForm?.stockMoveList ?? [],
    }),
    [logisticalForm?.stockMoveList, parentPackaging],
  );

  const handleSavePackagingLine = useCallback(
    (objectState: any, dispatch: any) => {
      const isCreation = objectState.id == null;
      const sliceFct: any = isCreation
        ? createPackagingLine
        : updatePackagingLine;

      dispatch(
        sliceFct({
          ...objectState,
          packagingId: objectState.parentPackaging?.id,
          stockMoveLineId: objectState.stockMoveLine?.id,
          quantity: objectState.quantity,
        }),
      );
    },
    [],
  );

  const handleSavePackaging = useCallback(
    (objectState: any, dispatch: any) => {
      const isCreation = objectState.id == null;
      const sliceFct: any = isCreation ? createPackaging : updatePackaging;

      dispatch(
        sliceFct({
          ...objectState,
          packageUsedId: objectState.packageUsed?.id,
          parentPackagingId: objectState.parentPackaging?.id,
          logisticalFormId: logisticalForm.id,
        }),
      );
    },
    [logisticalForm.id],
  );

  const handleSave = useCallback(
    (objectState: any, dispatch: any) => {
      const packagingType =
        objectState.packagingType ?? PackagingType.Packaging;

      if (packagingType === PackagingType.Packaging) {
        handleSavePackaging(objectState, dispatch);
      } else if (packagingType === PackagingType.Product) {
        handleSavePackagingLine(objectState, dispatch);
      }

      navigation.pop();
    },
    [handleSavePackaging, handleSavePackagingLine, navigation],
  );

  return (
    <FormView
      formKey="stock_logisticalFormPackagingItem"
      defaultValue={defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-packaging',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({objectState, dispatch}) =>
            handleSave(objectState, dispatch),
        },
        {
          key: 'update-packaging',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({objectState, dispatch}) =>
            handleSave(objectState, dispatch),
        },
      ]}
    />
  );
};

export default LogisticalFormPackagingItemFormScreen;
