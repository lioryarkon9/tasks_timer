import { NetworkState } from 'reducers/network.reducer';
import { TasksState } from 'reducers/tasks.reducer';
import { CurrentTaskState } from 'reducers/currentTask.reducer';

export type State = {
  network: NetworkState;
  tasks: TasksState;
  currentTask: CurrentTaskState;
};
