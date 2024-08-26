/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useEffect} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchCartLineById} from '../../features/cartLineSlice';
import {CartLineActionCard, QuantityCard} from '../../components';

const CartLineDetailsScreen = ({route}) => {
  const {cartLineId} = route.params;

  const dispatch = useDispatch();

  const { activeCart} = useSelector((state: any) => state.sale_cart);
  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  console.log(cartLine);

  useEffect(() => {
    dispatch((fetchCartLineById as any)({cartLineId}));
  }, [cartLineId, dispatch]);

  return (
    <Screen removeSpaceOnTop>
      <CartLineActionCard cartLine={cartLine} cartId={activeCart?.id} />
      <QuantityCard
        defaultValue={0}
        labelQty="r"
        editable={true}
        onValueChange={() => {}}
        isBigButton={true}
      />
    </Screen>
  );
};

export default CartLineDetailsScreen;
