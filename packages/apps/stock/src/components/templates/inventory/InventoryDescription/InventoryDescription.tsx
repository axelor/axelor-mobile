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

import React, {useCallback} from 'react';
import {useSelector, useDispatch, usePermitted} from '@axelor/aos-mobile-core';
import {modifyDescription} from '../../../../features/inventorySlice';
import {DescriptionCard} from '../../../organisms';

const InventoryDescription = ({style}: {style?: any}) => {
  const dispatch: any = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.Inventory',
  });

  const {inventory} = useSelector(state => state.inventory);

  const handleDescriptionChange = useCallback(
    (input: any) => {
      dispatch(
        (modifyDescription as any)({
          inventoryId: inventory?.id,
          description: input?.toString(),
          version: inventory?.version,
        }),
      );
    },
    [dispatch, inventory],
  );

  return (
    <DescriptionCard
      style={style}
      description={inventory?.description}
      isEditable={!readonly}
      onChange={handleDescriptionChange}
    />
  );
};

export default InventoryDescription;
