import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {FloatingButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {FormActionType, FormatedAction} from '../../../../forms';
import {ConfirmationPopup} from '../Alerts';

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
  onPressWrapper,
}: {
  style?: any;
  hideIf?: boolean;
  isCreation?: boolean;
  isDirty?: boolean;
  toggleReadonly: () => void;
  actions: FormatedAction[];
  onCreate?: () => void;
  onPressWrapper: (onPress: () => void, needValidation: boolean) => void;
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const createAction = useMemo(() => findAction(actions, 'create'), [actions]);
  const resetAction = useMemo(() => findAction(actions, 'reset'), [actions]);
  const updateAction = useMemo(() => findAction(actions, 'update'), [actions]);
  const deleteAction = useMemo(() => findAction(actions, 'delete'), [actions]);

  const [alertConfig, setAlertConfig] = useState(DEFAULT_ALERT_STATE);

  if (hideIf) {
    return null;
  }

  return (
    <View>
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
            closeOnPress: true,
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
      />
    </View>
  );
};

export default FloatingTools;
