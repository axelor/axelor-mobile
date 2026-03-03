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
import {StarScore, ObjectCard} from '@axelor/aos-mobile-ui';
import {useBinaryPictureUri, useTypeHelpers} from '@axelor/aos-mobile-core';

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
  const formatBinaryFile = useBinaryPictureUri();
  const {getItemColorFromIndex} = useTypeHelpers();

  const borderStyle = useMemo(
    () =>
      getStyles(getItemColorFromIndex(allLeadStatus, leadsStatus)?.background)
        ?.border,
    [allLeadStatus, getItemColorFromIndex, leadsStatus],
  );

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
          {
            indicatorText: leadsCompany,
            iconName: 'building-fill',
            hideIfNull: true,
          },
          {
            indicatorText: leadsAddress,
            iconName: 'geo-alt-fill',
            hideIfNull: true,
          },
          {
            indicatorText: leadsPhoneNumber,
            iconName: isDoNotCall ? 'telephone-x-fill' : 'phone-fill',
            color: isDoNotCall ? 'red' : null,
            hideIfNull: true,
            style: isDoNotCall ? styles.txtRed : null,
          },
          {
            indicatorText: leadsFixedPhone,
            iconName: isDoNotCall ? 'telephone-x-fill' : 'telephone-fill',
            color: isDoNotCall ? 'red' : null,
            hideIfNull: true,
            style: isDoNotCall ? styles.txtRed : null,
          },
          {
            indicatorText: leadsEmail,
            iconName: isDoNotSendEmail
              ? 'envelope-slash-fill'
              : 'envelope-fill',
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
