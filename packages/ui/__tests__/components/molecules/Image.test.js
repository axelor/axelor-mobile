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

import {fireEvent, waitFor} from '@testing-library/react-native';
import {Image} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Image Component', () => {
  const baseProps = {
    resizeMode: 'contain',
    source: null,
  };

  const setupImage = overrideProps =>
    setup({
      Component: Image,
      baseProps,
      overrideProps,
    });

  it('renders a fallback icon when no source is provided', () => {
    const {getByTestId} = setupImage();

    expect(getByTestId('icon-camera-fill')).toBeTruthy();
  });

  it('renders the fallback icon with a custom size when provided', () => {
    const customSize = 50;
    const {getByTestId} = setupImage({defaultIconSize: customSize});

    const icon = getByTestId('icon-camera-fill');
    expect(icon.props.width).toBe(customSize);
    expect(icon.props.height).toBe(customSize);
  });

  it('renders the React Native Image when a valid source is provided', () => {
    const source = {uri: 'https://docs.axelor.com/_/img/logo_axelor.png'};
    const {getByRole} = setupImage({source});

    expect(getByRole('image')).toBeTruthy();
  });

  it('applies the provided imageSize style', () => {
    const source = {uri: 'https://docs.axelor.com/_/img/logo_axelor.png'};
    const imageSize = {width: 80, height: 40};
    const {getByRole} = setupImage({source, imageSize});

    expect(getByRole('image')).toHaveStyle(imageSize);
  });

  it('falls back to the icon when the image fails to load', async () => {
    const source = {uri: 'https://docs.axelor.com/_/img/logo_axelor.png'};
    const {getByRole, getByTestId, queryByRole} = setupImage({source});

    fireEvent(getByRole('image'), 'error');

    await waitFor(() => {
      expect(queryByRole('image')).toBeNull();
    });
    expect(getByTestId('icon-camera-fill')).toBeTruthy();
  });
});
