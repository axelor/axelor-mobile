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
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {linkingProvider} from '../../../tools';

const splitFullName = _data => {
  const fullName = _data?.split(' ');
  if (fullName?.length === 2) {
    return {firstName: fullName[0], lastName: fullName[1]};
  } else {
    return {firstName: fullName, lastName: ''};
  }
};

const formatGoogleSearch = ({
  name,
  lastName,
  fullName,
  company,
}: ContactData) => {
  let result = '';

  if (name != null && lastName != null) {
    result = result.concat(name).concat('+').concat(lastName);
  } else if (fullName != null) {
    const _names = splitFullName(fullName);
    result = result
      .concat(_names.firstName)
      .concat('+')
      .concat(_names.lastName);
  }

  if (company != null) {
    result = result.concat('+').concat(company).concat('+');
  }

  return result;
};

const formatLinkedinSearch = ({
  name,
  lastName,
  fullName,
  company,
}: ContactData) => {
  if (name != null && lastName != null) {
    return `pub/dir/${name}/${lastName}`;
  } else if (fullName != null) {
    const _names = splitFullName(fullName);
    return `pub/dir/${_names.firstName}/${_names.lastName}`;
  }

  if (company) {
    return `company/${company}`;
  }

  return '';
};

interface ContactData {
  name?: string;
  lastName?: string;
  fullName?: string;
  company?: string;
}

const SocialNetworkLinks = ({
  style,
  size = 20,
  data,
  googleColor,
  hideGoogle = false,
  linkedinColor,
  hideLinkedin = false,
}: {
  style?: any;
  size?: number;
  data: ContactData;
  googleColor?: string;
  hideGoogle?: boolean;
  linkedinColor?: string;
  hideLinkedin?: boolean;
}) => {
  const Colors = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      {!hideGoogle && (
        <Icon
          style={styles.icon}
          name="google"
          color={googleColor || Colors.primaryColor.background}
          touchable={true}
          size={size}
          onPress={() =>
            linkingProvider.openBrowser(
              `https://www.google.com/search?q=${formatGoogleSearch(
                data,
              )}&gws_rd=cr`,
            )
          }
        />
      )}
      {!hideLinkedin && (
        <Icon
          style={styles.icon}
          name="linkedin"
          color={linkedinColor || Colors.primaryColor.background}
          touchable={true}
          size={size}
          onPress={() =>
            linkingProvider.openBrowser(
              `https://www.linkedin.com/${formatLinkedinSearch(data)}`,
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
    marginHorizontal: 7,
  },
});

export default SocialNetworkLinks;
