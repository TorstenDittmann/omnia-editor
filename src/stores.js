import { writable } from 'svelte/store';

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