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
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  CircleButton,
  KeyboardAvoidingScrollView,
  Screen,
  WarningCard,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {usePermitted} from '../../../permissions';
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
  isCustom?: boolean;
  actions: Action[];
  readonlyButton?: boolean;
}

const FormView = ({
  defaultValue,
  formKey,
  isCustom = false,
  actions: _actions,
  readonlyButton = false,
}: FormProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {config} = useFormConfig(formKey);

  const storeState = useSelector((state: any) => state);
  const {record} = useSelector((state: any) => state.form);
  const {canCreate, readonly} = usePermitted({modelName: config?.modelName});

  const [object, setObject] = useState(defaultValue ?? {});
  const [errors, setErrors] = useState<any[]>();
  const [isReadonly, setIsReadonly] = useState(readonlyButton);

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
        if (defaultValue == null || _current === defaultValue) {
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

  const isButtonAuthorized = (_action: Action) => {
    switch (_action.type) {
      case 'create':
        return canCreate;
      case 'update':
        return !readonly;
      default:
        return true;
    }
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
    if (
      !isButtonAuthorized(_action) ||
      _action.hideIf?.({objectState: object, storeState})
    ) {
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

    const originalOnPress = buttonConfig.onPress;

    buttonConfig.onPress = () => {
      originalOnPress();
      if (_action.readonlyAfterAction) {
        toggleReadonlyMode();
      }
    };

    if (_action.customComponent) {
      return React.cloneElement(_action.customComponent, {
        key: _action.key,
        onPress: () =>
          handleValidate(buttonConfig.onPress, _action.needValidation),
        disabled: isDisabled,
      });
    }

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

  const toggleReadonlyMode = () => {
    setIsReadonly(currentState => !currentState);
  };

  const handleReset = useCallback(() => {
    setObject(defaultValue ?? {});
  }, [defaultValue]);

  const actions: Action[] = useMemo(() => {
    return [
      {
        key: 'cancel-readonly',
        titleKey: 'Base_Cancel',
        type: 'custom',
        needValidation: true,
        customAction: () => {
          toggleReadonlyMode();
          handleReset();
        },
        hideIf: () => !readonlyButton,
        color: Colors.errorColor,
      },
      ...(_actions ?? []),
    ];
  }, [Colors.errorColor, _actions, handleReset, readonlyButton]);

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

  const renderItem = (item: DisplayPanel | DisplayField) => {
    if (isField(item)) {
      return (
        <FieldComponent
          key={`${item.key} - ${item.order}`}
          handleFieldChange={handleFieldChange}
          _field={item as DisplayField}
          object={object}
          modelName={config.modelName}
          globalReadonly={() =>
            isReadonly ||
            (config.readonlyIf &&
              config.readonlyIf({objectState: object, storeState}))
          }
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

  if (!isCustom && object?.id == null && !canCreate) {
    return (
      <View>
        <WarningCard errorMessage={I18n.t('Base_FormMissingCreateAccess')} />
      </View>
    );
  }

  return (
    <Screen
      fixedItems={
        actions.length === 0 || isReadonly
          ? undefined
          : actions.map(renderAction)
      }
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
      {readonlyButton && isReadonly && (
        <CircleButton
          style={styles.floatingButton}
          iconName="pencil-fill"
          onPress={toggleReadonlyMode}
        />
      )}
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
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});

export default FormView;
