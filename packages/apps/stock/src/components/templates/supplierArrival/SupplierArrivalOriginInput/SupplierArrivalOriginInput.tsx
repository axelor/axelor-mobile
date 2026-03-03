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
import {
  InputBarCodeCard,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';

const trackingScanKey = 'supplier-arrival_tracking-number-origin_input';

const SupplierArrivalOriginInput = ({
  style,
  trackingNumber,
  setOrigin,
  readonly: _componentReadonly = false,
}: {
  style?: any;
  trackingNumber?: any;
  setOrigin: (value: string) => void;
  readonly?: boolean;
}) => {
  const I18n = useTranslator();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.TrackingNumber',
  });

  return (
    <InputBarCodeCard
      style={style}
      defaultValue={trackingNumber?.origin}
      onChange={setOrigin}
      title={I18n.t('Stock_Origin')}
      scanKeySearch={trackingScanKey}
      readonly={_componentReadonly || readonly}
    />
  );
};

export default SupplierArrivalOriginInput;
