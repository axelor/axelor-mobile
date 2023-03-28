import {ActionType} from './types';

export const mergeActions = (
  currentActions: ActionType[],
  newActions: ActionType[],
) => {
  if (!Array.isArray(newActions) || newActions.length === 0) {
    return currentActions;
  }

  if (!Array.isArray(currentActions) || currentActions.length === 0) {
    return newActions;
  }

  const resultActions = [...currentActions];

  newActions.forEach(action => {
    const index = resultActions.findIndex(
      _current => _current.key === action.key,
    );
    if (index !== -1) {
      resultActions.splice(index, 1);
    }

    resultActions.push(action);
  });

  const actionsWithOrder = resultActions.map((_action, index) => {
    if (_action.order != null) {
      return _action;
    }

    return {..._action, order: index * 10};
  });

  return actionsWithOrder.sort((a, b) => a.order - b.order);
};
