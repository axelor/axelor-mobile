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

import React, {useCallback, useEffect} from 'react';
import {
  Screen,
  HeaderContainer,
  NotesCard,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTranslator,
  useIsFocused,
} from '@axelor/aos-mobile-core';
import {
  ProspectBottom,
  ProspectDropdownCards,
  ProspectHeader,
} from '../../components';
import {fetchProspectById} from '../../features/prospectSlice';

const ProspectDetailsScreen = ({route}) => {
  const {idProspect} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {loading, prospect} = useSelector(state => state.prospect);

  const getProspect = useCallback(() => {
    dispatch(fetchProspectById({partnerId: idProspect}));
  }, [dispatch, idProspect]);

  useEffect(() => {
    if (isFocused) {
      getProspect();
    }
  }, [getProspect, isFocused]);

  if (prospect?.id !== idProspect || !isFocused) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProspectHeader />}
      />
      <ScrollView refresh={{loading, fetcher: getProspect}}>
        <NotesCard title={I18n.t('Crm_Notes')} data={prospect.description} />
        <ProspectDropdownCards />
      </ScrollView>
      <ProspectBottom idProspect={idProspect} />
    </Screen>
  );
};

export default ProspectDetailsScreen;
