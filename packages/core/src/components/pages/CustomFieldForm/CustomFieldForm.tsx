/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useEffect, useMemo} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {FormView} from '../../pages/';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchJsonFieldsOfModel,
  fetchObject,
  updateJsonFieldsObject,
} from '../../../features/metaJsonFieldSlice';
import {
  Action,
  formConfigsProvider,
  getAttrsValue,
  mapFormToStudioFields,
  mapStudioFields,
  mapStudioFieldsWithFormula,
} from '../../../forms';

const FORM_KEY = 'customField-form';

interface JsonAction extends Action {
  useDefaultAction?: boolean;
  showToast?: boolean;
  postActions?: () => void;
}

interface CustomFieldFormProps {
  model: string;
  modelId: string;
  fieldType?: string;
  additionalActions?: JsonAction[];
}

const CustomFieldForm = ({
  model,
  modelId,
  fieldType = null,
  additionalActions = [],
}: CustomFieldFormProps) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {fields: _fields, object} = useSelector(
    (state: any) => state.metaJsonField,
  );

  useEffect(() => {
    dispatch(
      (fetchJsonFieldsOfModel as any)({modelName: model, type: fieldType}),
    );
    dispatch((fetchObject as any)({modelName: model, id: modelId}));
  }, [dispatch, model, modelId, fieldType]);

  const {fields, panels, defaults} = useMemo(
    () => mapStudioFields(mapStudioFieldsWithFormula(_fields, object), Colors),
    [Colors, _fields, object],
  );

  useEffect(() => {
    formConfigsProvider.registerForm(
      FORM_KEY,
      {
        readonlyIf: () => false,
        fields,
        panels,
      },
      {replaceOld: true},
    );
  }, [fields, panels]);

  const attrsValues = useMemo(() => getAttrsValue(object), [object]);

  const _additionalActions: Action[] = useMemo(
    () =>
      (additionalActions ?? []).map(_action => {
        if (_action?.useDefaultAction) {
          return {
            ..._action,
            customAction: ({objectState}) => {
              dispatch(
                (updateJsonFieldsObject as any)({
                  modelName: model,
                  id: object.id,
                  version: object.version,
                  values: mapFormToStudioFields(_fields, objectState),
                  showToast:
                    _action.showToast != null ? _action.showToast : true,
                }),
              ).then(() => {
                _action.postActions?.();
              });
            },
          };
        } else {
          return _action;
        }
      }),
    [_fields, additionalActions, dispatch, model, object?.id, object?.version],
  );

  return (
    <FormView
      actions={_additionalActions}
      formKey={FORM_KEY}
      defaultValue={attrsValues == null ? {...defaults} : attrsValues}
    />
  );
};

export default CustomFieldForm;
