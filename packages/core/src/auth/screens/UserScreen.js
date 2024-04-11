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

import React, {useCallback, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Screen, ScrollView, useConfig} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../../index';
import {fetchCompanies} from '../features/companySlice';
import {fetchLocalizations} from '../features/localizationSlice';
import {fetchActiveUser} from '../features/userSlice';
import {DashboardsCard, ShortcutsCard, UserCard} from '../components';
import {PopupApplicationInformation} from '../../components';

const UserScreen = ({children}) => {
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {loadingUser, isUser} = useSelector(state => state.user);
  const {mobileSettings} = useSelector(state => state.appConfig);

  const {setFilterConfig, setVirtualKeyboardConfig, setNbDecimalDigitForQty} =
    useConfig();

  useEffect(() => {
    fetchUser();
    dispatch(fetchCompanies());
    dispatch(fetchLocalizations());
  }, [dispatch, fetchUser, userId]);

  useEffect(() => {
    if (baseConfig?.nbDecimalDigitForQty != null) {
      setNbDecimalDigitForQty(baseConfig?.nbDecimalDigitForQty);
    }
  }, [baseConfig, setNbDecimalDigitForQty]);

  useEffect(() => {
    const SMALL_SCREEN_HEIGHT = 500;

    DeviceInfo.getManufacturer().then(manufacturer =>
      setVirtualKeyboardConfig(manufacturer === 'Zebra Technologies'),
    );

    setFilterConfig(Dimensions.get('window').height > SMALL_SCREEN_HEIGHT);
  }, [setFilterConfig, setVirtualKeyboardConfig]);

  const fetchUser = useCallback(() => {
    dispatch(fetchActiveUser(userId));
  }, [dispatch, userId]);

  return (
    <Screen>
      <ScrollView
        refresh={{loading: false, fetcher: fetchUser}}
        style={styles.scroll}>
        <UserCard children={children} style={styles.marginCard} />
        <ShortcutsCard
          style={styles.marginCard}
          horizontal={mobileSettings?.isOneLineShortcut}
        />
        <DashboardsCard />
      </ScrollView>
      <PopupApplicationInformation
        visible={!isUser && !loadingUser}
        textKey={'User_NoAppUser'}
        onRefresh={fetchUser}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: null,
    minHeight: '100%',
  },
  marginCard: {
    marginBottom: 10,
  },
});

export default UserScreen;
