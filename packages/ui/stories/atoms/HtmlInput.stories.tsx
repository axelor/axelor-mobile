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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {HtmlInput} from '../../src/components/atoms';

storiesOf('ui/atoms/HtmlInput', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <HtmlInput
          title="Description"
          defaultInput="<p>Hello World!<b>This text is bold.</b></p>"
          onChange={console.log}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      style: {control: 'object'},
      styleToolbar: {control: 'object'},
      containerStyle: {control: 'object'},
      editorBackgroundColor: {control: 'color'},
      title: {control: 'text'},
      placeholder: {control: 'text'},
      defaultInput: {control: 'text'},
      readonly: {control: 'boolean'},
      onHeightChange: {action: 'onHeightChange'},
    },
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
