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
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface MaintenanceRequestCardProps {
  style?: any;
  equipementMaintenance: {
    code: string;
  };
  machine: {
    name: string;
  };
  expectedDate?: string;
  statusSelect: number;
  actionSelect: number;
}

const MaintenanceRequestCard = ({
  style,
  equipementMaintenance,
  machine,
  expectedDate,
  statusSelect,
  actionSelect,
}: MaintenanceRequestCardProps) => {
  const I18n = useTranslator();
  const {MaintenanceRequest} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const borderStyle = useMemo(
    () =>
      getBorderStyles(
        getItemColor(MaintenanceRequest?.statusSelect, statusSelect)
          ?.background,
      )?.border,
    [MaintenanceRequest?.statusSelect, getItemColor, statusSelect],
  );

  return (
    <ObjectCard
      style={[styles.card, borderStyle, style]}
      showArrow={false}
      touchable={false}
      leftContainerFlex={2}
      upperTexts={{
        items: [
          {
            isTitle: true,
            displayText: equipementMaintenance.code,
          },
          {
            iconName: 'wrench',
            indicatorText: `${I18n.t('Maintenance_Machine')} :`,
            displayText: machine.name,
          },
          {
            iconName: 'calendar-event',
            indicatorText: `${I18n.t('Maintenance_Deadline')} :`,
            displayText: formatDate(expectedDate, I18n.t('Base_DateFormat')),
          },
        ],
      }}
      sideBadges={{
        items: [
          {
            style: {width: undefined, paddingHorizontal: 5},
            color: getItemColor(MaintenanceRequest?.actionSelect, actionSelect),
            displayText: getItemTitle(
              MaintenanceRequest?.actionSelect,
              actionSelect,
            ),
          },
        ],
      }}
    />
  );
};

const getBorderStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 4,
    paddingRight: 5,
  },
});

export default MaintenanceRequestCard;
