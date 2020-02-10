import * as login from '../actions/login';
import { Login } from '../models/login/login';

export interface State {
    isLoading: boolean;
    isLoadingSuccess: boolean;
    login: Login;
}

const initialState: State = {
    isLoading: false,
    isLoadingSuccess: false,
    login: {userName: '', email: '', isUserLoggedIn: false, password: ''}
};

export function reducer(state= initialState, action: login.Actions): State {

    switch (action.type) {

        case login.LOGIN: return {...state, isLoading: true, isLoadingSuccess: false, login: undefined};
        case login.LOGIN_SUCCESS: return {...state, isLoading: false, isLoadingSuccess: true, login: action.payload};
        case login.LOGIN_FAILURE: return {...state, isLoading: false, isLoadingSuccess: true, login: action.payload};

        default: return state;
    }
}

export const getLogin = (state: State) => {
    return {
      isLoading: state.isLoading,
      isLoadingSuccess: state.isLoadingSuccess,
      login: state.login };
};
