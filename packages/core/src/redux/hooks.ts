import {Action, AnyAction} from '@reduxjs/toolkit';
import {Dispatch} from 'react';
import {
  DefaultRootState,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux';

export function useDispatch<A extends Action = AnyAction>(): Dispatch<A> {
  return useReduxDispatch();
}

export function useSelector(selector: (state: DefaultRootState) => any) {
  return useReduxSelector(selector);
}
