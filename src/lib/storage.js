const KEY = "waiter-tables-v1";

export function loadTables() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTables(tables) {
  localStorage.setItem(KEY, JSON.stringify(tables));
}

export function addTable(name) {
  const tables = loadTables();
  const table = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: name.trim(),
    createdAt: Date.now(),
  };
  const next = [...tables, table];
  saveTables(next);
  return { tables: next, table };
}

export function removeTable(id) {
  const next = loadTables().filter((t) => t.id !== id);
  saveTables(next);
  return next;
}

export function buildCallUrl(table) {
  const origin = window.location.origin + window.location.pathname;
  const params = new URLSearchParams({ table: table.name, id: table.id });
  return `${origin}#/call?${params.toString()}`;
}
