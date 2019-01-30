
import createStore from 'unistore';

let defaultItem = {
  tree: {},
};
export const store = createStore(defaultItem);
export const actions = () => ({
  async loadTree () {
    let tree = await loadJSON('/api/tree');
    if (!tree) return { tree: { title: 'Error loading tree' } };
    return { tree };
  },
});

async function loadJSON (url) {
  let load = await fetch(url);
  if (load.status !== 200) {
    try {
      await load.json();
    }
    catch (e) {
      console.error(`Error loading '${url}'`, e);
    }
    return;
  }
  return await load.json();
}
