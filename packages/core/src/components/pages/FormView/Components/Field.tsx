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

import React, {memo, useCallback, useState, useMemo} from 'react';
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  Checkbox,
  FormHtmlInput,
  FormIncrementInput,
  FormInput,
  InfoBubble,
  Label,
  StarScore,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {
  DisplayField,
  getColSpanWidth,
  getKeyboardType,
  getWidget,
  getZIndexStyle,
  validateFieldSchema,
} from '../../../../forms';
import {DateInput, SignatureInput} from '../../../organisms';
import {UploadFileInput} from '../../../molecules';
import {CustomPasswordInput} from '../Custom';

interface FieldProps {
  handleFieldChange: (newValue: any, fieldName?: string) => void;
  _field: DisplayField;
  object: any;
  storeState: any;
  permission?: {hidden?: boolean; readonly?: boolean};
  parentReadonly?: boolean;
  zIndex: number;
}

const Field = ({
  handleFieldChange,
  _field,
  object,
  storeState,
  permission,
  parentReadonly = false,
  zIndex,
}: FieldProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const value = object?.[_field.key];

  const {hidden, readonly} = permission ?? {};

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
    (_value: any, isMassChange: boolean = false) => {
      if (!isMassChange) handleValidate(_value);
      handleFieldChange(_value, isMassChange ? undefined : _field.key);
    },
    [_field.key, handleFieldChange, handleValidate],
  );

  const isHidden = useMemo(
    () => hidden || _field.hideIf?.({objectState: object, storeState}),
    [_field, hidden, object, storeState],
  );

  const isRequired = useMemo(
    () =>
      _field.required || _field.requiredIf?.({objectState: object, storeState}),
    [_field, object, storeState],
  );

  const isReadonly = useMemo(
    () =>
      readonly ||
      parentReadonly ||
      _field.readonly ||
      _field.readonlyIf?.({objectState: object, storeState}),
    [_field, object, parentReadonly, readonly, storeState],
  );

  const colSpanWidth = useMemo(
    () => getColSpanWidth(_field.colSpan),
    [_field.colSpan],
  );

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () =>
      colSpanWidth == null
        ? null
        : [styles.colSpanContainer, {width: colSpanWidth}],
    [colSpanWidth],
  );

  const fieldStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      width:
        colSpanWidth != null
          ? '100%'
          : `${_field.parentPanel != null ? 100 : 90}%`,
      alignSelf: 'center',
    }),
    [_field.parentPanel, colSpanWidth],
  );

  const getComponent = () => {
    switch (getWidget(_field)) {
      case 'custom':
        return _field.customComponent?.({
          style: fieldStyle,
          title: I18n.t(_field.titleKey),
          defaultValue: value,
          onChange: handleChange,
          required: isRequired,
          readonly: isReadonly,
          objectState: object,
          ..._field.options,
        });
      case 'checkbox':
        return (
          <Checkbox
            style={[
              fieldStyle,
              styles.checkbox,
              colSpanWidth != null && styles.checkboxColSpan,
            ]}
            title={I18n.t(_field.titleKey)}
            isDefaultChecked={value}
            onChange={handleChange}
            disabled={isReadonly}
            {..._field.options}
          />
        );
      case 'star':
        return (
          <StarScore
            size={25}
            score={value}
            onPress={handleChange}
            editMode={!isReadonly}
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
            required={isRequired}
            readonly={isReadonly}
            {..._field.options}
          />
        );
      case 'signature':
        return (
          <SignatureInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            defaultValue={value}
            onChange={handleChange}
            required={isRequired}
            readonly={isReadonly}
            popup={true}
            {..._field.options}
          />
        );
      case 'date':
        return (
          <DateInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            mode={_field.type as 'date' | 'datetime' | 'time'}
            defaultDate={value ? new Date(value) : undefined}
            onDateChange={_date => {
              if (_date) {
                const isoDate = _date.toISOString();
                if (_field.type === 'datetime') {
                  handleChange(isoDate);
                } else {
                  const tmp = isoDate?.split('T');
                  handleChange(_field.type === 'date' ? tmp[0] : tmp[1]);
                }
              } else {
                handleChange(null);
              }
            }}
            required={isRequired}
            readonly={isReadonly}
            nullable={true}
            {..._field.options}
          />
        );
      case 'label':
        return (
          <Label
            style={fieldStyle}
            message={I18n.t(_field.titleKey)}
            {..._field.options}
          />
        );
      case 'password':
        return (
          <CustomPasswordInput
            style={fieldStyle}
            title={I18n.t(_field.titleKey)}
            defaultValue={value}
            onChange={handleChange}
            required={isRequired}
            readonly={isReadonly}
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
            required={isRequired}
            readonly={isReadonly}
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
            required={isRequired}
            readOnly={isReadonly}
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
            required={isRequired}
            readOnly={isReadonly}
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
    <View style={[styles.container, containerStyle, getZIndexStyle(zIndex)]}>
      {_field.helperKey != null && (
        <InfoBubble
          iconName="info-lg"
          indication={I18n.t(_field.helperKey)}
          badgeColor={Colors.infoColor}
          size={15}
          style={[
            styles.info,
            _field.parentPanel != null ? styles.infoParent : null,
          ]}
          textIndicationStyle={styles.infoIndicator}
        />
      )}
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
    marginLeft: 15,
  },
  checkboxColSpan: {
    marginLeft: 0,
  },
  container: {
    alignSelf: 'center',
    width: '100%',
  },
  colSpanContainer: {
    paddingHorizontal: 2,
    paddingBottom: 2,
  },
  info: {
    position: 'absolute',
    left: 10,
    top: -2,
  },
  infoParent: {
    left: -8,
  },
  infoIndicator: {
    left: 20,
    width: Dimensions.get('window').width * 0.7,
  },
  error: {
    width: '90%',
    alignSelf: 'center',
  },
});

/**
 * Every prop but `object` and `parentReadonly` keeps a stable reference for a
 * given form configuration, so the comparison lets the field skip the renders
 * of the form which do not change its own data.
 */
export default memo(Field);
