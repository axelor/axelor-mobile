import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
  UnorderedList,
  Badge,
} from '@aos-mobile/ui';
import MailMessageNotificationType from '@aos-mobile/core/src/types/mail-message-notification-type';
import MailMessageReadIcon from '../MailMessageReadIcon/MailMessageReadIcon';

interface TagProps {
  title: string;
  style: string;
}

interface MailMessageNotificationCardProps {
  relatedModel: string;
  relatedId: number;
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

  return (
    <TouchableOpacity
      onPress={() => setMoreItems(!moreItems)}
      disabled={tracks.length < MAX_TRACK_ITEMS}
      activeOpacity={0.9}>
      <Card style={[styles.card, style]}>
        <View style={styles.cardHeader}>
          <LabelText
            iconName="info-circle"
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
          {flags != null && (
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
                <Text style={styles.listItem}>
                  <Text style={styles.itemTitle}>{`${item.title}: `}</Text>
                  <Text style={styles.itemValue}>
                    {(item.oldDisplayValue || item.oldValue) &&
                      `${
                        item.oldDisplayValue
                          ? item.oldDisplayValue
                          : item.oldValue
                      }`}
                    {(item.oldDisplayValue || item.oldValue) && (
                      <Icon
                        name="long-arrow-right"
                        size={10}
                        FontAwesome5={false}
                        style={styles.arrowIcon}
                      />
                    )}
                    {item.displayValue ? item.displayValue : item.value}
                  </Text>
                </Text>
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
  arrowIcon: {
    paddingHorizontal: 5,
  },
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
  listItem: {
    flexDirection: 'row',
    fontSize: 13,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemValue: {
    textAlign: 'justify',
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
