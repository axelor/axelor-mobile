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

import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  fetchProductCompanyWithId,
  fetchProductWithId,
} from '../features/productSlice';

export const useProductByCompany = (productId: boolean) => {
  const dispatch = useDispatch();

  const {base} = useSelector((state: any) => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {productFromId, productCompany} = useSelector(state => state.product);

  const isTrackingNumberConfiguration = useMemo(
    () =>
      base?.companySpecificProductFieldsSet.some(
        field => field.name === 'trackingNumberConfiguration',
      ),
    [base?.companySpecificProductFieldsSet],
  );

  const product = useMemo(() => {
    if (isTrackingNumberConfiguration) {
      return {
        ...productFromId,
        trackingNumberConfiguration:
          productCompany?.trackingNumberConfiguration,
      };
    }

    return productFromId;
  }, [isTrackingNumberConfiguration, productCompany, productFromId]);

  useEffect(() => {
    if (productId != null && productId !== productFromId?.id) {
      dispatch((fetchProductWithId as any)(productId));
      isTrackingNumberConfiguration &&
        dispatch(
          (fetchProductCompanyWithId as any)({
            productId,
            companyId: user.activeCompany?.id,
          }),
        );
    }
  }, [
    dispatch,
    isTrackingNumberConfiguration,
    productFromId?.id,
    productId,
    user.activeCompany?.id,
  ]);

  return useMemo(() => product, [product]);
};
