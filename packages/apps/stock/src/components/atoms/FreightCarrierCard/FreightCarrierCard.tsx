/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {Checkbox, LabelText} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

interface FreightCarrierCardProps {
  freightCarrier: any;
  incoterm: string;
  trackingNumber: string;
  modeOfTransport: any;
  numOfPackages: number;
  numOfPalettes: number;
  grossMass: number;
  signatoryUser: string;
  forwarderPartner: string;
  isConformityCertifSigned: boolean;
  isNeedingConformityCertificate: boolean;
  isIspmRequired: boolean;
}
const FreightCarrierCard = ({
  freightCarrier,
  incoterm,
  trackingNumber,
  modeOfTransport,
  numOfPackages,
  numOfPalettes,
  grossMass,
  signatoryUser,
  forwarderPartner,
  isConformityCertifSigned,
  isNeedingConformityCertificate,
  isIspmRequired,
}: FreightCarrierCardProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const fields = [
    {
      label: I18n.t('Stock_ShipmentMode'),
      value: freightCarrier?.shipmentMode?.name,
    },
    {
      label: I18n.t('Stock_freightCarrierMode'),
      value: freightCarrier?.name,
    },
    {
      label: I18n.t('Stock_CarrierPartner'),
      value: freightCarrier?.carrierPartner?.fullName,
    },
    {
      label: I18n.t('Stock_ForwarderPartner'),
      value: forwarderPartner,
    },
    {
      label: I18n.t('Stock_Incoterm'),
      value: incoterm,
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
      value: signatoryUser,
    },
  ];

  const checkboxes = [
    {
      title: I18n.t('Stock_IsConformityCertifSigned'),
      checked: isConformityCertifSigned,
    },
    {
      title: I18n.t('Stock_IsNeedingConformityCertificate'),
      checked: isNeedingConformityCertificate,
    },
    {
      title: I18n.t('Stock_IsIspmRequired'),
      checked: isIspmRequired,
    },
  ];

  return (
    <View style={styles.container}>
      {fields
        .filter(
          f => f.value !== null && f.value !== undefined && f.value !== '',
        )
        .map((field, idx) => (
          <LabelText
            key={idx}
            style={styles.textField}
            title={`${field.label} :`}
            value={field.value}
          />
        ))}
      <View style={styles.checkboxGroup}>
        {checkboxes.map((cb, idx) => (
          <Checkbox
            key={idx}
            title={cb.title}
            isDefaultChecked={cb.checked}
            disabled={true}
            onChange={() => {}}
            style={styles.checkbox}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  checkboxGroup: {
    marginTop: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: '90%',
    marginVertical: 5,
  },
  textField: {
    marginVertical: 5,
  },
});

export default FreightCarrierCard;
