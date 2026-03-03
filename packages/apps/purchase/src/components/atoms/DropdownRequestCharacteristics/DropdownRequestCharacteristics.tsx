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

import React from 'react';
import {View} from 'react-native';
import {checkNullString, Label, LabelText} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

const DropdownRequestCharacteristics = () => {
  const I18n = useTranslator();

  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );

  if (
    checkNullString(purchaseRequest.supplierPartner?.fullName) &&
    checkNullString(purchaseRequest.stockLocation?.name) &&
    checkNullString(purchaseRequest.requesterUser?.fullName) &&
    checkNullString(purchaseRequest.validatorUser?.fullName)
  ) {
    return (
      <Label
        message={I18n.t('Purchase_NoInformationAvailable')}
        type="info"
        iconName="info-circle-fill"
      />
    );
  }

  return (
    <View>
      {!checkNullString(purchaseRequest.supplierPartner?.fullName) && (
        <LabelText
          title={purchaseRequest.supplierPartner?.fullName}
          iconName="person-fill"
          textSize={16}
        />
      )}
      {!checkNullString(purchaseRequest.stockLocation?.name) && (
        <LabelText
          title={`${I18n.t('Purchase_StockLocation')} :`}
          value={purchaseRequest.stockLocation?.name}
          textSize={16}
        />
      )}
      {!checkNullString(purchaseRequest.requesterUser?.fullName) && (
        <LabelText
          title={`${I18n.t('Purchase_RequesterUser')} :`}
          value={purchaseRequest.requesterUser?.fullName}
          textSize={16}
        />
      )}
      {!checkNullString(purchaseRequest.validatorUser?.fullName) && (
        <LabelText
          title={`${I18n.t('Purchase_ValidatorUser')} :`}
          value={purchaseRequest.validatorUser?.fullName}
          textSize={16}
        />
      )}
    </View>
  );
};

export default DropdownRequestCharacteristics;
