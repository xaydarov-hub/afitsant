import { useEffect, useState } from "react";
import AddTableForm from "../components/AddTableForm.jsx";
import TableCard from "../components/TableCard.jsx";
import { loadTables, addTable, removeTable } from "../lib/storage.js";

export default function AdminPage() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    setTables(loadTables());
  }, []);

  function handleAdd(name) {
    const { tables: next } = addTable(name);
    setTables(next);
  }

  function handleDelete(id) {
    if (!window.confirm("Bu stolni va uning QR kodini o'chirmoqchimisiz?")) return;
    setTables(removeTable(id));
  }

  return (
    <div className="page">
      <header className="page__header">
        <span className="eyebrow">Stollar boshqaruvi</span>
        <h1>Ofitsiant chaqiruv tizimi</h1>
        <p className="lede">
          Har bir stol uchun QR kod yarating, uni stolga yopishtiring. Mehmon
          skanerlaganda, ofitsiantga Telegram orqali darhol xabar boradi —
          server yoki qo'shimcha ilova kerak emas.
        </p>
      </header>

      <AddTableForm onAdd={handleAdd} />

      {tables.length === 0 ? (
        <div className="empty">
          Hali stol qo'shilmagan. Yuqoridagi maydonga stol raqami yoki nomini
          kiriting va "Stol qo'shish" tugmasini bosing.
        </div>
      ) : (
        <div className="grid">
          {tables.map((t) => (
            <TableCard key={t.id} table={t} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
