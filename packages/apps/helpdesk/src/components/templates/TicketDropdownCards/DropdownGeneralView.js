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
import {View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {checkNullString, LabelText, Text} from '@axelor/aos-mobile-ui';

const DropdownGeneralView = ({
  project,
  customerPartner,
  contactPartner,
  assignedToUser,
  responsibleUser,
}) => {
  const I18n = useTranslator();

  if (
    checkNullString(project) &&
    checkNullString(customerPartner) &&
    checkNullString(contactPartner) &&
    checkNullString(assignedToUser) &&
    checkNullString(responsibleUser)
  ) {
    return (
      <View>
        <Text>{I18n.t('Helpdesk_NoGeneralInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {!checkNullString(project) && (
        <LabelText title={I18n.t('Helpdesk_Project')} value={project} />
      )}
      {!checkNullString(customerPartner) && (
        <LabelText
          title={I18n.t('Helpdesk_CustomPartner')}
          value={customerPartner}
        />
      )}
      {!checkNullString(contactPartner) && (
        <LabelText
          title={I18n.t('Helpdesk_ContactPartner')}
          value={contactPartner}
        />
      )}
      {!checkNullString(assignedToUser) && (
        <LabelText
          title={I18n.t('Helpdesk_Assigned_To')}
          value={assignedToUser}
        />
      )}
      {!checkNullString(responsibleUser) && (
        <LabelText
          title={I18n.t('Helpdesk_User_In_Charge')}
          value={responsibleUser}
        />
      )}
    </View>
  );
};

export default DropdownGeneralView;
