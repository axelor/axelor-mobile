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

import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {formatDateTime, useTranslator} from '@axelor/aos-mobile-core';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {Avatar, AVATAR_SIZE, AVATAR_PADDING} from '../../atoms';
import {CommentCard, NotificationCard} from '../../molecules';
import {fetchRepliesApi} from '../../../api';
import {MailMessageType} from '../../../types';

interface MailMessageCardProps {
  messageId?: number;
  author: string;
  avatar: string;
  body: any;
  eventText: string;
  eventTime: string;
  files: any[];
  style?: any;
  relatedName?: string;
  subject: string;
  type: string;
  flags: any[];
  relatedId: number;
  relatedModel: string;
  isInbox?: boolean;
  numReplies?: number;
}

const MailMessageCard = ({
  messageId,
  author,
  avatar,
  body,
  eventText,
  eventTime,
  files,
  style,
  relatedName,
  subject,
  type,
  flags,
  relatedId,
  relatedModel,
  isInbox,
  numReplies,
}: MailMessageCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [replies, setReplies] = useState([]);

  const getReplies = useCallback(
    () =>
      fetchRepliesApi({messageId})
        .then(res => setReplies(res?.data?.data))
        .catch(() => setReplies([])),
    [messageId],
  );

  const styles = useMemo(
    () => getStyles(Colors.secondaryColor.background),
    [Colors.secondaryColor.background],
  );

  return (
    <View style={[styles.container, style]}>
      <View>
        <Avatar avatar={avatar} />
        {numReplies > 0 && (
          <>
            <TouchableOpacity
              style={styles.displayRepliesContainer}
              activeOpacity={0.9}
              onPress={() => {
                getReplies();
                setAreRepliesVisible(current => !current);
              }}>
              <Text textColor={Colors.secondaryColor_dark.background}>
                {numReplies}
              </Text>
              <Icon name="chat-dots" />
            </TouchableOpacity>
            {areRepliesVisible && <View style={styles.verticalRule} />}
          </>
        )}
      </View>
      <View style={styles.flexOne}>
        <View>
          <Text style={styles.author} fontSize={12}>
            {`${author} ${eventText} - ${formatDateTime(
              eventTime,
              I18n.t('Base_DateTimeFormat'),
            )}`}
          </Text>
          {type === MailMessageType.status.comment && (
            <CommentCard
              style={styles.card}
              subject={subject}
              files={files}
              value={body}
              flags={flags}
              relatedId={relatedId}
              relatedModel={relatedModel}
              isInbox={isInbox}
            />
          )}
          {type === MailMessageType.status.notification && (
            <NotificationCard
              style={styles.card}
              relatedName={relatedName}
              subject={subject}
              tracks={JSON.parse(body ?? '{}').tracks}
              tag={JSON.parse(body ?? '{}').tags[0]}
              flags={flags}
              relatedId={relatedId}
              relatedModel={relatedModel}
              isInbox={isInbox}
            />
          )}
        </View>
        {areRepliesVisible &&
          (replies.length === 0 ? (
            <ActivityIndicator
              size="large"
              color={Colors.inverseColor.background}
            />
          ) : (
            replies.map(item => (
              <MailMessageCard
                style={styles.replyCard}
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
                key={item.id}
              />
            ))
          ))}
      </View>
    </View>
  );
};

const getStyles = (verticalRuleColor: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    displayRepliesContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 5,
    },
    verticalRule: {
      flex: 1,
      alignSelf: 'center',
      width: 1,
      marginTop: 10,
      backgroundColor: verticalRuleColor,
    },
    flexOne: {
      flex: 1,
    },
    author: {
      paddingLeft: 10,
    },
    card: {
      width: '100%',
      paddingHorizontal: 5,
    },
    replyCard: {
      marginLeft: -((AVATAR_SIZE + AVATAR_PADDING) / 2),
    },
  });

export default MailMessageCard;
