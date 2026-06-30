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
import {StyleSheet} from 'react-native';
import {StarScore, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {useBinaryPictureUri, useTypeHelpers} from '@axelor/aos-mobile-core';

const IMAGE_SIZE = 60;

interface LeadsCardProps {
  style?: any;
  leadsFullname: string;
  leadsCompany: string;
  leadsAddress: string;
  leadsPhoneNumber: string;
  leadsFixedPhone: string;
  leadsEmail: string;
  leadScoring: number;
  leadVersion: number;
  leadsId: number;
  allLeadStatus?: any;
  leadsStatus?: any;
  onPress: () => void;
  isDoNotSendEmail: boolean;
  isDoNotCall: boolean;
}
const LeadsCard = ({
  style,
  leadsFullname,
  leadsCompany,
  leadsAddress,
  leadsPhoneNumber,
  leadsFixedPhone,
  leadsEmail,
  leadScoring,
  leadVersion,
  leadsId,
  allLeadStatus,
  leadsStatus,
  onPress,
  isDoNotSendEmail,
  isDoNotCall,
}: LeadsCardProps) => {
  const Colors = useThemeColor();
  const formatBinaryFile = useBinaryPictureUri();
  const {getItemColorFromIndex} = useTypeHelpers();

  const phoneDisplayConfig = useMemo(() => {
    if (isDoNotCall) {
      return {
        color: Colors.red.background,
        icon: 'telephone-x-fill',
        style: {color: Colors.red.background},
      };
    }

    return {color: undefined, icon: 'telephone-fill', style: undefined};
  }, [Colors.red.background, isDoNotCall]);

  const emailDisplayConfig = useMemo(() => {
    if (isDoNotSendEmail) {
      return {
        color: Colors.red.background,
        icon: 'envelope-slash-fill',
        style: {color: Colors.red.background},
      };
    }

    return {color: undefined, icon: 'envelope-fill', style: undefined};
  }, [Colors.red.background, isDoNotSendEmail]);

  return (
    <ObjectCard
      onPress={onPress}
      borderLeftColor={
        getItemColorFromIndex(allLeadStatus, leadsStatus)?.background
      }
      style={style}
      showArrow={true}
      image={{
        generalStyle: [
          styles.imageStyle,
          {borderColor: Colors.secondaryColor.background_light},
        ],
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: IMAGE_SIZE,
        source: formatBinaryFile(
          leadsId,
          leadVersion,
          'com.axelor.apps.crm.db.Lead',
        ),
      }}
      upperTexts={{
        items: [
          {displayText: leadsFullname, isTitle: true},
          {
            indicatorText: leadsCompany,
            iconName: 'building-fill',
            hideIfNull: true,
          },
          {
            customComponent: (
              <StarScore score={leadScoring} showMissingStar={true} size={12} />
            ),
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: leadsAddress,
            iconName: 'geo-alt-fill',
            hideIfNull: true,
          },
          {
            indicatorText: leadsPhoneNumber,
            iconName: phoneDisplayConfig.icon,
            color: phoneDisplayConfig.color,
            hideIfNull: true,
            style: phoneDisplayConfig.style,
          },
          {
            indicatorText: leadsFixedPhone,
            iconName: phoneDisplayConfig.icon,
            color: phoneDisplayConfig.color,
            hideIfNull: true,
            style: phoneDisplayConfig.style,
          },
          {
            indicatorText: leadsEmail,
            iconName: emailDisplayConfig.icon,
            color: emailDisplayConfig.color,
            hideIfNull: true,
            style: emailDisplayConfig.style,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 3,
  },
  imageSize: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
});

export default LeadsCard;
