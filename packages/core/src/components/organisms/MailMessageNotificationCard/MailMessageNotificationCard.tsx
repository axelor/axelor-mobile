/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Icon,
  LabelText,
  useThemeColor,
  UnorderedList,
  Badge,
} from '@axelor/aos-mobile-ui';
import MailMessageNotificationType from '../../../types/mail-message-notification-type';
import {MailMessageReadIcon, TrackItem} from '../../molecules';

interface TagProps {
  title: string;
  style: string;
}

interface MailMessageNotificationCardProps {
  relatedModel?: string;
  relatedId?: number;
  title: string;
  tag?: TagProps;
  tracks?: any[];
  flags?: any;
  style?: any;
}

const MAX_TRACK_ITEMS = 5;

const MailMessageNotificationCard = ({
  relatedModel,
  relatedId,
  title,
  tag,
  tracks,
  flags,
  style,
}: MailMessageNotificationCardProps) => {
  const Colors = useThemeColor();
  const [moreItems, setMoreItems] = useState(false);

  const displayFlags = useMemo(
    () => relatedModel != null && relatedId != null && flags != null,
    [flags, relatedId, relatedModel],
  );

  return (
    <TouchableOpacity
      onPress={() => setMoreItems(!moreItems)}
      disabled={tracks.length < MAX_TRACK_ITEMS}
      activeOpacity={0.9}>
      <Card style={[styles.card, style]}>
        <View style={styles.cardHeader}>
          <LabelText
            iconName="info-circle-fill"
            size={18}
            value={title}
            style={styles.headerLabel}
            textStyle={styles.title}
            color={Colors.primaryColor.background}
          />
          {tag && (
            <View style={styles.tagContainer}>
              <Badge
                title={tag.title}
                color={MailMessageNotificationType.getTagColor(
                  tag.style,
                  Colors,
                )}
                txtStyle={styles.tagTxt}
              />
            </View>
          )}
          {displayFlags && (
            <MailMessageReadIcon
              mailMessageFlag={flags}
              model={relatedModel}
              modelId={relatedId}
            />
          )}
        </View>
        {tracks && (
          <>
            <UnorderedList
              data={tracks}
              numberOfItems={
                !moreItems && tracks.length > MAX_TRACK_ITEMS && MAX_TRACK_ITEMS
              }
              renderItem={({item}) => (
                <TrackItem
                  title={item.title}
                  oldDisplayValue={item.oldDisplayValue}
                  oldValue={item.oldValue}
                  displayValue={item.displayValue}
                  value={item.value}
                />
              )}
            />
            {tracks.length > MAX_TRACK_ITEMS && (
              <Icon
                name={moreItems ? 'chevron-up' : 'chevron-down'}
                color={Colors.primaryColor.background}
                style={styles.moreIcon}
              />
            )}
          </>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    paddingHorizontal: 20,
    paddingRight: 25,
    paddingVertical: 10,
    paddingBottom: 5,
    margin: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    width: '105%',
  },
  checkIcon: {
    width: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  moreIcon: {
    alignSelf: 'center',
  },
  tagContainer: {
    width: '30%',
    flexDirection: 'row-reverse',
  },
  tagTxt: {
    fontSize: 12,
  },
  headerLabel: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
});

export default MailMessageNotificationCard;
