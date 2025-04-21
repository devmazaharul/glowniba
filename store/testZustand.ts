// store/counterStore.ts
import { create } from 'zustand'

interface CounterState {
  count: number;

  decrease: () => void;
}

export const useCounter = create<CounterState>((set) => ({
  count: 0,
  decrease: () =>{
  
    set((state)=>({count:state.count+1}))
  },

}));
