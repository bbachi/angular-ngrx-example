import { createAction, props } from '@ngrx/store';
import { Task } from '../entity';

export const GET_TASKS = '[Task] Get Tasks';
export const GET_TASKS_SUCCESS = '[Task] Get Tasks Success';
export const GET_TASKS_FAILURE = '[Task] Get Tasks Failure';

export const CREATE_TASK = '[Task] Create Task';
export const CREATE_TASK_SUCCESS = '[Task] Create Task Success';
export const CREATE_TASK_FAILURE = '[Task] Create Task Failure';

export const DELETE_TASK = '[Task] Delete Task';
export const DELETE_TASK_SUCCESS = '[Task] Delete Task Success';
export const DELETE_TASK_FAILURE = '[Task] Delete Task Failure';

export const EDIT_TASK = '[Task] Edit Task';
export const EDIT_TASK_SUCCESS = '[Task] Edit Task Success';
export const EDIT_TASK_FAILURE = '[Task] Edit Task Failure';


export const getTasks = createAction(
  GET_TASKS
);

export const getTasksSuccess = createAction(
  GET_TASKS_SUCCESS,
  props<any>()
);

export const getTasksFailure = createAction(
  GET_TASKS_FAILURE,
  props<{any}>()
);

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

export const deleteTask = createAction(
  DELETE_TASK,
  props<{taskid}>()
);

export const deleteTaskSuccess = createAction(
  DELETE_TASK_SUCCESS,
  props<any>()
);

export const deleteTaskFailure = createAction(
  DELETE_TASK_FAILURE,
  props<{any}>()
);

export const editTask = createAction(
  EDIT_TASK,
  props<{task: any}>()
);

export const editTaskSuccess = createAction(
  EDIT_TASK_SUCCESS,
  props<any>()
);

export const editTaskFailure = createAction(
  EDIT_TASK_FAILURE,
  props<{any}>()
);
