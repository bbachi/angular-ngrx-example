import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../entity';
import * as todoActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
  tasks?: Task[];
  currentTask?: Task;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  tasks: [],
  currentTask: {},
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const todoReducer = createReducer(
  initialState,
  on(todoActions.createTask, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
  on(todoActions.createTaskSuccess, (state, result) => {
    const tasks = undefined !== state.tasks ? _.cloneDeep(state.tasks) : [];
    tasks.push(state.currentTask);
    console.log('in reducer:::', tasks);
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),
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
