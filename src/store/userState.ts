import { atom, selector } from 'recoil';

export const isLoggedInState = atom<boolean>({
  key: 'userState/isLoggedIn',
  default: false,
});
