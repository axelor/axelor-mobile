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
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {checkNullString, MessageBox} from '@axelor/aos-mobile-ui';
import {sendMailMessageComment} from '../../../features/mailMessageSlice';

interface SendMessageBoxProps {
  model: string;
  modelId: number;
  hideMessageBox?: boolean;
}

const SendMessageBox = ({
  model,
  modelId,
  hideMessageBox = false,
}: SendMessageBoxProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const handleSendComment = useCallback(() => {
    dispatch((sendMailMessageComment as any)({model, modelId, comment}));
    Keyboard.dismiss();
    setComment('');
  }, [dispatch, model, modelId, comment]);

  if (hideMessageBox) {
    return null;
  }

  return (
    <View style={styles.messageBox}>
      <MessageBox
        placeholder={I18n.t('Message_CommentInput_Placeholder')}
        disabled={checkNullString(comment)}
        value={comment}
        onChange={setComment}
        onSend={handleSendComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SendMessageBox;
