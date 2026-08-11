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
import {useTranslator} from '@axelor/aos-mobile-core';
import {MailMessageNotificationType} from '../../../types';
import {translateMailMessageText} from '../../../utils';
import {useTrackFieldTitles} from '../../../hooks';
import {MessageFlags, TrackItem} from '../../atoms';

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
  const I18n = useTranslator();
  const fieldMeta = useTrackFieldTitles(relatedModel);

  const [moreItems, setMoreItems] = useState(false);

  const displayFlags = useMemo(
    () => relatedModel != null && relatedId != null && flags != null,
    [flags, relatedId, relatedModel],
  );

  return (
    <TouchableOpacity
      style={style}
      onPress={() => setMoreItems(!moreItems)}
      disabled={(tracks?.length ?? 0) < MAX_TRACK_ITEMS}
      activeOpacity={0.9}>
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <LabelText
            iconName="info-circle-fill"
            title={relatedName}
            value={translateMailMessageText(subject, I18n)}
            style={styles.flexOne}
            color={Colors.primaryColor.background}
          />
          <View style={styles.tagContainer}>
            {customTopComponent && React.cloneElement(customTopComponent)}
            {tag && (
              <Badge
                title={tag.title}
                color={MailMessageNotificationType.getTagColor(
                  tag.style,
                  Colors,
                )}
              />
            )}
            {displayFlags && (
              <MessageFlags
                flags={flags}
                model={relatedModel!}
                modelId={relatedId!}
                isInbox={isInbox}
              />
            )}
          </View>
        </View>
        {tracks && (
          <>
            <UnorderedList
              data={tracks}
              numberOfItems={
                !moreItems && tracks.length > MAX_TRACK_ITEMS
                  ? MAX_TRACK_ITEMS
                  : undefined
              }
              renderItem={({item}) => {
                const meta = fieldMeta[item.name];
                return (
                  <TrackItem
                    title={meta?.title ?? item.title}
                    oldDisplayValue={
                      meta?.selectionTitles?.[item.oldValue] ??
                      item.oldDisplayValue
                    }
                    oldValue={item.oldValue}
                    displayValue={
                      meta?.selectionTitles?.[item.value] ?? item.displayValue
                    }
                    value={item.value}
                  />
                );
              }}
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
    flex: 1,
    paddingHorizontal: 10,
    paddingRight: 10,
    paddingVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
  },
  moreIcon: {
    alignSelf: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
});

export default NotificationCard;
