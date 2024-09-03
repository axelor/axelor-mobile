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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {FormView} from '../../../components';
import {formConfigsProvider, mapStudioFields} from '../../../forms';

const FORM_KEY = 'AOPField-form';

const PhantomComponent = ({objectState, onChange}) => {
  useEffect(() => {
    onChange(objectState);
  }, [objectState, onChange]);

  return null;
};

const DynamicSearchForm = ({fields, values, actionViewName, onChange}) => {
  const Colors = useThemeColor();

  const addCustomFieldProperty = useCallback(_fields => {
    return _fields.map(field => ({
      ...field,
      ifFromGraphForm: true,
    }));
  }, []);

  const renderPhantomComponent = useCallback(
    ({objectState = {}}) => {
      return <PhantomComponent onChange={onChange} objectState={objectState} />;
    },
    [onChange],
  );

  const formatFields = useCallback(
    (_fields: any[]) => {
      const updatedFields = addCustomFieldProperty(_fields);

      const {
        fields: formattedFields,
        panels,
        defaults,
      } = mapStudioFields(updatedFields, Colors, item => item);

      formattedFields.phantomComponent = {
        type: 'object',
        widget: 'custom',
        isPhantom: true,
        customComponent: renderPhantomComponent,
      };

      return {formattedFields, panels, defaults};
    },
    [Colors, addCustomFieldProperty, renderPhantomComponent],
  );

  const {formattedFields} = useMemo(
    () => formatFields(fields),
    [formatFields, fields],
  );

  const _formKey = useMemo(
    () => `${FORM_KEY}${actionViewName}-${Math.random()}`,
    [actionViewName],
  );

  useEffect(() => {
    formConfigsProvider.registerForm(
      _formKey,
      {
        fields: formattedFields,
        modelName: 'com.axelor.apps.mobilesettings.db.MobileDashboard',
      },
      {replaceOld: true},
    );
  }, [formattedFields, _formKey]);

  return (
    <FormView
      style={styles.form}
      actions={[]}
      formKey={_formKey}
      isCustom={true}
      defaultValue={values}
      floatingTools={false}
      styleScreen={styles.screen}
      toggleOptionalFields={true}
    />
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 10,
    backgroundColor: null,
  },
  screen: {
    backgroundColor: null,
    marginBottom: -100,
  },
});

export default DynamicSearchForm;
