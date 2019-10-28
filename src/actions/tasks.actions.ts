import { BaseAction } from 'types/base-redux.types';

export const ADD_TASK = '[tasks] ADD_TASK';
export const PLAY_TASK = '[tasks] PLAY_TASK';
export const INCREMENT_TASK_COUNTER = '[tasks]INCREMENT_TASK_COUNTER';
export const PAUSE = '[tasks] PAUSE';

export type TaskName = {
  name: string;
};

export const addTask = ({ name }: TaskName): BaseAction => ({
  type: ADD_TASK,
  payload: { name }
});

export const incrementTaskCounter = ({ name }: TaskName): BaseAction => ({
  type: INCREMENT_TASK_COUNTER,
  payload: { name }
});

export const playTask = ({ name }: TaskName): BaseAction => ({
  type: PLAY_TASK,
  payload: { name }
});

export const pauseTimer = () => ({
  type: PAUSE
});
