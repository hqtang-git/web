import { create } from 'zustand';


export enum Mode {
  ADD = 'ADD',
  EDIT = 'EDIT',
  CLOSE = 'CLOSE',
}
// 定义状态类型
interface UserState {
  mode?: Mode;
  currentOperateUser: Record<string, any>;
  setCurrentOperateUser: (record) => void;
  resetCurrentOperateUser: () => void;
  setMode: (mode: Mode) => void;
}

// 创建store
export const useUserStore = create<UserState>((set) => ({
  currentOperateUser: {},
  setCurrentOperateUser: (record) => set({ currentOperateUser: record }),
  resetCurrentOperateUser: () => set({ currentOperateUser: {} }),
  setMode: (mode) => set({ mode }),
}));