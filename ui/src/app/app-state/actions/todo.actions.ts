import { createAction, props } from '@ngrx/store';
import { Task } from '../entity';

export const CREATE_TASK = '[Task] Create Task';
export const CREATE_TASK_SUCCESS = '[Task] Create Task Success';
export const CREATE_TASK_FAILURE = '[Task] Create Task Failure';

export const createTask = createAction(
  CREATE_TASK,
  props<{task: any}>()
);

export const createTaskSuccess = createAction(
  CREATE_TASK_SUCCESS,
  props<any>()
);

export const createTaskFailure = createAction(
  CREATE_TASK_FAILURE,
  props<{any}>()
);
