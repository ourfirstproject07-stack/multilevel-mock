// ============================================================
// TELEGRAMGA YUBORISH SOZLAMALARI (Writing ishlari shu yerga keladi)
// ============================================================
// 1) Telegramda @BotFather ga kiring -> /newbot -> bot yarating -> TOKEN oling.
// 2) O'qituvchi(lar) yaratilgan botni ochib "Start" tugmasini bosadi.
// 3) Chat ID ni bilish: botga biror xabar yozing, so'ng brauzerda oching:
//    https://api.telegram.org/bot<TOKEN>/getUpdates
//    chiqqan javobdan  "chat":{"id": 123456789 ...}  raqamini oling.
// 4) Quyiga yozing. Ikkala o'qituvchiga yuborish uchun ikkita ID yozing.
//
// DIQQAT: token bu faylda ochiq turadi (sayt ochgan har kim ko'ra oladi).
// Vaqtincha sinov uchun yetadi. Keyinchalik server orqali yuboramiz.
// ============================================================
const TG_BOT_TOKEN = "8876822216:AAHOo1eRgNMRkSx1RGY8D2QOU4W6vqjp22A";
const TG_CHAT_IDS  = [6691504349];  // ikkinchi o'qituvchi bo'lsa: [6691504349, 123456789]
