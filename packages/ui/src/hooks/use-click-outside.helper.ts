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
