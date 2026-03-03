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
import {usePermitted, useTranslator} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';

interface ProdProductFixedItemsProps {
  show?: boolean;
  prodProduct: any;
  onPressUpdate: () => void;
  onPressCreate: () => void;
}

const ProdProductFixedItems = ({
  show = false,
  prodProduct,
  onPressUpdate,
  onPressCreate,
}: ProdProductFixedItemsProps) => {
  const I18n = useTranslator();
  const {canCreate, readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ProdProduct',
  });

  if (show) {
    if (prodProduct != null && !readonly) {
      return <Button title={I18n.t('Base_Save')} onPress={onPressUpdate} />;
    }

    if (prodProduct == null && canCreate) {
      return <Button title={I18n.t('Base_Save')} onPress={onPressCreate} />;
    }

    return null;
  }

  return null;
};

export default ProdProductFixedItems;
