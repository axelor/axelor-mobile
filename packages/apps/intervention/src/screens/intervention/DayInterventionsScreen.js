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

import React from 'react';
import {InterventionDetailCard} from '../../components';

const DayInterventionsScreen = ({}) => {
  return (
    <InterventionDetailCard
      intervention={testIntervention}
      onPress={() => console.log('Card pressed.')}
    />
  );
};

export default DayInterventionsScreen;

const testIntervention = {
  id: 1,
  version: 0,
  statusSelect: 20,
  sequence: 'TEST0001',
  deliveredPartner: {
    fullName: '0001 - TEST',
    mobilephone: '0600000000',
    fixedPhone: '0100000000',
    picture: {
      id: 1,
      $version: 0,
    },
    id: 1,
    $version: 0,
  },
  planifStartDateTime: '2024-03-13T12:00Z',
  interventionType: {
    code: 'MTN',
    name: 'Maintenance',
    id: 1,
    $version: 0,
  },
  address: {
    fullName: '1 Avenue des Champs-Élysées',
    id: 1,
    $version: 0,
  },
};
