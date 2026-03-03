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

import {useMemo} from 'react';
import {useSelector} from '@axelor/aos-mobile-core';

export const useDeliveredPartners = () => {
  const {
    loadingLinks,
    moreLoadingLinks,
    isLinksListEnd,
    deliveryPartnerLinkList,
  } = useSelector(state => state.sale_partnerLink);

  const stablePartnerList = useMemo(
    () => (deliveryPartnerLinkList as any[]) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(deliveryPartnerLinkList)],
  );

  return useMemo(
    () => ({
      loadingLinks,
      moreLoadingLinks,
      isLinksListEnd,
      deliveryPartnerLinkList: stablePartnerList,
    }),
    [isLinksListEnd, loadingLinks, moreLoadingLinks, stablePartnerList],
  );
};
