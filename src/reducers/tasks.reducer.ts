import { handleActions } from 'redux-actions';
import set from 'lodash/fp/set';

import { ADD_TASK, INCREMENT_TASK_COUNTER } from 'actions/tasks.actions';

export type Task = {
  name: string;
  counter: number;
};

export type TasksState = {
  [name: string]: Task;
};

const initialState: TasksState = {};

const tasksReducer = handleActions<TasksState>(
  {
    [ADD_TASK]: (state, action): TasksState => ({
      ...state,
      [action.payload.name]: {
        name: action.payload.name,
        counter: 0
      }
    }),

    [INCREMENT_TASK_COUNTER]: (state, action): TasksState => {
      const taskName = action.payload.name;
      const taskCounter = state[taskName].counter;

      return set(`${taskName}[counter]`, taskCounter + 1, state);
    }
  },
  initialState
);

export default tasksReducer;
