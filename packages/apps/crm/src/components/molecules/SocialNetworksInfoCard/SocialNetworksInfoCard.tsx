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
import {StyleSheet, View} from 'react-native';
import {LabelText, checkNullString} from '@axelor/aos-mobile-ui';
import {SocialNetworkLinks, useTranslator} from '@axelor/aos-mobile-core';

interface SocialNetworksInfoCardProps {
  style?: any;
  name?: string;
  lastName?: string;
  fullName?: string;
  company?: string;
}

const SocialNetworksInfoCard = ({
  style,
  fullName,
  name,
  lastName,
  company,
}: SocialNetworksInfoCardProps) => {
  const I18n = useTranslator();

  if (
    checkNullString(name) &&
    checkNullString(lastName) &&
    checkNullString(company) &&
    checkNullString(fullName)
  ) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <LabelText
        title={I18n.t('Crm_SocialNetworks')}
        iconName="globe"
        size={15}
      />
      <View style={styles.containerBody}>
        <SocialNetworkLinks
          size={25}
          data={{
            fullName: fullName,
            name: name,
            lastName: lastName,
            company: company,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '95%',
    marginHorizontal: 10,
  },
  containerBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
  },
});

export default SocialNetworksInfoCard;
