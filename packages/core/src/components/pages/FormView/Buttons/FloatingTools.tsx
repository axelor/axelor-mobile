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

import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {FloatingButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {FormActionType, FormatedAction} from '../../../../forms';
import {ConfirmationPopup} from '../Alerts';

const CONTAINER_ZINDEX = 50;

const DEFAULT_ALERT_STATE = {
  visible: false,
  onPress: () => {},
};

const findAction = (
  actions: FormatedAction[],
  type: FormActionType,
): FormatedAction => {
  return actions
    .filter(_action => _action.customComponent == null)
    .find(_action => _action.type === type);
};

const getOnPress = (action: FormatedAction, wrapper): (() => void) => {
  return () => {
    if (action?.onPress == null) {
      return;
    }

    wrapper(action.onPress, action.needValidation);
  };
};

const FloatingTools = ({
  style,
  hideIf = false,
  isCreation = false,
  isDirty = false,
  toggleReadonly,
  actions,
  onCreate,
  onReset,
  onPressWrapper,
  defaultOpenValue = false,
}: {
  style?: any;
  hideIf?: boolean;
  isCreation?: boolean;
  isDirty?: boolean;
  toggleReadonly: () => void;
  actions: FormatedAction[];
  onCreate?: () => void;
  onReset?: () => void;
  onPressWrapper: (onPress: () => void, needValidation: boolean) => void;
  defaultOpenValue?: boolean;
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const createAction = useMemo(() => findAction(actions, 'create'), [actions]);
  const updateAction = useMemo(() => findAction(actions, 'update'), [actions]);
  const deleteAction = useMemo(() => findAction(actions, 'delete'), [actions]);
  const resetAction = useMemo(
    () =>
      findAction(actions, 'reset') ?? {
        key: 'default-reset',
        type: 'reset' as FormActionType,
        onPress: onReset,
        isDisabled: false,
      },
    [actions, onReset],
  );

  const [alertConfig, setAlertConfig] = useState(DEFAULT_ALERT_STATE);

  if (hideIf) {
    return null;
  }

  return (
    <View style={{zIndex: CONTAINER_ZINDEX}}>
      <ConfirmationPopup
        visible={alertConfig.visible}
        handleClose={() => setAlertConfig(DEFAULT_ALERT_STATE)}
        handleConfirm={() => {
          setAlertConfig(DEFAULT_ALERT_STATE);
          alertConfig.onPress();
        }}
      />
      <FloatingButton
        style={style}
        actions={[
          {
            key: 'formAction_create',
            iconName: 'plus-lg',
            onPress: () =>
              isDirty
                ? setAlertConfig({visible: true, onPress: onCreate})
                : onCreate,
            color: Colors.infoColor,
            hideIf: createAction == null,
          },
          {
            key: 'formAction_save',
            iconName: 'floppy-fill',
            onPress: getOnPress(
              isCreation ? createAction : updateAction,
              onPressWrapper,
            ),
            color: Colors.successColor,
            indicator: isDirty,
          },
          {
            key: 'formAction_cancel',
            iconName: 'eraser-fill',
            onPress: () =>
              isDirty
                ? setAlertConfig({
                    visible: true,
                    onPress: getOnPress(resetAction, onPressWrapper),
                  })
                : getOnPress(resetAction, onPressWrapper),
            color: Colors.cautionColor,
            closeOnPress: false,
          },
          {
            key: 'formAction_delete',
            iconName: 'trash-fill',
            onPress: () =>
              isDirty
                ? setAlertConfig({
                    visible: true,
                    onPress: getOnPress(deleteAction, onPressWrapper),
                  })
                : getOnPress(deleteAction, onPressWrapper),
            color: Colors.errorColor,
            closeOnPress: true,
            hideIf: deleteAction == null,
          },
        ]}
        iconName="pencil-fill"
        closeIconName="box-arrow-down-left"
        closeOnOutsideClick={false}
        translator={I18n.t}
        useCircleStyle
        onGlobalPress={toggleReadonly}
        defaultOpenValue={defaultOpenValue}
      />
    </View>
  );
};

export default FloatingTools;
