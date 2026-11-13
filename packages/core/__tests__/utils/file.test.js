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

import {
  getLocalFilePath,
  getServerFileId,
  registerLocalFileResolver,
} from '../../src/utils/file';

const PENDING_ID = -1000000000001;
const UPLOADED_ID = -1000000000002;

describe('local file lookup', () => {
  afterEach(() => registerLocalFileResolver(null));

  it('keeps ids as they are when no module answers', () => {
    expect(getLocalFilePath(PENDING_ID)).toBeNull();
    expect(getServerFileId(PENDING_ID)).toBe(PENDING_ID);
    expect(getServerFileId(812)).toBe(812);
  });

  it('gives the device path of a file still on the device', () => {
    registerLocalFileResolver(fileId =>
      fileId === PENDING_ID ? {path: '/docs/pending.png'} : null,
    );

    expect(getLocalFilePath(PENDING_ID)).toBe('/docs/pending.png');
    expect(getServerFileId(PENDING_ID)).toBe(PENDING_ID);
  });

  it('gives the server id of a file uploaded under another id', () => {
    registerLocalFileResolver(fileId =>
      fileId === UPLOADED_ID ? {serverId: 950} : null,
    );

    expect(getLocalFilePath(UPLOADED_ID)).toBeNull();
    expect(getServerFileId(UPLOADED_ID)).toBe(950);
    expect(getServerFileId(812)).toBe(812);
  });

  it('answers nothing for a missing id', () => {
    registerLocalFileResolver(() => ({path: '/docs/any.png'}));

    expect(getLocalFilePath(undefined)).toBeNull();
  });
});
