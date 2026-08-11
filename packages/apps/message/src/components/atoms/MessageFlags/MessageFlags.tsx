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

import React, {useCallback, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
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

  const {inboxFolder} = useSelector(state => state.mailMessages);

  const menuItemList = useMemo(
    () => [
      {
        flag: 'isRead',
        confirmIcon: 'check-lg',
        cancelIcon: 'x-lg',
        confirmKey: 'Message_MarkAsRead',
        cancelKey: 'Message_MarkAsUnread',
      },
      {
        flag: 'isStarred',
        confirmIcon: 'star-fill',
        cancelIcon: 'star',
        confirmKey: 'Message_MarkAsImportant',
        cancelKey: 'Message_MarkAsNotImportant',
      },
      {
        flag: 'isArchived',
        confirmIcon: 'archive-fill',
        cancelIcon: 'archive',
        confirmKey: 'Message_MarkAsArchived',
        cancelKey: 'Message_MarkAsNotArchived',
      },
    ],
    [],
  );

  const handleModifyMailMessageFlags = useCallback(
    (key: string, value: boolean) => {
      dispatch(
        (modifyMailMessagesFlags as any)({
          mailMessagesFlags: [{...flags, [key]: value}],
          model,
          modelId,
          isInbox,
          inboxFolder,
        }),
      );
    },
    [dispatch, flags, inboxFolder, isInbox, model, modelId],
  );

  return (
    <DropdownMenu styleMenu={styles.menuContainer}>
      {menuItemList.map(
        ({flag, cancelIcon, cancelKey, confirmIcon, confirmKey}, index) => {
          const isValidated = flags?.[flag];

          return (
            <DropdownMenuItem
              key={index}
              iconTileConfig={{iconSize: 14, padding: 6, borderRadius: 7}}
              numberOfLines={1}
              icon={isValidated ? cancelIcon : confirmIcon}
              placeholder={I18n.t(isValidated ? cancelKey : confirmKey)}
              onPress={() => handleModifyMailMessageFlags(flag, !isValidated)}
            />
          );
        },
      )}
    </DropdownMenu>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: Dimensions.get('window').width * 0.8,
    top: -15,
    right: 20,
  },
});

export default MessageFlags;
