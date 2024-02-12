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

import React, {useCallback} from 'react';
import {
  changeDefaultStockLocation,
  UserScreen as AuthUserScreen,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {StockLocationSearchBar} from '../../components';

const stockLocationScanKey = 'stock-location_user-default';

const UserScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  const updateDefaultStockLocation = useCallback(
    stockLocation => {
      dispatch(
        changeDefaultStockLocation({
          newStockLocation: stockLocation,
        }),
      );
    },
    [dispatch],
  );

  return (
    <AuthUserScreen navigation={navigation}>
      <StockLocationSearchBar
        showTitle={true}
        titleKey={I18n.t('User_DefaultStockLocation')}
        scanKey={stockLocationScanKey}
        placeholderKey="Stock_StockLocation"
        defaultValue={user?.workshopStockLocation}
        onChange={updateDefaultStockLocation}
      />
    </AuthUserScreen>
  );
};

export default UserScreen;
