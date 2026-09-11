import { useState } from "react";

export default function AddTableForm({ onAdd, onBulkAdd }) {
  const [value, setValue] = useState("");
  const [bulkPrefix, setBulkPrefix] = useState("");
  const [bulkCount, setBulkCount] = useState(10);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  }

  function handleBulkSubmit(e) {
    e.preventDefault();
    const trimmedPrefix = bulkPrefix.trim();
    const count = Number(bulkCount);
    if (!trimmedPrefix || !count || count <= 0) return;
    onBulkAdd(trimmedPrefix, count);
    setBulkPrefix("");
    setBulkCount(10);
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <label htmlFor="table-name">Stol raqami yoki nomi</label>
        <div className="add-form__row">
          <input
            id="table-name"
            type="text"
            placeholder="Masalan: 12-stol yoki Terassa 3"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Stol qo'shish</button>
        </div>
      </form>

      <form className="add-form" onSubmit={handleBulkSubmit}>
        <label htmlFor="bulk-prefix">Bir vaqtda ko'p stol qo'shish</label>
        <div className="add-form__row">
          <input
            id="bulk-prefix"
            type="text"
            placeholder="Masalan: A"
            value={bulkPrefix}
            onChange={(e) => setBulkPrefix(e.target.value)}
            autoComplete="off"
          />
          <input
            id="bulk-count"
            type="number"
            min="1"
            max="200"
            value={bulkCount}
            onChange={(e) => setBulkCount(e.target.value)}
            style={{ maxWidth: 100 }}
          />
          <button type="submit">Bir necha stol qo'shish</button>
        </div>
      </form>
    </>
  );
}
