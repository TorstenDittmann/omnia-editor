import { writable, get } from "svelte/store";
import deepClone from "deep-clone";

export const defaultData = {
  blocks: [
    {
      type: 'paragraph',
      data: {
        text: '',
      },
    },
  ],
};

export const hasFocus = writable(false);
export const isActive = writable(true);
const contentStore = () => {
  const { subscribe, update, set } = writable(defaultData);
  return {
    subscribe,
    set,
    setBlock: (index, text) => {
      update(n => {
        n.blocks[+index].data.text = text;
        return n;
      })
    },
    addBlock: (index, type, text) => {
      const n = get(content);
      n.blocks.splice(+index, 0, {
        type: type,
        data: {
          text: text,
        },
      });
      set(n);
    },
    removeBlock: (index, force, confirmDelete) => {
      const n = get(content);
      if (force || !n.blocks[index].data.text || confirm(confirmDelete)) {
        n.blocks.splice(index, 1);
      }
      set(n);
    },
    mergeBlock: (index, old) => {
      const n = get(content);
      n.blocks[index].data.text += n.blocks[old].data.text;
      n.blocks.splice(old, 1);
      set(n);
    }
  }
}
export const content = contentStore();

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