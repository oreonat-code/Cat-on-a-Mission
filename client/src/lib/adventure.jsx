import { createContext, useContext, useEffect, useRef, useState } from 'react';
const KEY = 'cty-learning-adventures-v1';
export const cats = [{ id: 'calico', name: 'Calico Cat', price: 0 }, { id: 'grey', name: 'Grey Cat', price: 15 }, { id: 'orange', name: 'Orange Cat', price: 18 }, { id: 'white', name: 'White Cat', price: 16 }];
export const outfits = [{ id: 'hoodie', name: 'Cat Hoodie', price: 0 }, { id: 'bow', name: 'Red Bow', price: 5 }, { id: 'scarf', name: 'Blue Scarf', price: 8 }, { id: 'beanie', name: 'Beanie Hat', price: 7 }, { id: 'pyjamas', name: 'Cloud Pyjamas', price: 9 }, { id: 'party', name: 'Party Hat', price: 7 }, { id: 'bear', name: 'Bear Hoodie', price: 11 }];
export const shirts = [{ id: 'yellow', name: 'Yellow Cat Shirt', price: 0 }, { id: 'purple', name: 'Purple Cat Shirt', price: 6 }, { id: 'green', name: 'Green Star Shirt', price: 6 }, { id: 'pink', name: 'Pink Heart Shirt', price: 8 }];
const initial = { fish: 12, ownedCats: ['calico'], selectedCat: 'calico', ownedOutfits: ['hoodie'], equippedOutfit: 'hoodie', ownedShirts: ['yellow'], equippedShirt: 'yellow', completed: [], comfort: false, calm: false };
const validOwned = (value, catalog, starter) => [starter, ...catalog.filter((item) => Array.isArray(value) && value.includes(item.id)).map((item) => item.id)].filter((id, index, array) => array.indexOf(id) === index);
export function readAdventure() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!saved || typeof saved !== 'object') return initial;
    const ownedCats = validOwned(saved.ownedCats, cats, 'calico');
    const ownedOutfits = validOwned(saved.ownedOutfits ?? saved.owned, outfits, 'hoodie');
    const ownedShirts = validOwned(saved.ownedShirts, shirts, 'yellow');
    const oldOutfit = saved.equippedOutfit ?? saved.outfit;
    return { fish: Number.isSafeInteger(saved.fish) && saved.fish >= 0 ? saved.fish : 0,
      ownedCats, selectedCat: ownedCats.includes(saved.selectedCat) ? saved.selectedCat : 'calico',
      ownedOutfits, equippedOutfit: ownedOutfits.includes(oldOutfit) ? oldOutfit : 'hoodie',
      ownedShirts, equippedShirt: ownedShirts.includes(saved.equippedShirt) ? saved.equippedShirt : 'yellow',
      completed: ['english', 'math'].filter((id) => Array.isArray(saved.completed) && saved.completed.includes(id)),
      comfort: saved.comfort === true, calm: saved.calm === true };
  } catch { return initial; }
}
const AdventureContext = createContext(null);
export function AdventureProvider({ children }) {
  const [state, setState] = useState(readAdventure);
  const current = useRef(state);
  function update(change) { const next = change(current.current); current.current = next; setState(next); }
  useEffect(() => { const sync = (event) => { if (event.key === KEY) { const next = readAdventure(); current.current = next; setState(next); } }; window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync); }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* Learning works without storage. */ } document.documentElement.dataset.theme = state.comfort ? 'comfort' : ''; document.documentElement.dataset.calm = String(state.calm); }, [state]);
  const value = { ...state,
    earnFish: () => update((s) => ({ ...s, fish: s.fish + 1 })),
    finish: (id) => update((s) => ({ ...s, completed: [...new Set([...s.completed, id])] })),
    buy: (kind, id) => update((s) => { const config = { cats: [cats, 'ownedCats'], outfits: [outfits, 'ownedOutfits'], shirts: [shirts, 'ownedShirts'] }[kind]; if (!config) return s; const item = config[0].find((entry) => entry.id === id); return !item || s[config[1]].includes(id) || s.fish < item.price ? s : { ...s, fish: s.fish - item.price, [config[1]]: [...s[config[1]], id] }; }),
    selectCat: (id) => update((s) => s.ownedCats.includes(id) ? { ...s, selectedCat: id } : s),
    equipOutfit: (id) => update((s) => s.ownedOutfits.includes(id) ? { ...s, equippedOutfit: id } : s),
    equipShirt: (id) => update((s) => s.ownedShirts.includes(id) ? { ...s, equippedShirt: id } : s),
    setting: (key, enabled) => update((s) => ['comfort', 'calm'].includes(key) ? { ...s, [key]: enabled } : s),
  };
  return <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>;
}
export const useAdventure = () => useContext(AdventureContext);
