/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  StarScore,
  Icon,
  useThemeColor,
  LabelText,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {AOSImage} from '@axelor/aos-mobile-core';

interface PartnerCardProps {
  style?: any;
  partnerFullName: string;
  partnerReference: string;
  partnerCompany?: string;
  partnerScoring?: number;
  partnerAddress: string;
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
  partnerAddress,
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
        <View style={styles.containerChild}>
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
              {!checkNullString(partnerCompany) && (
                <LabelText iconName="building" title={partnerCompany} />
              )}
            </View>
          </View>
          <View style={styles.containerBody}>
            <View style={styles.containerTextBody}>
              {!checkNullString(partnerAddress) && (
                <LabelText iconName="map-marker-alt" title={partnerAddress} />
              )}
              {!checkNullString(partnerMobilePhone) && (
                <LabelText
                  iconName="mobile-phone"
                  FontAwesome5={false}
                  title={partnerMobilePhone}
                  size={18}
                />
              )}
              {!checkNullString(partnerFixedPhone) && (
                <LabelText iconName="phone-alt" title={partnerFixedPhone} />
              )}
              {!checkNullString(partnerEmail) && (
                <LabelText iconName="envelope" title={partnerEmail} />
              )}
            </View>
          </View>
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
  },
  containerChild: {
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
