EPower — лендінг

index.html                  — сама сторінка
images/                     — фото батарей
netlify/functions/lead.js   — пересилає заявки з форми в Telegram
netlify.toml                — налаштування Netlify

У Netlify → Site configuration → Environment variables додайте:
  TELEGRAM_BOT_TOKEN = токен від @BotFather
  TELEGRAM_CHAT_ID   = ваш ID від @userinfobot

Meta Pixel / Google Analytics: впишіть ID у index.html (блок EPOWER_CONFIG угорі).
