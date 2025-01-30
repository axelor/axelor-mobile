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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {FormView} from '../components';
import {
  fetchJsonFieldsOfModel,
  fetchObject,
  updateJsonFieldsObject,
} from '../features/metaJsonFieldSlice';
import {
  formConfigsProvider,
  mapFormToStudioFields,
  mapStudioFields,
  mapStudioFieldsWithFormula,
} from '../forms';
import {isEmpty} from '../utils';
import {headerActionsProvider} from '../header';
import {useTranslator} from '../i18n';

const FORM_KEY = 'attrs-form';

const JsonFieldScreen = ({route}) => {
  const {model, modelId} = route.params;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {fields: _fields, object} = useSelector(
    (state: any) => state.metaJsonField,
  );

  const refresh = useCallback(() => {
    dispatch((fetchJsonFieldsOfModel as any)({modelName: model}));
    dispatch((fetchObject as any)({modelName: model, id: modelId}));
  }, [dispatch, model, modelId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

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

  const attrsValues = useMemo(() => {
    if (isEmpty(object)) {
      return {};
    }

    let result = {};

    Object.entries(object)
      .filter(([key]) => key.toLowerCase().includes('attrs'))
      .forEach(([_, value]: [string, string]) => {
        result = {...result, ...JSON.parse(value)};
      });

    return result;
  }, [object]);

  useEffect(() => {
    headerActionsProvider.registerModel('core_metaJsonFields_details', {
      actions: [
        {
          key: 'refreshConfig',
          order: 10,
          showInHeader: false,
          iconName: 'redo',
          title: I18n.t('Base_Studio_RefreshConfig'),
          onPress: refresh,
        },
      ],
    });
  }, [I18n, refresh]);

  return (
    <FormView
      actions={[
        {
          key: 'validateChanges',
          type: 'custom',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({objectState}) => {
            dispatch(
              (updateJsonFieldsObject as any)({
                modelName: model,
                id: object.id,
                version: object.version,
                values: mapFormToStudioFields(_fields, objectState),
              }),
            );
          },
        },
      ]}
      formKey={FORM_KEY}
      defaultValue={attrsValues == null ? {...defaults} : attrsValues}
    />
  );
};

export default JsonFieldScreen;
