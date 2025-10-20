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
import {FormView} from '@axelor/aos-mobile-core';

type LineType = 'packaging' | 'product';

const LogisticalFormPackagingItemFormScreen = ({navigation, route}: any) => {
  const {
    logisticalFormId,
    logisticalForm: logisticalFormParam,
    parentPackaging,
    packaging,
    packagingLine,
    initialType = 'packaging',
  } = route?.params ?? {};

  const isEditingPackaging = packaging != null;
  const isEditingPackagingLine = packagingLine != null;

  const defaultValue = useMemo(() => {
    if (isEditingPackaging) {
      return {
        id: packaging?.id,
        version: packaging?.version,
        lineType: 'packaging' as LineType,
        packageUsed: packaging?.packageUsed,
        logisticalForm: packaging?.logisticalForm ?? logisticalFormParam,
        parentPackaging: packaging?.parentPackaging,
      };
    }

    if (isEditingPackagingLine) {
      return {
        ...packagingLine,
        lineType: 'product' as LineType,
        logisticalForm:
          packagingLine?.packaging?.logisticalForm ?? logisticalFormParam,
        parentPackaging: packagingLine?.packaging,
        stockMoveLine: packagingLine?.stockMoveLine,
        qty: packagingLine?.qty,
      };
    }

    return null;
  }, [
    isEditingPackaging,
    isEditingPackagingLine,
    packaging,
    logisticalFormParam,
    packagingLine,
  ]);

  const creationDefaultValue = useMemo(
    () => ({
      lineType: initialType as LineType,
      logisticalForm:
        logisticalFormParam ??
        (logisticalFormId ? {id: logisticalFormId} : undefined),
      parentPackaging,
    }),
    [initialType, logisticalFormId, logisticalFormParam, parentPackaging],
  );

  const handleSave = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <FormView
      formKey="stock_logisticalFormPackagingItem"
      defaultValue={defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'save-packaging',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: handleSave,
        },
      ]}
    />
  );
};

export default LogisticalFormPackagingItemFormScreen;
