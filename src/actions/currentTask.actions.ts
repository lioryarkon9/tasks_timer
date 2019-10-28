import { BaseAction } from 'types/base-redux.types';

export const SET_CURRENT_TASK_NAME = '[current_task] SET_CURRENT_TASK_NAME';

export const setCurrentTaskName = ({
  taskName
}: {
  taskName: string;
}): BaseAction => ({
  type: SET_CURRENT_TASK_NAME,
  payload: { taskName }
});
