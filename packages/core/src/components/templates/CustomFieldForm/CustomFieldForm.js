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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {FormView} from '../../pages/';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchJsonFieldsOfModel,
  fetchObject,
} from '../../../features/metaJsonFieldSlice';
import {
  formConfigsProvider,
  mapStudioFields,
  mapStudioFieldsWithFormula,
} from '../../../forms';
import {isEmpty} from '../../../utils';

const FORM_KEY = 'attrs-form-test';

const CustomFieldForm = ({model, modelId, type}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {fields: _fields, object} = useSelector(state => state.metaJsonField);

  const refresh = useCallback(() => {
    dispatch(fetchJsonFieldsOfModel({modelName: model, type: type}));
    dispatch(fetchObject({modelName: model, id: modelId}));
  }, [dispatch, model, modelId, type]);

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
      .forEach(([_, value]) => {
        result = {...result, ...JSON.parse(value)};
      });

    return result;
  }, [object]);

  return (
    <FormView
      actions={[]}
      formKey={FORM_KEY}
      defaultValue={attrsValues == null ? {...defaults} : attrsValues}
    />
  );
};

export default CustomFieldForm;
