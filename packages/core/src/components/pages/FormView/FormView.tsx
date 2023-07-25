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

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  KeyboardAvoidingScrollView,
  Screen,
  WarningCard,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {
  DisplayField,
  DisplayPanel,
  Form,
  formConfigsProvider,
  getFields,
  getValidationErrors,
  isField,
  isObjectMissingRequiredField,
  sortContent,
  validateSchema,
} from '../../../forms';
import {default as FieldComponent} from './Field';
import {default as PanelComponent} from './Panel';
import {default as ConstraintsValidatorPopup} from './ConstraintsValidatorPopup';
import {useSelector} from '../../../redux/hooks';

const FormView = ({
  onSave,
  resetAfterSave = true,
  defaultValue = {},
  formKey,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const storeState = useSelector((state: any) => state);

  const [object, setObject] = useState(defaultValue);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>();

  const config: Form = useMemo(
    () => formConfigsProvider.getFormConfig(formKey),
    [formKey],
  );

  const formContent: (DisplayPanel | DisplayField)[] = useMemo(
    () => sortContent(config),
    [config],
  );

  const handleFieldChange = (newValue: any, fieldName: string) => {
    setObject(_current => {
      if (_current?.[fieldName] === newValue) {
        return _current;
      }

      const updatedObject = _current != null ? {..._current} : null;

      updatedObject[fieldName] = newValue;

      getFields(config)
        .filter(_field => _field.dependsOn?.fieldName === fieldName)
        .forEach(_field => {
          updatedObject[_field.key] = _field.dependsOn.onChange({
            newValue,
            storeState,
            objectState: updatedObject,
          });
        });

      setDisabledButton(isObjectMissingRequiredField(updatedObject, config));

      return updatedObject;
    });
  };

  const handleValidate = () => {
    validateSchema(config, object)
      .then(() => {
        onSave(object);

        if (resetAfterSave) {
          handleReset();
        }
      })
      .catch(_error => {
        setErrors(getValidationErrors(_error));
      });
  };

  const handleReset = () => {
    setObject(defaultValue);
  };

  const renderItem = (item: DisplayPanel | DisplayField) => {
    if (isField(item)) {
      return (
        <FieldComponent
          key={`${item.key} - ${item.order}`}
          handleFieldChange={handleFieldChange}
          _field={item as DisplayField}
          object={object}
          globalReadonly={config.readonlyIf}
        />
      );
    }

    return (
      <PanelComponent
        key={`${item.key} - ${item.order}`}
        renderItem={renderItem}
        _panel={item as DisplayPanel}
      />
    );
  };

  if (config == null) {
    return (
      <View>
        <WarningCard errorMessage={'Error'} />
      </View>
    );
  }

  return (
    <Screen
      fixedItems={
        <Button
          title={I18n.t('Base_Save')}
          onPress={handleValidate}
          disabled={disabledButton}
          color={disabledButton ? Colors.secondaryColor : Colors.primaryColor}
        />
      }>
      <KeyboardAvoidingScrollView style={styles.scroll}>
        {Array.isArray(errors) && (
          <ConstraintsValidatorPopup
            onContinue={() => setErrors(null)}
            errors={errors}
          />
        )}
        <View style={styles.container}>{formContent.map(renderItem)}</View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: null,
  },
  container: {
    alignItems: 'center',
    zIndex: 30,
  },
});

export default FormView;
