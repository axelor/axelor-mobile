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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Alert, checkNullString, Text} from '@axelor/aos-mobile-ui';
import {
  DateInput,
  InputBarCodeCard,
  useCameraScannerSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';

const SHIPMENT_REF_SCAN_KEY = 'supplier-arrival_shipment-ref_input';

interface SupplierArrivalShipmentDetailsPopupProps {
  visible: boolean;
  defaultRef?: string;
  defaultDate?: string;
  errorMessage?: string;
  required?: boolean;
  onConfirm: (ref: string | undefined, date: string | undefined) => void;
  onCancel: () => void;
}

const SupplierArrivalShipmentDetailsPopup = ({
  visible,
  defaultRef,
  defaultDate,
  errorMessage,
  required = false,
  onConfirm,
  onCancel,
}: SupplierArrivalShipmentDetailsPopupProps) => {
  const I18n = useTranslator();

  const {isEnabled: isCameraEnabled, cameraKey} = useCameraScannerSelector();

  const isCameraActiveForScan = useMemo(
    () => isCameraEnabled && cameraKey === SHIPMENT_REF_SCAN_KEY,
    [cameraKey, isCameraEnabled],
  );

  const [shipmentRef, setShipmentRef] = useState<string | undefined>(
    defaultRef,
  );
  const [shipmentDate, setShipmentDate] = useState<Date | undefined>(
    defaultDate ? new Date(defaultDate) : undefined,
  );

  const isConfirmDisabled = useMemo(
    () => required && (!shipmentRef || !shipmentDate),
    [required, shipmentDate, shipmentRef],
  );

  const handleConfirm = useCallback(() => {
    onConfirm(shipmentRef, shipmentDate?.toISOString());
  }, [onConfirm, shipmentDate, shipmentRef]);

  return (
    <Alert
      visible={visible && !isCameraActiveForScan}
      title={I18n.t('Stock_SupplierShipmentDetails')}
      cancelButtonConfig={{onPress: onCancel}}
      confirmButtonConfig={{
        onPress: handleConfirm,
        disabled: isConfirmDisabled,
      }}
      translator={I18n.t}>
      {!checkNullString(errorMessage) && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      <InputBarCodeCard
        style={styles.input}
        title={I18n.t('Stock_SupplierShipmentRef')}
        defaultValue={shipmentRef}
        onChange={setShipmentRef}
        scanKeySearch={SHIPMENT_REF_SCAN_KEY}
        required
      />
      <DateInput
        style={styles.input}
        title={I18n.t('Stock_SupplierShipmentDate')}
        defaultDate={shipmentDate}
        onDateChange={setShipmentDate}
        mode="date"
        nullable
        popup
        required
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 4,
    width: '100%',
  },
});

export default SupplierArrivalShipmentDetailsPopup;
