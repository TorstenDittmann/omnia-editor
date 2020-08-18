import { writable, get } from "svelte/store";
import deepClone from "deep-clone";

export const hasFocus = writable(false);
export const isActive = writable(true);
export const content = writable({
  blocks: [
    {
      type: 'paragraph',
      data: {
        text: '',
      },
    },
  ],
});
export const historyStore = () => {
  const { subscribe, update } = writable({
    current: 0,
    data: []
  });
  return {
    subscribe,
    add: () => update(n => {
      n.data.unshift(deepClone(get(content)));
      n.current = 0;
      if (n.data.length > 10) {
        n.data.pop();
      }
      return n;
    }),
    undo: () => update(n => {
      if (n.current >= n.data.length - 1) return n;
      content.set(n.data[++n.current]);
      return n;
    }),
    redo: () => update(n => {
      if (n.current < 1) return n;
      content.set(n.data[--n.current]);
      return n;
    }),
  }
};