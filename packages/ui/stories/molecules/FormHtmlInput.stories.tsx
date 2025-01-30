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
import {storiesOf} from '@storybook/react-native';
import {FormHtmlInput} from '../../src/components/molecules';

storiesOf('ui/molecules/FormHtmlInput', module)
  .add('default', () => (
    <FormHtmlInput
      title="Description"
      defaultValue="<p>This is the default value</p>"
      placeholder="Enter a description"
    />
  ))
  .add('with required field', () => (
    <FormHtmlInput
      title="Required Field"
      placeholder="This field is required"
      required
    />
  ))
  .add('read-only', () => (
    <FormHtmlInput
      title="Read-Only Field"
      defaultValue="<p>This field is read-only</p>"
      readonly
    />
  ));
