import { handleActions } from 'redux-actions';
import { SET_CURRENT_TASK_NAME } from 'actions/currentTask.actions';
import { PAUSE } from 'actions/tasks.actions';

export type CurrentTaskState = {
  taskName: string;
};

const initialState: CurrentTaskState = {
  taskName: ''
};

const currentTaskReducer = handleActions<CurrentTaskState>(
  {
    [SET_CURRENT_TASK_NAME]: (state, action) => ({
      ...state,
      taskName: action.payload.taskName
    }),

    [PAUSE]: () => initialState
  },
  initialState
);

export default currentTaskReducer;
