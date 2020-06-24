import { createAction, props } from '@ngrx/store';
import { User } from '../entity';

export const USER_SIGNUP = '[SignUp Page] Signup';
export const USER_SIGNUP_SUCCESS = '[SignUp Page] Signup Success';
export const USER_SIGNUP_FAILURE = '[SignUp Page] Signup Failure';

export const signup = createAction(
  USER_SIGNUP,
  props<{user: User}>()
);

export const signupSuccess = createAction(
  USER_SIGNUP_SUCCESS,
  props<any>()
)

export const signupFailure = createAction(
  USER_SIGNUP_FAILURE,
  props<{message: string}>()
)
