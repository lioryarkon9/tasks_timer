import { Dispatch, Store } from 'redux';
import { BaseAction } from 'types/base-redux.types';
import { ADD_TASK } from 'actions/tasks.actions';

const validateTaskNameMiddleware = ({ getState }: Store) => {
  return (next: Dispatch<BaseAction>) => (action: BaseAction) => {
    if (action.type !== ADD_TASK) {
      next(action);

      return;
    }

    if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(action.payload.name)) {
      window.alert('invalid task name');

      return;
    }

    const currentTasks = getState().tasks;

    if (currentTasks[action.payload.name]) {
      window.alert(`Task ${action.payload.name} already exists`);

      return;
    }

    next(action);
  };
};

export default validateTaskNameMiddleware;
