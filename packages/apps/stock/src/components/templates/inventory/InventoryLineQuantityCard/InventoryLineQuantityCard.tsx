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
import {useTranslator, useSelector, useTypes} from '@axelor/aos-mobile-core';
import {QuantityCard, Text, useDigitFormat} from '@axelor/aos-mobile-ui';

const InventoryLineQuantityCard = ({
  realQty,
  setRealQty,
  inventoryLine,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {Inventory} = useTypes();

  const {inventory} = useSelector((state: any) => state.inventory);

  return (
    <QuantityCard
      labelQty={`${I18n.t('Stock_PhysicalQty')} :`}
      defaultValue={realQty}
      onValueChange={setRealQty}
      editable={
        !readonly &&
        inventory.statusSelect !== Inventory?.statusSelect.Validated
      }
      isBigButton={true}
      translator={I18n.t}>
      {inventoryLine == null ? (
        <Text>
          {`${I18n.t('Stock_DatabaseQty')} : ${I18n.t('Base_Unknown')}`}
        </Text>
      ) : (
        <Text>
          {`${I18n.t('Stock_DatabaseQty')} : ${formatNumber(
            inventoryLine?.currentQty,
          )} ${inventoryLine?.unit?.name}`}
        </Text>
      )}
    </QuantityCard>
  );
};

export default InventoryLineQuantityCard;
