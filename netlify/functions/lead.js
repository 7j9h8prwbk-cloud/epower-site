// Приймає заявку з форми і пересилає її в Telegram.
// Потрібні змінні середовища в Netlify: TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID.
const esc = (s) => String(s || '').slice(0, 200)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  let data;
  try { data = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400, body: 'Bad JSON' }; }

  // Пастка для ботів: справжні люди це поле не бачать
  if (data.website) return { statusCode: 200, body: 'ok' };

  const name = (data.name || '').trim();
  const contact = (data.contact || '').trim();
  if (!name || contact.length < 5) return { statusCode: 400, body: 'Missing fields' };

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return { statusCode: 500, body: 'Not configured' };

  const text = [
    '🔋 <b>Нова заявка EPower</b>',
    `👤 ${esc(name)}`,
    `📞 ${esc(contact)}`,
    `🚗 ${esc(data.car) || '—'}`,
    `🕒 ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}`,
  ].join('\n');

  const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
  });
  if (!r.ok) return { statusCode: 502, body: 'Telegram error' };
  return { statusCode: 200, body: 'ok' };
};
