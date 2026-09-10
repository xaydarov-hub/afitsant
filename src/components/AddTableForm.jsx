import { useState } from "react";

export default function AddTableForm({ onAdd }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  }

  return (
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
  );
}
