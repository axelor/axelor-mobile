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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {isEmpty, linkingProvider} from '@axelor/aos-mobile-core';
import {PartnerCard} from '../../atoms';

interface PartnerProps {
  id: number;
  picture: any;
  simpleFullName: string;
  name: string;
  partnerSeq: string;
  jobTitleFunction?: any;
  mainAddress?: any;
  fixedPhone?: string;
  mobilePhone?: string;
}

interface PartnerActionCardProps {
  style?: any;
  partner: PartnerProps;
  isContact?: boolean;
}

const PartnerActionCard = ({
  style,
  partner,
  isContact = false,
}: PartnerActionCardProps) => {
  const Colors = useThemeColor();

  const actionConfig = useMemo(() => {
    if (isContact) {
      if (partner?.mobilePhone == null && partner?.fixedPhone == null) {
        return null;
      }

      return {
        iconName: 'telephone-fill',
        onPress: () =>
          linkingProvider.openCallApp(
            partner.mobilePhone ?? partner.fixedPhone,
          ),
      };
    } else {
      if (partner?.mainAddress == null) {
        return null;
      }

      return {
        iconName: 'geo-alt-fill',
        onPress: () => linkingProvider.openMapApp(partner.mainAddress.fullName),
      };
    }
  }, [isContact, partner]);

  if (isEmpty(partner)) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <PartnerCard
        style={styles.cardContainer}
        picture={partner.picture}
        name={isContact ? partner.simpleFullName : partner.name}
        code={partner.partnerSeq}
        jobName={partner.jobTitleFunction?.name}
        id={partner.id}
        isContact={isContact}
      />
      {actionConfig != null && (
        <CardIconButton
          iconName={actionConfig.iconName}
          iconColor={Colors.secondaryColor_dark.background}
          onPress={actionConfig.onPress}
          style={styles.cardIconButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    flex: 6,
  },
  cardIconButton: {
    flex: 1,
  },
});

export default PartnerActionCard;
