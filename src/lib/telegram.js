const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const OWNER_CHAT_IDS = (import.meta.env.VITE_OWNER_CHAT_ID || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

/**
 * Stol nomidan foydalanib, restoran egasiga (OWNER_CHAT_ID) to'g'ridan-to'g'ri
 * Telegram Bot API orqali xabar yuboradi. Backend shart emas — Telegram Bot
 * API brauzerdan chaqirishga (CORS) ruxsat beradi.
 * Bir nechta chat ID qo'shilishi mumkin: komaga ajratilgan ro'yxat.
 */
export async function callWaiter(tableName) {
  if (!BOT_TOKEN || OWNER_CHAT_IDS.length === 0) {
    throw new Error(
      "Bot sozlamalari topilmadi. .env faylida VITE_BOT_TOKEN va VITE_OWNER_CHAT_ID borligini tekshiring."
    );
  }

  const time = new Date().toLocaleString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });

  const text = `🔔 Ofitsiant chaqirilmoqda!\n🍽 Stol: ${tableName}\n🕒 Vaqt: ${time}`;

  const results = [];

  for (const chatId of OWNER_CHAT_IDS) {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      }
    );

    const data = await res.json();
    if (!data.ok) {
      throw new Error(data.description || "Telegramga xabar yuborib bo'lmadi.");
    }

    results.push(data);
  }

  return results[results.length - 1];
}
