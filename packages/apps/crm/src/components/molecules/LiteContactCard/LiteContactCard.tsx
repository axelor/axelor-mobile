import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text, useThemeColor, LabelText} from '@aos-mobile/ui';

interface LiteContactCardProps {
  style?: any;
  contactFullname: string;
  mobilePhoneNumber?: string;
  fixedPhoneNumber: string;
  email: string;
  onPress: () => void;
}
const LiteContactCard = ({
  style,
  contactFullname,
  mobilePhoneNumber,
  fixedPhoneNumber,
  email,
  onPress,
}: LiteContactCardProps) => {
  const Colors = useThemeColor();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.containerChildren}>
          {contactFullname && (
            <Text style={styles.bold}>{contactFullname}</Text>
          )}
          {mobilePhoneNumber && (
            <LabelText iconName="phone-alt" title={mobilePhoneNumber} />
          )}
          {fixedPhoneNumber && (
            <LabelText iconName="phone-alt" title={fixedPhoneNumber} />
          )}
          {email && <LabelText iconName="envelope" title={email} />}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerChildren: {
    flexDirection: 'column',
  },
  bold: {fontWeight: 'bold'},
});

export default LiteContactCard;
