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
import {StyleSheet} from 'react-native';
import {useNavigation, usePermitted} from '@axelor/aos-mobile-core';
import {CircleButton} from '@axelor/aos-mobile-ui';

const TicketEditButton = ({idTicket}) => {
  const navigation = useNavigation();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.helpdesk.db.Ticket',
  });

  if (readonly) {
    return null;
  }

  return (
    <CircleButton
      style={styles.floatingButton}
      iconName="pencil-fill"
      onPress={() =>
        navigation.navigate('TicketFormScreen', {
          idTicket: idTicket,
        })
      }
    />
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});

export default TicketEditButton;
