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
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

type RefObject = any;

enum Indicator {
  outside = 'outside',
  inside = 'inside',
}

export const OUTSIDE_INDICATOR = Indicator.outside;
export const INSIDE_INDICATOR = Indicator.inside;

interface ContextState {
  ref: RefObject;
  setRef: (ref?: RefObject) => void;
}

const defaultValue: ContextState = {
  ref: undefined,
  setRef: () => {
    throw new Error('OutsideAlerter should be mounted to set active ref');
  },
};

const OutsideAlerterContext = createContext<ContextState>(defaultValue);

const actionTypes = {setRef: 'setRef'};

const outsideAlerterReducer = (
  state: ContextState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case actionTypes.setRef: {
      return {...state, ref: action.payload as RefObject};
    }
  }
};

const actions = {
  setRef: (target: RefObject) => ({
    type: actionTypes.setRef,
    payload: target,
  }),
};

export const OutsideAlerterProvider = ({children}) => {
  const [state, dispatch] = useReducer(outsideAlerterReducer, defaultValue);

  const setRef = useCallback((target: RefObject) => {
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
    width: Dimensions.get('window').width,
    height: '100%',
    elevation: -1,
  },
});

/**
 * Hook that alerts clicks outside
 * @param {Object} wrapperRef - component reference to track if we click outside of it.
 */
export const useClickOutside = ({
  wrapperRef,
}: {
  wrapperRef: React.MutableRefObject<RefObject>;
}) => {
  const {ref: _ref} = useContext(OutsideAlerterContext);

  const [state, setState] = useState<Indicator | undefined>(undefined);

  const handleClickOutside = useCallback(
    (componentRef: RefObject, ref: RefObject) => {
      if (!componentRef || !ref) return;

      componentRef.measure((x, y, width, height, pageX, pageY) => {
        ref.measure((tx, ty, tWidth, tHeight, tPageX, tPageY) => {
          const isInside =
            tPageX >= pageX &&
            tPageX + tWidth <= pageX + width &&
            tPageY >= pageY &&
            tPageY + tHeight <= pageY + height;

          setState(isInside ? INSIDE_INDICATOR : OUTSIDE_INDICATOR);
        });
      });
    },
    [],
  );

  useEffect(() => {
    handleClickOutside(wrapperRef?.current, _ref);
  }, [handleClickOutside, wrapperRef, _ref]);

  return useMemo(() => state, [state]);
};

export const useClickOutsideContext = () => {
  return useContext(OutsideAlerterContext);
};
