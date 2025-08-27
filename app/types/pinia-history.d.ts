import type { PiniaCustomProperties } from 'pinia';
import type { Reactive } from 'vue';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    history?: Reactive<unknown[]>;
    future?: Reactive<unknown[]>;
    undo?: () => void;
    redo?: () => void;
  };
  
  export interface DefineStoreOptionsBase<S, Store> {
    historyEnabled?: boolean;
  };
};
