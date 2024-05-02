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
import {Screen, BottomBar, useThemeColor} from '@axelor/aos-mobile-ui';
import {useDispatch} from '@axelor/aos-mobile-core';
import {GeneralInformationView} from '../components';
import {fetchProjectById} from '../features/projectSlice';

const ProjectDetailsScreen = ({route}) => {
  const projectId = route?.params?.projectId;

  const Colors = useThemeColor();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((fetchProjectById as any)({projectId: projectId}));
  }, [projectId, dispatch]);

  const bottomBarItems = [
    {
      iconName: 'house',
      viewComponent: <GeneralInformationView />,
      color: Colors.secondaryColor_dark,
    },
  ];
  return (
    <Screen removeSpaceOnTop={true}>
      <BottomBar items={bottomBarItems} />
    </Screen>
  );
};

export default ProjectDetailsScreen;
