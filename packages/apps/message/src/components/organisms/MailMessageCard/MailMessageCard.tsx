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

import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  formatDateTime,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Image, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import MailMessageCommentCard from '../MailMessageCommentCard/MailMessageCommentCard';
import MailMessageNotificationCard from '../MailMessageNotificationCard/MailMessageNotificationCard';
import {MailMessageType} from '../../../types';

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
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {baseUrl} = useSelector(state => state.auth);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarContainer}>
        <Image
          generalStyle={styles.avatar}
          defaultIconSize={25}
          resizeMode="contain"
          source={{
            uri: baseUrl + avatar,
          }}
        />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.author}>
          {`${author} ${eventText} - ${formatDateTime(
            eventTime,
            I18n.t('Base_DateTimeFormat'),
          )}`}
        </Text>
        {type === MailMessageType.status.comment && (
          <MailMessageCommentCard
            subject={subject}
            files={files}
            value={body}
            flags={flags}
            relatedId={relatedId}
            relatedModel={relatedModel}
          />
        )}
        {type === MailMessageType.status.notification && (
          <MailMessageNotificationCard
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

const getStyles = Colors =>
  StyleSheet.create({
    avatarContainer: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    avatar: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.backgroundColor,
      borderRadius: Dimensions.get('window').width * 0.12,
      width: Dimensions.get('window').width * 0.12,
      height: Dimensions.get('window').width * 0.12,
    },
    author: {
      width: '100%',
      fontSize: 12,
      paddingLeft: 10,
    },
    cardContainer: {
      width: Dimensions.get('window').width * 0.83,
      overflow: 'hidden',
    },
    container: {
      flexDirection: 'row',
      marginBottom: 10,
    },
  });

export default MailMessageCard;
