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
    {title: 'tag1'},
    {title: 'tag2', color: Colors.plannedColor},
    {title: 'tag13'},
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

    tags.forEach((tag, idx) => {
      expect(wrapper.find(Badge).at(idx).prop('color')).toBe(
        tag.color != null ? tag.color : defaultColor,
      );
      expect(wrapper.find(Badge).at(idx).prop('title')).toBe(tag.title);
    });
  });

  it('uses theme color if no defaultColor is specified', () => {
    const wrapper = shallow(<TagList tags={tags} />);

    tags.forEach((tag, idx) => {
      expect(wrapper.find(Badge).at(idx).prop('color')).toBe(
        tag.color != null ? tag.color : Colors.infoColor,
      );
      expect(wrapper.find(Badge).at(idx).prop('title')).toBe(tag.title);
    });
  });

  it('does not render if all tags are hidden or list is empty and hideIfNull is true', () => {
    const hiddenTags = tags.map(tag => ({...tag, hidden: true}));
    const wrapper = shallow(<TagList tags={hiddenTags} />);
    const emptyWrapper = shallow(<TagList tags={[]} />);

    expect(wrapper.isEmptyRender()).toBe(true);
    expect(emptyWrapper.isEmptyRender()).toBe(true);
  });

  it('renders empty state message if hideIfNull is false and there are no visible tags', () => {
    const translator = (_, values) => `Aucun(e) ${values.title} disponible.`;
    const title = 'Title';
    const lowerTitle = title.toLowerCase();

    const hiddenTags = tags.map(tag => ({...tag, hidden: true}));
    const wrapper = shallow(
      <TagList
        title={title}
        tags={hiddenTags}
        hideIfNull={false}
        translator={translator}
      />,
    );
    const emptyWrapper = shallow(<TagList tags={[]} hideIfNull={false} />);

    expect(wrapper.find(Text).length).toBe(2);
    expect(wrapper.find(Text).at(1).prop('children')).toBe(
      translator(null, {title: lowerTitle}),
    );
    expect(emptyWrapper.find(Text).length).toBe(1);
    expect(emptyWrapper.find(Text).prop('children')).toBe('No data available.');
  });

  it('sorts tags based on their order', () => {
    const unorderedTags = [
      {title: 'Middle', order: 3},
      {title: 'Last'},
      {title: 'First', order: 2},
    ];
    const wrapper = shallow(<TagList tags={unorderedTags} />);

    unorderedTags
      .map((tag, idx) => ({
        ...tag,
        order: tag.order != null ? tag.order : idx * 10,
      }))
      .sort((a, b) => a.order - b.order)
      .filter(tag => tag.hidden !== true)
      .forEach((tag, idx) => {
        expect(wrapper.find(Badge).at(idx).prop('title')).toBe(tag.title);
      });
  });

  it('should render with custom style', () => {
    const customStyle = {
      margin: 20,
    };
    const wrapper = shallow(<TagList tags={tags} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find('View'))).toMatchObject(customStyle);
  });
});
