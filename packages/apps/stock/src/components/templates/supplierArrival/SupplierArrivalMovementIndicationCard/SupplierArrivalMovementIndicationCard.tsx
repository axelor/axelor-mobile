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

import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {
  Alert,
  checkNullString,
  Icon,
  MovementIndicationCard,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

const SupplierArrivalMovementIndicationCard = ({
  supplierArrival,
  showPopupOnCLick = true,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const [isPopupVisible, setVisiblePopup] = useState(false);

  const supplierAddress = useMemo(() => {
    return (
      supplierArrival.fromAddress?.fullName || supplierArrival.fromAddressStr
    );
  }, [supplierArrival]);

  if (
    checkNullString(supplierAddress) &&
    checkNullString(supplierArrival.toStockLocation?.name)
  ) {
    return null;
  }

  return (
    <View>
      {showPopupOnCLick && (
        <Alert
          visible={isPopupVisible}
          title={I18n.t('Stock_OriginalAddress')}
          confirmButtonConfig={{
            width: 50,
            title: null,
            onPress: () => setVisiblePopup(false),
          }}>
          <Text>{supplierAddress}</Text>
        </Alert>
      )}
      <MovementIndicationCard
        titleTop={supplierAddress}
        iconTop={<Icon name="geo-alt-fill" />}
        titleDown={supplierArrival.toStockLocation?.name}
        iconDown={
          <Icon name="house-up" color={Colors.primaryColor.background} />
        }
        disabledTop={!showPopupOnCLick}
        onPressTitleTop={() => setVisiblePopup(true)}
      />
    </View>
  );
};

export default SupplierArrivalMovementIndicationCard;
