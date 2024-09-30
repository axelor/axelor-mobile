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
import {StyleSheet, View} from 'react-native';
import {DraggableWrapper, FloatingButton} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {useActiveScreen} from '../../../navigator/ActiveScreenProvider';

const GlobalToolBox = () => {
  const I18n = useTranslator();
  const {activeScreen} = useActiveScreen();

  if (activeScreen == null) {
    return null;
  }

  return (
    <View style={styles.position} pointerEvents="box-none">
      <DraggableWrapper>
        <FloatingButton
          style={styles.buttonPosition}
          actions={[
            {
              key: 'test',
              iconName: 'x-lg',
              onPress: () => {},
            },
          ]}
          translator={I18n.t}
        />
      </DraggableWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 9999,
  },
  buttonPosition: {
    position: 'relative',
    bottom: undefined,
    right: undefined,
  },
});

export default GlobalToolBox;
