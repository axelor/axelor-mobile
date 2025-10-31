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

import {within} from '@testing-library/react-native';
import {TagList} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('TagList Component', () => {
  const Colors = getDefaultThemeColors();

  const DEFAULT_TAGS = [
    {title: 'Tag 1 title'},
    {title: 'Tag 2 title', color: Colors.plannedColor},
    {title: 'Tag 3 title'},
  ];

  const setupTagList = overrideProps =>
    setup({Component: TagList, baseProps: {tags: DEFAULT_TAGS}, overrideProps});

  it('renders without crashing', () => {
    const {getByTestId} = setupTagList();

    expect(getByTestId('tagListContainer')).toBeTruthy();
  });

  it('renders correctly with tags', () => {
    const {getAllByTestId, props} = setupTagList();

    expect(getAllByTestId('bagdeContainer').length).toBe(props.tags.length);
  });

  it('renders a title when provided', () => {
    const {getByText, props} = setupTagList({title: 'List title'});

    expect(getByText(`${props.title} :`)).toBeTruthy();
  });

  it('applies defaultColor to badges when tag-specific color is not provided', () => {
    const {getAllByTestId, props} = setupTagList({
      defaultColor: Colors.cautionColor,
    });

    getAllByTestId('bagdeContainer').forEach((_badgeElt, idx) => {
      const _tag = props.tags[idx];
      const _color = _tag.color ?? props.defaultColor;

      expect(_badgeElt).toHaveStyle({
        borderColor: _color.background,
        backgroundColor: _color.background_light,
      });
      expect(within(_badgeElt).getByText(_tag.title)).toBeTruthy();
    });
  });

  it('uses theme color if no defaultColor is specified', () => {
    const {getAllByTestId, props} = setupTagList();

    getAllByTestId('bagdeContainer').forEach((_badgeElt, idx) => {
      const _tag = props.tags[idx];
      const _color = _tag.color ?? Colors.infoColor;

      expect(_badgeElt).toHaveStyle({
        borderColor: _color.background,
        backgroundColor: _color.background_light,
      });
      expect(within(_badgeElt).getByText(_tag.title)).toBeTruthy();
    });
  });

  it('does not render if all tags are hidden and hideIfNull is true', () => {
    const {queryByTestId} = setupTagList({
      tags: DEFAULT_TAGS.map(tag => ({...tag, hidden: true})),
    });

    expect(queryByTestId('tagListContainer')).toBeFalsy();
  });

  it('does not render if list is empty and hideIfNull is true', () => {
    const {queryByTestId} = setupTagList({tags: []});

    expect(queryByTestId('tagListContainer')).toBeFalsy();
  });

  it('renders empty state message if hideIfNull is false and there are no visible tags', () => {
    const {getByText} = setupTagList({tags: [], hideIfNull: false});

    expect(getByText('No data available.')).toBeTruthy();
  });

  it('sorts tags based on their order', () => {
    const {getAllByTestId, props} = setupTagList({
      tags: [
        {title: 'Middle', order: 3},
        {title: 'Last'},
        {title: 'First', order: 2},
      ],
    });

    const badgeElts = getAllByTestId('bagdeContainer');

    props.tags
      .map((tag, idx) => ({
        ...tag,
        order: tag.order != null ? tag.order : idx * 10,
      }))
      .sort((a, b) => a.order - b.order)
      .filter(tag => tag.hidden !== true)
      .forEach((tag, idx) => {
        expect(within(badgeElts.at(idx)).getByText(tag.title)).toBeTruthy();
      });
  });

  it('should render with custom style', () => {
    const {getByTestId, props} = setupTagList({style: {margin: 20}});

    expect(getByTestId('tagListContainer')).toHaveStyle(props.style);
  });
});
