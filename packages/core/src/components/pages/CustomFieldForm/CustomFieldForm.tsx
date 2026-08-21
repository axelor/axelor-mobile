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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {handlerApiCall} from '../../../apiProviders';
import {useSelector} from '../../../redux/hooks';
import {
  Action,
  fetchJsonFieldsOfModel,
  fetchObject,
  fetchSelectionMap,
  formConfigsProvider,
  getAttrsValue,
  mapFormToStudioFields,
  mapStudioFields,
  mapStudioFieldsWithFormula,
  updateJsonFieldsObject,
  useFieldPermitter,
  useRoleFilter,
} from '../../../forms';
import {FormView} from '../../pages';

const FORM_KEY = 'customField-form';

interface JsonAction extends Action {
  useDefaultAction?: boolean;
  showToast?: boolean;
  postActions?: (res: any) => void;
}

interface CustomFieldFormProps {
  style?: any;
  model: string;
  modelId: number;
  fieldType?: string;
  additionalActions?: JsonAction[];
  readonly?: boolean;
  readonlyButton?: boolean;
  hideButtonBackground?: boolean;
  hideFormBackground?: boolean;
}

const CustomFieldForm = ({
  style,
  model: modelName,
  modelId,
  fieldType,
  additionalActions = [],
  readonly = false,
  readonlyButton = false,
  hideButtonBackground,
  hideFormBackground,
}: CustomFieldFormProps) => {
  const Colors = useThemeColor();

  const {userId} = useSelector(state => state.auth);

  const [_fields, setFields] = useState<any>();
  const [object, setObject] = useState<any>();
  const [selectionMap, setSelectionMap] = useState<any>();

  const userRoleIds = useRoleFilter();
  const removeUnauthorizedFields = useFieldPermitter({modelName});

  useEffect(() => {
    fetchJsonFieldsOfModel({modelName, type: fieldType, userRoleIds})
      .then(res => setFields(res?.data?.data))
      .catch(() => setFields(undefined));

    fetchObject({modelName, id: modelId})
      .then(res => setObject(res?.data?.data?.[0]))
      .catch(() => setObject(undefined));
  }, [modelName, modelId, fieldType, userRoleIds]);

  useEffect(() => {
    if (!Array.isArray(_fields)) return;

    fetchSelectionMap({
      modelName,
      selections: _fields.map(_item => _item.selection),
    })
      .then(res => setSelectionMap(res))
      .catch(() => setSelectionMap({}));
  }, [_fields, modelName]);

  const {fields, panels, defaults} = useMemo(() => {
    if (_fields != null && selectionMap == null)
      return {fields: {}, panels: {}, defaults: {}};

    const authorizedFields = Array.isArray(_fields)
      ? _fields.map(removeUnauthorizedFields)
      : _fields;

    return mapStudioFields(
      mapStudioFieldsWithFormula(authorizedFields, object),
      Colors,
      selectionMap,
    );
  }, [Colors, _fields, object, removeUnauthorizedFields, selectionMap]);

  const formKey = useMemo(
    () => `${FORM_KEY}_${fieldType}_${readonly}`,
    [fieldType, readonly],
  );

  useEffect(() => {
    formConfigsProvider.registerForm(
      formKey,
      {readonlyIf: () => readonly, fields, panels, modelName},
      {replaceOld: true},
    );
  }, [fields, formKey, modelName, panels, readonly]);

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
              handlerApiCall({
                fetchFunction: updateJsonFieldsObject,
                data: {
                  modelName,
                  id: object?.id,
                  version: object?.version,
                  values: mapFormToStudioFields(_fields, objectState),
                },
                action: 'Base_SliceAction_UpdateJsonFieldsObject',
                getState: () => ({auth: {userId}}),
                responseOptions: {
                  isArrayResponse: false,
                  showToast:
                    _action.showToast != null ? _action.showToast : true,
                },
              }).then(res => {
                setObject(res);
                _action.postActions?.(res);
              });
            },
          };
        } else return _action;
      }),
    [
      _fields,
      additionalActions,
      modelName,
      object?.id,
      object?.version,
      userId,
    ],
  );

  return (
    <FormView
      style={[styles.formView, style]}
      styleScreen={hideFormBackground && styles.screen}
      hideButtonBackground={hideButtonBackground}
      actions={_additionalActions}
      formKey={formKey}
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
  screen: {
    backgroundColor: undefined,
  },
});

export default CustomFieldForm;
