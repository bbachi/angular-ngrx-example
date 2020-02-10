import { Action } from '@ngrx/store';

export const LOGIN = '[LOGIN] Login';
export const LOGIN_SUCCESS = '[LOGIN] Login Success';
export const LOGIN_FAILURE = '[LOGIN] Login Failure';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginFilure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any) {}
}


export type Actions =
   | Login
   | LoginSuccess
   | LoginFilure;
