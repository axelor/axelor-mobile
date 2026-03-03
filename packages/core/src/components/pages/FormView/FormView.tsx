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
import {StyleSheet, View} from 'react-native';
import {
  Button,
  KeyboardAvoidingScrollView,
  Screen,
  WarningCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../../../redux/hooks';
import {useTranslator} from '../../../i18n';
import {usePermitted} from '../../../permissions';
import {
  Action,
  DisplayField,
  DisplayPanel,
  FormatedAction,
  getActionConfig,
  getConfigItems,
  getFields,
  getValidationErrors,
  getZIndexStyle,
  isField,
  mapErrorWithTranslationKey,
  sortContent,
  useFormConfig,
  validateSchema,
} from '../../../forms';
import {Field as FieldComponent, Panel as PanelComponent} from './Components';
import {ConstraintsValidatorPopup} from './Alerts';
import {clearRecord} from '../../../features/formSlice';
import {areObjectsEquals, isEmpty} from '../../../utils';
import {FloatingTools} from './Buttons';

interface FormProps {
  style?: any;
  defaultValue?: any;
  creationDefaultValue?: any;
  formKey: string;
  isCustom?: boolean;
  actions: Action[];
  floatingTools?: boolean;
  defaultEditMode?: boolean;
  styleScreen?: any;
  hideButtonBackground?: boolean;
}

const FormView = ({
  style,
  defaultValue,
  creationDefaultValue,
  formKey,
  isCustom = false,
  actions: _actions,
  floatingTools = true,
  defaultEditMode = false,
  styleScreen,
  hideButtonBackground = false,
}: FormProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {config} = useFormConfig(formKey);

  const storeState = useSelector((state: any) => state);
  const {record} = useSelector((state: any) => state.form);
  const {canCreate, canDelete, readonly} = usePermitted({
    modelName: config?.modelName,
  });

  const [object, setObject] = useState(
    defaultValue ?? creationDefaultValue ?? {},
  );
  const [errors, setErrors] = useState<any[]>();
  const [isReadonly, setIsReadonly] = useState<boolean>(
    floatingTools && !defaultEditMode,
  );
  const [buttonHeight, setButtonHeight] = useState<number>(0);

  const formContent: (DisplayPanel | DisplayField)[] = useMemo(
    () => sortContent(config),
    [config],
  );

  const isCreation = useMemo(
    () => !isCustom && object?.id == null,
    [isCustom, object?.id],
  );

  const isDirty = useMemo(() => {
    if (isCreation) {
      return true;
    }

    return !areObjectsEquals(defaultValue, object);
  }, [defaultValue, isCreation, object]);

  useEffect(() => {
    mapErrorWithTranslationKey();
  }, []);

  useEffect(() => {
    dispatch(clearRecord());
  }, [dispatch]);

  useEffect(() => {
    setObject(_current => {
      if (isEmpty(record)) {
        const _default = defaultValue ?? creationDefaultValue ?? {};
        if (_default == null || areObjectsEquals(_current, _default)) {
          return _current;
        } else {
          return _default;
        }
      }

      if (_current === record) {
        return _current;
      } else {
        return record;
      }
    });
  }, [creationDefaultValue, defaultValue, isCreation, record]);

  const handleFieldChange = (newValue: any, fieldName: string) => {
    setObject(_current => {
      if (_current?.[fieldName] === newValue) {
        return _current;
      }

      const updatedObject = _current != null ? {..._current} : {};

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

  const isButtonAuthorized = useCallback(
    (_action: Action) => {
      switch (_action.type) {
        case 'create':
          return canCreate;
        case 'update':
          return !readonly;
        case 'delete':
          return canDelete;
        default:
          return true;
      }
    },
    [canCreate, canDelete, readonly],
  );

  const toggleReadonlyMode = () => {
    setIsReadonly(currentState => !currentState);
  };

  const handleReset = useCallback(() => {
    setObject((isCreation ? creationDefaultValue : defaultValue) ?? {});
  }, [creationDefaultValue, defaultValue, isCreation]);

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

  const actions: FormatedAction[] = useMemo(() => {
    if (!Array.isArray(_actions) || _actions.length === 0) {
      return [];
    }

    return _actions
      .filter(
        _action =>
          isButtonAuthorized(_action) &&
          _action.hideIf?.({objectState: object, storeState}) !== true,
      )
      .map(_action =>
        getActionConfig(
          _action,
          config,
          {
            handleObjectChange: setObject,
            objectState: object,
            storeState,
            dispatch,
            handleReset,
          },
          I18n,
        ),
      );
  }, [
    I18n,
    _actions,
    config,
    dispatch,
    handleReset,
    isButtonAuthorized,
    object,
    storeState,
  ]);

  const renderAction = (_action: FormatedAction) => {
    const onPress = () =>
      handleValidate(() => {
        _action.onPress();
        if (_action.readonlyAfterAction) {
          toggleReadonlyMode();
        }
      }, _action.needValidation);

    if (_action.customComponent) {
      return React.cloneElement(_action.customComponent, {
        key: _action.key,
        onPress: onPress,
        objectState: object,
        handleObjectChange: setObject,
        disabled: _action.isDisabled,
      });
    }

    return (
      <Button
        key={_action.key}
        iconName={_action.iconName}
        color={_action.color}
        title={_action.title}
        onPress={onPress}
        disabled={_action.isDisabled}
      />
    );
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
      hideButtonBackground={hideButtonBackground}
      fixedItems={
        <View
          onLayout={({nativeEvent}) => {
            setButtonHeight(nativeEvent.layout.height);
          }}>
          {isReadonly
            ? undefined
            : actions
                .filter(_action => !floatingTools || _action.type === 'custom')
                .map(renderAction)}
        </View>
      }
      style={styleScreen}
      removeSpaceOnTop={true}>
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        style={styles.scroll}>
        {Array.isArray(errors) && (
          <ConstraintsValidatorPopup
            onContinue={() => setErrors(null)}
            errors={errors}
          />
        )}
        <View style={[styles.container, style, getZIndexStyle(5)]}>
          {formContent.map(renderItem)}
        </View>
      </KeyboardAvoidingScrollView>
      <FloatingTools
        hideIf={!floatingTools}
        style={{bottom: buttonHeight + 20}}
        toggleReadonly={toggleReadonlyMode}
        actions={actions}
        isCreation={isCreation}
        onCreate={() => setObject(creationDefaultValue)}
        onReset={handleReset}
        onPressWrapper={handleValidate}
        isDirty={isDirty}
        defaultOpenValue={defaultEditMode}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: null,
  },
  container: {
    alignItems: 'center',
    paddingBottom: 125,
  },
});

export default FormView;
