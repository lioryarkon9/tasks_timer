import { combineReducers } from 'redux';
import tasks from 'reducers/tasks.reducer';
import currentTask from 'reducers/currentTask.reducer';

export const reducersMap = {
  tasks,
  currentTask
};

export default combineReducers(reducersMap);
