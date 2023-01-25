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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DropdownMenu} from '@axelor/aos-mobile-ui';
import {countAttachmentFiles} from '../../../features/attachedFilesSlice';
import {countUnreadMailMessages} from '../../../features/mailMessageSlice';
import {HeaderOptionMenuItem} from '../../molecules';

const HeaderOptionsMenu = ({
  model,
  modelId,
  children,
  navigation,
  disableMailMessages,
  attachedFileScreenTitle,
}) => {
  const [disableAttachementFiles, setDisableAttachementFiles] = useState(true);
  const {attachments} = useSelector(state => state.attachedFiles);
  const {unreadMessages} = useSelector(state => state.mailMessages);
  const dispatch = useDispatch();

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

  return (
    <View style={styles.container}>
      <HeaderOptionMenuItem
        icon="bell"
        FontAwesome5={false}
        indicator={unreadMessages}
        hideIf={disableMailMessages}
        onPress={() =>
          navigation.navigate('MailMessageScreen', {
            model,
            modelId,
          })
        }
      />
      <HeaderOptionMenuItem
        icon="paperclip"
        indicator={attachments}
        hideIf={disableAttachementFiles}
        onPress={() =>
          navigation.navigate('AttachedFilesScreen', {
            model,
            modelId,
            screenTitle: attachedFileScreenTitle,
          })
        }
      />
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
