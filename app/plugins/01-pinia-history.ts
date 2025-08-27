import type { PiniaPluginContext, PiniaCustomProperties } from 'pinia'

interface HistoryPluginOptions {
  historyEnabled?: boolean;
};

function PiniaHistory({ store, options }: PiniaPluginContext) : Partial<PiniaCustomProperties> | void {
  if (!(options as HistoryPluginOptions).historyEnabled) return;
  
  const history = reactive<unknown[]>([]);
  const future = reactive<unknown[]>([]);
  const doingHistory = ref(false);
  
  history.push(JSON.stringify(store.$state));

  store.$subscribe((mutation: any, state: any) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  });
  
  return {
    history,
    future,
    undo: () => {
      if (history.length === 1) return;
      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1) as string);
      doingHistory.value = false;
    },
    redo: () => {
      const latestState = future.pop();
      if (!latestState) return;
      doingHistory.value = true;
      history.push(latestState);
      store.$state = JSON.parse(latestState as string);
      doingHistory.value = false;
    }
  };
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.$nuxt.$pinia.use(PiniaHistory);
  /* Or
  const nuxtApp= useNuxtApp()
  nuxtApp.$pinia.use(PiniaHistory) */
});

