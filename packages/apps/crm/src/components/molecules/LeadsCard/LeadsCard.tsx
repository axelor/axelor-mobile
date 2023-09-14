/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {useThemeColor, StarScore, ObjectCard} from '@axelor/aos-mobile-ui';
import {useBinaryPictureUri} from '@axelor/aos-mobile-core';
import Lead from '../../../types/lead';

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

  const borderStyle = useMemo(() => {
    const colorIndex = allLeadStatus?.findIndex(
      status => status.id === leadsStatus?.id,
    );
    return getStyles(Lead.getStatusColor(colorIndex, Colors)?.background)
      ?.border;
  }, [Colors, allLeadStatus, leadsStatus?.id]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      showArrow={true}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 60,
        source: formatBinaryFile(
          leadsId,
          leadVersion,
          'com.axelor.apps.crm.db.Lead',
        ),
      }}
      upperTexts={{
        items: [
          {displayText: leadsFullname, isTitle: true},
          {indicatorText: leadsCompany, iconName: 'building', hideIfNull: true},
          {
            indicatorText: leadsAddress,
            iconName: 'map-marker-alt',
            hideIfNull: true,
          },
          {
            indicatorText: leadsPhoneNumber,
            iconName: isDoNotCall ? 'phone-slash' : 'mobile-phone',
            color: isDoNotCall ? 'red' : null,
            hideIfNull: true,
            fontAwesome5: isDoNotCall,
            style: isDoNotCall ? styles.txtRed : null,
            size: isDoNotCall ? null : 18,
          },
          {
            indicatorText: leadsFixedPhone,
            iconName: isDoNotCall ? 'phone-slash' : 'phone',
            color: isDoNotCall ? 'red' : null,
            hideIfNull: true,
            style: isDoNotCall ? styles.txtRed : null,
          },
          {
            indicatorText: leadsEmail,
            iconName: isDoNotSendEmail ? 'user-alt-slash' : 'envelope',
            color: isDoNotSendEmail ? 'red' : null,
            hideIfNull: true,
            style: isDoNotSendEmail ? styles.txtRed : null,
          },
        ],
      }}
      upperBadges={{
        items: [
          {
            customComponent: (
              <StarScore score={leadScoring} showMissingStar={true} />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  imageSize: {
    height: 80,
    width: 80,
  },
  txtRed: {
    color: 'red',
  },
});

export default LeadsCard;
