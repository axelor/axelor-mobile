import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, useThemeColor} from '@aos-mobile/ui';
import {useDispatch} from '../../redux/hooks';
import {
  markAllMailMessageAsRead,
  markMailMessageAsRead,
} from '../../features/mailMessageSlice';

const MailMessageReadIcon = ({
  allMessagesRead = false,
  mailMessageFlag,
  modelId,
  model,
}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const isRead =
    mailMessageFlag != null ? mailMessageFlag?.isRead : allMessagesRead;

  const handleMarkAsRead = useCallback(() => {
    dispatch(
      markMailMessageAsRead({
        mailFlagList: [mailMessageFlag],
        modelId,
        model,
      }),
    );
  }, [dispatch, mailMessageFlag, model, modelId]);

  const handleMarkAll = useCallback(() => {
    dispatch(
      markAllMailMessageAsRead({
        modelId,
        model,
      }),
    );
  }, [dispatch, model, modelId]);

  return (
    <Icon
      name={mailMessageFlag == null ? 'check-double' : 'check'}
      color={
        isRead
          ? Colors.primaryColor.background
          : Colors.secondaryColor.background
      }
      size={mailMessageFlag == null ? 18 : 15}
      touchable={!isRead}
      onPress={mailMessageFlag != null ? handleMarkAsRead : handleMarkAll}
      style={
        mailMessageFlag == null ? styles.doucleCheckIcon : styles.checkIcon
      }
    />
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    width: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  doucleCheckIcon: {
    flex: 1,
  },
});

export default MailMessageReadIcon;
