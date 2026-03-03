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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  formatTime as _formatTime,
  useBinaryImageUri,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Badge, Image, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {NotificationCard as MailMessageNotificationCard} from '@axelor/aos-mobile-message';

const AVATAR_SIZE = Dimensions.get('window').width * 0.12;

const STATES = {
  Danger: 'danger',
  Success: 'success',
};

const ActivityCard = ({
  userId,
  userName,
  time,
  title,
  tracks,
  modelName,
  utilityClass,
}: {
  userId: number;
  userName: string;
  time: string;
  title: string;
  tracks: any[];
  modelName: string;
  utilityClass: string;
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatImage = useBinaryImageUri();

  const bagdeColor = useMemo(
    () =>
      utilityClass === STATES.Danger
        ? Colors.errorColor
        : utilityClass === STATES.Success
          ? Colors.successColor
          : Colors.primaryColor,
    [Colors, utilityClass],
  );

  const formatTime = useCallback(
    data => _formatTime(data, I18n.t('Base_TimeFormat')),
    [I18n],
  );

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          generalStyle={styles.avatar}
          defaultIconSize={25}
          resizeMode="contain"
          source={formatImage(userId, null, 'com.axelor.auth.db.User')}
        />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.updatedText}>
          {I18n.t('Project_ActivityUpdateInformation', {
            userName,
            time: formatTime(time),
          })}
        </Text>
        <MailMessageNotificationCard
          subject={title}
          tracks={tracks}
          customTopComponent={<Badge title={modelName} color={bagdeColor} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardContainer: {
    width: Dimensions.get('window').width * 0.83,
    overflow: 'hidden',
  },
  updatedText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: AVATAR_SIZE,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
});

export default ActivityCard;
