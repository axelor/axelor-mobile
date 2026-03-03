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

import React, {useMemo, ReactElement, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Icon,
  LabelText,
  useThemeColor,
  UnorderedList,
  Badge,
} from '@axelor/aos-mobile-ui';
import {MessageFlags, TrackItem} from '../../atoms';
import {MailMessageNotificationType} from '../../../types';

const MAX_TRACK_ITEMS = 5;

interface TagProps {
  title: string;
  style: string;
}

interface NotificationCardProps {
  relatedModel?: string;
  relatedId?: number;
  relatedName?: string;
  subject: string;
  tag?: TagProps;
  tracks?: any[];
  flags?: any;
  style?: any;
  customTopComponent?: ReactElement<any>;
  isInbox?: boolean;
}

const NotificationCard = ({
  relatedModel,
  relatedId,
  relatedName,
  subject,
  tag,
  tracks,
  flags,
  style,
  customTopComponent,
  isInbox,
}: NotificationCardProps) => {
  const Colors = useThemeColor();
  const [moreItems, setMoreItems] = useState(false);

  const displayFlags = useMemo(
    () => relatedModel != null && relatedId != null && flags != null,
    [flags, relatedId, relatedModel],
  );

  return (
    <TouchableOpacity
      style={style}
      onPress={() => setMoreItems(!moreItems)}
      disabled={tracks.length < MAX_TRACK_ITEMS}
      activeOpacity={0.9}>
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <LabelText
            iconName="info-circle-fill"
            size={18}
            title={relatedName}
            value={subject}
            style={styles.flexOne}
            textStyle={styles.flexOne}
            textSize={16}
            color={Colors.primaryColor.background}
          />
          {customTopComponent && React.cloneElement(customTopComponent)}
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
            <MessageFlags
              flags={flags}
              model={relatedModel}
              modelId={relatedId}
              isInbox={isInbox}
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
  card: {flex: 1, paddingHorizontal: 15, paddingRight: 15, paddingVertical: 10},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    zIndex: 10,
  },
  moreIcon: {alignSelf: 'center'},
  tagContainer: {width: '30%', flexDirection: 'row-reverse'},
  tagTxt: {fontSize: 12},
  flexOne: {flex: 1},
});

export default NotificationCard;
