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
import {StyleSheet} from 'react-native';
import {Screen, ScrollView, useConfig} from '@axelor/aos-mobile-ui';
import {
  PopupApplicationInformation,
  useDefaultValuesOfUser,
  useDispatch,
  useSelector,
} from '../../index';
import {DashboardsCard, ShortcutsCard, UserCard} from '../components';
import {fetchLocalizations} from '../features/localizationSlice';
import {fetchActiveUser} from '../features/userSlice';
import {UserScreenItem, useUserScreen} from '../userScreen';

const UserScreen = () => {
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {loadingUser, isUser} = useSelector(state => state.user);

  const {contentItems} = useUserScreen();

  const {setNbDecimalDigitForQty, setNbDecimalDigitForUnitPrice} = useConfig();

  useDefaultValuesOfUser();

  const fetchUser = useCallback(() => {
    dispatch(fetchActiveUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUser();
    dispatch(fetchLocalizations());
  }, [dispatch, fetchUser]);

  useEffect(() => {
    if (baseConfig?.nbDecimalDigitForQty != null) {
      setNbDecimalDigitForQty(baseConfig?.nbDecimalDigitForQty);
    }
    if (baseConfig?.nbDecimalDigitForUnitPrice != null) {
      setNbDecimalDigitForUnitPrice(baseConfig?.nbDecimalDigitForUnitPrice);
    }
  }, [baseConfig, setNbDecimalDigitForQty, setNbDecimalDigitForUnitPrice]);

  return (
    <Screen>
      <ScrollView
        refresh={{loading: false, fetcher: fetchUser}}
        style={styles.scroll}>
        <UserCard />
        <ShortcutsCard />
        {contentItems.map((_item: UserScreenItem) => (
          <_item.component key={_item.key} />
        ))}
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
    gap: 10,
  },
});

export default UserScreen;
