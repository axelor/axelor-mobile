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

import {useCallback, useEffect, useMemo} from 'react';
import {
  handlerApiCall,
  isEmpty,
  useDispatch,
  useNavigation,
  useSelector,
} from '@axelor/aos-mobile-core';
import {
  fetchProductCompanyWithId,
  fetchProductWithId,
} from '../features/productSlice';
import {fetchProductCompanyWithId as fetchProductCompanyWithIdApi} from '../api/product-api';
import {showLine} from '../utils';
import {LineVerification} from '../types';

const recreateProductStructure = (product: any, productByCompany: any): any => {
  if (isEmpty(product)) return product;

  return {
    ...product,
    trackingNumberConfiguration: productByCompany?.trackingNumberConfiguration,
  };
};

export const useTrackingConfigByCompany = () => {
  const {base} = useSelector(state => state.appConfig);

  return useMemo(
    () =>
      base?.companySpecificProductFieldsSet.some(
        ({name}) => name === 'trackingNumberConfiguration',
      ),
    [base?.companySpecificProductFieldsSet],
  );
};

export const useProductByCompany = (productId: boolean) => {
  const dispatch = useDispatch();
  const isTrackingNumberConfiguration = useTrackingConfigByCompany();

  const {user} = useSelector(state => state.user);
  const {productFromId, productCompany} = useSelector(state => state.product);

  const product = useMemo(() => {
    if (isTrackingNumberConfiguration) {
      return recreateProductStructure(productFromId, productCompany);
    }

    return productFromId;
  }, [isTrackingNumberConfiguration, productCompany, productFromId]);

  useEffect(() => {
    if (productId != null) {
      if (productId !== productFromId?.id) {
        dispatch((fetchProductWithId as any)(productId));
      }

      if (
        isTrackingNumberConfiguration &&
        productId !== productCompany?.product?.id
      ) {
        dispatch(
          (fetchProductCompanyWithId as any)({
            productId,
            companyId: user.activeCompany?.id,
          }),
        );
      }
    }
  }, [
    dispatch,
    isTrackingNumberConfiguration,
    productCompany?.product?.id,
    productFromId?.id,
    productId,
    user.activeCompany?.id,
  ]);

  return useMemo(() => product, [product]);
};

export const useLineHandler = () => {
  const navigation = useNavigation();
  const isTrackingNumberConfiguration = useTrackingConfigByCompany();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);

  const getState = useCallback(() => ({auth: {userId: user?.id}}), [user?.id]);

  const fetchProductByCompany = useCallback(
    async (product: any) => {
      let productCompany = product;

      if (isTrackingNumberConfiguration) {
        productCompany = await handlerApiCall({
          fetchFunction: fetchProductCompanyWithIdApi,
          data: {productId: product.id, companyId: user.activeCompany?.id},
          action: 'Stock_SliceAction_FetchProductCompanyWithId',
          getState,
          responseOptions: {isArrayResponse: false},
          errorOptions: {showErrorToast: false},
        });
      }

      return recreateProductStructure(product, productCompany);
    },
    [getState, isTrackingNumberConfiguration, user.activeCompany?.id],
  );

  const handleLine = useCallback(
    async ({
      move,
      line,
      skipVerification,
      type,
    }: {
      move: any;
      line: any;
      skipVerification?: boolean;
      type: keyof typeof LineVerification.type;
    }) => {
      if (line != null) {
        const config = LineVerification.getLineVerificationConfig(type);
        const _skipVerification =
          skipVerification ?? !mobileSettings?.[config.configName];
        const product = await fetchProductByCompany(line.product);

        showLine({
          ...config,
          item: {name: config.item, data: move},
          itemLine: {name: config.itemLine, data: {...line, product}},
          skipVerification: _skipVerification,
          navigation,
        });
      }
    },
    [fetchProductByCompany, mobileSettings, navigation],
  );

  return useMemo(() => ({showLine: handleLine}), [handleLine]);
};
