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

import {fireEvent, waitFor} from '@testing-library/react-native';
import {Image} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Image Component', () => {
  const setupImage = overrideProps =>
    setup({
      Component: Image,
      baseProps: {resizeMode: 'contain', source: null},
      overrideProps,
    });

  it('renders a fallback icon when no source is provided', () => {
    const {getByTestId} = setupImage();

    expect(getByTestId('icon-camera-fill')).toBeTruthy();
  });

  it('renders the fallback icon with a custom size when provided', () => {
    const {getByTestId, props} = setupImage({defaultIconSize: 50});

    const icon = getByTestId('icon-camera-fill');
    expect(icon.props.width).toBe(props.defaultIconSize);
    expect(icon.props.height).toBe(props.defaultIconSize);
  });

  it('renders the React Native Image when a valid source is provided', () => {
    const {getByRole} = setupImage({
      source: {uri: 'https://docs.axelor.com/_/img/logo_axelor.png'},
    });

    expect(getByRole('image')).toBeTruthy();
  });

  it('applies the provided imageSize style', () => {
    const {getByRole, props} = setupImage({
      source: {uri: 'https://docs.axelor.com/_/img/logo_axelor.png'},
      imageSize: {width: 80, height: 40},
    });

    expect(getByRole('image')).toHaveStyle(props.imageSize);
  });

  it('falls back to the icon when the image fails to load', async () => {
    const {getByRole, getByTestId, queryByRole} = setupImage({
      source: {uri: 'https://docs.axelor.com/_/img/logo_axelor.png'},
    });

    fireEvent(getByRole('image'), 'error');

    await waitFor(() => {
      expect(queryByRole('image')).toBeNull();
    });

    expect(getByTestId('icon-camera-fill')).toBeTruthy();
  });
});
