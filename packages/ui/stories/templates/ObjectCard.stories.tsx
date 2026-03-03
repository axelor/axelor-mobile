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
import type {Meta} from '@storybook/react';
import {ObjectCard as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/templates/ObjectCard',
  component: Component,
};

export default meta;

export const ObjectCard: Story<typeof Component> = {
  args: {
    showArrow: true,
    iconLeftMargin: 20,
    leftContainerFlex: 3,
    image_hidden: false,
    image_uri: 'https://picsum.photos/70',
    sideBadges_hidden: false,
    badge1_title: 'Badge 1',
    badge1_color: 'pink',
    badge1_order: 1,
    badge1_hidden: false,
    badge2_title: 'Badge 2',
    badge2_color: 'amber',
    badge2_order: 2,
    badge2_hidden: false,
    lowerBadges_hidden: false,
    lowerBadges_reverse: false,
    badge3_title: 'Badge 3',
    badge3_color: 'indigo',
    badge3_order: 3,
    badge3_hidden: false,
    badge4_title: 'Badge 4',
    badge4_color: 'primaryColor',
    badge4_order: 4,
    badge4_hidden: false,
    upperBadges_hidden: false,
    upperBadges_reverse: false,
    badge5_title: 'Badge 5',
    badge5_color: 'infoColor',
    badge5_order: 5,
    badge5_hidden: false,
    badge6_title: 'Badge 6',
    badge6_color: 'brown',
    badge6_order: 6,
    badge6_hidden: false,
    upperTexts_hidden: false,
    lowerTexts_hidden: false,
  },
  argTypes: {
    image_uri: {
      control: 'text',
      if: {arg: 'image_hidden', truthy: false},
    },
    badge1_title: {
      control: 'text',
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    badge1_color: {
      ...colorPicker,
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    badge1_order: {
      control: 'number',
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    badge1_hidden: {
      control: 'boolean',
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    badge2_title: {
      control: 'text',
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    badge2_color: {
      ...colorPicker,
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    badge2_order: {
      control: 'number',
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    badge2_hidden: {
      control: 'boolean',
      if: {arg: 'sideBadges_hidden', truthy: false},
    },
    lowerBadges_reverse: {
      control: 'boolean',
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge3_title: {
      control: 'text',
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge3_color: {
      ...colorPicker,
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge3_order: {
      control: 'number',
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge3_hidden: {
      control: 'boolean',
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge4_title: {
      control: 'text',
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge4_color: {
      ...colorPicker,
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge4_order: {
      control: 'number',
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    badge4_hidden: {
      control: 'boolean',
      if: {arg: 'lowerBadges_hidden', truthy: false},
    },
    upperBadges_reverse: {
      control: 'boolean',
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge5_title: {
      control: 'text',
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge5_color: {
      ...colorPicker,
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge5_order: {
      control: 'number',
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge5_hidden: {
      control: 'boolean',
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge6_title: {
      control: 'text',
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge6_color: {
      ...colorPicker,
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge6_order: {
      control: 'number',
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    badge6_hidden: {
      control: 'boolean',
      if: {arg: 'upperBadges_hidden', truthy: false},
    },
    touchable: disabledControl,
    onPress: disabledControl,
    image: disabledControl,
    upperBadges: disabledControl,
    lowerBadges: disabledControl,
    sideBadges: disabledControl,
    upperTexts: disabledControl,
    lowerTexts: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      image={args.image_hidden ? undefined : {source: {uri: args.image_uri}}}
      lowerTexts={
        args.lowerTexts_hidden
          ? undefined
          : {
              items: [
                {displayText: 'Lorem ipsum dolor sit amet'},
                {displayText: 'Lorem'},
              ],
            }
      }
      upperTexts={
        args.upperTexts_hidden
          ? undefined
          : {
              items: [
                {
                  displayText: 'Lorem ipsum dolor sit amet',
                  isTitle: true,
                },
                {
                  iconName: 'play',
                  indicatorText: 'Lorem',
                  displayText: 'ipsum',
                },
                {displayText: 'Lorem'},
              ],
            }
      }
      sideBadges={
        args.sideBadges_hidden
          ? undefined
          : {
              items: [
                {
                  order: args.badge1_order,
                  displayText: args.badge1_title,
                  color: args.badge1_color,
                  showIf: !args.badge1_hidden,
                },
                {
                  order: args.badge2_order,
                  displayText: args.badge2_title,
                  color: args.badge2_color,
                  showIf: !args.badge2_hidden,
                },
              ],
            }
      }
      lowerBadges={
        args.lowerBadges_hidden
          ? undefined
          : {
              items: [
                {
                  order: args.badge3_order,
                  displayText: args.badge3_title,
                  color: args.badge3_color,
                  showIf: !args.badge3_hidden,
                },
                {
                  order: args.badge4_order,
                  displayText: args.badge4_title,
                  color: args.badge4_color,
                  showIf: !args.badge4_hidden,
                },
              ],
              fixedOnRightSide: args.lowerBadges_reverse,
            }
      }
      upperBadges={
        args.upperBadges_hidden
          ? undefined
          : {
              items: [
                {
                  order: args.badge5_order,
                  displayText: args.badge5_title,
                  color: args.badge5_color,
                  showIf: !args.badge5_hidden,
                },
                {
                  order: args.badge6_order,
                  displayText: args.badge6_title,
                  color: args.badge6_color,
                  showIf: !args.badge6_hidden,
                },
              ],
              fixedOnRightSide: args.upperBadges_reverse,
            }
      }
    />
  ),
};
