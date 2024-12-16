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

import {headerActionsProvider, useSelector} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';

const useHeldpeskTicketDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {ticket} = useSelector((state: any) => state.ticket);

  useEffect(() => {
    headerActionsProvider.registerModel('helpdesk_ticket_details', {
      model: 'com.axelor.apps.helpdesk.db.Ticket',
      modelId: ticket?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, ticket]);
};

export const useHelpdeskHeaders = () => {
  useHeldpeskTicketDetailsActions();
};
