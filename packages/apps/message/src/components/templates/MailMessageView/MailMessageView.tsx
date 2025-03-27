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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  headerActionsProvider,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  Alert,
  ChipSelect,
  MessageBox,
  Screen,
  ScrollList,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {MailMessageCard} from '../../organisms';
import {
  getMailMessages,
  getModelSubscribers,
  markAllMailMessageAsRead,
  modelSubscribeRequest,
  modelUnsubscribeRequest,
  sendMailMessageComment,
} from '../../../features/mailMessageSlice';
import {MailMessageType} from '../../../types';

const DEFAULT_BOTTOM_MARGIN = 10;

interface MailMessageViewProps {
  model: string;
  modelId: number;
  date?: string;
  actionList?: any[];
  verticalActions?: boolean;
  hideMessageBox?: boolean;
}

const MailMessageView = ({
  model,
  modelId,
  date = null,
  actionList = [],
  verticalActions = true,
  hideMessageBox = false,
}: MailMessageViewProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const {userId} = useSelector(state => state.auth);
  const {
    loading,
    moreLoading,
    isListEnd,
    mailMessagesList,
    modelFollowersList,
    reload,
    reloadFollowers,
    unreadMessages,
  } = useSelector(state => state.mailMessages);

  const fetchMailMessagesAPI = useCallback(
    page => {
      dispatch(
        (getMailMessages as any)({
          model: model,
          modelId: modelId,
          date,
          limit: 10,
          page: page,
        }),
      );
    },
    [date, dispatch, model, modelId],
  );

  const fetchModelFollowersAPI = useCallback(() => {
    dispatch((getModelSubscribers as any)({model, modelId}));
  }, [dispatch, model, modelId]);

  const checkFollowers = useCallback(() => {
    modelFollowersList.find(follower => follower.$author.id === userId)
      ? setSubscribe(true)
      : setSubscribe(false);
  }, [modelFollowersList, userId]);

  const handleSendMailMessageComment = useCallback(() => {
    dispatch((sendMailMessageComment as any)({model, modelId, comment}));
    Keyboard.dismiss();
    setComment('');
  }, [dispatch, model, modelId, comment]);

  const handleMarkAllAsRead = useCallback(() => {
    dispatch(
      (markAllMailMessageAsRead as any)({
        modelId,
        model,
      }),
    );
  }, [dispatch, model, modelId]);

  const handleSubscribe = useCallback(() => {
    if (!subscribe) {
      dispatch((modelSubscribeRequest as any)({model, modelId}));
    }
  }, [dispatch, subscribe, model, modelId]);

  const handleUnsubscribe = useCallback(() => {
    if (subscribe) {
      dispatch((modelUnsubscribeRequest as any)({model, modelId}));
    }
  }, [dispatch, subscribe, model, modelId]);

  const handleUnfollowConfirmation = useCallback(() => {
    handleUnsubscribe();
    setPopUp(false);
  }, [handleUnsubscribe]);

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else if (
        !Array.isArray(selectedStatus) ||
        selectedStatus.length === 0
      ) {
        return list;
      } else {
        const selectedType = selectedStatus[0].key;
        if (selectedType === MailMessageType.status.all) {
          return list;
        } else {
          return list.filter(item => {
            return item.type === selectedType;
          });
        }
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(mailMessagesList),
    [filterOnStatus, mailMessagesList],
  );

  const displayMessageBox = useMemo(() => {
    if (hideMessageBox) {
      return false;
    }

    if (selectedStatus.length !== 0) {
      return selectedStatus[0].key !== MailMessageType.status.notification;
    }

    return true;
  }, [hideMessageBox, selectedStatus]);

  useEffect(() => {
    if (reload) {
      fetchMailMessagesAPI(0);
    }

    if (reloadFollowers) {
      fetchModelFollowersAPI();
    }
  }, [fetchMailMessagesAPI, fetchModelFollowersAPI, reload, reloadFollowers]);

  useEffect(() => {
    fetchModelFollowersAPI();
  }, [fetchModelFollowersAPI]);

  useEffect(() => {
    checkFollowers();
  }, [checkFollowers]);

  useEffect(() => {
    headerActionsProvider.registerModel('message_mailMessage_details', {
      actions: [
        {
          key: 'readMessages',
          order: 10,
          showInHeader: true,
          iconName: 'check-all',
          iconColor:
            unreadMessages === 0
              ? Colors.primaryColor.background
              : Colors.secondaryColor.background,
          title: I18n.t('Message_MarkAllAsRead'),
          onPress: handleMarkAllAsRead,
        },
        {
          key: 'subscribe',
          order: 20,
          showInHeader: true,
          iconName: subscribe ? 'star-fill' : 'star',
          iconColor: subscribe
            ? Colors.primaryColor.background
            : Colors.secondaryColor_dark.background,
          title: I18n.t(
            subscribe ? 'Message_Unsubscribe' : 'Message_Subscribe',
          ),
          onPress: () => (subscribe ? setPopUp(true) : handleSubscribe()),
        },
      ],
    });
  }, [
    Colors,
    handleSubscribe,
    handleMarkAllAsRead,
    I18n,
    subscribe,
    unreadMessages,
  ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 100}
      style={styles.flexOne}>
      <Screen removeSpaceOnTop={true}>
        <Alert
          visible={popUp}
          title={I18n.t('Message_Question')}
          cancelButtonConfig={{
            onPress: () => setPopUp(false),
          }}
          confirmButtonConfig={{
            onPress: handleUnfollowConfirmation,
          }}
          translator={I18n.t}>
          <Text>{I18n.t('Message_Unfollow_Confirmation')}</Text>
        </Alert>
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
                title={item.subject}
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
            actionList={actionList}
            verticalActions={verticalActions}
          />
        </View>
        <ChipSelect
          style={styles.chipSelect}
          mode="switch"
          onChangeValue={chiplist => setSelectedStatus(chiplist)}
          isRefresh
          selectionItems={MailMessageType.getSelectionItems(
            I18n,
            Colors,
            selectedStatus,
          )}
          chipNumberOfLines={1}
        />
        {displayMessageBox && (
          <View style={styles.messageBox}>
            <MessageBox
              placeholder={I18n.t('Message_CommentInput_Placeholder')}
              disabled={!comment}
              value={comment}
              onChange={setComment}
              onSend={handleSendMailMessageComment}
            />
          </View>
        )}
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  chipSelect: {
    marginBottom: 5,
  },
  messageBox: {
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEFAULT_BOTTOM_MARGIN,
  },
});

export default MailMessageView;
