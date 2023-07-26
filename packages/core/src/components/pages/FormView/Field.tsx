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
import {StyleProp, ViewStyle} from 'react-native';
import {
  Checkbox,
  FormHtmlInput,
  FormIncrementInput,
  FormInput,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {DisplayField, States, getKeyboardType, getWidget} from '../../../forms';
import {useTranslator} from '../../../i18n';
import {useSelector} from '../../../redux/hooks';
import {UploadFileInput} from '../../molecules';
import {DateInput} from '../../organisms';

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
  const value = object?.[_field.key];

  const storeState = useSelector((state: any) => state);

  const handleChange = useCallback(
    (_value: any) => {
      handleFieldChange(_value, _field.key);
    },
    [_field.key, handleFieldChange],
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
    }),
    [_field],
  );

  if (isHidden) {
    return null;
  }

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
          title={I18n.t(_field.titleKey)}
          isDefaultChecked={value}
          onChange={handleChange}
          disabled={!isGlobalReadonly || _field.readonly}
          {..._field.options}
        />
      );
    case 'star':
      return (
        <StarScore
          score={value}
          onPress={handleChange}
          editMode={!isGlobalReadonly || _field.readonly}
          showMissingStar={true}
          {..._field.options}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          title={I18n.t(_field.titleKey)}
          isDefaultChecked={value}
          onChange={handleChange}
          disabled={!isGlobalReadonly || _field.readonly}
          {..._field.options}
        />
      );
    case 'file':
      return (
        <UploadFileInput
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
          title={I18n.t(_field.titleKey)}
          mode={_field.type as 'date' | 'datetime'}
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

export default Field;
