import {stringNoAccent} from './string';

export function areObjectsEquals(object1, object2) {
  if (typeof object1 !== typeof object2 || object1 == null || object2 == null) {
    return false;
  } else {
    if (typeof object1 === 'string') {
      return stringNoAccent(object1)
        .toLowerCase()
        .includes(stringNoAccent(object2).toLowerCase());
    } else {
      return object1 === object2;
    }
  }
}

export const isEmpty = obj =>
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;
