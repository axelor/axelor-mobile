import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Image, Text, useThemeColor} from '@aos-mobile/ui';
import {formatDateTime, useTranslator} from '@aos-mobile/core';
import MailMessageCommentCard from '../MailMessageCommentCard/MailMessageCommentCard';
import MailMessageNotificationCard from '../MailMessageNotificationCard/MailMessageNotificationCard';

const mailMessageTypes = {
  comment: 'comment',
  notificaiton: 'notification',
};

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
  navigation,
  relatedId,
  relatedModel,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {baseUrl} = useSelector(state => state.auth);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarContainer}>
        <Image
          imageSize={Dimensions.get('window').width * 0.1}
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
        {type === mailMessageTypes.comment && (
          <MailMessageCommentCard
            subject={subject}
            files={files}
            value={body}
            flags={flags}
            navigation={navigation}
            relatedId={relatedId}
            relatedModel={relatedModel}
          />
        )}
        {type === mailMessageTypes.notificaiton && (
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
