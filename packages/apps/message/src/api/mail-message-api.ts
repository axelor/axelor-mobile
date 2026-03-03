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

import {
  axiosApiProvider,
  createStandardSearch,
  Criteria,
  formatRequestBody,
  getActionApi,
  RouterProvider,
} from '@axelor/aos-mobile-core';
import {InboxFolder} from '../types';

const createUnreadMessagesCriteria = ({model, modelId}): Criteria[] => {
  return [
    {fieldName: 'relatedModel', operator: '=', value: model},
    {fieldName: 'relatedId', operator: '=', value: modelId},
    {fieldName: 'flags.isRead', operator: '=', value: false},
  ];
};

const createUnreadFlagsCriteria = ({model, modelId}): Criteria[] => {
  return [
    {fieldName: 'message.relatedModel', operator: '=', value: model},
    {fieldName: 'message.relatedId', operator: '=', value: modelId},
    {fieldName: 'isRead', operator: '=', value: false},
  ];
};

interface fetchMailMessageProps {
  model: string;
  modelId: number;
  date?: string;
  limit?: number;
  page?: number;
}

export async function fetchMailMessages({
  model,
  modelId,
  date,
  limit = 10,
  page,
}: fetchMailMessageProps) {
  const route = await RouterProvider.get('MailMessages');

  const res = await axiosApiProvider.get({
    url: `${route}?relatedId=${modelId}&relatedModel=${model}&limit=${limit}&offset=${
      limit * page
    }`,
  });

  if (date != null) {
    const filteredMessages = [];
    for (const message of res?.data?.data) {
      if (new Date(message.$eventTime) > new Date(date)) {
        filteredMessages.push(message);
      } else {
        break;
      }
    }
    res.data.data = filteredMessages;
  }

  return res;
}

interface postMailMessageCommentProps {
  model: string;
  modelId: number;
  comment: string;
  parentId?: number;
  files?: [];
}

export async function postMailMessageComment({
  model,
  modelId,
  comment,
  parentId,
  files = [],
}: postMailMessageCommentProps) {
  const body: any = {body: `${comment}`, type: 'comment', files};
  if (parentId != null) {
    body.parent = {id: parentId};
  }
  const {matchers} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: `/ws/rest/${model}/${modelId}/message`,
    method: 'post',
    body: {data: body},
    description: 'post mail message comment',
    matchers: {
      modelName: 'com.axelor.mail.db.MailMessage',
      id: Date.now(),
      fields: matchers,
    },
  });
}

export async function fetchModelSubscribers({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.get({url: `/ws/rest/${model}/${modelId}/followers`});
}

export async function subscribeRequest({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/${model}/${modelId}/follow`,
    data: {},
  });
}

export async function unsubscribeRequest({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/${model}/${modelId}/unfollow`,
    data: {},
  });
}

export async function countUnreadMessages({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.mail.db.MailMessage',
    criteria: createUnreadMessagesCriteria({model, modelId}),
    fieldKey: 'message_mailMessage',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  });
}

export async function getAllUnreadFlagsOfMailMessage({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.mail.db.MailFlags',
    criteria: createUnreadFlagsCriteria({model, modelId}),
    fieldKey: 'message_mailFlags',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  });
}

export async function readAllMailMessages({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return getAllUnreadFlagsOfMailMessage({model, modelId}).then(res => {
    return modifyMailMessagesFlags({mailMessagesFlags: res?.data?.data});
  });
}

export async function modifyMailMessagesFlags({
  mailMessagesFlags,
}: {
  mailMessagesFlags: any[];
}) {
  if (!Array.isArray(mailMessagesFlags) || mailMessagesFlags?.length === 0) {
    return null;
  }

  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.mail.db.MailFlags',
    data: {
      records: mailMessagesFlags.map(item => ({
        ...item,
        isRead: item?.isRead ?? true,
      })),
    },
  });
}

export async function fetchInboxMessages({
  folder = InboxFolder.Inbox,
  limit = 10,
  page,
}: {
  folder?: InboxFolder;
  limit?: number;
  page: number;
}) {
  return axiosApiProvider.get({
    url: `/ws/messages?folder=${folder}&limit=${limit}&offset=${limit * page}`,
  });
}

export async function fetchReplies({messageId}: {messageId: number}) {
  return axiosApiProvider.get({url: `/ws/messages/${messageId}/replies`});
}
