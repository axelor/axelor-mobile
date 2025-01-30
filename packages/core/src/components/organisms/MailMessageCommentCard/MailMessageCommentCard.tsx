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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  getCommonStyles,
  HtmlInput,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {isHtml} from '../../../utils/string';
import {MailMessageReadIcon} from '../../molecules';
import {useNavigation} from '../../../hooks/use-navigation';

interface MailMessageCommentCardProps {
  relatedModel: string;
  relatedId: number;
  subject?: string;
  files: [any];
  value: string;
  flags?: any;
  style?: any;
  navigation?: any;
}

const MAX_TEXT_LINES = 5;
const MAX_HEIGHT = 150;

const MailMessageCommentCard = ({
  relatedModel,
  relatedId,
  subject,
  files,
  value,
  flags,
  style,
}: MailMessageCommentCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();

  const [more, setMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(MAX_TEXT_LINES);
  const [htmlContentHeight, setHtmlContentHeight] = useState();

  const handleTextLayout = useCallback(event => {
    setNumOfLines(event.nativeEvent.lines.length);
  }, []);

  const handleHtmlContainerLayout = useCallback(
    height => {
      if (!htmlContentHeight) {
        setHtmlContentHeight(height);
      }
    },
    [htmlContentHeight],
  );

  const handleCommentAttachedFilesPress = useCallback(() => {
    navigation.navigate('AttachedFilesScreen', {
      files: files,
    });
  }, [navigation, files]);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const styles = useMemo(
    () => getStyles(numOfLines, htmlContentHeight, more),
    [numOfLines, htmlContentHeight, more],
  );

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => setMore(!more)}
        disabled={numOfLines < MAX_TEXT_LINES}
        activeOpacity={0.9}
        style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <LabelText
              iconName="comment"
              size={18}
              value={subject || I18n.t('Base_Comment')}
              style={styles.headerLabel}
              textStyle={styles.title}
              color={Colors.primaryColor.background}
            />
            {flags != null && (
              <MailMessageReadIcon
                mailMessageFlag={flags}
                model={relatedModel}
                modelId={relatedId}
              />
            )}
          </View>
          {isHtml(value) ? (
            <View style={styles.htmlContainer}>
              <HtmlInput
                defaultInput={`${value}`}
                readonly={true}
                onHeightChange={handleHtmlContainerLayout}
              />
            </View>
          ) : (
            <Text
              numberOfLines={more ? numOfLines : MAX_TEXT_LINES}
              style={styles.text}
              onTextLayout={handleTextLayout}>
              {value}
            </Text>
          )}
          {(numOfLines > MAX_TEXT_LINES ||
            (htmlContentHeight && htmlContentHeight > MAX_HEIGHT)) && (
            <Icon
              name={more ? 'chevron-up' : 'chevron-down'}
              color={Colors.primaryColor.background}
              style={styles.moreIcon}
            />
          )}
        </Card>
      </TouchableOpacity>
      {files.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[commonStyles.filter, styles.action]}
            onPress={handleCommentAttachedFilesPress}
            activeOpacity={0.9}>
            <Icon name="paperclip" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const getStyles = (numOfLines, htmlContentHeight, more) =>
  StyleSheet.create({
    action: {
      maxHeight: 80,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 0,
      padding: 10,
    },
    actionContainer: {
      width: '15%',
      flex: 2,
    },
    card: {
      width: '100%',
      paddingHorizontal: 20,
      paddingRight: 25,
      paddingVertical: 10,
      paddingBottom: numOfLines > MAX_TEXT_LINES ? 5 : 10,
      overflow: 'hidden',
    },
    cardContainer: {
      flex: 10,
      marginRight: 5,
    },
    cardHeader: {
      width: '105%',
      flexDirection: 'row',
    },
    container: {
      width: '95%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      margin: 5,
    },
    headerLabel: {
      flex: 1,
    },
    htmlContainer: {
      width: '100%',
      overflow: 'hidden',
      height:
        htmlContentHeight &&
        (htmlContentHeight > MAX_HEIGHT
          ? more
            ? htmlContentHeight
            : MAX_HEIGHT
          : htmlContentHeight),
    },
    icon: {
      alignItems: 'flex-start',
      marginRight: 10,
    },
    moreIcon: {
      alignSelf: 'center',
    },
    text: {
      width: '100%',
      fontSize: 14,
      textAlign: 'justify',
      marginVertical: 5,
    },
    title: {
      fontSize: 16,
    },
  });

export default MailMessageCommentCard;
