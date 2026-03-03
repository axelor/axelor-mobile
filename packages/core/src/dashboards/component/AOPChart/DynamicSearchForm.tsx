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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {FormView} from '../../../components';
import {formConfigsProvider, mapStudioFields} from '../../../forms';

const FORM_KEY = 'AOPField-form';

const PhantomComponent = ({objectState, onChange}) => {
  useEffect(() => {
    onChange(objectState);
  }, [objectState, onChange]);

  return null;
};

const formatChartFields = (data: any[]): any[] => {
  return data.map(_field => {
    return {
      name: _field.name,
      title: _field.title,
      type: _field.type ?? 'string',
      required: _field.widgetAttrs?.required === 'true',
      isSelectionField: _field.selectionList?.length > 0,
      selectionList: _field.selectionList,
      widgetAttrs: JSON.stringify(_field.widgetAttrs ?? {}),
      targetModel: _field.target,
    };
  });
};

const DynamicSearchForm = ({fields, values, actionViewName, onChange}) => {
  const Colors = useThemeColor();

  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const renderPhantomComponent = useCallback(
    ({objectState = {}}) => {
      return <PhantomComponent onChange={onChange} objectState={objectState} />;
    },
    [onChange],
  );

  const chartFields = useMemo(() => formatChartFields(fields), [fields]);

  const hasOptionalFields = useMemo(
    () => chartFields.some((item: any) => !item.required),
    [chartFields],
  );

  const formattedFields = useMemo(() => {
    const updatedFields = chartFields.filter(
      _f => !showOptionalFields || _f.required,
    );

    const {fields: _fields} = mapStudioFields(updatedFields, Colors);

    _fields.phantomComponent = {
      type: 'object',
      widget: 'custom',
      customComponent: renderPhantomComponent,
    };

    return _fields;
  }, [Colors, chartFields, renderPhantomComponent, showOptionalFields]);

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
    <>
      <FormView
        style={styles.form}
        styleScreen={styles.screen}
        actions={[]}
        formKey={_formKey}
        isCustom={true}
        defaultValue={values}
        floatingTools={false}
      />
      <Icon
        name={showOptionalFields ? 'chevron-down' : 'chevron-up'}
        visible={hasOptionalFields}
        touchable
        onPress={() => setShowOptionalFields(prev => !prev)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingBottom: 0,
  },
  screen: {
    backgroundColor: undefined,
    flex: undefined,
  },
});

export default DynamicSearchForm;
