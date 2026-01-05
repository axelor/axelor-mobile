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

import React, {useCallback, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {searchPartnerLinks} from '../../../features/partnerLinkSlice';
import {LinkedPartnerCard} from '../../molecules';

interface DropDownPartnerLinksProps {
  customer: any;
}

const DropDownPartnerLinks = ({customer}: DropDownPartnerLinksProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {partnerLinks} = useSelector(state => state.sale_partnerLink);

  useEffect(() => {
    dispatch((searchPartnerLinks as any)({partnerId: customer?.id}));
  }, [customer, dispatch]);

  const managedBy = useMemo(
    () =>
      partnerLinks
        ?.filter((_p: any) => _p.partner1?.id === customer?.id)
        .map((_p: any) => ({
          id: _p.id,
          partner: _p.partner2,
          linkType: {
            ..._p.partnerLinkType,
            linkName: _p.partnerLinkType?.link2Name,
          },
        })),
    [customer?.id, partnerLinks],
  );

  const managedFor = useMemo(
    () =>
      partnerLinks
        ?.filter((_p: any) => _p.partner2?.id === customer?.id)
        .map((_p: any) => ({
          id: _p.id,
          partner: _p.partner1,
          linkType: {
            ..._p.partnerLinkType,
            linkName: _p.partnerLinkType?.link1Name,
          },
        })),
    [customer?.id, partnerLinks],
  );

  const renderGroup = useCallback(
    (partnerSet: any[], titleKey: string) => {
      return (
        <>
          <Text>{I18n.t(titleKey)}</Text>
          {partnerSet.map(_p => (
            <LinkedPartnerCard key={_p.id} {..._p} />
          ))}
        </>
      );
    },
    [I18n],
  );

  return (
    <View>
      {managedBy.length > 0 && renderGroup(managedBy, 'Sale_ManagedBy')}
      {managedFor.length > 0 && renderGroup(managedFor, 'Sale_ManagedFor')}
    </View>
  );
};

export default DropDownPartnerLinks;
