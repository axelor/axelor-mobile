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

import React, {useCallback, useMemo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {
  Checkbox,
  FormHtmlInput,
  FormIncrementInput,
  FormInput,
  StarScore,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  DisplayField,
  States,
  getKeyboardType,
  getWidget,
  validateFieldSchema,
} from '../../../forms';
import {useTranslator} from '../../../i18n';
import {useSelector} from '../../../redux/hooks';
import {UploadFileInput} from '../../molecules';
import {DateInput} from '../../organisms';
import {View} from 'react-native';
import {useState} from 'react';

interface FieldProps {
  handleFieldChange: (newValue: any, fieldName: string) => void;
  _field: DisplayField;
  object: any;
  globalReadonly?: (values?: States) => boolean;
}

const Field = ({
  handleFieldChange,
  _field,
  object,
  globalReadonly = () => false,
}: FieldProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const value = object?.[_field.key];

  const storeState = useSelector((state: any) => state);

  const [error, setError] = useState<any>();

  const handleValidate = useCallback(
    (_value: any) => {
      validateFieldSchema(_field, _value)
        .then(() => {
          setError(null);
        })
        .catch(_error => {
          setError(`${_field.key} ${I18n.t(_error.message)}`);
        });
    },
    [I18n, _field],
  );

  const handleChange = useCallback(
    (_value: any) => {
      handleValidate(_value);

      handleFieldChange(_value, _field.key);
    },
    [_field.key, handleFieldChange, handleValidate],
  );

  const isHidden = useMemo(() => {
    return _field.hideIf({objectState: object, storeState: storeState});
  }, [_field, object, storeState]);

  const isGlobalReadonly = useMemo(() => {
    return globalReadonly({objectState: object, storeState: storeState});
  }, [globalReadonly, object, storeState]);

  const fieldStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: `${_field.parentPanel != null ? 100 : 90}%`,
      alignSelf: 'center',
    }),
    [_field],
  );

  const getComponent = () => {
    switch (getWidget(_field)) {
      case 'custom':
        return _field.customComponent({
          title: I18n.t(_field.titleKey),
          defaultValue: value,
          onChange: handleChange,
          required: _field.required,
          readonly: isGlobalReadonly || _field.readonly,
          ..._field.options,
        });
      case 'checkbox':
        return (
          <Checkbox
            style={[fieldStyle, styles.checkbox]}
            title={I18n.t(_field.titleKey)}
            isDefaultChecked={value}
            onChange={handleChange}
            disabled={isGlobalReadonly || _field.readonly}
            {..._field.options}
          />
        );
      case 'star':
        return (
          <StarScore
            score={value}
            onPress={handleChange}
            editMode={!isGlobalReadonly && !_field.readonly}
            showMissingStar={true}
            {..._field.options}
          />
        );
      case 'file':
        return (
          <UploadFileInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            defaultValue={value}
            onUpload={handleChange}
            required={_field.required}
            readonly={isGlobalReadonly || _field.readonly}
            {..._field.options}
          />
        );
      case 'date':
        return (
          <DateInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            mode={_field.type as 'date' | 'datetime' | 'time'}
            defaultDate={value ? new Date(value) : null}
            onDateChange={_date =>
              handleChange(_date.toISOString()?.split('T')[0])
            }
            required={_field.required}
            readonly={isGlobalReadonly || _field.readonly}
            {..._field.options}
          />
        );
      case 'HTML':
        return (
          <FormHtmlInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            defaultValue={value}
            onChange={handleChange}
            required={_field.required}
            readonly={isGlobalReadonly || _field.readonly}
            {..._field.options}
          />
        );
      case 'increment':
        return (
          <FormIncrementInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            defaultValue={value}
            onChange={handleChange}
            decimalSpacer={I18n.t('Base_DecimalSpacer')}
            thousandSpacer={I18n.t('Base_ThousandSpacer')}
            required={_field.required}
            readOnly={isGlobalReadonly || _field.readonly}
            keyboardType={getKeyboardType(_field)}
            {..._field.options}
          />
        );
      default:
        return (
          <FormInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            defaultValue={value}
            onChange={handleChange}
            required={_field.required}
            readOnly={isGlobalReadonly || _field.readonly}
            keyboardType={getKeyboardType(_field)}
            {..._field.options}
          />
        );
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <View style={styles.container}>
      {getComponent()}
      {error != null && (
        <Text textColor={Colors.errorColor.background} style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginVertical: 5,
  },
  container: {
    alignSelf: 'center',
    width: '100%',
    zIndex: 40,
  },
  error: {
    marginLeft: 5,
  },
});

export default Field;
