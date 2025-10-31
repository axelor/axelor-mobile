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

import React, {useCallback, useState} from 'react';
import {Dimensions, Keyboard, StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {checkNullString} from '@axelor/aos-mobile-ui';
import {MessageBox} from '../../atoms';
import {
  saveLinkFiles,
  sendMailMessageComment,
} from '../../../features/mailMessageSlice';

interface SendMessageBoxProps {
  style?: any;
  model: string;
  modelId: number;
  parentId?: number;
  hideMessageBox?: boolean;
  onSend?: (message: any) => void;
  wrapperRef?: any;
  onLinkFiles?: () => void;
}

const SendMessageBox = ({
  style,
  model,
  modelId,
  parentId,
  hideMessageBox = false,
  onSend,
  wrapperRef,
  onLinkFiles,
}: SendMessageBoxProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const {linkFiles} = useSelector(state => state.mailMessages);

  const handleSendComment = useCallback(() => {
    (dispatch as any)(
      (sendMailMessageComment as any)({
        model,
        modelId,
        comment,
        parentId,
        files: linkFiles?.map(file => file?.metaFile?.id) ?? [],
      }),
    ).then(res => onSend?.(res.payload));
    Keyboard.dismiss();
    setComment('');
    linkFiles?.length > 0 && dispatch(saveLinkFiles([]));
  }, [dispatch, model, modelId, comment, parentId, linkFiles, onSend]);

  const handleLinkFiles = useCallback(() => {
    onLinkFiles?.();
    navigation.navigate('MailMessageLinkFilesScreen');
  }, [navigation, onLinkFiles]);

  if (hideMessageBox) {
    return null;
  }

  return (
    <View style={[styles.messageBox, style]} ref={wrapperRef}>
      <MessageBox
        placeholder={I18n.t('Message_CommentInput_Placeholder')}
        disabled={checkNullString(comment)}
        value={comment}
        onChange={setComment}
        onSend={handleSendComment}
        onLinkFiles={handleLinkFiles}
        numberLinkedFiles={linkFiles.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SendMessageBox;
