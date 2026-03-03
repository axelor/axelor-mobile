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

import {
  createRecord,
  deleteRecord,
  refreshRecord,
  updateRecord,
} from '../features/formSlice';
import {Action, ActionProps, Form, FormatedAction} from './types';
import {TranslatorProps} from '../i18n';
import {
  isObjectMissingRequiredField,
  updateRequiredFieldsOfConfig,
} from './validation.helpers';

const getActionPress = (
  action: Action,
  modelName: string,
  {
    handleObjectChange,
    objectState,
    storeState,
    dispatch,
    handleReset,
  }: ActionProps,
) => {
  if (action.customAction != null) {
    return () =>
      action.customAction({
        handleObjectChange,
        objectState,
        storeState,
        handleReset,
        dispatch,
      });
  } else {
    switch (action.type) {
      case 'create':
        return () => {
          dispatch(
            (createRecord as any)({
              modelName: modelName,
              data: objectState,
            }),
          );
          handleReset();
        };
      case 'update':
        return () => {
          dispatch(
            (updateRecord as any)({
              modelName: modelName,
              data: objectState,
            }),
          );
        };
      case 'refresh':
        return () => {
          dispatch(
            (refreshRecord as any)({
              modelName: modelName,
              id: objectState?.id,
            }),
          );
        };
      case 'delete':
        return () => {
          dispatch(
            (deleteRecord as any)({
              modelName: modelName,
              id: objectState?.id,
            }),
          );
          handleReset();
        };
      case 'reset':
        return handleReset;
      default:
        return () => console.log(objectState);
    }
  }
};

const getActionTittleKey = (action: Action) => {
  if (action.titleKey != null) {
    return action.titleKey;
  }

  switch (action.type) {
    case 'create':
      return 'Base_FormAction_Create';
    case 'update':
      return 'Base_FormAction_Update';
    case 'refresh':
      return 'Base_FormAction_Refresh';
    case 'reset':
      return 'Base_FormAction_Reset';
    default:
      return 'Base_FormAction_Save';
  }
};

export const getActionConfig = (
  action: Action,
  config: Form,
  {
    handleObjectChange,
    objectState,
    storeState,
    dispatch,
    handleReset,
  }: ActionProps,
  I18n: TranslatorProps,
): FormatedAction => {
  if (config == null) {
    return null;
  }

  const title = I18n.t(getActionTittleKey(action));
  const onPress = getActionPress(action, config.modelName, {
    handleObjectChange,
    objectState,
    storeState,
    dispatch,
    handleReset,
  });
  const isDisabled =
    (action.needRequiredFields
      ? isObjectMissingRequiredField(
          objectState,
          updateRequiredFieldsOfConfig(config, {
            objectState,
            storeState,
          }),
        )
      : false) || action.disabledIf?.({objectState, storeState});

  return {...action, title, isDisabled, onPress};
};
