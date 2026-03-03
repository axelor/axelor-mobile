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

import {useNavigation, usePermitted} from '@axelor/aos-mobile-core';
import React from 'react';
import {EditButton} from '../../../organisms';

const OpportunityBottom = ({opportunityId}) => {
  const navigation = useNavigation();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.crm.db.Opportunity',
  });

  if (readonly) {
    return null;
  }

  return (
    <EditButton
      onPress={() =>
        navigation.navigate('OpportunityFormScreen', {
          opportunityId: opportunityId,
        })
      }
    />
  );
};

export default OpportunityBottom;
