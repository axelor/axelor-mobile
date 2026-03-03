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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  formatDateTime,
  useMetafileUri,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {Icon, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';

interface InterventionCardProps {
  style?: any;
  statusSelect: number;
  deliveredPartner: any;
  sequence: string;
  planifStartDateTime: string;
  interventionType: any;
  address: any;
  assignedTo: any;
  isCopyCard?: boolean;
  onPress: () => void;
}

const InterventionCard = ({
  style,
  statusSelect,
  deliveredPartner,
  sequence,
  planifStartDateTime,
  interventionType,
  address,
  assignedTo,
  isCopyCard = false,
  onPress,
}: InterventionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatMetaFile = useMetafileUri();
  const {Intervention} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const {userId} = useSelector((state: any) => state.auth);

  const borderStyle = useMemo(
    () =>
      getStyles(
        getItemColor(Intervention?.statusSelect, statusSelect)?.background,
      )?.border,
    [Intervention?.statusSelect, getItemColor, statusSelect],
  );

  return (
    <ObjectCard
      style={[styles.container, borderStyle, style]}
      showArrow={!isCopyCard}
      leftContainerFlex={6}
      onPress={onPress}
      image={{
        defaultIconSize: 50,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        source: formatMetaFile(deliveredPartner.picture?.id),
      }}
      upperTexts={{
        items: [
          {displayText: sequence, isTitle: true},
          {
            displayText: deliveredPartner.fullName,
            numberOfLines: 2,
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: formatDateTime(
              planifStartDateTime,
              I18n.t('Base_DateTimeFormat'),
            ),
            iconName: 'calendar-event',
          },
          {
            indicatorText: interventionType.name,
            iconName: 'tools',
          },
          {
            indicatorText: address.fullName,
            iconName: 'geo-alt-fill',
            hideIfNull: true,
          },
          {
            indicatorText: assignedTo.fullName,
            iconName: 'person-fill',
            hideIf: assignedTo.id === userId,
          },
        ],
      }}
      sideBadges={{
        style: styles.badges,
        items: [
          isCopyCard && {
            customComponent: (
              <Icon name="copy" color={Colors.secondaryColor.background} />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 2,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  badges: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default InterventionCard;
