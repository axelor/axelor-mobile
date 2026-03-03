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

import {handlerApiCall} from '@axelor/aos-mobile-core';
import {countUnreadMessages} from '../api/mail-message-api';

export const getAction = async ({
  model,
  modelId,
  navigation,
  hideIf,
  translator,
}: {
  model: string;
  modelId: number;
  navigation: any;
  hideIf: boolean;
  translator: (key: string) => string;
}) => {
  const _defaultAction = {
    key: 'mailMessages',
    order: 20,
    iconName: 'bell-fill',
    title: translator('Message_MailMessages'),
    showInHeader: true,
    hideIf: true,
    onPress: () => {},
  };

  if (modelId == null || model == null) return _defaultAction;

  const numberUnreadMessages = await handlerApiCall({
    fetchFunction: countUnreadMessages,
    data: {model, modelId},
    action: 'Message_SliceAction_CountUnreadMailMessages',
    getState: () => {},
    responseOptions: {returnTotal: true},
    errorOptions: {
      errorTracing: false,
      showErrorToast: false,
    },
  });

  return {
    ..._defaultAction,
    indicator: numberUnreadMessages,
    onPress: () =>
      navigation.navigate('MailMessageScreen', {
        model,
        modelId,
      }),
    hideIf,
  };
};
