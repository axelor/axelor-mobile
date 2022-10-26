import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

const defaultOutsideAlerterContext = {
  ref: undefined,
  clickOutside: undefined,
  setRef: () => {
    throw new Error(
      'OutsideAlerter should be mounted to set target component reference',
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
  setRef: 'setRef',
  handleClickOutside: 'handleClickOutside',
};

const handleClickOutsideReducer = (ref, target) => {
  if (!ref || !target) {
    return undefined;
  }

  if (ref._nativeTag === target._nativeTag) {
    return 'inside';
  }

  // check ref if one ref child has target._nativeTag
  if (ref._children) {
    const res = ref._children.map(child =>
      handleClickOutsideReducer(child, target),
    );
    return res.find(r => r === 'inside') ? 'inside' : 'outside';
  }

  return 'outside';
};

const outsideAlerterReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.setRef: {
      return {
        ...state,
        ref: action.payload,
      };
    }
    case actionTypes.handleClickOutside: {
      return {
        ...state,
        clickOutside: handleClickOutsideReducer(
          state.ref?.current,
          action.payload,
        ),
      };
    }
  }
};

const actions = {
  setRef: ref => {
    return {
      type: actionTypes.setRef,
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

  const setRef = useCallback(ref => dispatch(actions.setRef(ref)), []);

  const handleClickOutside = useCallback(
    (ref, target) => dispatch(actions.handleClickOutside(ref, target)),
    [],
  );

  const outsideAlerterContextState = useMemo(
    () => ({
      ...state,
      setRef,
      handleClickOutside,
    }),
    [state, setRef, handleClickOutside],
  );

  return (
    <OutsideAlerterContext.Provider value={outsideAlerterContextState}>
      <View
        onTouchStart={e => handleClickOutside(e.target, state.ref?.current)}
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
 * @param {Object} ref - component reference to track if we click outside of it.
 */
export const useClickOutside = ref => {
  const {clickOutside, setRef} = useContext(OutsideAlerterContext);
  useEffect(() => {
    setRef(ref);
  }, [ref, setRef]);

  return useMemo(() => {
    return clickOutside;
  }, [clickOutside]);
};
