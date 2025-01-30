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
import {ObjectCard} from '../../src/components';
import {lightTheme} from '../../src/theme';

const upperTextItems = [
  {
    order: 1,
    displayText: 'Lorem',
    iconName: 'play',
    indicatorText: 'ipsum',
  },
  {
    order: -2,
    displayText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elementum.',
    isTitle: true,
  },
  {
    order: 3,
    displayText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elementum.',
    isTitle: true,
    numberOfLines: 2,
  },
  {order: 3, displayText: null, hideIfNull: true},
  {order: 4, displayText: 'Lorem'},
];

const lowerTextItems = [
  {order: 2, displayText: 'Lorem'},
  {
    order: 1,
    displayText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elementum.',
  },
];

const upperBadgeItems = [
  {order: 2, displayText: 'Lorem'},
  {order: 1, displayText: 'Lorem'},
];

const sideBadgeItems = [
  {order: 2, displayText: 'Lorem', color: lightTheme.colors.infoColor},
  {order: 1, displayText: 'Lorem', color: lightTheme.colors.errorColor},
];

const simpleArgs = {
  touchable: true,
  onPress: () => console.log('Pressed'),
  showArrow: false,
  image: {source: {uri: 'https://picsum.photos/70'}},
  upperTexts: {items: upperTextItems},
};

const simpleArrowArgs = {
  ...simpleArgs,
  showArrow: true,
};

const simpleBadgeArgs = {
  ...simpleArrowArgs,
  sideBadges: {items: sideBadgeItems},
};

const allTextsArgs = {
  ...simpleBadgeArgs,
  lowerTexts: {items: lowerTextItems},
};

const onlyLowerTextArgs = {
  ...allTextsArgs,
  upperTexts: null,
  image: null,
};

const upperBadgesArgs = {
  ...allTextsArgs,
  upperBadges: {items: upperBadgeItems},
};

const upperBadgesReverseArgs = {
  ...allTextsArgs,
  upperBadges: {items: upperBadgeItems, fixedOnRightSide: true},
};

const lowerBadgesArgs = {
  ...allTextsArgs,
  lowerBadges: {items: upperBadgeItems},
};

const lowerBadgesReverseArgs = {
  ...allTextsArgs,
  lowerBadges: {items: upperBadgeItems, fixedOnRightSide: true},
};

const defaultArgs = {
  ...upperBadgesArgs,
  lowerBadges: {items: upperBadgeItems},
};

storiesOf('ui/templates/ObjectCard', module)
  .add('Default', () => <ObjectCard {...defaultArgs} />)
  .add('Simple card', () => <ObjectCard {...simpleArgs} />)
  .add('Simple card with arrow', () => <ObjectCard {...simpleArrowArgs} />)
  .add('Side badges', () => <ObjectCard {...simpleBadgeArgs} />)
  .add('Both texts card', () => <ObjectCard {...allTextsArgs} />)
  .add('Only lower text', () => <ObjectCard {...onlyLowerTextArgs} />)
  .add('Upper badges basic', () => <ObjectCard {...upperBadgesArgs} />)
  .add('Upper badges reverse', () => <ObjectCard {...upperBadgesReverseArgs} />)
  .add('Lower badges basic', () => <ObjectCard {...lowerBadgesArgs} />)
  .add('Lower badges reverse', () => <ObjectCard {...lowerBadgesReverseArgs} />)
  .add('Lower badges basic', () => <ObjectCard {...lowerBadgesArgs} />);
