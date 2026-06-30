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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {
  DropdownAddressesView,
  DropdownContactView,
  DropdownEmployeeView,
  DropdownEventView,
  DropdownGeneralView,
  DropdownOpportunityView,
} from '../../../organisms';
import {getClientbyId} from '../../../../features/clientSlice';
import {searchContactById} from '../../../../features/contactSlice';
import {fetchPartnerEventById} from '../../../../features/eventSlice';
import {fetchPartnerAddresses} from '../../../../features/partnerSlice';

const ClientDropdownCards = ({
  additionalDropdowns = [],
}: {
  additionalDropdowns?: any[];
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {client} = useSelector(state => state.client);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);

  const refreshContactInfos = useCallback(() => {
    dispatch((getClientbyId as any)({clientId: client?.id}));
    dispatch((fetchPartnerAddresses as any)({partnerId: client?.id}));
  }, [client.id, dispatch]);

  useEffect(() => {
    if (client.contactPartnerSet?.length > 0) {
      dispatch(
        searchContactById(client.contactPartnerSet?.map((_i: any) => _i.id)),
      );
    }
  }, [dispatch, client.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(client?.id));
  }, [dispatch, client]);

  const dropdownItems = useMemo(() => {
    const _dropdownItems = [
      {
        title: I18n.t('Crm_Contact'),
        key: 1,
        iconName: 'telephone',
        isDefaultVisible: true,
        childrenComp: (
          <DropdownContactView
            isMainAddress={true}
            contact={{...client, address: client.mainAddress}}
            networkData={{company: client.simpleFullName}}
            refreshContactInfos={refreshContactInfos}
          />
        ),
      },
      {
        title: I18n.t('Crm_Addresses'),
        key: 2,
        iconName: 'geo-alt',
        isDefaultVisible: true,
        childrenComp: (
          <DropdownAddressesView
            partnerId={client.id}
            partnerVersion={client.version}
            refreshContactInfos={refreshContactInfos}
          />
        ),
      },
      {
        title: I18n.t('Crm_GeneralInformation'),
        key: 3,
        iconName: 'person',
        childrenComp: (
          <DropdownGeneralView
            assignedUser={client.user?.fullName}
            category={client.partnerCategory?.name}
            industrySector={client.industrySector?.name}
            priceList={client.salePartnerPriceList?.label}
          />
        ),
      },
      {
        title: I18n.t('Crm_Employees'),
        key: 4,
        iconName: 'person-vcard',
        childrenComp: <DropdownEmployeeView contactList={listContactById} />,
      },
      {
        title: I18n.t('Crm_Events'),
        key: 5,
        iconName: 'calendar2-event',
        childrenComp: <DropdownEventView eventList={listEventPartner} />,
      },
      {
        title: I18n.t('Crm_Opportunity'),
        key: 6,
        iconName: 'search-dollar',
        childrenComp: <DropdownOpportunityView partnerId={client?.id} />,
      },
    ];

    if (additionalDropdowns?.length > 0) {
      additionalDropdowns.forEach((dropdown, index) => {
        _dropdownItems.push({...dropdown, key: 7 + index});
      });
    }

    return _dropdownItems;
  }, [
    I18n,
    additionalDropdowns,
    client,
    listContactById,
    listEventPartner,
    refreshContactInfos,
  ]);

  return <DropdownCardSwitch dropdownItems={dropdownItems} multiSelection />;
};

export default ClientDropdownCards;
