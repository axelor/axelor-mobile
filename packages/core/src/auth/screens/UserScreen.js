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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ScrollView, useConfig} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../../index';
import {fetchLocalizations} from '../features/localizationSlice';
import {fetchActiveUser} from '../features/userSlice';
import {DashboardsCard, ShortcutsCard, UserCard} from '../components';
import {PopupApplicationInformation} from '../../components';
import {useDefaultValuesOfUser} from '../../hooks/use-storage-config';

const UserScreen = ({children}) => {
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {loadingUser, isUser} = useSelector(state => state.user);
  const {mobileSettings} = useSelector(state => state.appConfig);

  const {setNbDecimalDigitForQty, setNbDecimalDigitForUnitPrice} = useConfig();

  useDefaultValuesOfUser();

  useEffect(() => {
    fetchUser();
    dispatch(fetchLocalizations());
  }, [dispatch, fetchUser, userId]);

  useEffect(() => {
    if (baseConfig?.nbDecimalDigitForQty != null) {
      setNbDecimalDigitForQty(baseConfig?.nbDecimalDigitForQty);
    }
    if (baseConfig?.nbDecimalDigitForUnitPrice != null) {
      setNbDecimalDigitForUnitPrice(baseConfig?.nbDecimalDigitForUnitPrice);
    }
  }, [baseConfig, setNbDecimalDigitForQty, setNbDecimalDigitForUnitPrice]);

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
    minHeight: '100%',
  },
  marginCard: {
    marginBottom: 10,
  },
});

export default UserScreen;
