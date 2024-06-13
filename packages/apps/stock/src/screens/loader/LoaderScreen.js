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

import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {LoaderPopup} from '@axelor/aos-mobile-core';
import {Button, Screen} from '@axelor/aos-mobile-ui';

const LoaderScreen = ({}) => {
  const [start1, setStart1] = useState(false);
  const [start2, setStart2] = useState(false);

  const process1 = useCallback(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Process completed');
        }, 8000);
      }),
    [],
  );

  const sucessStart1 = useCallback(() => {
    setStart1(false);
    console.log('Process 1');
  }, []);

  const errorStart1 = useCallback(() => {
    setStart1(false);
  }, []);

  const sucessStart2 = useCallback(() => {
    setStart2(false);
  }, []);

  const errorStart2 = useCallback(() => {
    setStart2(false);
    console.log('Process 2');
  }, []);

  const process2 = useCallback(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('Process failed');
        }, 8000);
      }),
    [],
  );

  return (
    <Screen>
      <View>
        <Button
          title="Run process 1"
          onPress={() => setStart1(true)}
          disabled={start1}
        />
        <Button
          title="Run process 2"
          onPress={() => setStart2(true)}
          disabled={start2}
        />
        <LoaderPopup
          start={start1}
          autoLeave={false}
          name="Test 1"
          disabled={false}
          process={process1}
          onSuccess={sucessStart1}
          onError={errorStart1}
        />
        <LoaderPopup
          start={start2}
          autoLeave={false}
          name="Test 2"
          disabled={false}
          process={process2}
          onSuccess={sucessStart2}
          onError={errorStart2}
        />
      </View>
    </Screen>
  );
};

export default LoaderScreen;
