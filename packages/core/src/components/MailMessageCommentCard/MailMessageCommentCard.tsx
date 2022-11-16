import React, {useMemo, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, LabelText, Text, useThemeColor} from '@aos-mobile/ui';
import useTranslator from '../../i18n/hooks/use-translator';
import RenderHTML from 'react-native-render-html';
import {isHtml} from '../../utils/string';

interface MailMessageCommentCardProps {
  subject?: string;
  value: string;
  style?: any;
}

const MAX_TEXT_LINES = 5;
const MAX_HEIGHT = 150;

const MailMessageCommentCard = ({
  subject,
  value,
  style,
}: MailMessageCommentCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const [more, setMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(MAX_TEXT_LINES);
  const [htmlContentHeight, setHtmlContentHeight] = useState();

  const handleTextLayout = event => {
    setNumOfLines(event.nativeEvent.lines.length);
  };

  const handleHtmlContainerLayout = event => {
    if (!htmlContentHeight) {
      setHtmlContentHeight(event?.nativeEvent?.layout?.height);
    }
  };

  const styles = useMemo(
    () => getStyles(numOfLines, htmlContentHeight, more),
    [numOfLines, htmlContentHeight, more],
  );

  return (
    <TouchableOpacity
      onPress={() => setMore(!more)}
      disabled={numOfLines < MAX_TEXT_LINES}
      activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <LabelText
          iconName="comment"
          size={18}
          value={subject || I18n.t('Base_Comment')}
          style={styles.headerLabel}
          textStyle={styles.title}
          color={Colors.primaryColor}
        />
        {isHtml(value) ? (
          <View
            style={styles.htmlContainer}
            onLayout={!htmlContentHeight && handleHtmlContainerLayout}>
            <RenderHTML
              source={{
                html: `${value}`,
              }}
              contentWidth={Dimensions.get('window').width * 0.6}
              baseStyle={{color: Colors.text}}
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
            color={Colors.primaryColor}
            style={styles.moreIcon}
          />
        )}
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = (numOfLines, htmlContentHeight, more) =>
  StyleSheet.create({
    container: {
      width: '95%',
      paddingHorizontal: 20,
      paddingRight: 25,
      paddingVertical: 10,
      paddingBottom: numOfLines > MAX_TEXT_LINES ? 5 : 10,
      margin: 5,
      overflow: 'hidden',
    },
    headerLabel: {
      width: '100%',
    },
    htmlContainer: {
      width: '100%',
      overflow: 'hidden',
      height:
        htmlContentHeight &&
        (htmlContentHeight > MAX_HEIGHT && more
          ? htmlContentHeight
          : MAX_HEIGHT),
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
      fontSize: 18,
    },
  });

export default MailMessageCommentCard;
