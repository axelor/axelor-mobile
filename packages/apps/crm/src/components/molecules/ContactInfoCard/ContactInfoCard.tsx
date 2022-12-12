import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, LabelText, Text} from '@aos-mobile/ui';
import {clipboardProvider} from '@aos-mobile/core';

interface ContactInfoCardProps {
  style?: any;
  headerIconName: string;
  title: string;
  data: string;
  rightIconName: string;
  rightIconAction?: () => void;
}

const ContactInfoCard = ({
  style,
  headerIconName,
  title,
  data,
  rightIconName,
  rightIconAction,
}: ContactInfoCardProps) => {
  return (
    <View style={[styles.container, style]}>
      <LabelText
        title={title}
        iconName={headerIconName}
        size={15}
        textStyle={styles.textTitle}
      />
      <View style={styles.containerBody}>
        <Text style={styles.textData}>{data}</Text>
        <Icon
          style={styles.rightIcon}
          name={rightIconName}
          touchable={true}
          onPress={rightIconAction}
        />
        <Icon
          name={'copy'}
          touchable={true}
          onPress={() => clipboardProvider.copyToClipboard(data)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '90%',
    marginHorizontal: 5,
  },
  containerBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
  },
  rightIcon: {
    marginRight: '2%',
  },
  textTitle: {
    fontSize: 14,
  },
  textData: {
    width: '85%',
    fontSize: 14,
  },
});

export default ContactInfoCard;
