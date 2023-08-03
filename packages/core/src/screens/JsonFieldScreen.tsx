/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {useDispatch, useSelector} from 'react-redux';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {FormView} from '../components';
import {
  fetchJsonFieldsOfModel,
  fetchObject,
} from '../features/metaJsonFieldSlice';
import {formConfigsProvider, mapStudioFields} from '../forms';
import {isEmpty} from '../utils';

const FORM_KEY = 'attrs-form';

const JsonFieldScreen = ({route}) => {
  const {model, modelId} = route.params;
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {fields: _fields, object} = useSelector(
    (state: any) => state.metaJsonField,
  );

  useEffect(() => {
    dispatch((fetchJsonFieldsOfModel as any)({modelName: model}));
    dispatch((fetchObject as any)({modelName: model, id: modelId}));
  }, [dispatch, model, modelId]);

  const {fields, panels, defaults} = useMemo(
    () => mapStudioFields(_fields, Colors),
    [Colors, _fields],
  );

  useEffect(() => {
    formConfigsProvider.registerFrom(FORM_KEY, {
      readonlyIf: () => false,
      fields,
      panels,
    });
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

  return (
    <FormView
      actions={[
        {
          key: 'refresh-config',
          type: 'refresh',
          customAction: () => {
            dispatch((fetchJsonFieldsOfModel as any)({modelName: model}));
          },
        },
      ]}
      formKey={FORM_KEY}
      defaultValue={attrsValues == null ? {...defaults} : attrsValues}
    />
  );
};

export default JsonFieldScreen;
