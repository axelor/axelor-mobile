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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  KeyboardAvoidingScrollView,
  Screen,
  WarningCard,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {
  Action,
  DisplayField,
  DisplayPanel,
  getButtonTitleKey,
  getConfigItems,
  getFields,
  getValidationErrors,
  getZIndexStyle,
  isField,
  isObjectMissingRequiredField,
  mapErrorWithTranslationKey,
  sortContent,
  updateRequiredFieldsOfConfig,
  useFormConfig,
  validateSchema,
} from '../../../forms';
import {Field as FieldComponent, Panel as PanelComponent} from './Components';
import {ConstraintsValidatorPopup} from './Alerts';
import {
  clearRecord,
  createRecord,
  refreshRecord,
  updateRecord,
} from '../../../features/formSlice';
import {isEmpty} from '../../../utils';

interface FormProps {
  defaultValue?: any;
  formKey: string;
  actions: Action[];
}

const FormView = ({defaultValue, formKey, actions}: FormProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {config} = useFormConfig(formKey);

  const storeState = useSelector((state: any) => state);
  const {record} = useSelector((state: any) => state.form);

  const [object, setObject] = useState(defaultValue ?? {});
  const [errors, setErrors] = useState<any[]>();

  const formContent: (DisplayPanel | DisplayField)[] = useMemo(
    () => sortContent(config),
    [config],
  );

  useEffect(() => {
    mapErrorWithTranslationKey();
  }, []);

  useEffect(() => {
    dispatch(clearRecord());
  }, [dispatch]);

  useEffect(() => {
    setObject(_current => {
      if (isEmpty(record)) {
        if (isEmpty(defaultValue) || _current === defaultValue) {
          return _current;
        } else {
          return defaultValue;
        }
      }

      if (_current === record) {
        return _current;
      } else {
        return record;
      }
    });
  }, [defaultValue, record]);

  const handleFieldChange = (newValue: any, fieldName: string) => {
    setObject(_current => {
      if (_current?.[fieldName] === newValue) {
        return _current;
      }

      const updatedObject = _current != null ? {..._current} : null;

      updatedObject[fieldName] = newValue;

      getFields(config)
        .filter(_field => _field.dependsOn != null)
        .filter(_field => Object.keys(_field.dependsOn).includes(fieldName))
        .forEach(_field => {
          updatedObject[_field.key] = _field.dependsOn[fieldName]({
            newValue,
            storeState,
            objectState: updatedObject,
            dispatch,
          });
        });

      return updatedObject;
    });
  };

  const getButtonConfig = (
    _action: Action,
  ): {title: string; onPress: (value?: any) => void} => {
    const buttonConfig: any = {title: getButtonTitleKey(_action)};

    if (_action.customAction != null) {
      buttonConfig.onPress = () =>
        _action.customAction({
          handleObjectChange: setObject,
          objectState: object,
          storeState,
          handleReset,
          dispatch,
        });
    } else {
      switch (_action.type) {
        case 'create':
          buttonConfig.onPress = () => {
            dispatch(
              (createRecord as any)({
                modelName: config.modelName,
                data: object,
              }),
            );
            handleReset();
          };
          break;
        case 'update':
          buttonConfig.onPress = () => {
            dispatch(
              (updateRecord as any)({
                modelName: config.modelName,
                data: object,
              }),
            );
          };
          break;
        case 'refresh':
          buttonConfig.onPress = () => {
            dispatch(
              (refreshRecord as any)({
                modelName: config.modelName,
                id: object?.id,
              }),
            );
          };
          break;
        case 'reset':
          buttonConfig.onPress = handleReset;
          break;
        default:
          buttonConfig.onPress = () => console.log(object);
          break;
      }
    }

    return buttonConfig;
  };

  const renderAction = (_action: Action) => {
    if (_action.hideIf?.({objectState: object, storeState})) {
      return null;
    }

    const buttonConfig = getButtonConfig(_action);
    const isDisabled =
      (_action.needRequiredFields
        ? isObjectMissingRequiredField(
            object,
            updateRequiredFieldsOfConfig(config, {
              objectState: object,
              storeState,
            }),
          )
        : false) || _action.disabledIf?.({objectState: object, storeState});

    return (
      <Button
        key={_action.key}
        iconName={_action.iconName}
        color={_action.color}
        title={I18n.t(buttonConfig.title)}
        onPress={() =>
          handleValidate(buttonConfig.onPress, _action.needValidation)
        }
        disabled={isDisabled}
      />
    );
  };

  const handleValidate = (_action, needValidation) => {
    if (needValidation) {
      return validateSchema(config, object)
        .then(() => {
          _action(object);
        })
        .catch(_error => {
          setErrors(getValidationErrors(_error));
        });
    }

    return new Promise<void>(resolve => {
      _action(object);
      resolve();
    });
  };

  const handleReset = () => {
    setObject(defaultValue ?? {});
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
          formContent={getConfigItems(config)}
        />
      );
    }

    return (
      <PanelComponent
        key={`${item.key} - ${item.order}`}
        renderItem={renderItem}
        formContent={getConfigItems(config)}
        _panel={item as DisplayPanel}
      />
    );
  };

  if (config == null) {
    return (
      <View>
        <WarningCard errorMessage={I18n.t('Base_FormNotFound')} />
      </View>
    );
  }

  return (
    <Screen
      fixedItems={actions.length === 0 ? undefined : actions.map(renderAction)}
      removeSpaceOnTop={true}>
      <KeyboardAvoidingScrollView
        keyboardOffset={{
          ios: 70,
          android: 100,
        }}
        style={styles.scroll}>
        {Array.isArray(errors) && (
          <ConstraintsValidatorPopup
            onContinue={() => setErrors(null)}
            errors={errors}
          />
        )}
        <View style={[styles.container, getZIndexStyle(5)]}>
          {formContent.map(renderItem)}
        </View>
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
  },
});

export default FormView;
