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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  linkingProvider,
  useMetafileUri,
  useNavigation,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ActionCard, ObjectCard} from '@axelor/aos-mobile-ui';

interface LinkedPartnerCardProps {
  style?: any;
  partner: any;
  linkType: any;
}

const LinkedPartnerCardAux = ({
  style,
  partner,
  linkType,
}: LinkedPartnerCardProps) => {
  const formatMetaFile = useMetafileUri();
  const navigation = useNavigation();
  const {PartnerLinkType} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const handleCardPress = useCallback(() => {
    navigation.navigate('ClientSaleDetailsScreen', {customerId: partner.id});
  }, [navigation, partner.id]);

  return (
    <ObjectCard
      onPress={handleCardPress}
      style={[styles.card, style]}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(partner.picture?.id),
      }}
      upperTexts={{
        items: [
          {displayText: partner.name, isTitle: true},
          {displayText: partner.partnerSeq, hideIfNull: true},
        ],
      }}
      upperBadges={{
        fixedOnRightSide: true,
        items: [
          {
            style: styles.badge,
            displayText: linkType?.linkName,
            color: getItemColor(
              PartnerLinkType?.typeSelect,
              linkType?.typeSelect,
            ),
          },
        ],
      }}
    />
  );
};

const LinkedPartnerCard = ({
  style,
  partner,
  linkType,
}: LinkedPartnerCardProps) => {
  const I18n = useTranslator();

  const actionList = useMemo(
    () => [
      {
        iconName: 'telephone-fill',
        helper: I18n.t('Sale_Call'),
        hidden: partner?.fixedPhone == null,
        onPress: () => linkingProvider.openCallApp(partner.fixedPhone),
      },
      {
        iconName: 'geo-alt-fill',
        helper: I18n.t('Sale_OpenMap'),
        hidden: partner?.mainAddress == null,
        onPress: () => linkingProvider.openMapApp(partner.mainAddress.fullName),
      },
    ],
    [I18n, partner],
  );

  return (
    <ActionCard
      style={[styles.container, style]}
      actionList={actionList}
      translator={I18n.t}>
      <LinkedPartnerCardAux partner={partner} linkType={linkType} />
    </ActionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    marginVertical: 4,
    marginHorizontal: 2,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  badge: {
    width: undefined,
    paddingHorizontal: 10,
  },
});

export default LinkedPartnerCard;
