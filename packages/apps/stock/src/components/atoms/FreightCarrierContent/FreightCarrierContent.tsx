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
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  checkNullString,
  LabelText,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

type ObjectRecord<T extends 'name' | 'fullname' | 'fullName'> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [key in T]: string;
};

interface FreightCarrierContentProps {
  freightCarrierMode?: ObjectRecord<'name'>;
  shipmentMode?: ObjectRecord<'name'>;
  carrierPartner?: ObjectRecord<'fullName'>;
  forwarderPartner?: ObjectRecord<'fullName'>;
  incoterm?: ObjectRecord<'fullname'>;
  trackingNumber?: string;
  modeOfTransport?: string;
  numOfPackages?: number;
  numOfPalettes?: number;
  grossMass?: number;
  signatoryUser?: ObjectRecord<'fullName'>;
  isConformityCertifSigned?: boolean;
  isNeedingConformityCertificate?: boolean;
  isIspmRequired?: boolean;
}

const FreightCarrierContent = ({
  freightCarrierMode,
  shipmentMode,
  carrierPartner,
  forwarderPartner,
  incoterm,
  trackingNumber,
  modeOfTransport,
  numOfPackages,
  numOfPalettes,
  grossMass,
  signatoryUser,
  isConformityCertifSigned = false,
  isNeedingConformityCertificate = false,
  isIspmRequired = false,
}: FreightCarrierContentProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {StockMove} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const labelFields = useMemo(
    () => [
      {
        label: I18n.t('Stock_ShipmentMode'),
        value: shipmentMode?.name,
      },
      {
        label: I18n.t('Stock_FreightCarrierMode'),
        value: freightCarrierMode?.name,
      },
      {
        label: I18n.t('Stock_CarrierPartner'),
        value: carrierPartner?.fullName,
      },
      {
        label: I18n.t('Stock_ForwarderPartner'),
        value: forwarderPartner?.fullName,
      },
      {
        label: I18n.t('Stock_Incoterm'),
        value: incoterm?.fullname,
      },
      {
        label: I18n.t('Stock_TrackingNumber'),
        value: trackingNumber,
      },
      {
        label: I18n.t('Stock_ModeOfTransport'),
        value: getItemTitle(StockMove?.modeOfTransport, modeOfTransport),
      },
      {
        label: I18n.t('Stock_NumOfPackages'),
        value: numOfPackages,
      },
      {
        label: I18n.t('Stock_NumOfPalettes'),
        value: numOfPalettes,
      },
      {
        label: I18n.t('Stock_GrossMass'),
        value: grossMass,
      },
      {
        label: I18n.t('Stock_SignatoryUser'),
        value: signatoryUser?.fullName,
      },
    ],
    [
      I18n,
      StockMove?.modeOfTransport,
      carrierPartner?.fullName,
      forwarderPartner?.fullName,
      freightCarrierMode?.name,
      getItemTitle,
      grossMass,
      incoterm?.fullname,
      modeOfTransport,
      numOfPackages,
      numOfPalettes,
      shipmentMode?.name,
      signatoryUser,
      trackingNumber,
    ],
  );

  const booleanFields = useMemo(
    () => [
      {
        title: I18n.t('Stock_IsNeedingConformityCertificate'),
        checked: !isConformityCertifSigned && isNeedingConformityCertificate,
        color: Colors.warningColor,
      },
      {
        title: I18n.t('Stock_IsConformityCertifSigned'),
        checked: isConformityCertifSigned,
        color: Colors.successColor,
      },
      {
        title: I18n.t('Stock_IsIspmRequired'),
        checked: isIspmRequired,
        color: Colors.errorColor,
      },
    ],
    [
      Colors,
      I18n,
      isConformityCertifSigned,
      isIspmRequired,
      isNeedingConformityCertificate,
    ],
  );

  return (
    <View style={styles.container}>
      {labelFields
        .filter(f =>
          typeof f.value === 'string' ? !checkNullString(f.value) : f.value > 0,
        )
        .map((field, idx) => (
          <LabelText key={idx} title={`${field.label} :`} value={field.value} />
        ))}
      <View style={styles.bottomContainer}>
        {booleanFields
          .filter(f => f.checked)
          .map((field, idx) => (
            <Badge
              key={idx}
              title={field.title}
              color={field.color}
              style={styles.badge}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    width: undefined,
    paddingHorizontal: 5,
  },
});

export default FreightCarrierContent;
