/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {useDispatch} from '../../../redux/hooks';
import {
  markAllMailMessageAsRead,
  markMailMessageAsRead,
} from '../../../features/mailMessageSlice';

export const useMarkAllMailMessages = ({model, modelId}) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(
      markAllMailMessageAsRead({
        modelId,
        model,
      }),
    );
  }, [dispatch, model, modelId]);
};

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

  const handleMarkAll = useMarkAllMailMessages({model, modelId});

  const handleMarkAsRead = useCallback(() => {
    dispatch(
      markMailMessageAsRead({
        mailFlagList: [mailMessageFlag],
        modelId,
        model,
      }),
    );
  }, [dispatch, mailMessageFlag, model, modelId]);

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
