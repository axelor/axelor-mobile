/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ProspectBottom,
  ProspectDropdownCards,
  ProspectHeader,
} from '../../components';
import {fetchProspectById} from '../../features/prospectSlice';

const ProspectDetailsScreen = ({navigation, route}) => {
  const idProspect = route.params.idProspect;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {prospect} = useSelector(state => state.prospect);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={idProspect}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={prospect?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, idProspect, prospect]);

  useEffect(() => {
    dispatch(fetchProspectById({partnerId: idProspect}));
  }, [dispatch, idProspect]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProspectHeader />}
      />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Notes')} data={prospect.description} />
        <ProspectDropdownCards navigation={navigation} />
      </ScrollView>
      <ProspectBottom idProspect={idProspect} navigation={navigation} />
    </Screen>
  );
};

export default ProspectDetailsScreen;
