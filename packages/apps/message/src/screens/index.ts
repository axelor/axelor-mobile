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

import MailMessageScreen from './MailMessageScreen';
import InboxScreen from './InboxScreen';
import MailMessageAttachedFilesScreen from './MailMessageAttachedFilesScreen';
import MailMessageLinkFilesScreen from './MailMessageLinkFilesScreen';

export default {
  MailMessageScreen: {
    title: 'Message_MailMessages',
    component: MailMessageScreen,
    actionID: 'message_mailMessage_details',
  },
  InboxScreen: {
    title: 'Message_Inbox',
    component: InboxScreen,
    actionID: 'message_mailMessage_inbox',
  },
  MailMessageAttachedFilesScreen: {
    title: 'Dms_AttachedFiles',
    component: MailMessageAttachedFilesScreen,
    options: {
      shadedHeader: false,
    },
  },
  MailMessageLinkFilesScreen: {
    title: 'Message_LinkFiles',
    component: MailMessageLinkFilesScreen,
    acionID: 'dms_all_documents',
    options: {
      shadedHeader: false,
    },
  },
};

export {MailMessageScreen};
export {InboxScreen};
export {MailMessageAttachedFilesScreen};
export {MailMessageLinkFilesScreen};
