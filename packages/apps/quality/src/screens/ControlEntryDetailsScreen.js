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

import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {ControlEntryHeader} from '../components';
import {fetchControlEntryById} from '../features/controlEntrySlice';

const ControlEntryDetailsScreen = ({route}) => {
  const {controlEntryId} = route.params;

  const dispatch = useDispatch();

  const {controlEntry} = useSelector(state => state.controlEntry);

  useEffect(() => {
    dispatch(fetchControlEntryById({controlEntryId: controlEntryId}));
  }, [controlEntryId, dispatch]);

  console.log(controlEntry);

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ControlEntryHeader />}
      />
    </Screen>
  );
};

export default ControlEntryDetailsScreen;
