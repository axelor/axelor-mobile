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

import React, {useCallback, useEffect} from 'react';
import {
  headerActionsProvider,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {getAction} from '../utils';
import {
  countUnreadMailMessages,
  getModelSubscribers,
  markAllMailMessageAsRead,
} from '../features/mailMessageSlice';
import {UnsubscribeIcon} from '../components';
import {useIsSubscribed} from './use-is-subscribed';

export const useMessageHeaders = () => {
  useMailMessagesGenericAction();
  useMailMessagesDetailsAction();
  useUserProfileActions();
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
              ? Colors.primaryColor.background
              : Colors.secondaryColor.background,
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

  useEffect(() => {
    headerActionsProvider.registerModel('auth_user_profile', {
      actions: [
        {
          key: 'inbox',
          order: 15,
          iconName: 'chat-dots',
          title: I18n.t('Message_Inbox'),
          onPress: () => navigation.navigate('InboxScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [I18n, navigation]);
};
