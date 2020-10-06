import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../entity';
import * as todoActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
  tasks?: Task[];
  currentTask?: Task;
  deleteTaskId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  tasks: storage.getItem('todo').tasks,
  currentTask: {},
  deleteTaskId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const todoReducer = createReducer(
  initialState,

  // GeTasks
  on(todoActions.getTasks, (state) => ({...state, isLoading: true})),
  on(todoActions.getTasksSuccess, (state, result) => ({tasks: result.response, isLoading: false, isLoadingSuccess: true})),

  // Create Task Reducers
  on(todoActions.createTask, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
  on(todoActions.createTaskSuccess, (state, result) => {
    const tasks = undefined !== state.tasks ? _.cloneDeep(state.tasks) : [];
    const currentTask = undefined !== state.currentTask ? _.cloneDeep(state.currentTask) : {};
    currentTask.id = result.taskId;
    tasks.push(currentTask);
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Task Reducers
  on(todoActions.deleteTask, (state, {taskid}) => ({...state, isLoading: true, deleteTaskId: taskid})),
  on(todoActions.deleteTaskSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? _.cloneDeep(state.tasks) : [];
    if (result.status) {
      tasks = tasks.filter(task => task.id !== state.deleteTaskId);
    }
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Task Reducers
   on(todoActions.editTask, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
   on(todoActions.editTaskSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? _.cloneDeep(state.tasks) : [];
    const currentTask = undefined !== state.currentTask ? _.cloneDeep(state.currentTask) : {};
    tasks = tasks.map(tsk => {
      if (tsk.id === currentTask.id) {
        tsk = currentTask;
      }
      return tsk;
    });
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return todoReducer(state, action);
}

export const getTasks = (state: State) => {
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
