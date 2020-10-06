import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TodoService } from '../../_services';
import * as todoActions from '../actions';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.getTasks),
      exhaustMap(action =>
        this.todoService.getTasks().pipe(
          map(response => {
            console.log("response:::", response)
            return todoActions.getTasksSuccess({response})
          }),
          catchError((error: any) => of(todoActions.getTasksFailure(error))))
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.createTask),
      exhaustMap(action =>
        this.todoService.addTask(action.task).pipe(
          map(response => todoActions.createTaskSuccess(response)),
          catchError((error: any) => of(todoActions.createTaskFailure(error))))
      )
    )
  );


  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTask),
      exhaustMap(action => this.todoService.deleteTask(action.taskid).pipe(
          map(response => todoActions.deleteTaskSuccess(response)),
          catchError((error: any) => of(todoActions.deleteTaskFailure(error))))
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.editTask),
      exhaustMap(action =>
        this.todoService.editTask(action.task).pipe(
          map(response => todoActions.editTaskSuccess(response)),
          catchError((error: any) => of(todoActions.editTaskFailure(error))))
      )
    )
  );

}
