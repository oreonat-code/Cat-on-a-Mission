import { createContext, useContext, useEffect, useRef, useState } from 'react';
const KEY = 'cty-learning-adventures-v1';
const initial = { fish: 0, owned: [], outfit: '', completed: [], comfort: false, calm: false };
export const accessories = [{ id: 'bow', name: 'Little bow', price: 3 }, { id: 'scarf', name: 'Cosy scarf', price: 6 }];
export function readAdventure() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!saved || typeof saved !== 'object') return initial;
    const owned = accessories.filter((item) => Array.isArray(saved.owned) && saved.owned.includes(item.id)).map((item) => item.id);
    return {
      fish: Number.isSafeInteger(saved.fish) && saved.fish >= 0 ? saved.fish : 0,
      owned, outfit: owned.includes(saved.outfit) ? saved.outfit : '',
      completed: ['english', 'math'].filter((id) => Array.isArray(saved.completed) && saved.completed.includes(id)),
      comfort: saved.comfort === true, calm: saved.calm === true,
    };
  } catch { return initial; }
}
const AdventureContext = createContext(null);
export function AdventureProvider({ children }) {
  const [state, setState] = useState(readAdventure);
  const current = useRef(state);
  function update(change) { const next = change(current.current); current.current = next; setState(next); }
  useEffect(() => {
    const sync = (event) => {
      if (event.key !== KEY) return;
      const next = readAdventure(); current.current = next; setState(next);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* Learning works without storage. */ }
    document.documentElement.dataset.theme = state.comfort ? 'comfort' : '';
    document.documentElement.dataset.calm = String(state.calm);
  }, [state]);
  const value = {
    ...state,
    earnFish: () => update((s) => ({ ...s, fish: s.fish + 1 })),
    finish: (id) => update((s) => ({ ...s, completed: [...new Set([...s.completed, id])] })),
    buy: (id) => update((s) => {
      const item = accessories.find((a) => a.id === id);
      return !item || s.owned.includes(id) || s.fish < item.price ? s
        : { ...s, fish: s.fish - item.price, owned: [...s.owned, id], outfit: id };
    }),
    equip: (id) => update((s) => s.owned.includes(id) || id === '' ? { ...s, outfit: id } : s),
    setting: (key, enabled) => update((s) => ['comfort', 'calm'].includes(key) ? { ...s, [key]: enabled } : s),
  };
  return <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>;
}
export const useAdventure = () => useContext(AdventureContext);
