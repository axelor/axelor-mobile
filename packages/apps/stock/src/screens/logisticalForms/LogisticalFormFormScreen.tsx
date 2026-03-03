/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  FormView,
  useDispatch,
  useSelector,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  createLogisticalForm,
  fetchLogisticalForm,
  updateLogisticalForm,
} from '../../features/logisticalFormSlice';

const LogisticalFormFormScreen = ({navigation, route}: any) => {
  const {logisticalFormId} = route?.params ?? {};
  const _dispatch = useDispatch();
  const {LogisticalForm} = useTypes();

  const {logisticalForm} = useSelector(state => state.logisticalForm);

  const isCreation = useMemo(
    () => logisticalFormId == null,
    [logisticalFormId],
  );

  useEffect(() => {
    if (logisticalFormId != null) {
      _dispatch((fetchLogisticalForm as any)({logisticalFormId}));
    }
  }, [_dispatch, logisticalFormId]);

  const defaultValue = useMemo(() => {
    if (isCreation || logisticalForm?.id !== logisticalFormId) {
      return null;
    }

    return {...logisticalForm};
  }, [isCreation, logisticalForm, logisticalFormId]);

  const creationDefaultValue = useMemo(
    () => ({
      statusSelect: LogisticalForm?.statusSelect?.Provision,
    }),
    [LogisticalForm?.statusSelect?.Provision],
  );

  const handleSaveAPI = useCallback(
    ({dispatch, objectState}) => {
      const sliceFct: any = isCreation
        ? createLogisticalForm
        : updateLogisticalForm;

      dispatch(sliceFct(objectState)).then((res: any) => {
        if (isCreation) {
          const _recordId = res?.payload?.logisticalFormId;

          if (_recordId) {
            navigation.replace('LogisticalFormDetailsScreen', {
              logisticalFormId: _recordId,
            });
          } else {
            navigation.pop();
          }
        } else {
          navigation.popTo('LogisticalFormDetailsScreen', {
            logisticalFormId: objectState.id,
          });
        }
      });
    },
    [isCreation, navigation],
  );

  return (
    <FormView
      formKey="stock_logisticalForm"
      defaultValue={defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-logistical-form',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => !isCreation,
          customAction: handleSaveAPI,
        },
        {
          key: 'update-logistical-form',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => isCreation,
          customAction: handleSaveAPI,
        },
      ]}
    />
  );
};

export default LogisticalFormFormScreen;
