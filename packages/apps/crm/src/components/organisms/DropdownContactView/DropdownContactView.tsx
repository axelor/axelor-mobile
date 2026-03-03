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
import {StyleSheet, View} from 'react-native';
import {
  handlerApiCall,
  isEmpty,
  linkingProvider,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ContactInfoCard,
  ContactInfoType,
  SocialNetworksInfoCard,
} from '../../molecules';
import {
  linkEmailApi,
  updateAddressApi,
  updateEmailApi,
  updateLeadApi,
  updatePartnerApi,
} from '../../../api';

interface Contact {
  id: number;
  version: number;
  address?: any;
  fixedPhone?: string;
  mobilePhone?: string;
  emailAddress?: any;
  webSite?: string;
}

interface NetworkData {
  name?: string;
  lastName?: string;
  fullName?: string;
  company?: string;
}

interface DropdownContactViewProps {
  isMainAddress?: boolean;
  contact: Contact;
  isLead?: boolean;
  networkData?: NetworkData;
  refreshContactInfos: () => void;
}

const DropdownContactView = ({
  isMainAddress,
  contact,
  isLead = false,
  networkData,
  refreshContactInfos,
}: DropdownContactViewProps) => {
  const I18n = useTranslator();

  const {userId} = useSelector((state: any) => state.auth);

  const getState = useCallback(() => ({auth: {userId}}), [userId]);

  const updateAddress = useCallback(
    ({id, version, data}) => {
      const dataApi = {
        isLead,
        id,
        version,
        ...data,
      };

      return handlerApiCall({
        fetchFunction: updateAddressApi,
        data: dataApi,
        action: 'Crm_ApiAction_UpdateAddress',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState, isLead],
  );

  const updateContactInfo = useCallback(
    ({id, version, data}) => {
      const dataApi = {id, version, ...data};

      return handlerApiCall({
        fetchFunction: isLead ? updateLeadApi : updatePartnerApi,
        data: isLead ? {lead: dataApi} : dataApi,
        action: 'Crm_ApiAction_UpdateContactInfo',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState, isLead],
  );

  const updateEmail = useCallback(
    ({id, version, data}) => {
      return handlerApiCall({
        fetchFunction: updateEmailApi,
        data: {id, version, email: data.email},
        action: 'Crm_ApiAction_UpdateEmail',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState],
  );

  const linkEmail = useCallback(
    ({data}) => {
      return handlerApiCall({
        fetchFunction: linkEmailApi,
        data: {
          id: contact?.id,
          version: contact?.version,
          isLead,
          email: data.email,
        },
        action: 'Crm_ApiAction_UpdateEmail',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [contact?.id, contact?.version, getState, isLead],
  );

  return (
    <View style={styles.container}>
      <ContactInfoCard
        headerIconName="geo-alt-fill"
        title={
          isMainAddress ? I18n.t('Crm_MainAddress') : I18n.t('Crm_Address')
        }
        contact={contact}
        contactInfoType={ContactInfoType.type.Address}
        isLead={isLead}
        onPress={() => linkingProvider.openMapApp(contact.address.fullName)}
        onUpdate={updateAddress}
        refreshContactInfos={refreshContactInfos}
        canCreate={!isMainAddress}
      />
      <ContactInfoCard
        headerIconName="telephone-fill"
        title={I18n.t('Crm_Phone')}
        contact={contact}
        contactInfoType={ContactInfoType.type.FixedPhone}
        isLead={isLead}
        onPress={() => linkingProvider.openCallApp(contact.fixedPhone)}
        onUpdate={updateContactInfo}
        refreshContactInfos={refreshContactInfos}
      />
      <ContactInfoCard
        headerIconName="phone-fill"
        title={I18n.t('Crm_MobilePhone')}
        contact={contact}
        contactInfoType={ContactInfoType.type.MobilePhone}
        isLead={isLead}
        onPress={() => linkingProvider.openCallApp(contact.mobilePhone)}
        onUpdate={updateContactInfo}
        refreshContactInfos={refreshContactInfos}
      />
      <ContactInfoCard
        headerIconName="envelope-fill"
        title={I18n.t('Crm_Email')}
        contact={contact}
        contactInfoType={ContactInfoType.type.Email}
        isLead={isLead}
        onPress={() =>
          linkingProvider.openMailApp(contact.emailAddress?.address)
        }
        onUpdate={updateEmail}
        onCreate={linkEmail}
        refreshContactInfos={refreshContactInfos}
      />
      <ContactInfoCard
        headerIconName="link-45deg"
        title={I18n.t('Crm_WebSite')}
        contact={contact}
        contactInfoType={ContactInfoType.type.WebSite}
        isLead={isLead}
        onPress={() => linkingProvider.openBrowser(contact.webSite)}
        onUpdate={updateContactInfo}
        refreshContactInfos={refreshContactInfos}
        border={!isEmpty(networkData)}
      />
      <SocialNetworksInfoCard {...networkData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: -10,
    width: '107%',
  },
});

export default DropdownContactView;
