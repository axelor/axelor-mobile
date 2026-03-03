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

import React, {useCallback, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  ChipSelect,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {MailMessageCard} from '../../organisms';
import {SendMessageBox} from '../../molecules';
import {getMailMessages} from '../../../features/mailMessageSlice';
import {MailMessageType} from '../../../types';

interface MailMessageViewProps {
  model: string;
  modelId: number;
  date?: string;
  hideMessageBox?: boolean;
}

const MailMessageView = ({
  model,
  modelId,
  date,
  hideMessageBox: _hideMessageBox = false,
}: MailMessageViewProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState([]);

  const {loading, moreLoading, isListEnd, mailMessagesList} = useSelector(
    state => state.mailMessages,
  );

  const fetchMailMessagesAPI = useCallback(
    (page: number) => {
      dispatch((getMailMessages as any)({model, modelId, date, page}));
    },
    [date, dispatch, model, modelId],
  );

  const filterOnStatus = useCallback(
    (list: any[]) => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else if (
        !Array.isArray(selectedStatus) ||
        selectedStatus.length === 0
      ) {
        return list;
      } else {
        const selectedType = selectedStatus[0].key;
        return selectedType === MailMessageType.status.all
          ? list
          : list.filter(item => item.type === selectedType);
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(mailMessagesList),
    [filterOnStatus, mailMessagesList],
  );

  const hideMessageBox = useMemo(
    () =>
      _hideMessageBox ||
      selectedStatus?.[0]?.key === MailMessageType.status.notification,
    [_hideMessageBox, selectedStatus],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 100}
      style={styles.flexOne}>
      <Screen removeSpaceOnTop>
        <View style={styles.flexOne}>
          <ScrollList
            loadingList={loading}
            data={filteredList}
            renderItem={({item}) => (
              <MailMessageCard
                key={item.id}
                author={item.$author?.fullName}
                avatar={item.$avatar}
                body={item.body}
                eventText={item.$eventText}
                eventTime={item.$eventTime}
                files={item.$files}
                subject={item.subject}
                type={item.type}
                flags={item.$flags}
                relatedId={modelId}
                relatedModel={model}
              />
            )}
            fetchData={fetchMailMessagesAPI}
            filter={false}
            moreLoading={moreLoading}
            isListEnd={isListEnd}
            translator={I18n.t}
          />
        </View>
        <ChipSelect
          mode="switch"
          onChangeValue={setSelectedStatus}
          isRefresh
          selectionItems={MailMessageType.getSelectionItems(
            I18n,
            Colors,
            selectedStatus,
          )}
          chipNumberOfLines={1}
        />
        <SendMessageBox
          hideMessageBox={hideMessageBox}
          model={model}
          modelId={modelId}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

export default MailMessageView;
