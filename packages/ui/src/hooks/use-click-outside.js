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

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

export const OUTSIDE_INDICATOR = 'outside';
export const INSIDE_INDICATOR = 'inside';

const defaultOutsideAlerterContext = {
  ref: undefined,
  setRef: ref => {
    throw new Error(
      'OutsideAlerter should be mounted to set handle click outside event',
    );
  },
};

const OutsideAlerterContext = createContext(defaultOutsideAlerterContext);

const actionTypes = {setRef: 'setRef'};

const outsideAlerterReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.setRef: {
      return {...state, ref: action.payload};
    }
  }
};

const actions = {
  setRef: target => {
    return {type: actionTypes.setRef, payload: target};
  },
};

export const OutsideAlerterProvider = ({children}) => {
  const [state, dispatch] = useReducer(
    outsideAlerterReducer,
    defaultOutsideAlerterContext,
  );

  const setRef = useCallback(target => {
    dispatch(actions.setRef(target));
  }, []);

  const outsideAlerterContextState = useMemo(
    () => ({...state, setRef}),
    [state, setRef],
  );

  return (
    <OutsideAlerterContext.Provider value={outsideAlerterContextState}>
      <View onTouchStart={e => setRef(e.target)} style={styles.container}>
        {children}
      </View>
    </OutsideAlerterContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    elevation: -1,
  },
});

/**
 * Hook that alerts clicks outside
 * @param {Object} wrapperRef - component reference to track if we click outside of it.
 */
export const useClickOutside = ({wrapperRef}) => {
  const {ref: _ref} = useContext(OutsideAlerterContext);

  return useMemo(() => {
    const handleClickOutside = (componentRef, ref) => {
      if (!componentRef || !ref) {
        return undefined;
      }

      if (componentRef._nativeTag === ref._nativeTag) {
        return INSIDE_INDICATOR;
      }

      // check ref if one ref child has target._nativeTag
      if (componentRef._children) {
        const res = componentRef._children.map(child =>
          handleClickOutside(child, ref),
        );

        return res.find(r => r === INSIDE_INDICATOR)
          ? INSIDE_INDICATOR
          : OUTSIDE_INDICATOR;
      }

      return OUTSIDE_INDICATOR;
    };

    return handleClickOutside(wrapperRef?.current, _ref);
  }, [_ref, wrapperRef]);
};

export const useClickOutsideContext = () => {
  const {ref, setRef} = useContext(OutsideAlerterContext);

  return useMemo(() => {
    return {ref, setRef};
  }, [ref, setRef]);
};
