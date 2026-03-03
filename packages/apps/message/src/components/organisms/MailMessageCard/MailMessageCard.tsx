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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused, useTranslator} from '@axelor/aos-mobile-core';
import {
  Icon,
  Text,
  useClickOutsideContext,
  useOutsideClickHandler,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {Avatar, AVATAR_SIZE, AVATAR_PADDING, AuthorText} from '../../atoms';
import {CommentCard, NotificationCard, SendMessageBox} from '../../molecules';
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
  getParentReplies?: (newMessage?: any) => void;
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
  getParentReplies,
}: MailMessageCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const isFocused = useIsFocused();

  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [replies, setReplies] = useState([]);
  const [numberReplies, setNumberReplies] = useState(0);
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);
  const [isToggleMBDisabled, setIsToggleMBDisabled] = useState(false);

  const getReplies = useCallback(
    (newMessage?: any) =>
      fetchRepliesApi({messageId})
        .then(res => {
          const _replies = res?.data?.data;
          setAreRepliesVisible(current => {
            if (current || newMessage == null) {
              setReplies(_replies);
            } else {
              const newReply = _replies.find(msg => msg.id === newMessage.id);
              setReplies([newReply]);
            }
            setNumberReplies(_replies.length);

            return true;
          });
        })
        .catch(() => setReplies([])),
    [messageId],
  );

  const styles = useMemo(
    () => getStyles(Colors.secondaryColor.background),
    [Colors.secondaryColor.background],
  );

  const wrapperRef = useRef(null);
  const {setRef} = useClickOutsideContext();
  useOutsideClickHandler({
    wrapperRef,
    handleOutsideClick: () => setIsMessageBoxVisible(false),
    activationCondition: isMessageBoxVisible && !isToggleMBDisabled,
  });

  useEffect(() => {
    if (isFocused && isToggleMBDisabled) {
      setRef(wrapperRef?.current);
      setTimeout(() => {
        setIsToggleMBDisabled(false);
      }, 100);
    }
  }, [isFocused, isToggleMBDisabled, setRef]);

  const isReply = useMemo(() => !!getParentReplies, [getParentReplies]);

  return (
    <View style={[styles.container, style]}>
      <View>
        <Avatar style={styles.avatar} avatar={avatar} />
        {(numberReplies > 0 || numReplies > 0) && (
          <TouchableOpacity
            style={styles.displayRepliesContainer}
            activeOpacity={0.9}
            onPress={() => {
              setAreRepliesVisible(current => {
                if (!current) {
                  getReplies();
                }
                return !current;
              });
            }}>
            <Text textColor={Colors.secondaryColor_dark.background}>
              {numberReplies > 0 ? numberReplies : numReplies}
            </Text>
            <Icon name="chat-dots" />
          </TouchableOpacity>
        )}
        {areRepliesVisible && <View style={styles.verticalRule} />}
      </View>
      <View style={styles.flexOne}>
        <View style={styles.flexOne}>
          <AuthorText
            author={author}
            eventText={eventText}
            eventTime={eventTime}
          />
          {type === MailMessageType.status.comment && (
            <CommentCard
              style={styles.card}
              subject={subject}
              files={files}
              value={body}
              flags={isReply ? null : flags}
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
              flags={isReply ? null : flags}
              relatedId={relatedId}
              relatedModel={relatedModel}
              isInbox={isInbox}
            />
          )}
          {isInbox && !isMessageBoxVisible && (
            <TouchableOpacity
              style={styles.replyContainer}
              activeOpacity={0.9}
              onPress={() => setIsMessageBoxVisible(true)}>
              <Icon name="arrow-90deg-left" size={12} />
              <Text style={styles.replyText} fontSize={12}>
                {I18n.t('Message_Respond')}
              </Text>
            </TouchableOpacity>
          )}
          <SendMessageBox
            style={styles.messageBox}
            hideMessageBox={!isMessageBoxVisible}
            model={relatedModel}
            modelId={relatedId}
            parentId={messageId}
            onSend={message => {
              getParentReplies
                ? getParentReplies(message)
                : getReplies(message);
              setIsMessageBoxVisible(false);
            }}
            wrapperRef={wrapperRef}
            onLinkFiles={() => setIsToggleMBDisabled(true)}
          />
        </View>
        {areRepliesVisible &&
          (numberReplies === 0 ? (
            <ActivityIndicator
              size="large"
              color={Colors.inverseColor.background}
            />
          ) : (
            replies.map(item => (
              <MailMessageCard
                style={styles.replyCard}
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
                isInbox={isInbox}
                getParentReplies={getReplies}
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
    container: {flexDirection: 'row', marginTop: 10},
    avatar: {paddingBottom: 5},
    displayRepliesContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 5,
      paddingVertical: 5,
    },
    verticalRule: {
      flex: 1,
      alignSelf: 'center',
      width: 1,
      marginTop: 5,
      backgroundColor: verticalRuleColor,
    },
    flexOne: {flex: 1},
    card: {
      flex: 1,
      width: '100%',
      marginTop: 2,
      paddingHorizontal: 5,
      zIndex: 5,
    },
    replyContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 5,
      paddingTop: 3,
      paddingHorizontal: 10,
    },
    replyText: {textDecorationLine: 'underline'},
    messageBox: {width: null},
    replyCard: {marginLeft: -((AVATAR_SIZE + AVATAR_PADDING) / 2)},
  });

export default MailMessageCard;
