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
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import Inventory from '../../../../types/inventory';
import {QuantityCard} from '../../../organisms';

const InventoryLineQuantityCard = ({realQty, setRealQty, inventoryLine}) => {
  const I18n = useTranslator();

  const {inventory} = useSelector((state: any) => state.inventory);

  return (
    <QuantityCard
      labelQty={`${I18n.t('Stock_PhysicalQty')} :`}
      defaultValue={realQty}
      onValueChange={setRealQty}
      editable={inventory.statusSelect !== Inventory.status.Validated}
      isBigButton={true}>
      {inventoryLine == null ? (
        <Text>
          {`${I18n.t('Stock_DatabaseQty')} : ${I18n.t('Base_Unknown')}`}
        </Text>
      ) : (
        <Text>
          {`${I18n.t('Stock_DatabaseQty')} : ${parseFloat(
            inventoryLine?.currentQty,
          ).toFixed(2)} ${inventoryLine?.unit?.name}`}
        </Text>
      )}
    </QuantityCard>
  );
};

export default InventoryLineQuantityCard;
