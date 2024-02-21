import React, {useMemo} from 'react';
import {FloatingButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {FormActionType, FormatedAction} from '../../../../forms';

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

const BasicActionsButton = ({
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

  if (hideIf) {
    return null;
  }

  return (
    <FloatingButton
      style={style}
      actions={[
        {
          key: 'formAction_create',
          iconName: 'plus-lg',
          onPress: onCreate,
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
          onPress: getOnPress(resetAction, onPressWrapper),
          color: Colors.cautionColor,
          closeOnPress: true,
        },
        {
          key: 'formAction_delete',
          iconName: 'trash-fill',
          onPress: getOnPress(deleteAction, onPressWrapper),
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
  );
};

export default BasicActionsButton;
