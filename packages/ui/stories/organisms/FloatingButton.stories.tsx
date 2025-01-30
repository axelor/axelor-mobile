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
import {action} from '@storybook/addon-actions';
import {FloatingButton} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/FloatingButton', module).add(
  'Default',
  args => {
    return (
      <FloatingButton
        actions={[
          {
            key: 1,
            title: args.showTitles ? 'Add' : null,
            iconName: 'plus',
            color: lightTheme.colors.infoColor,
            hideIf: args.hideAdd,
            onPress: action('Add button pressed'),
          },
          {
            key: 2,
            title: args.showTitles ? 'Edit' : null,
            iconName: 'pencil',
            color: lightTheme.colors.progressColor,
            indicator: args.showIndicatorOnEdit,
            onPress: action('Edit button pressed'),
          },
          {
            key: 3,
            title: args.showTitles ? 'Delete' : null,
            iconName: 'trash-fill',
            color: lightTheme.colors.errorColor,
            disabled: args.disableDelete,
            onPress: action('Delete button pressed'),
          },
        ]}
        translator={key => key}
        {...args}
      />
    );
  },
  {
    argTypes: {
      iconName: {
        type: 'string',
        defaultValue: 'pen-fill',
        control: {type: 'text'},
      },
      closeIconName: {
        type: 'string',
        defaultValue: 'x-lg',
        control: {type: 'text'},
      },
      size: {
        control: {type: 'range', min: 30, max: 100, step: 5},
        defaultValue: 60,
      },
      useCircleStyle: {
        type: 'boolean',
        defaultValue: false,
      },
      showTitles: {
        type: 'boolean',
        defaultValue: true,
      },
      showIndicatorOnEdit: {
        type: 'boolean',
        defaultValue: false,
      },
      disableDelete: {
        type: 'boolean',
        defaultValue: false,
      },
      hideAdd: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },
);
