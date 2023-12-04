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

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {findVisibleRef, pushRef} from './use-click-outside.helper';

export const OUTSIDE_INDICATOR = 'outside';
export const INSIDE_INDICATOR = 'inside';

const defaultOutsideAlerterContext = {
  refList: [],
  clickOutside: undefined,
  addRef: () => {
    throw new Error(
      'OutsideAlerter should be mounted to add target component reference',
    );
  },
  handleClickOutside: () => {
    throw new Error(
      'OutsideAlerter should be mounted to set handle click outside event',
    );
  },
};

const OutsideAlerterContext = createContext(defaultOutsideAlerterContext);

const actionTypes = {
  addRef: 'addRef',
  handleClickOutside: 'handleClickOutside',
};

const handleClickOutsideReducer = (ref, target) => {
  if (!ref || !target) {
    return undefined;
  }

  if (ref._nativeTag === target._nativeTag) {
    return INSIDE_INDICATOR;
  }

  // check ref if one ref child has target._nativeTag
  if (ref._children) {
    const res = ref._children.map(child =>
      handleClickOutsideReducer(child, target),
    );
    return res.find(r => r === INSIDE_INDICATOR)
      ? INSIDE_INDICATOR
      : OUTSIDE_INDICATOR;
  }

  return OUTSIDE_INDICATOR;
};

const outsideAlerterReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.addRef: {
      return {
        ...state,
        refList: pushRef(state.refList, action.payload),
      };
    }
    case actionTypes.handleClickOutside: {
      return {
        ...state,
        clickOutside: handleClickOutsideReducer(
          findVisibleRef(state.refList)?.wrapperRef?.current,
          action.payload,
        ),
      };
    }
  }
};

const actions = {
  addRef: ref => {
    return {
      type: actionTypes.addRef,
      payload: ref,
    };
  },
  handleClickOutside: target => {
    return {
      type: actionTypes.handleClickOutside,
      payload: target,
    };
  },
};

export const OutsideAlerterProvider = ({children}) => {
  const [state, dispatch] = useReducer(
    outsideAlerterReducer,
    defaultOutsideAlerterContext,
  );

  const addRef = useCallback(ref => dispatch(actions.addRef(ref)), []);

  const handleClickOutside = useCallback(target => {
    dispatch(actions.handleClickOutside(target));
    setTimeout(() => {
      dispatch(actions.handleClickOutside(target));
    }, 10);
  }, []);

  const outsideAlerterContextState = useMemo(
    () => ({
      ...state,
      addRef,
      handleClickOutside,
    }),
    [state, addRef, handleClickOutside],
  );

  return (
    <OutsideAlerterContext.Provider value={outsideAlerterContextState}>
      <View
        onTouchStart={e => handleClickOutside(e.target)}
        style={styles.container}>
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
 * @param {Boolean} visible - boolean to track component if it is visible.
 */
export const useClickOutside = ({wrapperRef, visible}) => {
  const {clickOutside, addRef} = useContext(OutsideAlerterContext);

  useEffect(() => {
    addRef({nativeTag: wrapperRef?.current?._nativeTag, wrapperRef, visible});
  }, [addRef, visible, wrapperRef]);

  return useMemo(() => {
    return clickOutside;
  }, [clickOutside]);
};
