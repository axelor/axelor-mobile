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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from '@axelor/aos-mobile-core';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  markAllMailMessageAsRead,
  markMailMessageAsRead,
} from '../../../features/mailMessageSlice';

interface ReadIconProps {
  allMessagesRead?: boolean;
  mailMessageFlag: any;
  modelId: number;
  model: string;
  isInbox?: boolean;
}

const ReadIcon = ({
  allMessagesRead = false,
  mailMessageFlag,
  modelId,
  model,
  isInbox = false,
}: ReadIconProps) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const isRead = useMemo(
    () => (mailMessageFlag != null ? mailMessageFlag?.isRead : allMessagesRead),
    [allMessagesRead, mailMessageFlag],
  );

  const iconColor = useMemo(
    () =>
      isRead
        ? Colors.successColor.background
        : Colors.secondaryColor.background,
    [Colors, isRead],
  );

  const handleMarkAsRead = useCallback(() => {
    dispatch(
      (markMailMessageAsRead as any)({
        mailFlagList: [mailMessageFlag],
        modelId,
        model,
        isInbox,
      }),
    );
  }, [dispatch, isInbox, mailMessageFlag, model, modelId]);

  const handleMarkAllAsRead = useCallback(() => {
    dispatch(
      (markAllMailMessageAsRead as any)({
        modelId,
        model,
      }),
    );
  }, [dispatch, model, modelId]);

  if (mailMessageFlag == null) {
    return (
      <Icon
        name="check-all"
        color={iconColor}
        size={18}
        touchable={!isRead}
        onPress={handleMarkAllAsRead}
        style={styles.doucleCheckIcon}
      />
    );
  }

  return (
    <Icon
      name="check-lg"
      color={iconColor}
      size={15}
      touchable={!isRead}
      onPress={handleMarkAsRead}
      style={styles.checkIcon}
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

export default ReadIcon;
