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

import React, {useCallback, useEffect, useState} from 'react';
import {
  headerActionsProvider,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
  useWebSocket,
} from '@axelor/aos-mobile-core';
import {DoubleIcon, useThemeColor} from '@axelor/aos-mobile-ui';
import {getAction} from '../utils';
import {
  countUnreadMailMessages,
  fetchInboxMessages,
  getModelSubscribers,
  markAllMailMessageAsRead,
  saveInboxFolder,
} from '../features/mailMessageSlice';
import {UnsubscribeIcon} from '../components';
import {useIsSubscribed} from './use-is-subscribed';
import {InboxFolder} from '../types';

export const useMessageHeaders = () => {
  useMailMessagesGenericAction();
  useMailMessagesDetailsAction();
  useUserProfileActions();
  useInboxActions();
};

const useMailMessagesGenericAction = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'message_mailMessages',
      async ({model, modelId}) =>
        await getAction({
          model,
          modelId,
          navigation,
          hideIf: !mobileSettings?.isTrackerMessageEnabled,
          translator: I18n.t,
        }),
    );
  }, [I18n.t, mobileSettings, navigation, I18n]);
};

const useMailMessagesDetailsAction = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const isSubscribed = useIsSubscribed();
  const dispatch = useDispatch();

  const {unreadMessages, model, modelId} = useSelector(
    state => state.mailMessages,
  );

  useEffect(() => {
    dispatch((getModelSubscribers as any)({model, modelId}));
    dispatch((countUnreadMailMessages as any)({model, modelId}));
  }, [dispatch, model, modelId]);

  const handleMarkAllAsRead = useCallback(() => {
    dispatch((markAllMailMessageAsRead as any)({modelId, model}));
  }, [dispatch, model, modelId]);

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
              ? Colors.secondaryColor.background
              : Colors.primaryColor.background,
          title: I18n.t('Message_MarkAllAsRead'),
          onPress: handleMarkAllAsRead,
        },
        {
          key: 'subscribe',
          order: 20,
          showInHeader: true,
          iconName: 'star-fill',
          title: I18n.t(
            isSubscribed ? 'Message_Unsubscribe' : 'Message_Subscribe',
          ),
          onPress: () => {},
          customComponent: <UnsubscribeIcon />,
        },
      ],
    });
  }, [Colors, I18n, handleMarkAllAsRead, isSubscribed, unreadMessages]);
};

const useUserProfileActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector(state => state.appConfig);

  const [numberUnreadMessages, setNumberUnreadMessages] = useState(0);

  useWebSocket(websocket =>
    setNumberUnreadMessages(websocket?.data?.values?.mail?.unread),
  );

  useEffect(() => {
    headerActionsProvider.registerModel('auth_user_profile', {
      actions: [
        {
          key: 'inbox',
          order: 15,
          iconName: 'chat-dots',
          indicator: numberUnreadMessages,
          title: I18n.t('Message_Inbox'),
          hideIf: !mobileSettings?.isInboxAccessEnabled,
          onPress: () => navigation.navigate('InboxScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [
    I18n,
    mobileSettings?.isInboxAccessEnabled,
    navigation,
    numberUnreadMessages,
  ]);
};

const useInboxActions = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {inboxFolder} = useSelector(state => state.mailMessages);

  useEffect(() => {
    headerActionsProvider.registerModel('message_inbox', {
      actions: [
        {
          key: 'inboxImportant',
          order: 10,
          iconName: null,
          customComponent: (
            <DoubleIcon
              topIconConfig={{name: 'eye', size: 15}}
              topIconPosition={{bottom: -7, right: -7}}
              bottomIconConfig={{
                name:
                  inboxFolder === InboxFolder.Important ? 'star-fill' : 'star',
                color: Colors.primaryColor.background,
              }}
            />
          ),
          title: I18n.t('Message_ImportantMessages'),
          onPress: () => {
            const newValue =
              inboxFolder === InboxFolder.Important
                ? InboxFolder.Inbox
                : InboxFolder.Important;

            dispatch((fetchInboxMessages as any)({folder: newValue, page: 0}));
            dispatch((saveInboxFolder as any)(newValue));
          },
          showInHeader: true,
        },
      ],
    });
  }, [Colors.primaryColor.background, I18n, dispatch, inboxFolder]);
};
