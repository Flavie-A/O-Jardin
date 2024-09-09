import { createAction, createReducer } from '@reduxjs/toolkit';
import userActions from '../thunks/userThunk';
// import actionCheckLogin from '../thunks/userThunk';
import { User } from '../../@types/types';

// -- STATE intial et son interface --

interface UserState {
  token: null | string;
  error: null | string;
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  user: User;
  emailExist: Boolean;
}

export const initialState: UserState = {
  token: null,
  error: null,
  logged: false,
  credentials: {
    email: '',
    password: '',
  },
  user: {} as User,
  emailExist: false,
};

export const actionChangeCredential = createAction<{
  name: 'email' | 'password';
  value: string;
}>('user/CHANGE_CREDENTIAL');

export const actionLogOut = createAction('user/LOGOUT');

export const actionLogIn = createAction<{
  token: string;
}>('user/LOGIN');


const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeCredential, (state, action) => {
      state.credentials[action.payload.name] = action.payload.value;
    })
    .addCase(userActions.actionCheckLogin.fulfilled, (state, action) => {
      state.logged = true;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(userActions.actionCheckLogin.rejected, (state) => {
      state.error = 'Erreur de connexion';
    })
    .addCase(actionLogOut, (state) => {
      state.logged = false;
    })
    .addCase(actionLogIn, (state, action) => {
      state.logged = true;
      state.token = action.payload.token;
    })
    .addCase(userActions.actionNewUser.fulfilled, (state, action) => {
      state.user= action.payload;
      state.error = null;
    })
    .addCase(userActions.actionNewUser.rejected, (state, action) => {
      state.error = (action.payload as string) || 'Erreur de connexion';
    })
    .addCase(userActions.actionVerifyEmailExist.fulfilled, (state, action) => {
      console.log(action.payload);
      state.error = null;
    })
    .addCase(userActions.actionVerifyEmailExist.rejected, (state, action) => {
      state.error = 'Email déjà utilisé';
    })
    .addCase(userActions.actionUpdateUser.fulfilled, (state, action) => {
      state.user= action.payload;
      state.error = null;
    })
    .addCase(userActions.actionUpdateUser.rejected, (state, action) => {
      state.error = 'Erreur lors de la mise à jour de l\'utilisateur';
    });
});

export default userReducer;
