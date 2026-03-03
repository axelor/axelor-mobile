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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {MailMessageCard} from '../components';
import {fetchInboxMessages} from '../features/mailMessageSlice';

const InboxScreen = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingInbox,
    moreLoadingInbox,
    isInboxListEnd,
    inboxList,
    inboxFolder,
  } = useSelector(state => state.mailMessages);

  const fetchInboxMessagesAPI = useCallback(
    (page: number) => {
      dispatch((fetchInboxMessages as any)({folder: inboxFolder, page}));
    },
    [dispatch, inboxFolder],
  );

  return (
    <Screen removeSpaceOnTop>
      <ScrollList
        loadingList={loadingInbox}
        data={inboxList}
        renderItem={({item}) => (
          <MailMessageCard
            key={item.id}
            messageId={item.id}
            author={item.$author?.fullName}
            avatar={item.$avatar}
            body={item.body}
            eventText={item.$eventText}
            eventTime={item.$eventTime}
            files={item.$files}
            relatedName={item.relatedName}
            subject={item.subject}
            type={item.type}
            flags={item.$flags}
            relatedId={item.relatedId}
            relatedModel={item.relatedModel}
            isInbox
            numReplies={item.$numReplies}
          />
        )}
        fetchData={fetchInboxMessagesAPI}
        filter={false}
        moreLoading={moreLoadingInbox}
        isListEnd={isInboxListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default InboxScreen;
