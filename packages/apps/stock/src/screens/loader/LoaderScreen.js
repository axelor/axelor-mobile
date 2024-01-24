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
import {Button, View} from 'react-native';
import {Screen} from '@axelor/aos-mobile-ui';
import {useLoaderListner} from '@axelor/aos-mobile-core';

// Screen for test Loader functionnalities
const LoaderScreen = () => {
  const process = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve('Process finished');
      }, 10000);
    });

  const handleCustomAction = () => {
    console.log('Custom action executed!');
  };

  const {loading, listener} = useLoaderListner({
    process,
    onSuccess: handleCustomAction,
    onError: () => console.warn('An error has occurred!'),
  });

  return (
    <Screen>
      <View>
        <Button title="check process" onPress={listener} disabled={loading} />
      </View>
    </Screen>
  );
};

export default LoaderScreen;
