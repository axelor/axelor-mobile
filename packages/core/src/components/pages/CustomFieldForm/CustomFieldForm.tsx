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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {FormView} from '../../pages';
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
  useFieldPermitter,
} from '../../../forms';

const FORM_KEY = 'customField-form';

interface JsonAction extends Action {
  useDefaultAction?: boolean;
  showToast?: boolean;
  postActions?: (res: any) => void;
}

interface CustomFieldFormProps {
  model: string;
  modelId: number;
  fieldType?: string;
  additionalActions?: JsonAction[];
  readonly?: boolean;
  readonlyButton?: boolean;
}

const CustomFieldForm = ({
  model,
  modelId,
  fieldType = null,
  additionalActions = [],
  readonly = false,
  readonlyButton = false,
}: CustomFieldFormProps) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {fields: _fields, object} = useSelector(
    (state: any) => state.metaJsonField,
  );

  const removeUnauthorizedFields = useFieldPermitter({modelName: model});

  useEffect(() => {
    dispatch(
      (fetchJsonFieldsOfModel as any)({modelName: model, type: fieldType}),
    );
    dispatch((fetchObject as any)({modelName: model, id: modelId}));
  }, [dispatch, model, modelId, fieldType]);

  const {fields, panels, defaults} = useMemo(
    () =>
      mapStudioFields(
        mapStudioFieldsWithFormula(_fields, object),
        Colors,
        removeUnauthorizedFields,
      ),
    [Colors, _fields, object, removeUnauthorizedFields],
  );

  useEffect(() => {
    formConfigsProvider.registerForm(
      FORM_KEY,
      {
        readonlyIf: () => readonly,
        fields,
        panels,
        modelName: model,
      },
      {replaceOld: true},
    );
  }, [fields, model, panels, readonly]);

  const attrsValues = useMemo(
    () => (object?.id !== modelId ? null : getAttrsValue(object, fieldType)),
    [modelId, object, fieldType],
  );

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
              ).then(res => {
                _action.postActions?.(res?.payload);
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
      style={styles.formView}
      actions={_additionalActions}
      formKey={FORM_KEY}
      isCustom={true}
      defaultValue={attrsValues == null ? {...defaults} : attrsValues}
      floatingTools={readonlyButton}
    />
  );
};

const styles = StyleSheet.create({
  formView: {
    paddingBottom: 0,
  },
});

export default CustomFieldForm;
