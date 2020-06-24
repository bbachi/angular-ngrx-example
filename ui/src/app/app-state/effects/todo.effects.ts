import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TodoService } from '../../_services';
import * as todoActions from '../actions';

@Injectable()
export class TodoEffects {

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.createTask),
      exhaustMap(action =>
        this.todoService.addTask(action.task).pipe(
          map(response => todoActions.createTaskSuccess(response))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}
