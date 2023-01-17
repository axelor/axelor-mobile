import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {AOSImage} from '@axelor/aos-mobile-core';

interface PartnerInfoCardProps {
  fullName: string;
  partnerSeq: string;
  picture: any;
  style?: any;
  onPress?: () => void;
}

const PartnerInfoCard = ({
  fullName,
  partnerSeq,
  picture,
  style,
  onPress = () => {},
}: PartnerInfoCardProps) => {
  const Colors = useThemeColor();

  if (fullName == null || partnerSeq == null) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.imageContainer}>
          <AOSImage
            generalStyle={styles.imageSize}
            imageSize={styles.imageSize}
            defaultIconSize={50}
            metaFile={picture}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text fontSize={16} style={styles.textImportant}>
            {fullName}
          </Text>
          <Text fontSize={16}>{partnerSeq}</Text>
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
          style={styles.icon}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  icon: {
    justifyContent: 'center',
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  imageContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  textImportant: {
    fontWeight: 'bold',
  },
});

export default PartnerInfoCard;
