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

import React, {useEffect} from 'react';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DropdownContactPartnerView,
  DropdownContactView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {getContact} from '../../../../features/contactSlice';
import {fetchContactEventById} from '../../../../features/eventSlice';

const ContactDropdownCards = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {contact} = useSelector(state => state.contact);
  const {listEventContact} = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchContactEventById(contact?.id));
  }, [dispatch, contact]);

  return (
    <DropdownCardSwitch
      dropdownItems={[
        {
          title: I18n.t('Crm_Contact'),
          key: 0,
          iconName: 'telephone',
          childrenComp: (
            <DropdownContactView
              contact={{...contact, address: contact.mainAddress}}
              networkData={{
                fullName: contact.simpleFullName,
                company: contact.mainPartner?.simpleFullName,
              }}
              refreshContactInfos={() =>
                dispatch((getContact as any)({contactId: contact.id}))
              }
            />
          ),
          isDefaultVisible: true,
        },
        {
          title: I18n.t('Crm_GeneralInformation'),
          key: 10,
          iconName: 'person',
          childrenComp: (
            <DropdownGeneralView
              assignedUser={contact.user?.fullName}
              language={contact.language?.name}
            />
          ),
        },
        {
          title: I18n.t('Crm_Events'),
          key: 20,
          iconName: 'calendar2-event',
          childrenComp: <DropdownEventView eventList={listEventContact} />,
        },
        {
          title: I18n.t('Crm_LinkedPartnersOfContact'),
          key: 30,
          iconName: 'person-bounding-box',
          childrenComp: <DropdownContactPartnerView idContact={contact.id} />,
        },
      ]}
    />
  );
};

export default ContactDropdownCards;
