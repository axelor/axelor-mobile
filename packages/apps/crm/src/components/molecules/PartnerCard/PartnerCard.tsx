import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  StarScore,
  Icon,
  useThemeColor,
  LabelText,
} from '@axelor/aos-mobile-ui';
import {AOSImage} from '@axelor/aos-mobile-core';

interface PartnerCardProps {
  style?: any;
  partnerFullName: string;
  partnerReference: string;
  partnerCompany?: string;
  partnerScoring?: number;
  partnerAdress: string;
  partnerMobilePhone?: string;
  partnerFixedPhone: string;
  partnerEmail: string;
  partnerPicture: any;
  onPress: () => void;
}
const PartnerCard = ({
  style,
  partnerFullName,
  partnerReference,
  partnerCompany,
  partnerScoring,
  partnerAdress,
  partnerMobilePhone,
  partnerFixedPhone,
  partnerEmail,
  partnerPicture,
  onPress,
}: PartnerCardProps) => {
  const Colors = useThemeColor();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.containerHeader}>
          <AOSImage
            generalStyle={styles.imageIcon}
            imageSize={styles.imageSize}
            defaultIconSize={50}
            metaFile={partnerPicture}
            resizeMode="contain"
          />
          <View style={styles.containerTextHeader}>
            <Text style={styles.textTitle} fontSize={14}>
              {partnerFullName}
            </Text>
            <Text fontSize={14}>{partnerReference}</Text>
            {partnerScoring != null && (
              <StarScore score={partnerScoring} showMissingStar={true} />
            )}
            <LabelText iconName="building" title={partnerCompany} />
          </View>
        </View>
        <View style={styles.containerBody}>
          <View style={styles.containerTextBody}>
            {partnerAdress && (
              <LabelText iconName="map-marker-alt" title={partnerAdress} />
            )}
            {partnerMobilePhone && (
              <LabelText
                iconName="mobile-phone"
                FontAwesome5={false}
                title={partnerMobilePhone}
                size={18}
              />
            )}
            {partnerFixedPhone && (
              <LabelText iconName="phone-alt" title={partnerFixedPhone} />
            )}
            {partnerEmail && (
              <LabelText iconName="envelope" title={partnerEmail} />
            )}
          </View>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerTextHeader: {
    flexDirection: 'column',
    marginLeft: '3%',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  imageIcon: {
    height: 50,
    width: 50,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  containerBody: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTextBody: {
    flexDirection: 'column',
  },
});

export default PartnerCard;
