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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {default as Image} from './Image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: 'gray',
  },
});

const IMAGE_URI =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg';

storiesOf('ui/molecules/Image', module)
  .addDecorator(story => <View style={styles.container}>{story()}</View>)
  .add('default', () => (
    <Image
      source={{uri: IMAGE_URI}}
      resizeMode="contain"
      generalStyle={styles.image}
      imageSize={{width: 200, height: 200}}
      defaultIconSize={30}
    />
  ))
  .add('invalid source', () => (
    <Image
      source={{uri: 'invalid'}}
      resizeMode="contain"
      generalStyle={styles.image}
      imageSize={{width: 200, height: 200}}
      defaultIconSize={30}
    />
  ))
  .add('with default icon size', () => (
    <Image
      source={{uri: IMAGE_URI}}
      resizeMode="contain"
      generalStyle={styles.image}
      imageSize={{width: 200, height: 200}}
      defaultIconSize={100}
    />
  ));
