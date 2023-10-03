/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {linkingProvider} from '../../../tools';

const formatGoogleSearch = (name, lastName, company, linkedinEnterprise) => {
  let result = '';

  if (name != null && lastName != null) {
    result = result.concat(name).concat('+').concat(lastName);
  }

  if (company != null && !linkedinEnterprise) {
    result = result.concat('+').concat(company).concat('+');
  }

  return result;
};

const formatLinkedinSearch = (name, lastName, company, linkedinEnterprise) => {
  if (company != null && linkedinEnterprise) {
    return `company/${company}`;
  }
  if (name != null && lastName != null) {
    return `pub/dir/${name}/${lastName}`;
  }

  return '';
};

const getFirstNameAndName = nameToSplit => {
  const fullName = nameToSplit?.split(' ');
  if (fullName?.length === 2) {
    return {firstName: fullName[0], lastName: fullName[1]};
  } else {
    return {firstName: fullName, lastName: ''};
  }
};

const SocialNetworkLinks = ({
  style,
  size = 20,
  data,
  googleColor,
  hideGoogle = false,
  linkedinColor,
  hideLinkedin = false,
  linkedinEnterprise = false,
}: {
  style?: any;
  size?: number;
  data: {
    fullName?: string;
    name?: string;
    lastName?: string;
    company?: string;
  };
  googleColor?: string;
  hideGoogle?: boolean;
  linkedinColor?: string;
  hideLinkedin?: boolean;
  linkedinEnterprise?: boolean;
}) => {
  const Colors = useThemeColor();
  const [objectName, setObjectName] = useState({
    firstName: data?.name,
    lastName: data?.lastName,
  });

  useEffect(() => {
    if (data?.fullName != null) {
      setObjectName(getFirstNameAndName(data?.fullName));
    }
  }, [data]);

  return (
    <View style={[styles.container, style]}>
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
                objectName.firstName,
                objectName.lastName,
                data.company,
                linkedinEnterprise,
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
              `https://www.linkedin.com/${formatLinkedinSearch(
                objectName.firstName,
                objectName.lastName,
                data.company,
                linkedinEnterprise,
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
