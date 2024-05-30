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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, linkingProvider, isEmpty} from '@axelor/aos-mobile-core';
import {ContactInfoCard, SocialNetworksInfoCard} from '../../molecules';
import {Text} from '@axelor/aos-mobile-ui';

interface NetworkData {
  name?: string;
  lastName?: string;
  fullName?: string;
  company?: string;
}

interface DropdownContactViewProps {
  address?: string;
  fixedPhone?: string;
  mobilePhone?: string;
  emailAddress?: string;
  webSite?: string;
  networkData?: NetworkData;
}

const DropdownContactView = ({
  address,
  fixedPhone,
  mobilePhone,
  emailAddress,
  webSite,
  networkData,
}: DropdownContactViewProps) => {
  const I18n = useTranslator();

  if (
    !address &&
    !fixedPhone &&
    !mobilePhone &&
    !emailAddress &&
    !webSite &&
    isEmpty(networkData)
  ) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoContactInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      <ContactInfoCard
        headerIconName={'map-marker-alt'}
        title={I18n.t('Crm_Address')}
        data={address}
        rightIconName={'map-marked-alt'}
        border={
          fixedPhone != null ||
          mobilePhone != null ||
          emailAddress != null ||
          webSite != null ||
          !isEmpty(networkData)
        }
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openMapApp(address)}
      />
      <ContactInfoCard
        headerIconName={'phone-alt'}
        title={I18n.t('Crm_Phone')}
        data={fixedPhone}
        rightIconName={'phone-alt'}
        border={
          mobilePhone != null ||
          emailAddress != null ||
          webSite != null ||
          !isEmpty(networkData)
        }
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openCallApp(fixedPhone)}
      />
      <ContactInfoCard
        headerIconName={'mobile-alt'}
        title={I18n.t('Crm_MobilePhone')}
        data={mobilePhone}
        rightIconName={'phone-alt'}
        border={
          emailAddress != null || webSite != null || !isEmpty(networkData)
        }
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openCallApp(mobilePhone)}
      />
      <ContactInfoCard
        headerIconName={'envelope'}
        title={I18n.t('Crm_Email')}
        data={emailAddress}
        rightIconName={'send'}
        FontAwesome5RightIcon={false}
        border={webSite != null || !isEmpty(networkData)}
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openMailApp(emailAddress)}
      />
      <ContactInfoCard
        headerIconName={'link'}
        title={I18n.t('Crm_WebSite')}
        data={webSite}
        rightIconName={'external-link-alt'}
        styleBorder={styles.borderInfoCard}
        border={!isEmpty(networkData)}
        rightIconAction={() => linkingProvider.openBrowser(webSite)}
      />
      <SocialNetworksInfoCard {...networkData} />
    </View>
  );
};

const styles = StyleSheet.create({
  borderInfoCard: {
    width: '112%',
    left: '-5%',
  },
});

export default DropdownContactView;
