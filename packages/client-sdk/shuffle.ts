export const shuffle = (ids: string[]): Map<string, string> => {
  const map = new Map<string, string>();

  if (ids.length === 0) return map;

  const first = ids[0];

  let current: string = ids.shift() || "should never happen";
  for (let i = ids.length; i >= 0; --i) {
    const s_index = Math.floor(Math.random() * ids.length);
    const selected: string = ids.splice(s_index, 1)[0];
    map.set(current, selected || first);
    current = selected;
  }

  return map;
};
