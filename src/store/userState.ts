import { atom, selector } from 'recoil';

export const useTxInfoState = atom<any>({
  key: 'useTxState/useTxInfo',
  default: null,
});
