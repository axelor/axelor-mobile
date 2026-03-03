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

export {
  countUnreadMessages as countUnreadMessagesApi,
  fetchInboxMessages as fetchInboxMessagesApi,
  fetchMailMessages as fetchMailMessagesApi,
  fetchModelSubscribers as fetchModelSubscribersApi,
  fetchReplies as fetchRepliesApi,
  getAllUnreadFlagsOfMailMessage as getAllUnreadFlagsOfMailMessageApi,
  modifyMailMessagesFlags as modifyMailMessagesFlagsApi,
  postMailMessageComment as postMailMessageCommentApi,
  readAllMailMessages as readAllMailMessagesApi,
  subscribeRequest as subscribeRequestApi,
  unsubscribeRequest as unsubscribeRequestApi,
} from './mail-message-api';
