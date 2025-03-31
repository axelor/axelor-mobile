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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {formatDateTime, useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {CommentCard, NotificationCard} from '../../molecules';
import {MailMessageType} from '../../../types';
import {Avatar} from '../../atoms';

interface MailMessageCardProps {
  author: string;
  avatar: string;
  body: any;
  eventText: string;
  eventTime: string;
  files: any[];
  style?: any;
  subject: string;
  title: string;
  type: string;
  flags: any[];
  relatedId: number;
  relatedModel: string;
}

const MailMessageCard = ({
  author,
  avatar,
  body,
  eventText,
  eventTime,
  files,
  style,
  subject,
  title,
  type,
  flags,
  relatedId,
  relatedModel,
}: MailMessageCardProps) => {
  const I18n = useTranslator();

  return (
    <View style={[styles.container, style]}>
      <Avatar avatar={avatar} />
      <View style={styles.cardContainer}>
        <Text style={styles.author} fontSize={12}>
          {`${author} ${eventText} - ${formatDateTime(
            eventTime,
            I18n.t('Base_DateTimeFormat'),
          )}`}
        </Text>
        {type === MailMessageType.status.comment && (
          <CommentCard
            subject={subject}
            files={files}
            value={body}
            flags={flags}
            relatedId={relatedId}
            relatedModel={relatedModel}
          />
        )}
        {type === MailMessageType.status.notification && (
          <NotificationCard
            title={title}
            tracks={JSON.parse(body ?? '{}').tracks}
            tag={JSON.parse(body ?? '{}').tags[0]}
            flags={flags}
            relatedId={relatedId}
            relatedModel={relatedModel}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    paddingLeft: 10,
  },
  cardContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default MailMessageCard;
