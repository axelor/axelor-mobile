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

import OrientationDirector, {
  Orientation,
} from 'react-native-orientation-director';
import {
  applyActiveScreenOrientation,
  applyScreenOrientation,
  DEFAULT_SCREEN_ORIENTATION,
} from '../../src/navigator/helpers/screen-orientation.helper';

describe('screen orientation helper', () => {
  const screens = {
    ContactListScreen: {title: 'Crm_Contacts', component: () => null},
    ProjectPlanningScreen: {
      title: 'Project_Planning',
      component: () => null,
      orientation: 'device',
    },
    ScannerScreen: {
      title: 'Base_Scanner',
      component: () => null,
      orientation: 'landscape',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('locks a screen in portrait by default', () => {
    expect(DEFAULT_SCREEN_ORIENTATION).toBe('portrait');

    applyScreenOrientation();

    expect(OrientationDirector.lockTo).toHaveBeenCalledWith(
      Orientation.portrait,
    );
    expect(OrientationDirector.unlock).not.toHaveBeenCalled();
  });

  it('locks a screen in landscape when it asks for it', () => {
    applyScreenOrientation('landscape');

    expect(OrientationDirector.lockTo).toHaveBeenCalledWith(
      Orientation.landscape,
    );
  });

  it('releases the lock for a screen following the device', () => {
    applyScreenOrientation('device');

    expect(OrientationDirector.unlock).toHaveBeenCalledTimes(1);
    expect(OrientationDirector.lockTo).not.toHaveBeenCalled();
  });

  it('applies the orientation declared by the active screen', () => {
    applyActiveScreenOrientation(screens, 'ProjectPlanningScreen');

    expect(OrientationDirector.unlock).toHaveBeenCalledTimes(1);

    applyActiveScreenOrientation(screens, 'ScannerScreen');

    expect(OrientationDirector.lockTo).toHaveBeenCalledWith(
      Orientation.landscape,
    );
  });

  it('falls back on portrait for a screen without orientation', () => {
    applyActiveScreenOrientation(screens, 'ContactListScreen');

    expect(OrientationDirector.lockTo).toHaveBeenCalledWith(
      Orientation.portrait,
    );
  });

  it('falls back on portrait for an unknown screen', () => {
    applyActiveScreenOrientation(screens, 'UnknownScreen');
    applyActiveScreenOrientation(undefined, undefined);

    expect(OrientationDirector.lockTo).toHaveBeenCalledTimes(2);
    expect(OrientationDirector.lockTo).toHaveBeenLastCalledWith(
      Orientation.portrait,
    );
  });
});
