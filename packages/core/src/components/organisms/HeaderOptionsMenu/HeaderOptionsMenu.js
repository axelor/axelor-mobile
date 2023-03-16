/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {Dimensions, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DropdownMenu, DropdownMenuItem} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {HeaderOptionMenuItem} from '../../molecules';
import {countAttachmentFiles} from '../../../features/attachedFilesSlice';
import {countUnreadMailMessages} from '../../../features/mailMessageSlice';

const SMALLEST_WINDOW_WIDTH = 400;

const HeaderOptionsMenu = ({
  model,
  modelId,
  children,
  navigation,
  disableMailMessages,
  attachedFileScreenTitle,
}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const [disableAttachementFiles, setDisableAttachementFiles] = useState(true);
  const {attachments} = useSelector(state => state.attachedFiles);
  const {unreadMessages} = useSelector(state => state.mailMessages);

  const countUnreadMessagesAPI = useCallback(() => {
    dispatch(countUnreadMailMessages({model, modelId}));
  }, [dispatch, model, modelId]);

  const countAttachmentsAPI = useCallback(() => {
    dispatch(countAttachmentFiles({model, modelId}));
  }, [dispatch, model, modelId]);

  useEffect(() => {
    countUnreadMessagesAPI();
  }, [countUnreadMessagesAPI]);

  useEffect(() => {
    countAttachmentsAPI();
  }, [countAttachmentsAPI]);

  useEffect(() => {
    setDisableAttachementFiles(attachments === 0);
  }, [attachments]);

  const collapseMenuItems = useMemo(
    () => Dimensions.get('window').width <= SMALLEST_WINDOW_WIDTH,
    [],
  );

  const MenuItem = useMemo(
    () => (collapseMenuItems ? DropdownMenuItem : HeaderOptionMenuItem),
    [collapseMenuItems],
  );

  const MenuItemList = useMemo(
    () => [
      <MenuItem
        key={1}
        icon="bell"
        placeholder={I18n.t('Base_MailMessages')}
        FontAwesome5={false}
        indicator={unreadMessages}
        hideIf={disableMailMessages}
        onPress={() =>
          navigation.navigate('MailMessageScreen', {
            model,
            modelId,
          })
        }
      />,
      <MenuItem
        key={2}
        icon="paperclip"
        placeholder={I18n.t('Base_AttachedFiles')}
        indicator={attachments}
        hideIf={disableAttachementFiles}
        onPress={() =>
          navigation.navigate('AttachedFilesScreen', {
            model,
            modelId,
            screenTitle: attachedFileScreenTitle,
          })
        }
      />,
    ],
    [
      I18n,
      attachedFileScreenTitle,
      attachments,
      disableAttachementFiles,
      disableMailMessages,
      model,
      modelId,
      navigation,
      unreadMessages,
    ],
  );

  if (collapseMenuItems) {
    return (
      <View style={styles.container}>
        <DropdownMenu>{[MenuItemList, children]}</DropdownMenu>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {MenuItemList}
      {children && <DropdownMenu>{children}</DropdownMenu>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default HeaderOptionsMenu;
