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
import {
  useSelector,
  useMetafileUri,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';

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
  allProspectStatus?: any;
  partnerStatus?: any;
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
  allProspectStatus,
  partnerStatus,
  onPress,
}: PartnerCardProps) => {
  const formatMetaFile = useMetafileUri();
  const {getItemColorFromIndex} = useTypeHelpers();

  const {crm: crmConfig} = useSelector((state: any) => state.appConfig);

  const borderStyle = useMemo(
    () =>
      getStyles(
        getItemColorFromIndex(allProspectStatus, partnerStatus)?.background,
      )?.border,
    [allProspectStatus, getItemColorFromIndex, partnerStatus],
  );

  return (
    <ObjectCard
      onPress={onPress}
      image={{
        generalStyle: styles.imageIcon,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(partnerPicture?.id),
      }}
      style={[
        crmConfig?.crmProcessOnPartner && partnerStatus ? borderStyle : null,
        style,
      ]}
      upperTexts={{
        items: [
          {displayText: partnerFullName, isTitle: true},
          {
            displayText: partnerReference,
            hideIfNull: true,
          },
          {
            customComponent:
              partnerScoring != null ? (
                <StarScore score={partnerScoring} showMissingStar={true} />
              ) : null,
            hideIfNull: true,
          },
          {
            indicatorText: partnerCompany,
            hideIfNull: true,
            iconName: 'building-fill',
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: partnerAddress,
            hideIfNull: true,
            iconName: 'geo-alt-fill',
          },
          {
            indicatorText: partnerMobilePhone,
            hideIfNull: true,
            iconName: 'phone-fill',
          },
          {
            indicatorText: partnerFixedPhone,
            hideIfNull: true,
            iconName: 'telephone-fill',
          },
          {
            indicatorText: partnerEmail,
            hideIfNull: true,
            iconName: 'envelope-fill',
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
  imageIcon: {
    height: 50,
    width: 50,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default PartnerCard;
