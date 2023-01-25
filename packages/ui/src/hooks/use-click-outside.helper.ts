/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {replace} from '../utils/arrays';

interface refProps {
  nativeTag: number;
  wrapperRef: any;
  visible: boolean;
}

export const pushRef = (
  refList: Array<refProps>,
  ref: refProps,
): Array<refProps> => {
  if (ref == null || ref?.nativeTag == null) {
    return refList;
  }

  if (refList == null || refList.length === 0) {
    return [ref];
  }

  const _ref = findRef(refList, ref);
  if (_ref) {
    return replaceRef(refList, _ref, ref);
  }

  return [...refList, ref];
};

export const findVisibleRef = (refList: Array<refProps>): refProps =>
  refList.find(refItem => refItem.visible);

export const findRef = (refList: Array<refProps>, ref: refProps): refProps =>
  refList.find(refItem => refItem.nativeTag === ref.nativeTag);

export const replaceRef = (
  refList: Array<refProps>,
  oldRef: refProps,
  newRef: refProps,
): Array<refProps> => replace(refList, oldRef, newRef, 'nativeTag');
