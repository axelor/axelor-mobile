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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FormView} from '../../../components';
import {useThemeColor, ThemeColors} from '@axelor/aos-mobile-ui';
import {formConfigsProvider, mapStudioFields} from '../../../forms';

const FORM_KEY = 'AOPField-form';

const PhantomComponent = ({objectState, onChange}) => {
  console.log('objectState,', objectState);
  console.log('onChange', onChange);
  useEffect(() => {
    Object.keys(objectState).forEach(key => {
      onChange(key, objectState[key]);
    });
  }, [objectState, onChange]);

  return null;
};

const AOPSearchForm = ({fields, values, title, onChange}) => {
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const toggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  const removeUnauthorizedFields = item => {
    return item;
  };

  const formatFields = useCallback(
    (_fields: any[], colors: ThemeColors) => {
      console.log('ici');
      const {
        fields: formattedFields,
        panels,
        defaults,
      } = mapStudioFields(_fields, colors, removeUnauthorizedFields);

      formattedFields.phantomComponent = {
        type: 'object',
        widget: 'custom',
        customComponent: ({objectState}) => (
          <PhantomComponent onChange={onChange} objectState={objectState} />
        ),
      };

      return {formattedFields, panels, defaults};
    },
    [onChange],
  );

  const {formattedFields, panels, defaults} = useMemo(
    () => formatFields(fields, Colors),
    [formatFields, fields, Colors],
  );

  useEffect(() => {
    formConfigsProvider.registerForm(
      `${FORM_KEY}${title}`,
      {
        fields: {...formattedFields},
        modelName: 'com.axelor.apps.mobilesettings.db.MobileDashboard',
      },
      {replaceOld: true},
    );
  }, [formattedFields, title]);

  return (
    <FormView
      style={styles.form}
      actions={
        [
          /*
        {
          key: 'r',
          type: 'custom',
          customAction: ({objectState}) => {
            console.log('objectState', objectState);
            Object.keys(objectState).forEach(key => {
              console.log('key', key);
              onChange(key, objectState[key]);
            });
          },
        },*/
        ]
      }
      formKey={`${FORM_KEY}${title}`}
      isCustom={true}
      //defaultValue={values}
      floatingTools={false}
      styleSreen={styles.screen}
    />
    /* <View style={styles.form}>
    {fields.map(field => {
        const isRequired = field.widgetAttrs?.required;
        const shouldRender = isRequired || showOptionalFields;

        if (!shouldRender) {
          return null;
        }

        return (
          <AOPFormField
            key={field.name}
            field={field}
            value={values[field.name] || ''}
            onChange={onChange}
          />
        );
      })}
      {fields.some(field => !field.widgetAttrs?.required) && (
        <TouchableOpacity
          onPress={toggleOptionalFields}
          style={styles.chevronContainer}>
          <Icon name={showOptionalFields ? 'chevron-up' : 'chevron-down'} />
        </TouchableOpacity>
      )}
    </View>*/
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    form: {
      marginHorizontal: 10,
      backgroundColor: null,
    },
    screen: {
      backgroundColor: null,
      marginBottom: -100,
    },
    chevronContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
  });

export default AOPSearchForm;
