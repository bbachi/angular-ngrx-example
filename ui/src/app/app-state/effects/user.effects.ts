import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppService } from '../../_services/app.service';
import * as userActions from '../actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.login),
      exhaustMap(action =>
        this.appService.login(action.user).pipe(
          map(response => userActions.loginSuccess(response)),
          catchError((error: any) => of(userActions.loginFailure(error))))
      )
    )
  );

  userSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.signup),
      exhaustMap(action =>
        this.appService.signup(action.user).pipe(
          map(response => userActions.signupSuccess(response)),
          catchError((error: any) => of(userActions.signupFailure(error))))
      )
    )
  );

}
