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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {Meta} from '@storybook/react';
import {HtmlInput as Component} from '../../src/components/atoms';
import {Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/atoms/HtmlInput',
  component: Component,
};

export default meta;

export const HtmlInput: Story<typeof Component> = {
  args: {
    title: 'Description',
    defaultInput: '<p>Hello World!<b>This text is bold.</b></p>',
  },
  argTypes: {
    editorBackgroundColor: {control: 'color'},
    placeholder: {control: 'text'},
    readonly: {control: 'boolean'},
  },
  render: args => {
    return (
      <View style={styles.container}>
        <Component {...args} />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
