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

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {BottomBar, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {GeneralInformationView} from '../../components';
import {fetchInterventionById} from '../../features/interventionSlice';

const InterventionDetailsScreen = ({route}) => {
  const {interventionId} = route.params;
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );

  useEffect(() => {
    dispatch((fetchInterventionById as any)({interventionId}));
  }, [dispatch, interventionId]);

  const bottomBarItems = [
    {
      iconName: 'house',
      viewComponent: <GeneralInformationView />,
      color: Colors.secondaryColor_dark,
    },
  ];

  if (intervention?.id !== interventionId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <BottomBar items={bottomBarItems} />
    </Screen>
  );
};

export default InterventionDetailsScreen;
