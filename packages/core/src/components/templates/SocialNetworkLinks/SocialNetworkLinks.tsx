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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {linkingProvider} from '../../../tools';

const formatGoogleSearch = (name, lastName, company) => {
  let result = '';

  if (name != null && lastName != null) {
    result = result.concat(name).concat('+').concat(lastName);
  }

  if (company != null) {
    result = result.concat('+').concat(company).concat('+');
  }

  return result;
};

const formatLinkedinSearch = (name, lastName, company) => {
  if (name != null && lastName != null) {
    return `${name}/${lastName}`;
  }

  if (company != null) {
    return company;
  }

  return '';
};

const SocialNetworkLinks = ({
  size = 20,
  data,
  googleColor,
  hideGoogle = false,
  linkedinColor,
  hideLinkedin = false,
}: {
  size?: number;
  data: {name?: string; lastName?: string; company?: string};
  googleColor?: string;
  hideGoogle?: boolean;
  linkedinColor?: string;
  hideLinkedin?: boolean;
}) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      {!hideGoogle && (
        <Icon
          style={styles.icon}
          name="google"
          FontAwesome5={false}
          color={googleColor || Colors.primaryColor.background}
          touchable={true}
          size={size}
          onPress={() =>
            linkingProvider.openBrowser(
              `https://www.google.com/search?q=${formatGoogleSearch(
                data.name,
                data.lastName,
                data.company,
              )}&gws_rd=cr`,
            )
          }
        />
      )}
      {!hideLinkedin && (
        <Icon
          style={styles.icon}
          name="linkedin"
          FontAwesome5={false}
          color={linkedinColor || Colors.primaryColor.background}
          touchable={true}
          size={size}
          onPress={() =>
            linkingProvider.openBrowser(
              `https://www.linkedin.com/pub/dir/${formatLinkedinSearch(
                data.name,
                data.lastName,
                data.company,
              )}`,
              false,
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  icon: {
    marginHorizontal: 2,
  },
});

export default SocialNetworkLinks;
