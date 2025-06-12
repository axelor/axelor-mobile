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
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownMenu, DropdownMenuItem} from '@axelor/aos-mobile-ui';
import {modifyMailMessagesFlags} from '../../../features/mailMessageSlice';

interface MessageFlagsProps {
  flags: any;
  model: string;
  modelId: number;
  isInbox?: boolean;
}

const MessageFlags = ({
  flags,
  model,
  modelId,
  isInbox = false,
}: MessageFlagsProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleModifyMailMessageFlags = useCallback(
    (key: string, value: boolean) => {
      dispatch(
        (modifyMailMessagesFlags as any)({
          mailMessagesFlags: [{...flags, [key]: value}],
          model,
          modelId,
          isInbox,
        }),
      );
    },
    [dispatch, flags, isInbox, model, modelId],
  );

  return (
    <DropdownMenu style={styles.container}>
      <DropdownMenuItem
        style={styles.itemContainer}
        icon="check-lg"
        placeholder={I18n.t(
          flags?.isRead ? 'Message_MarkAsUnread' : 'Message_MarkAsRead',
        )}
        onPress={() => handleModifyMailMessageFlags('isRead', !flags?.isRead)}
      />
    </DropdownMenu>
  );
};

const styles = StyleSheet.create({
  container: {zIndex: 10},
  itemContainer: {marginVertical: 0},
});

export default MessageFlags;
