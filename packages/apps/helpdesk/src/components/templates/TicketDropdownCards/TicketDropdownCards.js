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
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import DropdownGeneralView from './DropdownGeneralView';
import DropdownTimingView from './DropdownTimingView';

const TicketDropdownCards = ({}) => {
  const I18n = useTranslator();

  const {ticket} = useSelector(state => state.ticket);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Helpdesk_GeneralInformations'),
            key: 1,
            childrenComp: (
              <DropdownGeneralView
                project={ticket.project?.fullName}
                contactPartner={ticket.contactPartner?.fullName}
                customerPartner={ticket.customerPartner?.fullName}
                assignedToUser={ticket.assignedToUser?.fullName}
                responsibleUser={ticket.responsibleUser?.fullName}
              />
            ),
          },
          {
            title: I18n.t('Helpdesk_Timing'),
            key: 2,
            childrenComp: (
              <DropdownTimingView
                deadlineDateT={ticket.deadlineDateT}
                startDateT={ticket.startDateT}
                endDateT={ticket.endDateT}
                duration={ticket.duration}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default TicketDropdownCards;
