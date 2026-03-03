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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {
  ActionCard,
  Card,
  LabelText,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ExpandableText, MessageFlags} from '../../atoms';

interface CommentCardProps {
  relatedModel: string;
  relatedId: number;
  subject?: string;
  files: any[];
  value: string;
  flags?: any;
  style?: any;
  navigation?: any;
  isInbox?: boolean;
}

const CommentCard = ({
  relatedModel,
  relatedId,
  subject,
  files,
  value,
  flags,
  style,
  isInbox,
}: CommentCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();

  const actionList = useMemo(() => {
    const _actions = [];

    if (Array.isArray(files) && files.length > 0) {
      _actions.push({
        iconName: 'paperclip',
        onPress: () =>
          navigation.navigate('MailMessageAttachedFilesScreen', {files}),
      });
    }

    return _actions;
  }, [files, navigation]);

  return (
    <ActionCard style={style} actionList={actionList} translator={I18n.t}>
      <Card style={styles.card}>
        <View style={styles.headerContainer}>
          <LabelText
            iconName="chat-fill"
            size={18}
            value={subject || I18n.t('Base_Comment')}
            style={styles.flexOne}
            textStyle={styles.flexOne}
            textSize={16}
            color={Colors.primaryColor.background}
          />
          {flags != null && (
            <MessageFlags
              flags={flags}
              model={relatedModel}
              modelId={relatedId}
              isInbox={isInbox}
            />
          )}
        </View>
        <ExpandableText value={value} />
      </Card>
    </ActionCard>
  );
};

const styles = StyleSheet.create({
  card: {flex: 1, paddingHorizontal: 15, paddingRight: 15, paddingVertical: 10},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    zIndex: 10,
  },
  flexOne: {flex: 1},
  floatingButtonContainer: {position: 'relative'},
  floatingButton: {width: 20, height: 20},
});

export default CommentCard;
