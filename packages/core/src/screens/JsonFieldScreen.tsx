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
import {FormView} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchJsonFieldsOfModel} from '../features/metaJsonFieldSlice';
import {mapStudioFields} from '../forms/studio/display.helpers';
import {Form, formConfigsProvider} from '../forms';

const FORM_KEY = 'attrs-form';

const JsonFieldScreen = ({route}) => {
  const {model, object} = route.params;
  const dispatch = useDispatch();

  const {fields: _fields} = useSelector((state: any) => state.metaJsonField);

  useEffect(() => {
    dispatch((fetchJsonFieldsOfModel as any)({modelName: model}));
  }, [dispatch, model]);

  const form: Form = useMemo(() => {
    const {fields, panels} = mapStudioFields(_fields);
    return {
      readonlyIf: () => false,
      fields,
      panels,
    };
  }, [_fields]);

  useEffect(() => {
    formConfigsProvider.registerFrom(FORM_KEY, form);
  }, [form]);

  return (
    <FormView
      actions={[]}
      formKey={FORM_KEY}
      defaultValue={object?.attrs == null ? {} : JSON.parse(object.attrs)}
    />
  );
};

export default JsonFieldScreen;
