import { Dispatch, Store } from 'redux';
import { BaseAction } from 'types/base-redux.types';

import {
  PLAY_TASK,
  PAUSE,
  incrementTaskCounter,
  pauseTimer
} from 'actions/tasks.actions';

import { setCurrentTaskName } from 'actions/currentTask.actions';

const intervalMiddleware = ({ dispatch }: Store) => {
  let intervalId: number | null = null;

  return (next: Dispatch<BaseAction>) => (action: BaseAction) => {
    next(action);

    if (action.type === PLAY_TASK) {
      const taskName = action.payload.name;

      dispatch(pauseTimer());
      dispatch(setCurrentTaskName({ taskName }));

      intervalId = window.setInterval(() => {
        dispatch(incrementTaskCounter({ name: taskName }));
      }, 1000);
    }

    if (action.type === PAUSE) {
      if (intervalId) {
        window.clearInterval(intervalId);
      }

      intervalId = null;
    }
  };
};

export default intervalMiddleware;
