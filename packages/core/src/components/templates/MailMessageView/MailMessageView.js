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
import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  ChipSelect,
  MessageBox,
  Screen,
  ScrollList,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {MailMessageCard} from '../../../components';
import {
  getMailMessages,
  getModelSubscribers,
  modelSubscribeRequest,
  modelUnsubscribeRequest,
  sendMailMessageComment,
} from '../../../features/mailMessageSlice';
import useTranslator from '../../../i18n/hooks/use-translator';
import {headerActionsProvider} from '../../../header';
import {useMarkAllMailMessages} from '../../molecules/MailMessageReadIcon/MailMessageReadIcon';
import {MailMessageType} from '../../../types';

const DEFAULT_BOTTOM_MARGIN = 10;

const MailMessageView = ({
  model,
  modelId,
  date = null,
  actionList = [],
  verticalActions = true,
  hideMessageBox = false,
}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const handleMarkAll = useMarkAllMailMessages({model, modelId});

  const [comment, setComment] = useState();
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

  const fetchMailMessageAPI = useCallback(
    page => {
      dispatch(
        getMailMessages({
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
    dispatch(getModelSubscribers({model, modelId}));
  }, [dispatch, model, modelId]);

  const checkFollowers = useCallback(() => {
    modelFollowersList.find(follower => follower.$author.id === userId)
      ? setSubscribe(true)
      : setSubscribe(false);
  }, [modelFollowersList, userId]);

  const handleSubscribe = useCallback(() => {
    if (!subscribe) {
      dispatch(modelSubscribeRequest({model, modelId}));
    }
  }, [dispatch, subscribe, model, modelId]);

  const handleUnsubscribe = useCallback(() => {
    if (subscribe) {
      dispatch(modelUnsubscribeRequest({model, modelId}));
    }
  }, [dispatch, subscribe, model, modelId]);

  const handleUnfollowConfirmation = useCallback(() => {
    handleUnsubscribe();
    setPopUp(false);
  }, [handleUnsubscribe]);

  const handleSendMailMessageComment = useCallback(() => {
    dispatch(sendMailMessageComment({model, modelId, comment}));
    Keyboard.dismiss();
    setComment('');
  }, [dispatch, model, modelId, comment]);

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
    headerActionsProvider.registerModel('core_mailMessage_details', {
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
          title: I18n.t('Base_MailMessages_MarkAllAsRead'),
          onPress: handleMarkAll,
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
            subscribe
              ? 'Base_MailMessages_Unsubscribe'
              : 'Base_MailMessages_Subscribe',
          ),
          onPress: subscribe ? () => setPopUp(true) : handleSubscribe,
        },
      ],
    });
  }, [Colors, subscribe, unreadMessages, handleSubscribe, I18n, handleMarkAll]);

  useEffect(() => {
    fetchModelFollowersAPI();
  }, [fetchModelFollowersAPI]);

  useEffect(() => {
    checkFollowers();
  }, [checkFollowers, modelFollowersList]);

  useEffect(() => {
    if (reload) {
      fetchMailMessageAPI(0);
    }

    if (reloadFollowers) {
      fetchModelFollowersAPI();
    }
  }, [fetchMailMessageAPI, fetchModelFollowersAPI, reload, reloadFollowers]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 100}
      style={styles.flexOne}>
      <Screen removeSpaceOnTop={true}>
        <Alert
          visible={popUp}
          title={I18n.t('Base_Question')}
          cancelButtonConfig={{
            onPress: () => setPopUp(false),
          }}
          confirmButtonConfig={{
            onPress: handleUnfollowConfirmation,
          }}
          translator={I18n.t}>
          <Text>{I18n.t('Base_Unfollow_Confirmation')}</Text>
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
            fetchData={fetchMailMessageAPI}
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
              placeholder={I18n.t('Base_MailMessages_CommentInput_Placeholder')}
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
