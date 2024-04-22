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
import {shallow} from 'enzyme';
import {TagList, Badge, Text} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, getGlobalStyles} from '../../tools';

describe('TagList Component', () => {
  const Colors = getDefaultThemeColors();

  const tags = [
    {title: 'tag1', order: 1},
    {title: 'tag2', color: Colors.plannedColor, order: 2},
    {title: 'tag13', order: 3},
  ];

  it('renders without crashing', () => {
    const wrapper = shallow(<TagList tags={tags} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with tags', () => {
    const wrapper = shallow(<TagList tags={tags} />);
    expect(wrapper.find(Badge).length).toBe(3);
    expect(wrapper.find(Text).length).toBe(0);
  });

  it('renders a title when provided', () => {
    const title = 'title';
    const wrapper = shallow(<TagList tags={tags} title={title} />);
    const textChildren = wrapper.find(Text).prop('children');
    expect(textChildren.join('')).toBe(title + ' :');
  });

  it('applies defaultColor to badges when tag-specific color is not provided', () => {
    const defaultColor = Colors.cautionColor;
    const wrapper = shallow(
      <TagList tags={tags} defaultColor={defaultColor} />,
    );

    expect(wrapper.find(Badge).at(0).prop('color')).toBe(defaultColor);
    expect(wrapper.find(Badge).at(1).prop('color')).toBe(Colors.plannedColor);
    expect(wrapper.find(Badge).at(2).prop('color')).toBe(defaultColor);
  });

  it('uses theme color if no defaultColor is specified', () => {
    const wrapper = shallow(<TagList tags={tags} />);

    expect(wrapper.find(Badge).at(0).prop('color')).toBe(Colors.infoColor);
    expect(wrapper.find(Badge).at(2).prop('color')).toBe(Colors.infoColor);
  });

  it('does not render if all tags are hidden', () => {
    const hiddenTags = tags.map(tag => ({...tag, hide: true}));
    const wrapper = shallow(<TagList tags={hiddenTags} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('sorts tags based on their order', () => {
    const unorderedTags = [
      {title: 'Last', order: 3},
      {title: 'First', order: 1},
      {title: 'Middle', order: 2},
    ];
    const wrapper = shallow(<TagList tags={unorderedTags} />);
    expect(wrapper.find(Badge).at(0).prop('title')).toBe('First');
    expect(wrapper.find(Badge).at(1).prop('title')).toBe('Middle');
    expect(wrapper.find(Badge).at(2).prop('title')).toBe('Last');
  });

  it('should render with custom style', () => {
    const customStyle = {
      margin: 20,
    };
    const wrapper = shallow(<TagList tags={tags} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find('View'))).toMatchObject(customStyle);
  });
});
