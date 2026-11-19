(() => {
'use strict';
// Один код на две страницы: демо с примерами (корень сайта) и личный кошелёк (/my/, <html data-mode="my">)
const MY = document.documentElement.dataset.mode === 'my';
const inTG = () => { try { return !!window.Telegram.WebApp.initData; } catch (e) { return false; } };
// ================= иконки =================
const P = {
  home: 'M4 11l8-7 8 7v9h-5v-6h-6v6H4z', list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01', chart: 'M5 20v-7M10 20V5M15 20v-9M20 20v-6',
  wallet: 'M4 7h14a2 2 0 0 1 2 2v9H4zM4 7l11-3 1.5 3M16 13h4', plus: 'M12 5v14M5 12h14', back: 'M15 5l-7 7 7 7', right: 'M9 6l6 6-6 6',
  down: 'M12 4v14M6 12l6 6 6-6', up: 'M12 20V6M6 12l6-6 6 6', swap: 'M4 8h15M15 4l4 4-4 4M20 16H5M9 12l-4 4 4 4', vswap: 'M8 4v15M4 15l4 4 4-4M16 20V5M12 9l4-4 4 4',
  people: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3 3 0 0 1 0 6M18 14c2.2.6 3.5 2.6 3.5 5',
  eye: 'M2.5 12C5 7.5 8.2 5.5 12 5.5s7 2 9.5 6.5c-2.5 4.5-5.7 6.5-9.5 6.5S5 16.5 2.5 12zM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  eyeoff: 'M3 3l18 18M10.6 6.1A9 9 0 0 1 12 6c3.8 0 7 2 9.5 6-1 1.7-2.1 3-3.3 4M6.6 7.6C5 8.7 3.6 10.2 2.5 12c2.5 4.5 5.7 6.5 9.5 6.5 1.6 0 3-.3 4.3-1',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21a2 2 0 0 0 4 0', cal: 'M4 6h16v14H4zM4 10h16M8 3v5M16 3v5', chev: 'M7 10l5 5 5-5',
  cart: 'M3 5h3l2.5 10h10l2-7H7.5M10 20h.01M17 20h.01', car: 'M4 16v-3l2.5-5h11l2.5 5v3zM4 16v2M20 16v2M7.5 13h.01M16.5 13h.01', cup: 'M5 8h11v5a5.5 5.5 0 0 1-11 0zM16 9.5h1.5a2.5 2.5 0 0 1 0 5H16M6 21h9',
  bag: 'M5 8h14l-1 12H6zM9 8V7a3 3 0 0 1 6 0v1', house: 'M4 11l8-7 8 7v9h-5v-5h-6v5H4z', bulb: 'M9.5 17h5M10.5 20.5h3M8.5 14c-2-1.4-3-3.5-2.4-5.8a6 6 0 0 1 11.8 0c.6 2.3-.4 4.4-2.4 5.8z',
  heart: 'M12 20c-6-4-9-7.4-9-11a4.6 4.6 0 0 1 9-1.6A4.6 4.6 0 0 1 21 9c0 3.6-3 7-9 11z', star: 'M12 3.5l2.6 5.5 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.7l6-.7z',
  case: 'M4 8h16v11H4zM9 8V5.5h6V8M4 13h16', gift: 'M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-1.5-3-5-3-5-1s3 1 5 1zM12 7c1.5-3 5-3 5-1s-3 1-5 1z',
  tool: 'M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2-2z', dots: 'M6 12h.01M12 12h.01M18 12h.01', spark: 'M12 3l2.2 6.3L20.5 12l-6.3 2.2L12 20.5l-2.2-6.3L3.5 12l6.3-2.7z',
  bksp: 'M9 6h11v12H9l-6-6zM12.5 9.5l5 5M17.5 9.5l-5 5', check: 'M5 12.5l4.5 4.5L19 7.5', close: 'M6 6l12 12M18 6L6 18', search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8',
  target: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01', lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  trash: 'M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13', warn: 'M12 4l9 16H3zM12 10v4M12 17h.01', globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c-3 3.5-3 14.5 0 18M12 3c3 3.5 3 14.5 0 18',
  pie: 'M12 3a9 9 0 1 0 9 9h-9zM15 3.5A9 9 0 0 1 20.5 9H15z', coin: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 15c.5 1 1.6 1.5 3 1.5 1.8 0 3-.8 3-2.2 0-3-6-1.6-6-4.6C9 8.3 10.2 7.5 12 7.5c1.3 0 2.3.5 2.8 1.4M12 6v1.5M12 16.5V18',
};
const ic = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${P[n]}"/></svg>`;

// ================= справочники =================
const RATES = { UZS: 1, USD: 11987.16, EUR: 13393.25, RUB: 146.29 }; // демо-курс ЦБ; в личной версии обновляется
const SIGN = { UZS: 'сум', USD: '$', EUR: '€', RUB: '₽' };
const FX = ['USD', 'EUR', 'RUB'];
const conv = (v, from, to) => (v * RATES[from]) / RATES[to];
/** Откуда курс: в демо — ЦБ, в личной версии — ЦБ, свой или примерный (пока не обновляли) */
const rateName = () => (!MY || S.fx.src === 'cbu' ? { nom: 'Курс ЦБ', dat: 'курсу ЦБ' } : S.fx.src === 'manual' ? { nom: 'Ваш курс', dat: 'вашему курсу' } : { nom: 'Примерный курс', dat: 'примерному курсу' });
const plural = (n, one, few, many) => { const a = Math.abs(n) % 100, b = a % 10; return `${n} ${a > 10 && a < 20 ? many : b === 1 ? one : b >= 2 && b <= 4 ? few : many}`; };
const CATS = {
  expense: [
    { id: 'food', name: 'Продукты', icon: 'cart', col: '--c2', places: ['Korzinka', 'Makro', 'Havas', 'Чорсу базар'] },
    { id: 'cafe', name: 'Кафе', icon: 'cup', col: '--c3', places: ['Evos', 'Bon!', 'Caffeine', 'Плов-центр'] },
    { id: 'transport', name: 'Транспорт', icon: 'car', col: '--c1', places: ['Yandex Go', 'MyTaxi', 'Метро'] },
    { id: 'shop', name: 'Покупки', icon: 'bag', col: '--c4', places: ['Uzum Market', 'Texnomart', 'Zara'] },
    { id: 'rent', name: 'Аренда', icon: 'house', col: '--c1', places: ['Аренда квартиры'] },
    { id: 'util', name: 'Коммуналка', icon: 'bulb', col: '--c5', places: ['Свет и газ', 'Интернет'] },
    { id: 'health', name: 'Здоровье', icon: 'heart', col: '--c6', places: ['Аптека', 'Клиника'] },
    { id: 'fun', name: 'Развлечения', icon: 'star', col: '--c3', places: ['Кино', 'Боулинг', 'Steam'] },
  ],
  income: [
    { id: 'salary', name: 'Зарплата', icon: 'case', col: '--income', places: ['Зарплата'] },
    { id: 'side', name: 'Подработка', icon: 'tool', col: '--income', places: ['Фриланс'] },
    { id: 'gift', name: 'Подарки', icon: 'gift', col: '--income', places: ['Подарок'] },
    { id: 'other', name: 'Другое', icon: 'dots', col: '--income', places: ['Поступление'] },
  ],
};
const KIND = { transfer: { icon: 'swap', col: '--info', name: 'Перевод' }, goal: { icon: 'target', col: '--accent', name: 'Цель' }, debt: { icon: 'people', col: '--warn', name: 'Долг' }, fx: { icon: 'coin', col: '--info', name: 'Курсовая разница' } };
const catOf = (id) => [...CATS.expense, ...CATS.income].find((c) => c.id === id);
const metaOf = (o) => KIND[o.kind] || catOf(o.cat);

// ================= формат и даты =================
const NB = ' ';
function fmt(v, cur = 'UZS', { sign = false, round = false } = {}) {
  const neg = v < -0.004; v = Math.abs(v);
  const cents = Math.round(v * 100);
  const frac = cur !== 'UZS' || (!round && cents % 100 !== 0);
  const s = (frac ? (cents / 100).toFixed(2) : String(Math.round(v))).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, NB);
  return `${neg ? '−' : sign ? '+' : ''}${s}${NB}${SIGN[cur]}`;
}
const num = (v, cur = 'UZS', o) => fmt(v, cur, o).replace(/\s\S+$/, '');
const short = (v) => { const a = Math.abs(v); return a >= 1e6 ? `${(v / 1e6).toFixed(1).replace(/\.0$/, '').replace('.', ',')} млн` : a >= 1e3 ? `${Math.round(v / 1e3)} тыс` : String(Math.round(v)); };
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MPREP = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];
const MSHORT = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const MNOM = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const sod = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const dayDiff = (a, b) => Math.round((sod(a) - sod(b)) / 86400000);
const hm = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
const dm = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
function dayLabel(d) { const diff = dayDiff(new Date(), d); return diff === 0 ? `Сегодня, ${dm(d)}` : diff === 1 ? `Вчера, ${dm(d)}` : `${DAYS[d.getDay()]}, ${dm(d)}`; }
const whenShort = (d) => { const diff = dayDiff(new Date(), d); return diff === 0 ? hm(d) : diff === 1 ? 'вчера' : `${d.getDate()} ${MSHORT[d.getMonth()]}`; };
const haptic = () => { try { navigator.vibrate && navigator.vibrate(8); } catch (e) { /* нет вибро */ } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const r2 = (v) => Math.round(v * 100) / 100;

// ================= демо-данные =================
let S;
function balanceRaw(a, ops) {
  let b = a.initial;
  for (const o of ops) {
    if (o.acc === a.id) b += o.kind === 'income' ? o.amount : o.kind === 'debt' || o.kind === 'fx' ? o.sign * o.amount : -o.amount;
    if (o.kind === 'transfer' && o.to === a.id) b += o.toAmount;
  }
  return r2(b);
}
function seed() {
  let x = 20261109; const rnd = () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296; };
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const between = (a, b, step = 1000) => Math.round((a + rnd() * (b - a)) / step) * step;
  const accounts = [
    { id: 'uz', name: 'Uzcard', num: '4417', cur: 'UZS', cc: '--card1', target: 8420000 },
    { id: 'visa', name: 'Visa', num: '9032', cur: 'USD', cc: '--card2', target: 980 },
    { id: 'humo', name: 'Humo', num: '1185', cur: 'UZS', cc: '--card3', target: 2860000 },
    { id: 'cash', name: 'Наличные', num: '', cur: 'UZS', cc: '--card4', target: 1822583 },
  ];
  const ops = []; let id = 1;
  const now = new Date(), today = sod(now);
  const add = (o) => { if (o.date <= now) ops.push({ id: id++, ...o }); };
  const ago = (days, h, m) => { const t = new Date(today); t.setDate(t.getDate() - days); t.setHours(h, m); return t; };
  for (let d = 372; d >= 0; d--) {
    const day = ago(d, 0, 0), dom = day.getDate();
    const monthsAgo = (today.getFullYear() - day.getFullYear()) * 12 + today.getMonth() - day.getMonth();
    const at = (h, m) => ago(d, h, m);
    if (dom === 5) add({ kind: 'income', cat: 'salary', title: 'Зарплата', amount: monthsAgo >= 5 ? 12000000 : 15000000, cur: 'UZS', acc: 'uz', date: at(10, 5) });
    if (dom === 1) add({ kind: 'expense', cat: 'rent', title: 'Аренда квартиры', amount: 3000000, cur: 'UZS', acc: 'uz', date: at(9, 30) });
    // крупные разовые траты последних месяцев (цели больше не забирают деньги со счёта)
    if (dom === 6 && monthsAgo === 6) add({ kind: 'expense', cat: 'fun', title: 'Отпуск в Самарканде', amount: 8000000, cur: 'UZS', acc: 'uz', date: at(10, 40) });
    if (dom === 6 && monthsAgo === 5) add({ kind: 'expense', cat: 'shop', title: 'Texnomart · ноутбук', amount: 12000000, cur: 'UZS', acc: 'uz', date: at(10, 40) });
    if (dom === 6 && monthsAgo === 4) add({ kind: 'expense', cat: 'health', title: 'Стоматология', amount: 10000000, cur: 'UZS', acc: 'uz', date: at(10, 40) });
    if (dom === 7) add({ kind: 'transfer', title: 'Снятие наличных', amount: 2000000, cur: 'UZS', acc: 'uz', to: 'cash', toAmount: 2000000, date: at(13, 15) });
    if (dom === 10) add({ kind: 'expense', cat: 'util', title: pick(CATS.expense[5].places), amount: between(380000, 520000), cur: 'UZS', acc: 'uz', date: at(12, 0) });
    if (rnd() < 0.45) add({ kind: 'expense', cat: 'food', title: pick(CATS.expense[0].places), amount: between(60000, 440000), cur: 'UZS', acc: rnd() < 0.6 ? 'uz' : 'cash', date: at(18, Math.floor(rnd() * 59)) });
    if (rnd() < 0.38) add({ kind: 'expense', cat: 'cafe', title: pick(CATS.expense[1].places), amount: between(40000, 190000), cur: 'UZS', acc: rnd() < 0.5 ? 'humo' : 'cash', date: at(13, Math.floor(rnd() * 59)) });
    if (rnd() < 0.62) add({ kind: 'expense', cat: 'transport', title: pick(CATS.expense[2].places), amount: between(12000, 48000), cur: 'UZS', acc: 'humo', date: at(8 + Math.floor(rnd() * 11), Math.floor(rnd() * 59)) });
    if (rnd() < 0.07) add({ kind: 'expense', cat: 'shop', title: pick(CATS.expense[3].places), amount: r2(18 + rnd() * 90), cur: 'USD', acc: 'visa', date: at(20, 15) });
    if (rnd() < 0.14) add({ kind: 'expense', cat: 'fun', title: pick(CATS.expense[7].places), amount: between(70000, 240000), cur: 'UZS', acc: 'humo', date: at(21, 0) });
    if (rnd() < 0.04) add({ kind: 'expense', cat: 'health', title: pick(CATS.expense[6].places), amount: between(50000, 300000), cur: 'UZS', acc: 'cash', date: at(11, 20) });
    if (rnd() < 0.04) add({ kind: 'income', cat: 'side', title: 'Фриланс', amount: between(500000, 2000000, 50000), cur: 'UZS', acc: 'humo', date: at(16, 0) });
  }
  // свежие операции, чтобы главная выглядела живой
  add({ kind: 'expense', cat: 'fun', title: 'Кино', amount: 140000, cur: 'UZS', acc: 'humo', date: ago(1, 21, 10) });
  add({ kind: 'expense', cat: 'transport', title: 'Yandex Go', amount: 24000, cur: 'UZS', acc: 'humo', date: new Date(now - 2.5 * 3600000) });
  add({ kind: 'expense', cat: 'food', title: 'Korzinka', amount: 186400, cur: 'UZS', acc: 'uz', date: new Date(now - 50 * 60000) });
  // долги: выдача и возврат меняют баланс счёта, но не доход и не расход
  add({ kind: 'debt', sign: -1, debt: 2, title: 'Дал в долг · Сардор', amount: 300000, cur: 'UZS', acc: 'cash', date: ago(40, 19, 0) });
  add({ kind: 'debt', sign: -1, debt: 4, title: 'Дал в долг · Тимур', amount: 1000, cur: 'USD', acc: 'visa', date: ago(30, 15, 0) });
  add({ kind: 'debt', sign: -1, debt: 1, title: 'Дал в долг · Алишер', amount: 1600000, cur: 'UZS', acc: 'cash', date: ago(25, 17, 30) });
  add({ kind: 'debt', sign: 1, debt: 3, title: 'Взял в долг · Мама', amount: 500000, cur: 'UZS', acc: 'humo', date: ago(20, 12, 0) });
  add({ kind: 'debt', sign: 1, debt: 1, title: 'Возврат долга · Алишер', amount: 400000, cur: 'UZS', acc: 'cash', date: ago(18, 20, 10) });
  // лимиты: подобраны так, чтобы проценты совпадали с макетом (82%, 62%, 103%)
  const mStart = new Date(today.getFullYear(), today.getMonth(), 1), spent = {};
  for (const o of ops) if (o.kind === 'expense' && o.date >= mStart) spent[o.cat] = (spent[o.cat] || 0) + conv(o.amount, o.cur, 'UZS');
  const budgets = {};
  for (const [k, r] of Object.entries({ food: 0.82, transport: 0.62, fun: 1.03 })) budgets[k] = Math.max(100000, Math.round((spent[k] || 0) / r / 10000) * 10000);
  // начальные остатки: сегодня балансы равны макету (итого 24 850 000 сум)
  for (const a of accounts) { a.initial = 0; a.initial = r2(a.target - balanceRaw(a, ops)); }
  const due = (n) => { const t = new Date(today); t.setDate(t.getDate() + n); return t; };
  return {
    accounts, ops, budgets, nextId: id, tab: 'home', stack: [], hide: false, cur: 'UZS', period: '30д', chips: 'all', q: '', aPer: 'Полгода',
    overlay: null, undo: null, lastTotal: null, justAdded: null, debtTab: 'lent', chat: [], fx: { at: null, src: null, date: '' }, nextAcc: 1, backupAt: null,
    debts: [
      { id: 1, dir: 'lent', person: 'Алишер', amount: 1600000, cur: 'UZS', paid: 400000, due: due(2), pays: [{ amount: 400000, cur: 'UZS', date: ago(18, 20, 10), note: 'на Наличные' }] },
      { id: 2, dir: 'lent', person: 'Сардор', amount: 300000, cur: 'UZS', paid: 0, due: due(-9), pays: [] },
      { id: 3, dir: 'borrowed', person: 'Мама', amount: 500000, cur: 'UZS', paid: 0, due: due(11), pays: [] },
      { id: 4, dir: 'lent', person: 'Тимур', amount: 1000, cur: 'USD', paid: 0, due: due(20), pays: [] },
    ],
    nextDebt: 5,
    // цели — отдельная сущность: деньги остаются на счетах, цель только откладывает их часть (резервирование)
    goals: [
      { id: 1, type: 'goal', name: 'Автомобиль', target: 150000000, cur: 'UZS', monthly: 10000000, alloc: { uz: 2000000 } },
      { id: 2, type: 'reserve', name: 'Неприкосновенный запас', target: null, cur: 'UZS', alloc: { humo: 1000000 } },
    ],
  };
}
/** «Начать с нуля»: те же счета с нулевым балансом, без операций, долгов, целей и лимитов */
function zeroState() {
  const s = seed();
  return { ...s, mine: true, accounts: s.accounts.map((a) => ({ ...a, num: '', initial: 0 })), ops: [], budgets: {}, debts: [], nextId: 1, nextDebt: 1, nextGoal: 3, chat: [],
    goals: [{ id: 2, type: 'reserve', name: 'Неприкосновенный запас', target: null, cur: 'UZS', alloc: {} }] };
}
// Свои данные хранятся только на этом устройстве, в браузере. У личной версии своё место,
// при первом запуске она забирает записи, сделанные в демо через «Начать с нуля».
const DEMO_KEY = 'who-wallet-prototype-mine-v1';
const STORE_KEY = MY ? 'who-wallet-my-v1' : DEMO_KEY;
const serialize = () => ({ accounts: S.accounts, ops: S.ops, budgets: S.budgets, debts: S.debts, goals: S.goals, nextId: S.nextId, nextDebt: S.nextDebt, nextGoal: S.nextGoal, nextAcc: S.nextAcc, cur: S.cur,
  rates: Object.fromEntries(FX.map((c) => [c, RATES[c]])), fx: S.fx, backupAt: S.backupAt });
function saveMine() {
  if (!S.mine) return;
  try { localStorage.setItem(STORE_KEY, JSON.stringify(serialize())); } catch (e) { /* хранилище недоступно */ }
}
/** Сохранённые данные → состояние приложения. Бросает ошибку, если это не данные кошелька */
function hydrate(d) {
  const bad = (m) => { throw new Error(m); };
  if (!d || typeof d !== 'object') bad('Это не файл Who Wallet');
  if (!Array.isArray(d.accounts) || !d.accounts.length || !d.accounts.every((a) => a && a.id && a.name && RATES[a.cur])) bad('В файле нет счетов');
  d.accounts.forEach((a) => { a.name = cleanName(a.name) || 'Счёт'; a.initial = Number(a.initial) || 0; a.cc = /^--card[1-4]$/.test(a.cc) ? a.cc : '--card1'; a.num = /^\d{0,4}$/.test(a.num || '') ? a.num || '' : ''; });
  if (!Array.isArray(d.ops)) bad('В файле нет операций');
  const day = (v) => (v ? new Date(v) : null), ids = new Set(d.accounts.map((a) => a.id));
  d.ops.forEach((o) => { o.date = new Date(o.date); if (isNaN(o.date) || !ids.has(o.acc) || (o.to && !ids.has(o.to))) bad('Операции в файле повреждены'); });
  d.debts = Array.isArray(d.debts) ? d.debts : [];
  d.debts.forEach((x) => { x.person = cleanName(x.person, 40) || '—'; x.due = day(x.due); x.pays = x.pays || []; x.pays.forEach((p) => { p.date = new Date(p.date); p.note = cleanName(p.note, 60); }); });
  d.goals = Array.isArray(d.goals) ? d.goals : [];
  d.goals.forEach((g) => { g.name = cleanName(g.name, 40) || 'Цель'; g.alloc = g.alloc || {}; });
  d.budgets = d.budgets && typeof d.budgets === 'object' ? d.budgets : {};
  const rates = {};
  if (d.rates) for (const c of FX) if (Number(d.rates[c]) > 0) rates[c] = Number(d.rates[c]);
  const z = zeroState();
  return { ...z, ...d, fx: { ...z.fx, ...(d.fx || {}) }, nextId: Math.max(d.nextId || 1, ...d.ops.map((o) => o.id + 1)), nextDebt: Math.max(d.nextDebt || 1, ...d.debts.map((x) => x.id + 1)),
    nextGoal: Math.max(d.nextGoal || 3, ...d.goals.map((g) => g.id + 1)), mine: true, rates: undefined, _rates: rates };
}
/** Сделать загруженное состояние текущим: курсы из него применяются только сейчас */
function adopt(st) { Object.assign(RATES, st._rates || {}); delete st._rates; S = st; }
function loadMine() {
  for (const key of MY ? [STORE_KEY, DEMO_KEY] : [STORE_KEY]) {
    try { const raw = localStorage.getItem(key); if (raw) return hydrate(JSON.parse(raw)); } catch (e) { /* повреждено или недоступно — пробуем дальше */ }
  }
  return null;
}
const dropMine = () => { try { localStorage.removeItem(STORE_KEY); } catch (e) { /* хранилище недоступно */ } };
// курс ЦБ Узбекистана: открытый JSON со всеми валютами на сегодня
async function loadCBU() {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch('https://cbu.uz/ru/arkhiv-kursov-valyut/json/', { cache: 'no-store', signal: ctl.signal });
    const list = await r.json(), got = {};
    for (const c of FX) { const x = list.find((y) => y.Ccy === c); if (x && Number(x.Rate) > 0) got[c] = Number(x.Rate) / (Number(x.Nominal) || 1); }
    if (!got.USD) throw new Error('нет курса доллара');
    Object.assign(RATES, got);
    S.fx = { at: new Date().toISOString(), src: 'cbu', date: (list.find((y) => y.Ccy === 'USD') || {}).Date || '' };
    S.lastTotal = null;
    return true;
  } catch (e) { return false; } finally { clearTimeout(t); }
}
const cleanName = (v, max = 24) => String(v || '').replace(/[<>&"]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
const pickAcc = (...prefs) => (prefs.map(accOf).find(Boolean) || S.accounts[0]).id;
const otherAcc = (id) => (S.accounts.find((a) => a.id === 'uz' && a.id !== id) || S.accounts.find((a) => a.id !== id) || accOf(id)).id;
const isCash = (a) => a.kind === 'cash' || (!a.kind && a.id === 'cash');
const accUsed = (a) => S.ops.some((o) => o.acc === a.id || o.to === a.id);
const avatarLetter = () => (tgName() || (MY ? 'Я' : 'R'))[0].toUpperCase();
const tgName = () => { try { return window.Telegram.WebApp.initDataUnsafe.user.first_name || ''; } catch (e) { return ''; } };
const mainGoal = () => S.goals.find((g) => g.type === 'goal');
const reserveGoal = () => S.goals.find((g) => g.type === 'reserve');

const bal = (a) => balanceRaw(a, S.ops);
const accOf = (id) => S.accounts.find((a) => a.id === id);
const accName = (a) => a.name + (a.num ? ` ·· ${a.num}` : '');
const totalUZS = () => S.accounts.reduce((s, a) => s + conv(bal(a), a.cur, 'UZS'), 0);
const opUZS = (o) => conv(o.amount, o.cur, 'UZS');
const flowUZS = (o) => (o.kind === 'income' ? 1 : o.kind === 'debt' || o.kind === 'fx' ? o.sign : o.kind === 'transfer' ? 0 : -1) * opUZS(o);
const sortedOps = () => [...S.ops].sort((a, b) => b.date - a.date);
// резерв: цели и ручной резерв — записи одной таблицы, поэтому один и тот же сум не откладывается дважды
const reservedOn = (accId) => S.goals.reduce((s, g) => s + (g.alloc[accId] || 0), 0);
const reservedUZS = () => S.accounts.reduce((s, a) => s + conv(reservedOn(a.id), a.cur, 'UZS'), 0);
const freeOf = (a) => r2(bal(a) - reservedOn(a.id));
const goalSaved = (g) => S.accounts.reduce((s, a) => s + conv(g.alloc[a.id] || 0, a.cur, g.cur), 0);
const spentReserve = () => S.accounts.map((a) => ({ a, over: r2(reservedOn(a.id) - Math.max(0, bal(a))) })).filter((x) => x.over > 0.004);
const liveDebts = () => S.debts.filter((d) => !d.deleted);
const debtSumUZS = (dir) => liveDebts().filter((d) => d.dir === dir).reduce((s, d) => s + conv(d.amount - d.paid, d.cur, 'UZS'), 0);
const snap = () => ({ type: 'snap', debts: structuredClone(S.debts), ops: S.ops.slice(), goals: structuredClone(S.goals) });

// ================= расчёты =================
function monthStats(offset = 0) {
  const n = new Date(), from = new Date(n.getFullYear(), n.getMonth() + offset, 1), to = new Date(n.getFullYear(), n.getMonth() + offset + 1, 1);
  let inc = 0, exp = 0; const byCat = {};
  for (const o of S.ops) {
    if (o.date < from || o.date >= to) continue;
    if (o.kind === 'income') inc += opUZS(o);
    if (o.kind === 'expense') { exp += opUZS(o); byCat[o.cat] = (byCat[o.cat] || 0) + opUZS(o); }
  }
  return { inc, exp, byCat, from, to };
}
function rangeStats(days) {
  const from = sod(new Date()); from.setDate(from.getDate() - days + 1);
  let inc = 0, exp = 0, n = 0; const byCat = {};
  for (const o of S.ops) {
    if (o.date < from || (o.kind !== 'income' && o.kind !== 'expense')) continue;
    n++;
    if (o.kind === 'income') inc += opUZS(o); else { exp += opUZS(o); byCat[o.cat] = (byCat[o.cat] || 0) + opUZS(o); }
  }
  return { inc, exp, byCat, n };
}
function series(days) { // баланс на конец каждого дня, от сегодняшнего назад
  const byDay = new Map();
  for (const o of S.ops) { const k = sod(o.date).getTime(); byDay.set(k, (byDay.get(k) || 0) + flowUZS(o)); }
  const pts = []; let cur = totalUZS(); const t = sod(new Date());
  for (let i = 0; i < days; i++) { const d = new Date(t); d.setDate(d.getDate() - i); pts.unshift(cur); cur -= byDay.get(d.getTime()) || 0; }
  return pts;
}
const PERIOD_DAYS = { '7д': 7, '30д': 30, '3м': 91, '6м': 182, '1г': 365 };
const daysInMonth = (n = new Date()) => new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate();
const ratioColor = (r) => (r >= 1 ? 'var(--expense)' : r >= 0.8 ? 'var(--warn)' : 'var(--accent)');

// ================= компоненты =================
function sparkSVG(pts) {
  const w = 350, h = 60, mn = Math.min(...pts), mx = Math.max(...pts), k = mx - mn || 1;
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * w, h - ((v - mn) / k) * (h - 8) - 4]);
  const d = xy.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join('');
  const [lx, ly] = xy[xy.length - 1];
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="График баланса за ${S.period}">
    <defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".28"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
    <path class="ar" fill="url(#sparkFill)" d="${d}L${w} ${h}L0 ${h}Z"/><path class="ln" pathLength="1" d="${d}"/>
    <circle cx="${lx}" cy="${ly}" r="7" fill="var(--accent)" opacity=".22"/><circle cx="${lx}" cy="${ly}" r="3.5" fill="var(--accent)"/></svg>`;
}
function ring(r, size, sw, color, label, k) {
  const rr = (size - sw) / 2, C = 2 * Math.PI * rr, off = C * (1 - Math.max(0, Math.min(1, r)));
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle class="tr" cx="${size / 2}" cy="${size / 2}" r="${rr}" stroke-width="${sw}"/>
    <circle class="fg" cx="${size / 2}" cy="${size / 2}" r="${rr}" stroke-width="${sw}" stroke="${color}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${off}" data-k="${k}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    ${label ? `<text x="${size / 2}" y="${size / 2}">${label}</text>` : ''}</svg>`;
}
const bigRing = (r, size, sw, color, k, big, small) => `<div class="bigring" style="width:${size}px;height:${size}px">${ring(r, size, sw, color, '', k)}<div><div style="font-size:${Math.round(size / 5)}px;font-weight:800;line-height:1.1">${big}</div><div class="small muted">${small}</div></div></div>`;
const fill = (pct, k, style = '') => `<span data-w="${Math.max(0, Math.min(100, pct)).toFixed(1)}%" data-k="${k}" style="width:0;${style}"></span>`;
function opAmount(o) {
  if (o.kind === 'income') return { t: fmt(o.amount, o.cur, { sign: true }), cl: 'pos' };
  if (o.kind === 'expense') return { t: fmt(-o.amount, o.cur), cl: 'neg' };
  if (o.kind === 'debt' || o.kind === 'fx') return { t: fmt(o.sign * o.amount, o.cur, { sign: true }), cl: '' };
  if (o.kind === 'goal') return { t: fmt(-o.amount, o.cur), cl: '' };
  return { t: fmt(o.amount, o.cur), cl: '' };
}
function opRow(o) {
  const m = metaOf(o), a = accOf(o.acc), amt = opAmount(o);
  const sub = o.kind === 'transfer' ? `${a.name} → ${accOf(o.to).name}` : `${m.name} · ${a.name}`;
  return `<button class="op ${S.justAdded === o.id ? 'new' : ''}" data-act="op" data-id="${o.id}" style="--ic:var(${m.col})"><span class="ic">${ic(m.icon)}</span>
    <span><span class="t">${esc(o.title)}</span><br><span class="s">${esc(sub)}</span></span>
    <span class="a"><span class="${amt.cl} money">${amt.t}</span><br><span class="s">${whenShort(o.date)}</span></span></button>`;
}
const backHdr = (title, sub = '') => `<div class="back"><button class="iconbtn" data-act="back" aria-label="Назад">${ic('back')}</button><div><h2>${title}</h2>${sub ? `<div class="sub">${sub}</div>` : ''}</div><span></span></div>`;

function tipData() {
  const ms = monthStats(0), today = new Date();
  const lim = Object.entries(S.budgets).map(([id, l]) => ({ id, r: (ms.byCat[id] || 0) / l, over: (ms.byCat[id] || 0) - l })).sort((a, b) => b.r - a.r);
  const top = lim[0];
  if (top && top.r >= 1) return { k: 'Лимит превышен', col: '--expense', icon: 'warn', text: `${catOf(top.id).name}: потрачено на ${fmt(top.over, 'UZS', { round: true })} больше месячного лимита.`, cta: 'Открыть лимит', to: 'limit', id: top.id };
  if (MY && !S.ops.length && S.accounts.every((a) => !a.initial)) return { k: 'С чего начать', col: '--accent', icon: 'wallet', text: 'Впишите, сколько сейчас денег на каждом счёте. Лишние счета можно удалить, недостающие — добавить. Потом записывайте доходы и расходы кнопкой «+».', cta: 'Открыть счета', act: 'tab', to: 'accounts' };
  if (!S.ops.length) return { k: 'С чего начать', col: '--accent', icon: 'plus', text: 'Запишите первый доход или расход — кнопка «+» внизу. Всё, что вы внесёте, сохранится на этом устройстве.', cta: 'Открыть профиль', to: 'profile' };
  const soon = liveDebts().find((d) => d.paid < d.amount && d.due && dayDiff(d.due, today) >= 0 && dayDiff(d.due, today) <= 3);
  if (soon) return { k: 'Долг', col: '--info', icon: 'people', text: `${soon.person} ${soon.dir === 'lent' ? 'должен вернуть' : '— нужно вернуть'} ${fmt(soon.amount - soon.paid, soon.cur)} через ${dayDiff(soon.due, today)} дн.`, cta: 'Открыть долги', to: 'debts' };
  if (top && top.r >= 0.8) return { k: 'Лимит близко', col: '--warn', icon: 'pie', text: `${catOf(top.id).name}: потрачено ${Math.round(top.r * 100)}% месячного лимита.`, cta: 'Открыть лимит', to: 'limit', id: top.id };
  return { k: 'Подсказка', col: '--accent', icon: 'spark', text: 'Спросите помощника, на что уходит больше всего денег.', cta: 'Спросить AI-помощника', to: 'ai' };
}

// ================= экраны =================
function homeScreen() {
  const n = new Date(), ms = monthStats(0), tot = totalUZS(), shown = conv(tot, 'UZS', S.cur), res = reservedUZS(), spent = spentReserve();
  const pts = series(PERIOD_DAYS[S.period]), first = pts[0], ch = first ? ((pts[pts.length - 1] - first) / Math.abs(first)) * 100 : 0;
  const daysLeft = daysInMonth(n) - n.getDate();
  const expShare = ms.inc ? Math.min(1, ms.exp / ms.inc) : ms.exp ? 1 : 0;
  const limits = Object.entries(S.budgets).map(([id, lim]) => { const sp = ms.byCat[id] || 0; return { id, r: sp / lim, left: lim - sp }; });
  const cats = Object.entries(ms.byCat).sort((a, b) => b[1] - a[1]), top = cats.slice(0, 4), other = cats.slice(4).reduce((s, [, v]) => s + v, 0);
  const parts = [...top.map(([id, v]) => ({ name: catOf(id).name, v, col: `var(${catOf(id).col})` })), ...(other ? [{ name: 'Другие', v: other, col: 'var(--c5)' }] : [])];
  const C = 2 * Math.PI * 44; let accum = 0;
  const donut = parts.map((p) => { const len = (p.v / (ms.exp || 1)) * C; const s = `<circle cx="56" cy="56" r="44" stroke="${p.col}" stroke-dasharray="${Math.max(0.1, len - 3).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-accum).toFixed(2)}" transform="rotate(-90 56 56)"/>`; accum += len; return s; }).join('');
  const t = tipData(), up = ch >= 0;
  return `<div class="stagger">
  <div class="hero">
    <div class="between greet"><div><span class="muted">${n.getHours() < 5 ? 'Доброй ночи' : n.getHours() < 12 ? 'Доброе утро' : n.getHours() < 18 ? 'Добрый день' : 'Добрый вечер'}</span>${S.mine ? '' : '<span class="demo">демо</span>'}<b>${DAYS[n.getDay()]}, ${dm(n)}</b></div>
      <div class="row" style="gap:8px">${MY ? '' : `<button class="iconbtn" data-act="toast" data-msg="Календарь платежей появится в следующей версии прототипа" aria-label="Календарь">${ic('cal')}</button>
      <button class="iconbtn" data-act="toast" data-msg="Напоминания приходят от бота в Telegram" aria-label="Уведомления">${ic('bell')}<span class="dot"></span></button>`}
      <button class="iconbtn" data-act="push" data-to="profile" aria-label="Профиль" style="background:color-mix(in srgb,var(--accent) 18%,transparent);color:var(--accent);font-weight:800">${esc(avatarLetter())}</button></div></div>
    <div class="between" style="margin-top:18px"><button class="row muted" data-act="hide" style="gap:8px" aria-label="${S.hide ? 'Показать суммы' : 'Скрыть суммы'}">Общий баланс ${ic(S.hide ? 'eyeoff' : 'eye')}</button><button class="chipbtn" data-act="cur" aria-label="Сменить валюту">${S.cur} ${ic('chev')}</button></div>
    <div class="balance"><span class="money" id="bal" data-v="${shown}">${num(shown, S.cur, { round: true })}</span><small>${SIGN[S.cur]}</small></div>
    <button class="reserve muted" data-act="push" data-to="goal" style="width:100%" aria-label="Цели и резерв"><span>Доступно<b class="money">${fmt(conv(tot - res, 'UZS', S.cur), S.cur, { round: true })}</b></span><span class="row" style="gap:4px">${ic('lock')}Резерв<b class="money">${fmt(conv(res, 'UZS', S.cur), S.cur, { round: true })}</b></span></button>
    ${spent.length ? `<button class="note" data-act="push" data-to="goal" style="--nc:var(--warn);margin-top:8px;width:100%;text-align:left">${ic('warn')}<span>Потрачено ${spent.map((x) => `${fmt(x.over, x.a.cur)} с ${x.a.name}`).join(', ')} из резерва · уменьшить резерв ›</span></button>` : ''}
    <div class="between" style="margin-top:12px"><span class="trend" style="--tc:${up ? 'var(--income)' : 'var(--expense)'}">${ic(up ? 'up' : 'down', 'i sm')}${Math.abs(ch).toFixed(1).replace('.', ',')}% за ${S.period}</span>
      <div class="periods" role="group" aria-label="Период графика">${Object.keys(PERIOD_DAYS).map((p) => `<button class="${p === S.period ? 'on' : ''}" data-act="period" data-p="${p}">${p}</button>`).join('')}</div></div>
    ${sparkSVG(pts)}
  </div>
  <div class="quick">
    <button data-act="add" data-mode="income" style="--q:var(--income)"><span class="qi">${ic('down')}</span>Доход</button>
    <button data-act="add" data-mode="expense" style="--q:var(--expense)"><span class="qi">${ic('up')}</span>Расход</button>
    <button data-act="add" data-mode="transfer" style="--q:var(--info)"><span class="qi">${ic('swap')}</span>Перевод</button>
    <button data-act="push" data-to="debts" style="--q:var(--warn)"><span class="qi">${ic('people')}</span>Долг</button>
  </div>
  <div class="card month" style="margin-top:16px"><div class="between"><b style="font-size:16px;font-weight:800">${MNOM[n.getMonth()]}</b><span class="muted small">осталось ${daysLeft} дн.</span></div>
    <div class="bar" ${!ms.inc && !ms.exp ? 'style="background:var(--line)"' : ''}>${fill(expShare * 100, 'month', !ms.inc && !ms.exp ? 'border-right:0' : '')}</div>
    <div class="trio"><div><span class="lbl"><i style="background:var(--income)"></i>Доходы</span><b class="money">${num(ms.inc, 'UZS', { round: true })}</b></div>
      <div><span class="lbl"><i style="background:var(--expense)"></i>Расходы</span><b class="money">${num(ms.exp, 'UZS', { round: true })}</b></div>
      <div><span class="lbl"><i style="background:var(--accent)"></i>Разница</span><b class="money acc">${num(ms.inc - ms.exp, 'UZS', { sign: true, round: true })}</b></div></div></div>
  ${limits.length ? `<div class="sec"><h3>Лимиты</h3><button class="link" data-act="push" data-to="budgets">Все лимиты</button></div>` : ''}
  <div class="limits">${limits.map((l) => `<button class="limit" data-act="push" data-to="limit" data-id="${l.id}">${ring(l.r, 44, 5, ratioColor(l.r), Math.round(l.r * 100) + '%', 'lim-' + l.id)}<span class="chev">${ic('right')}</span>
    <b>${catOf(l.id).name}</b><span class="tiny muted">${l.left >= 0 ? 'осталось' : 'сверх лимита'}</span><span class="v money ${l.left < 0 ? 'neg' : ''}">${short(Math.abs(l.left))}</span></button>`).join('')}</div>
  <div class="sec"><h3>Последние операции</h3><button class="link" data-act="tab" data-to="ops">Все</button></div>
  <div class="ops">${sortedOps().slice(0, 4).map(opRow).join('') || '<div class="empty small">Операций пока нет. Нажмите «+» внизу, чтобы записать первую.</div>'}</div>
  <div class="card" style="margin-top:16px"><div class="between"><b style="font-size:16px;font-weight:800">Куда уходят деньги</b><span class="muted small">${MNOM[n.getMonth()].toLowerCase()}</span></div>
    <div class="donut"><svg width="112" height="112" viewBox="0 0 112 112" role="img" aria-label="Расходы по категориям">${donut || '<circle cx="56" cy="56" r="44" stroke="var(--line)"/>'}<text x="56" y="56">${S.hide ? '•••' : short(ms.exp)}</text></svg>
      <div class="legend">${parts.map((p) => `<div><i style="background:${p.col}"></i><span>${p.name}</span><b class="muted">${Math.round((p.v / (ms.exp || 1)) * 100)}%</b></div>`).join('') || '<span class="muted">Расходов пока нет</span>'}</div></div></div>
  <button class="tip" style="--tc:var(${t.col})" data-act="${t.act || 'push'}" data-to="${t.to}" data-id="${t.id || ''}"><span class="ti">${ic(t.icon)}</span>
    <span><span class="k">${t.k}</span><br>${esc(t.text)}<br><span class="link">${t.cta} ›</span></span></button>
  </div>`;
}

function opsScreen() {
  const q = S.q.trim().toLowerCase(), qn = q.replace(/[\s,.]/g, '');
  const kindOk = (o) => S.chips === 'all' || (S.chips === 'transfer' ? o.kind !== 'income' && o.kind !== 'expense' : o.kind === S.chips);
  const textOk = (o) => !q || o.title.toLowerCase().includes(q) || metaOf(o).name.toLowerCase().includes(q) || accOf(o.acc).name.toLowerCase().includes(q) || (o.to && accOf(o.to).name.toLowerCase().includes(q)) || (qn && /^\d+$/.test(qn) && String(Math.round(o.amount)).includes(qn));
  const list = sortedOps().filter((o) => kindOk(o) && textOk(o));
  const LIMIT = 80, groups = [];
  for (const o of list.slice(0, LIMIT)) { const k = sod(o.date).getTime(); let g = groups[groups.length - 1]; if (!g || g.k !== k) groups.push((g = { k, d: o.date, items: [] })); g.items.push(o); }
  return `<h1 class="h-title">Операции</h1>
  <label class="search">${ic('search')}<input id="q" type="search" placeholder="Место, категория, счёт или сумма" value="${esc(S.q)}" autocomplete="off" aria-label="Поиск операций"></label>
  <div class="chips">${[['all', 'Все'], ['expense', 'Расходы'], ['income', 'Доходы'], ['transfer', 'Переводы и долги']].map(([k, l]) => `<button class="${S.chips === k ? 'on' : ''}" data-act="chip" data-k="${k}">${l}</button>`).join('')}</div>
  <div class="oplist">${groups.length ? groups.map((g) => { const tot = g.items.reduce((s, o) => s + (o.kind === 'expense' ? -opUZS(o) : o.kind === 'income' ? opUZS(o) : 0), 0);
    return `<div class="day"><span>${dayLabel(g.d)}</span><span class="${tot < 0 ? 'neg' : tot > 0 ? 'pos' : ''} money">${tot ? fmt(tot, 'UZS', { sign: true, round: true }) : ''}</span></div>${g.items.map(opRow).join('')}`; }).join('')
    + (list.length > LIMIT ? `<p class="tiny muted" style="text-align:center">Показаны последние ${LIMIT} из ${list.length}. Уточните поиск, чтобы найти остальные.</p>` : '')
    : S.ops.length ? `<div class="empty">${ic('search')}<b style="color:var(--text)">Ничего не найдено</b><span class="small">Попробуйте другое слово или сумму</span></div>`
    : `<div class="empty">${ic('list')}<b style="color:var(--text)">Операций пока нет</b><span class="small">Нажмите «+» внизу, чтобы записать доход или расход</span></div>`}</div>`;
}

function analyticsScreen() {
  const per = S.aPer, months = per === 'Месяц' ? 1 : per === '3 месяца' ? 3 : 6, n = new Date(), bars = [];
  for (let i = months - 1; i >= 0; i--) { const st = monthStats(-i); bars.push({ m: MSHORT[st.from.getMonth()], inc: st.inc, exp: st.exp, cur: i === 0 }); }
  const max = Math.max(...bars.flatMap((b) => [b.inc, b.exp]), 1);
  const cur = monthStats(0), passed = n.getDate();
  const catsCur = Object.entries(cur.byCat).sort((a, b) => b[1] - a[1]).slice(0, 6), maxCat = Math.max(...catsCur.map(([, v]) => v), 1);
  const tot = bars.reduce((s, b) => ({ inc: s.inc + b.inc, exp: s.exp + b.exp }), { inc: 0, exp: 0 });
  const span = months === 1 ? `за ${passed} дн.` : `за ${months} мес.`;
  return `<h1 class="h-title">Аналитика</h1>
  <div class="seg">${['Месяц', '3 месяца', 'Полгода'].map((p) => `<button class="${p === per ? 'on' : ''}" data-act="aper" data-p="${p}">${p}</button>`).join('')}</div>
  <div class="qa stagger">
    <div class="card"><span class="small muted">Заработал</span><b class="money">${short(tot.inc)}</b><span class="tiny muted">${span}</span></div>
    <div class="card"><span class="small muted">Потратил</span><b class="money">${short(tot.exp)}</b><span class="tiny muted">${span}</span></div>
    <div class="card"><span class="small muted">Осталось</span><b class="money acc">${short(tot.inc - tot.exp)}</b><span class="tiny muted">доходы − расходы</span></div>
    <div class="card"><span class="small muted">Расход в день</span><b class="money">${short(cur.exp / Math.max(1, passed))}</b><span class="tiny muted">в среднем в ${MPREP[n.getMonth()]}</span></div>
  </div>
  <div class="card" style="margin-top:14px"><div class="legendline"><span><i style="background:var(--income)"></i>Доходы</span><span><i style="background:var(--expense)"></i>Расходы</span></div>
    <div class="bars">${bars.map((b, i) => `<div class="g"><div class="pair"><span style="height:${((b.inc / max) * 120).toFixed(1)}px;background:var(--income);animation-delay:${i * 60}ms;${b.cur ? 'opacity:.55' : ''}"></span><span style="height:${((b.exp / max) * 120).toFixed(1)}px;background:var(--expense);animation-delay:${i * 60 + 30}ms;${b.cur ? 'opacity:.55' : ''}"></span></div><span class="m" style="${b.cur ? 'color:var(--text);font-weight:800' : ''}">${b.m}</span></div>`).join('')}</div>
    <div class="tiny muted" style="margin-top:8px">${MNOM[n.getMonth()]} ещё идёт, поэтому его столбики бледнее.</div></div>
  <div class="sec"><h3>Расходы за ${MNOM[n.getMonth()].toLowerCase()}</h3></div>
  <div class="card">${catsCur.map(([id, v]) => `<div class="catrow"><span>${catOf(id).name}</span><span class="track">${fill((v / maxCat) * 100, 'cat-' + id, `background:var(${catOf(id).col})`)}</span><b class="money" style="text-align:right;font-size:13px">${short(v)}</b></div>`).join('') || '<div class="empty">Расходов в этом месяце пока нет</div>'}</div>
  <button class="tip" style="--tc:var(--accent)" data-act="push" data-to="ai"><span class="ti">${ic('spark')}</span><span><span class="k">AI-помощник</span><br>Спросите, сколько ушло за неделю или каким будет расход к концу месяца.<br><span class="link">Спросить ›</span></span></button>`;
}

function accountsScreen() {
  const lent = debtSumUZS('lent'), owe = debtSumUZS('borrowed'), car = mainGoal();
  return `<div class="between"><h1 class="h-title">Счета</h1><button class="iconbtn" style="background:var(--accent);color:var(--on-accent)" data-act="newacc" aria-label="Новый счёт">${ic('plus')}</button></div>
  <div class="muted small">Всего на счетах</div><div style="font-size:28px;font-weight:800;margin:2px 0 14px" class="money">${fmt(totalUZS(), 'UZS', { round: true })}</div>
  <div class="stagger">${S.accounts.map((a) => `<button class="accard" style="--cc:var(${a.cc})" data-act="push" data-to="acc" data-id="${a.id}" aria-label="Счёт ${esc(a.name)}"><div class="between"><b style="font-size:15px">${esc(a.name)}</b><span>${a.num ? '·· ' + a.num : isCash(a) ? 'кошелёк' : 'карта'}</span></div>
    <div class="between"><b class="money">${fmt(bal(a), a.cur)}</b>${a.cur !== 'UZS' ? `<span class="money">≈ ${fmt(conv(bal(a), a.cur, 'UZS'), 'UZS', { round: true })}</span>` : ''}</div>
    ${reservedOn(a.id) ? `<div class="between" style="font-size:12px"><span class="money">в резерве ${fmt(reservedOn(a.id), a.cur)}</span><span class="money">свободно ${fmt(freeOf(a), a.cur)}</span></div>` : ''}</button>`).join('')}</div>
  <div class="two" style="margin:6px 0 18px"><button class="btn sec2" data-act="add" data-mode="transfer">Перевести</button><button class="btn sec2" data-act="newacc">Новый счёт</button></div>
  <button class="listrow" data-act="push" data-to="debts"><span class="ri">${ic('people')}</span><span><b>Долги</b><br><span class="tiny muted money">мне должны ${short(lent)} · я должен ${short(owe)}</span></span><span></span>${ic('right')}</button>
  <button class="listrow" data-act="push" data-to="goal"><span class="ri">${ic('target')}</span><span><b>Цели и резерв</b><br><span class="tiny muted money">отложено ${short(reservedUZS())}${car ? ` · ${esc(car.name)} ${Math.round((goalSaved(car) / car.target) * 100)}%` : ' · целей пока нет'}</span></span><span></span>${ic('right')}</button>
  <button class="listrow" data-act="push" data-to="budgets"><span class="ri">${ic('pie')}</span><span><b>Лимиты на месяц</b><br><span class="tiny muted">${Object.keys(S.budgets).length ? plural(Object.keys(S.budgets).length, 'категория', 'категории', 'категорий') + ' с лимитом' : 'лимитов пока нет'}</span></span><span></span>${ic('right')}</button>`;
}
function accScreen(id) {
  const a = accOf(id);
  if (!a) return `${backHdr('Счёт')}<div class="empty">Счёт удалён</div>`;
  const n = S.ops.filter((o) => o.acc === a.id || o.to === a.id).length, res = reservedOn(a.id);
  return `${backHdr(esc(a.name), `${a.cur} · ${isCash(a) ? 'наличные' : 'карта'}`)}
  <div class="accard" style="--cc:var(${a.cc});margin-top:4px"><span style="opacity:.82;font-size:13px">Баланс</span><b class="money" style="font-size:30px">${fmt(bal(a), a.cur)}</b>${a.cur !== 'UZS' ? `<span class="money" style="opacity:.82;font-size:13px">≈ ${fmt(conv(bal(a), a.cur, 'UZS'), 'UZS', { round: true })}</span>` : ''}</div>
  <button class="btn" data-act="accbal" data-id="${a.id}">Указать остаток</button>
  <p class="tiny muted" style="text-align:center;margin:8px 0 14px">Впишите, сколько на счёте сейчас. Разница не попадёт в доходы и расходы</p>
  <div class="card kv"><div><span>Остаток до первой записи</span><b class="money">${fmt(a.initial, a.cur)}</b></div><div><span>Операций</span><b>${n}</b></div>${res ? `<div><span>В резерве</span><b class="money">${fmt(res, a.cur)}</b></div>` : ''}</div>
  <div class="two" style="margin-top:14px"><button class="btn sec2" data-act="filteracc" data-id="${a.id}">Операции</button><button class="btn sec2" data-act="accname" data-id="${a.id}">Переименовать</button></div>
  ${S.accounts.length < 2 ? '' : accUsed(a) ? '<p class="tiny muted" style="text-align:center;margin-top:14px">Счёт с операциями удалить нельзя — сначала удалите или перенесите их</p>'
    : `<button class="btn ghost-danger" style="margin-top:14px" data-act="accdel" data-id="${a.id}">Удалить счёт</button>`}`;
}
function budgetsScreen() {
  const ms = monthStats(0), n = new Date();
  return `${backHdr('Лимиты на месяц', MNOM[n.getMonth()].toLowerCase())}
  <div style="margin-top:4px">${CATS.expense.map((c) => { const lim = S.budgets[c.id], sp = ms.byCat[c.id] || 0;
    return `<button class="listrow" data-act="budgetedit" data-id="${c.id}"><span class="ri" style="background:color-mix(in srgb,var(${c.col}) 16%,transparent);color:var(${c.col})">${ic(c.icon)}</span><span><b>${c.name}</b><br><span class="tiny muted money">${lim ? `${short(sp)} из ${short(lim)} · ${Math.round((sp / lim) * 100)}%` : sp ? `потрачено ${short(sp)} · без лимита` : 'без лимита'}</span></span>${lim ? `<span class="small money" style="font-weight:800;color:${ratioColor(sp / lim)}">${short(Math.abs(lim - sp))}</span>` : '<span class="small muted">задать</span>'}${ic('right')}</button>`; }).join('')}</div>
  <p class="tiny muted" style="text-align:center;margin-top:10px">Лимит — сколько вы готовы потратить на категорию за месяц. Справа — сколько осталось или сколько сверх</p>`;
}

function limitScreen(id) {
  const c = catOf(id), lim = S.budgets[id], ms = monthStats(0), sp = ms.byCat[id] || 0, r = sp / lim, n = new Date();
  if (!lim) return `${backHdr(c.name, 'лимит не задан')}<div class="empty">${ic('pie')}<b style="color:var(--text)">Лимита нет</b><span class="small">В ${MPREP[n.getMonth()]} на «${c.name}» потрачено ${fmt(sp, 'UZS', { round: true })}</span></div><button class="btn" data-act="budgetedit" data-id="${id}">Задать лимит</button>`;
  const daysLeft = daysInMonth(n) - n.getDate() + 1, left = lim - sp;
  const ops = sortedOps().filter((o) => o.cat === id && o.date >= ms.from);
  return `${backHdr(c.name, `лимит на ${MNOM[n.getMonth()].toLowerCase()}`)}
  <div style="margin:4px 0 16px">${bigRing(r, 150, 14, ratioColor(r), 'limbig-' + id, Math.round(r * 100) + '%', 'потрачено')}</div>
  <div class="qa" style="grid-template-columns:repeat(3,1fr)"><div class="card"><span class="tiny muted">Лимит</span><b class="money" style="font-size:15px">${short(lim)}</b></div><div class="card"><span class="tiny muted">Потрачено</span><b class="money" style="font-size:15px">${short(sp)}</b></div><div class="card"><span class="tiny muted">${left >= 0 ? 'Осталось' : 'Сверх'}</span><b class="money" style="font-size:15px;color:${left >= 0 ? ratioColor(r) : 'var(--expense)'}">${short(Math.abs(left))}</b></div></div>
  <div class="note" style="--nc:${left > 0 ? ratioColor(r) : 'var(--expense)'};margin-top:12px">${ic(left > 0 ? 'pie' : 'warn')}${left > 0 ? `Чтобы уложиться: до ${short(left / daysLeft)} сум в день` : `Лимит превышен на ${fmt(-left, 'UZS', { round: true })}`}</div>
  <div class="sec"><h3>Операции</h3><span class="small muted">${ops.length}</span></div><div class="ops">${ops.slice(0, 8).map(opRow).join('') || '<div class="empty small">В этом месяце операций нет</div>'}</div>
  <button class="btn sec2" style="margin-top:16px" data-act="budgetedit" data-id="${id}">Изменить лимит</button>`;
}

function opScreen(id) {
  const o = S.ops.find((x) => x.id === id);
  if (!o) return `${backHdr('Операция')}<div class="empty">Операция удалена</div>`;
  const m = metaOf(o), a = accOf(o.acc), amt = opAmount(o);
  const title = o.kind === 'income' ? 'Доход' : o.kind === 'expense' ? 'Расход' : m.name;
  const editable = o.kind === 'income' || o.kind === 'expense' || o.kind === 'transfer';
  return `${backHdr(title, `${dayLabel(o.date)}, ${hm(o.date)}`)}
  <div style="display:grid;justify-items:center;gap:10px;margin:10px 0 18px"><span class="op" style="--ic:var(${m.col});display:block;width:auto;padding:0"><span class="ic" style="width:64px;height:64px;border-radius:20px">${ic(m.icon)}</span></span>
    <div class="bigamt money ${amt.cl}">${amt.t}</div><b>${esc(o.title)}</b></div>
  <div class="card kv">${o.kind === 'transfer' ? `<div><span>Откуда</span><b>${accName(a)}</b></div><div><span>Куда</span><b>${accName(accOf(o.to))}</b></div><div><span>Зачислено</span><b class="money">${fmt(o.toAmount, accOf(o.to).cur)}</b></div>`
    : `<div><span>${o.kind === 'goal' || o.kind === 'debt' ? 'Тип' : 'Категория'}</span><b>${m.name}</b></div><div><span>Счёт</span><b>${accName(a)}</b></div>`}
    ${o.cur !== 'UZS' ? `<div><span>Курс операции</span><b>1 ${SIGN[o.cur]} = ${fmt(RATES[o.cur])}</b></div>` : ''}<div><span>Дата</span><b>${dayLabel(o.date)}, ${hm(o.date)}</b></div>${o.comment ? `<div><span>Комментарий</span><b>${esc(o.comment)}</b></div>` : ''}</div>
  ${editable ? `<div class="two" style="margin-top:16px"><button class="btn sec2" data-act="editamt" data-id="${o.id}">Изменить сумму</button><button class="btn ghost-danger" data-act="del" data-id="${o.id}">Удалить</button></div>
  <p class="tiny muted" style="text-align:center;margin-top:12px">После изменения балансы и лимиты пересчитываются сразу</p>`
    : `<button class="btn sec2" style="margin-top:16px" data-act="push" data-to="${o.kind === 'goal' ? 'goal' : 'debts'}">Открыть ${o.kind === 'goal' ? 'цель' : 'долги'}</button><p class="tiny muted" style="text-align:center;margin-top:12px">${o.kind === 'goal' ? 'Пополнения цели меняются в разделе цели' : 'Платежи по долгу меняются в разделе долгов'}</p>`}`;
}

function debtsScreen() {
  const list = liveDebts().filter((d) => d.dir === S.debtTab), today = new Date();
  const sum = debtSumUZS;
  const overdue = liveDebts().filter((d) => d.paid < d.amount && d.due && dayDiff(d.due, today) < 0);
  return `${backHdr('Долги')}
  <div class="seg"><button class="${S.debtTab === 'lent' ? 'on' : ''}" data-act="dtab" data-k="lent">Мне должны · ${short(sum('lent'))}</button><button class="${S.debtTab === 'borrowed' ? 'on' : ''}" data-act="dtab" data-k="borrowed">Я должен · ${short(sum('borrowed'))}</button></div>
  ${overdue.length ? `<div class="note" style="--nc:var(--expense);margin-top:12px">${ic('warn')}Просрочено: ${overdue.length} · ${fmt(overdue.reduce((s, d) => s + conv(d.amount - d.paid, d.cur, 'UZS'), 0), 'UZS', { round: true })}</div>` : ''}
  <div class="stagger" style="margin-top:12px">${list.map((d) => { const dd = d.due ? dayDiff(d.due, today) : null, closed = d.paid >= d.amount, col = d.dir === 'lent' ? '--income' : '--expense';
    const st = closed ? ['погашен', 'var(--income)'] : dd == null ? ['без срока', 'var(--muted)'] : dd < 0 ? [`просрочен на ${-dd} дн.`, 'var(--expense)'] : dd === 0 ? ['срок сегодня', 'var(--warn)'] : [`вернуть через ${dd} дн. · ${d.due.getDate()} ${MSHORT[d.due.getMonth()]}`, dd <= 3 ? 'var(--warn)' : 'var(--muted)'];
    return `<button class="card" style="display:grid;gap:10px;width:100%;text-align:left;margin-bottom:10px" data-act="push" data-to="debt" data-id="${d.id}"><div class="between"><div class="row"><span class="iconbtn" style="background:color-mix(in srgb,var(${col}) 16%,transparent);color:var(${col});font-weight:800">${d.person[0]}</span><div><b>${d.person}</b>${d.purpose ? ` <span class="tiny" style="font-weight:800;color:var(--info)">${d.purpose === 'refund' ? '· вернуть переплату' : '· аванс'}</span>` : ''}<br><span class="tiny" style="color:${st[1]};font-weight:700">${st[0]}${d.overpay ? ' · переплата не разобрана' : ''}</span></div></div>
      <div style="text-align:right"><b class="money">${fmt(d.amount - d.paid, d.cur)}</b><br><span class="tiny muted">из ${d.cur === 'UZS' ? short(d.amount) : fmt(d.amount, d.cur)}</span></div></div><div class="progress">${fill((d.paid / d.amount) * 100, 'debt-' + d.id)}</div></button>`; }).join('') || `<div class="empty">${S.debtTab === 'lent' ? 'Вам пока никто не должен' : 'Вы пока никому не должны'}</div>`}</div>
  <button class="btn sec2" data-act="newdebt">Записать новый долг</button>
  <p class="tiny muted" style="margin-top:8px">Выдача и возврат долга меняют баланс счёта, но не считаются доходом или расходом.</p>`;
}
function debtScreen(id) {
  const d = S.debts.find((x) => x.id === id);
  if (!d || d.deleted) return `${backHdr('Долг')}<div class="empty">Долг удалён</div>`;
  const left = d.amount - d.paid;
  const fx = d.cur !== 'UZS' ? `<div><span>В сумах по ${rateName().dat}</span><b class="money">≈ ${fmt(conv(left, d.cur, 'UZS'), 'UZS', { round: true })}</b></div>` : '';
  return `${backHdr(d.person, d.purpose === 'refund' ? 'я должен вернуть переплату' : d.purpose === 'advance' ? 'аванс от человека' : d.dir === 'lent' ? 'должен мне' : 'я должен')}
  <div class="bigamt money" style="margin-top:6px">${fmt(left, d.cur)}</div><p class="small muted" style="text-align:center;margin:4px 0 14px">осталось из ${fmt(d.amount, d.cur)}</p>
  <div class="progress" style="margin:0 10px 18px">${fill((d.paid / d.amount) * 100, 'debtd-' + d.id)}</div>
  ${d.overpay ? `<div class="note" style="--nc:var(--warn);margin-bottom:12px">${ic('warn')}Неразобранная переплата ${fmt(d.overpay.debt, d.cur)} (${fmt(d.overpay.acc, d.overpay.cur)})</div>` : ''}
  <div class="card kv"><div><span>Валюта долга</span><b>${d.cur}</b></div>${fx}<div><span>Срок</span><b>${d.due ? dm(d.due) : 'без срока'}</b></div><div><span>Погашено</span><b class="money">${fmt(d.paid, d.cur)}</b></div>${MY ? '' : `<div><span>Напоминание</span><b>${d.due ? 'за день до срока' : 'нет — срок не задан'}</b></div>`}</div>
  ${left > 0 ? `<div class="two" style="margin-top:14px"><button class="btn sec2" data-act="debtpay" data-id="${d.id}">Частично</button><button class="btn" data-act="debtfull" data-id="${d.id}">${d.dir === 'lent' ? 'Вернул всё' : 'Я вернул всё'}</button></div>` : `<div class="note" style="--nc:var(--income);margin-top:14px">${ic('check')}Долг погашен полностью</div>`}
  <div class="sec"><h3>История платежей</h3></div>
  <div class="card kv">${d.pays.length ? d.pays.slice().reverse().map((p) => `<div><span>${p.date.getDate()} ${MSHORT[p.date.getMonth()]} · ${p.note}</span><b class="money ${d.dir === 'lent' ? 'pos' : ''}">${d.dir === 'lent' ? '+' : '−'}${fmt(p.amount, p.cur || d.cur)}${p.accAmount != null && p.accCur !== (p.cur || d.cur) ? `<br><span class="tiny muted">${fmt(p.accAmount, p.accCur)}</span>` : ''}</b></div>`).join('') : '<div><span>Платежей пока нет</span><b></b></div>'}</div>
  <button class="btn ghost-danger" style="margin-top:16px" data-act="debtdel" data-id="${d.id}">Удалить долг</button>`;
}
function avgSurplus3m() {
  const m = [-1, -2, -3].map((k) => monthStats(k));
  return m.reduce((s, x) => s + x.inc - x.exp, 0) / 3;
}
function goalScreen() {
  const g = mainGoal(), rv = reserveGoal(), surplus = avgSurplus3m(), spent = spentReserve();
  const rows = (x) => S.accounts.filter((a) => x.alloc[a.id]).map((a) => `<div><span>${accName(a)}</span><b class="money">${fmt(x.alloc[a.id], a.cur)}</b></div>`).join('');
  let goalHTML;
  if (g) {
    const saved = goalSaved(g), r = saved / g.target, rest = g.target - saved;
    const end = new Date(); if (g.monthly) end.setMonth(end.getMonth() + Math.ceil(rest / g.monthly));
    goalHTML = `<div style="margin:4px 0 10px">${bigRing(r, 150, 14, 'var(--accent)', 'goalring', Math.round(r * 100) + '%', esc(g.name))}</div>
  <p style="text-align:center;font-weight:800;margin:6px 0 4px" class="money">${fmt(saved)} из ${fmt(g.target)}</p>
  <p class="tiny muted" style="text-align:center;margin:0 0 14px">Цель не забирает деньги со счёта — она только откладывает их часть</p>
  <div class="two"><button class="btn" data-act="goaladd" data-id="${g.id}">Отложить</button><button class="btn sec2" data-act="goalrel" data-id="${g.id}">Снять с цели</button></div>
  <div class="sec"><h3>Отложено на счетах</h3></div>
  <div class="card kv">${rows(g) || '<div><span>Пока ничего не отложено</span><b></b></div>'}</div>
  <div class="card kv" style="margin-top:10px">${g.monthly ? `<div><span>Плановый взнос</span><b class="money">${fmt(g.monthly)}</b></div>` : ''}<div><span>Осталось</span><b class="money">${fmt(Math.max(0, rest))}</b></div>${rest > 0 && g.monthly ? `<div><span>При этом темпе</span><b>${MNOM[end.getMonth()].toLowerCase()} ${end.getFullYear()}</b></div>` : ''}</div>
  ${g.monthly && g.monthly > surplus ? `<div class="note" style="--nc:var(--warn);margin-top:10px">${ic('warn')}<span>${surplus > 0 ? `Взнос больше, чем у вас в среднем остаётся за месяц (${short(surplus)} за последние 3 месяца)` : 'За последние 3 месяца расходы были больше доходов — откладывать по плану пока не из чего'}</span></div>` : ''}`;
  } else {
    goalHTML = `<div class="empty">${ic('target')}<b style="color:var(--text)">Целей пока нет</b><span class="small">Цель откладывает часть денег на счетах — сами деньги остаются на месте</span></div>
  <button class="btn" data-act="newgoal">Новая цель</button>`;
  }
  return `${backHdr('Цели и резерв', 'деньги остаются на ваших счетах')}
  <div class="card trio" style="margin:0 0 14px;padding:12px 14px"><div><span class="lbl">Общий баланс</span><b class="money">${short(totalUZS())}</b></div><div><span class="lbl">Резерв</span><b class="money">${short(reservedUZS())}</b></div><div><span class="lbl">Доступно</span><b class="money acc">${short(totalUZS() - reservedUZS())}</b></div></div>
  ${spent.length ? `<div class="note" style="--nc:var(--warn);margin-bottom:12px">${ic('warn')}<span>Потрачено ${spent.map((x) => `${fmt(x.over, x.a.cur)} с ${x.a.name}`).join(', ')} из резерва. Снимите эту сумму с цели, чтобы резерв совпал с деньгами.</span></div>` : ''}
  ${goalHTML}
  ${rv ? `<div class="sec"><h3>Ручной резерв</h3></div>
  <div class="card kv"><div><span><b style="color:var(--text)">${esc(rv.name)}</b></span><b class="money">${fmt(goalSaved(rv))}</b></div>${rows(rv)}</div>` : ''}
  <p class="tiny muted" style="text-align:center;margin-top:12px">Доступно = общий баланс − резерв. Прогноз — оценка, а не обещание.</p>`;
}

const SUGG = ['Сколько потратил за неделю?', 'На что больше всего трачу?', 'Прогноз до конца месяца'];
const suggestions = () => { const g = mainGoal(); return g ? [...SUGG, `Когда накоплю на «${g.name}»?`] : SUGG; };
function aiAnswer(q) {
  if (q === SUGG[0]) { const r = rangeStats(7), top = Object.entries(r.byCat).sort((a, b) => b[1] - a[1]).slice(0, 3);
    if (!r.n) return { text: 'За последние 7 дней операций не было — считать пока нечего.', src: 'Проверены операции за 7 дней' };
    return { text: `За последние 7 дней расходы составили <b>${fmt(r.exp, 'UZS', { round: true })}</b>.${top.length ? ` Больше всего ушло: ${top.map(([id, v]) => `${catOf(id).name.toLowerCase()} ${short(v)}`).join(', ')}.` : ''}`, src: `Посчитано по ${r.n} операциям за 7 дней` }; }
  if (q === SUGG[1]) { const ms = monthStats(0), top = Object.entries(ms.byCat).sort((a, b) => b[1] - a[1])[0];
    if (!top) return { text: `В ${MPREP[new Date().getMonth()]} расходов пока нет.`, src: 'Проверены операции текущего месяца' };
    const [id, v] = top;
    return { text: `В ${MPREP[new Date().getMonth()]} больше всего ушло на <b>${catOf(id).name.toLowerCase()}</b>: ${fmt(v, 'UZS', { round: true })}, это ${Math.round((v / (ms.exp || 1)) * 100)}% всех расходов месяца.`, src: 'Посчитано по операциям текущего месяца' }; }
  if (q === SUGG[2]) { const ms = monthStats(0), n = new Date(), perDay = ms.exp / n.getDate(), f = perDay * daysInMonth(n);
    if (!ms.exp) return { text: 'В этом месяце расходов пока нет — прогнозировать не из чего. Запишите несколько трат, и я посчитаю.', src: 'Проверены операции текущего месяца' };
    return { text: `Сейчас вы тратите около ${short(perDay)} в день. Если темп сохранится, расходы за месяц составят примерно <b>${fmt(f, 'UZS', { round: true })}</b>. Доходы месяца пока ${short(ms.inc)}.`, src: 'Оценка по среднему расходу в день' }; }
  const g = mainGoal();
  if (!g) return { text: 'Целей пока нет.', src: 'Проверены цели' };
  const rest = g.target - goalSaved(g);
  if (rest <= 0) return { text: `Цель «${esc(g.name)}» уже набрана полностью.`, src: 'Посчитано по данным цели' };
  if (!g.monthly) return { text: `До цели «${esc(g.name)}» осталось ${fmt(rest)}. Плановый взнос не задан, поэтому срок посчитать не могу.`, src: 'Посчитано по данным цели' };
  const end = new Date(); end.setMonth(end.getMonth() + Math.ceil(rest / g.monthly));
  return { text: `До цели «${esc(g.name)}» осталось ${fmt(rest)}. При взносе ${short(g.monthly)} в месяц это ${Math.ceil(rest / g.monthly)} мес., примерно <b>${MNOM[end.getMonth()].toLowerCase()} ${end.getFullYear()}</b>.`, src: 'Посчитано по данным цели' };
}
function aiScreen() {
  const busy = S.chat.some((m) => m.typing), last = S.chat.length - 1;
  return `${backHdr('AI-помощник', 'считает по вашим операциям')}
  <div class="chat">${S.chat.length ? S.chat.map((m, i) => { const fr = i === last ? ' fresh' : ''; return m.me ? `<div class="bub me${fr}">${esc(m.text)}</div>` : m.typing ? `<div class="bub ai typing${fr}" aria-label="Помощник печатает"><span></span><span></span><span></span></div>` : `<div class="bub ai${fr}">${m.text}<div class="src">${m.src}. Цифры взяты из операций, а не придуманы.</div></div>`; }).join('')
    : `<div class="bub ai fresh">Привет! Я отвечаю по вашим операциям, счетам и целям. Выберите вопрос ниже.<div class="src">${MY ? 'Ответы считаются по вашим записям на этом устройстве, без интернета' : S.mine ? 'В прототипе ответы считаются по вашим записям на этом устройстве' : 'В прототипе ответы считаются по демо-данным'}. Это не финансовая консультация.</div></div>`}</div>
  <div class="sugg">${suggestions().map((s) => `<button data-act="ask" data-q="${esc(s)}" ${busy ? 'disabled' : ''}>${esc(s)}</button>`).join('')}</div>`;
}
const fxLine = () => FX.map((c) => `${SIGN[c]} ${num(RATES[c], 'UZS', { round: RATES[c] >= 1000 })}`).join(' · ');
function myProfileScreen(th) {
  const b = S.backupAt ? new Date(S.backupAt) : null, nb = Object.keys(S.budgets).length;
  return `${backHdr('Профиль')}
  <div class="row" style="margin-bottom:18px"><span class="iconbtn" style="width:56px;height:56px;background:color-mix(in srgb,var(--accent) 18%,transparent);color:var(--accent);font-size:22px;font-weight:800">${esc(avatarLetter())}</span><div><b style="font-size:18px">${esc(tgName() || 'Мой кошелёк')}</b><br><span class="small muted">${plural(S.accounts.length, 'счёт', 'счёта', 'счетов')} · ${plural(S.ops.length, 'операция', 'операции', 'операций')}</span></div></div>
  <div class="small muted" style="font-weight:700;margin-bottom:8px">Тема</div>
  <div class="seg"><button class="${th === 'auto' ? 'on' : ''}" data-act="theme" data-t="auto">${inTG() ? 'Как в Telegram' : 'Как в системе'}</button><button class="${th === 'light' ? 'on' : ''}" data-act="theme" data-t="light">Светлая</button><button class="${th === 'dark' ? 'on' : ''}" data-act="theme" data-t="dark">Тёмная</button></div>
  <div style="margin-top:18px">
    <button class="listrow" data-act="push" data-to="rates"><span class="ri">${ic('coin')}</span><span><b>Курсы валют</b><br><span class="tiny muted money">${fxLine()}</span></span><span></span>${ic('right')}</button>
    <button class="listrow" data-act="push" data-to="budgets"><span class="ri">${ic('pie')}</span><b>Лимиты на месяц</b><span class="small muted">${nb || 'нет'}</span>${ic('right')}</button>
  </div>
  <div class="small muted" style="font-weight:700;margin:16px 0 8px">Данные</div>
  <div class="card" style="display:grid;gap:10px">
    <span class="small muted">Записи хранятся только в этом браузере на этом устройстве — ни на сервер, ни в бота они не уходят. Если очистить данные браузера, записи пропадут, поэтому время от времени скачивайте резервную копию.</span>
    <span class="small" style="font-weight:700;color:${!b || dayDiff(new Date(), b) > 14 ? 'var(--warn)' : 'var(--muted)'}">${b ? `Последняя копия: ${dayLabel(b).toLowerCase()}` : 'Резервной копии ещё не было'}</span>
    <button class="btn" data-act="export">Скачать резервную копию</button>
    <button class="btn sec2" data-act="import">Загрузить из файла</button>
    <button class="btn ghost-danger" data-act="wipe" data-to="zero">Очистить всё</button>
  </div>
  <p class="tiny muted" style="text-align:center;margin-top:14px">Чтобы перенести записи на другой телефон: скачайте копию здесь и загрузите её там.<br><a class="link" style="font-size:12px" href="../">Демо-версия с примерами</a></p>`;
}
function ratesScreen() {
  const f = S.fx, at = f.at ? new Date(f.at) : null;
  return `${backHdr('Курсы валют', f.src === 'cbu' ? `ЦБ Узбекистана${f.date ? ' на ' + f.date : ''}` : f.src === 'manual' ? `заданы вами${at ? ' · ' + dm(at) : ''}` : 'примерные — обновите')}
  <div style="margin-top:4px">${FX.map((c) => `<button class="listrow" data-act="rateedit" data-cur="${c}"><span class="ri" style="font-weight:800">${SIGN[c]}</span><b>1 ${c}</b><span class="money" style="font-weight:800">${fmt(RATES[c])}</span>${ic('right')}</button>`).join('')}</div>
  <button class="btn" style="margin-top:8px" data-act="cbu">Загрузить курс ЦБ</button>
  <p class="tiny muted" style="text-align:center;margin-top:12px">Курс нужен, чтобы показать общий баланс в одной валюте и пересчитать переводы и долги между валютами. Суммы уже записанных операций не меняются. Нажмите на валюту, чтобы вписать свой курс.</p>`;
}
function profileScreen() {
  let th = document.documentElement.getAttribute('data-theme') || 'auto';
  if (MY) { try { th = localStorage.getItem('who-wallet-my-theme') || 'auto'; } catch (e) { th = 'auto'; } return myProfileScreen(th); }
  return `${backHdr('Профиль')}
  <div class="row" style="margin-bottom:18px"><span class="iconbtn" style="width:56px;height:56px;background:color-mix(in srgb,var(--accent) 18%,transparent);color:var(--accent);font-size:22px;font-weight:800">${esc(avatarLetter())}</span><div><b style="font-size:18px">${S.mine ? esc(tgName() || 'Мой профиль') : 'Демо-профиль'}</b><br><span class="small muted">${S.accounts.length} счёта · ${S.ops.length} операций${S.mine ? ' · свои данные' : ' · демо-данные'}</span></div></div>
  <div class="small muted" style="font-weight:700;margin-bottom:8px">Тема</div>
  <div class="seg"><button class="${th === 'auto' ? 'on' : ''}" data-act="theme" data-t="auto">Как в Telegram</button><button class="${th === 'light' ? 'on' : ''}" data-act="theme" data-t="light">Светлая</button><button class="${th === 'dark' ? 'on' : ''}" data-act="theme" data-t="dark">Тёмная</button></div>
  <div class="small muted" style="font-weight:700;margin:16px 0 8px">Язык</div>
  <div class="seg"><button class="on">Русский</button><button data-act="toast" data-msg="Узбекский язык появится в следующей версии прототипа">O‘zbekcha</button></div>
  <div style="margin-top:18px">${[['coin', 'Основная валюта', 'UZS'], ['bell', 'Ежедневный отчёт', '21:00'], ['lock', 'Вход в приложение', 'Face ID'], ['globe', 'О приложении', 'прототип']].map(([i, t, v]) => `<button class="listrow" data-act="toast" data-msg="«${t}» — в следующей версии прототипа"><span class="ri">${ic(i)}</span><b>${t}</b><span class="small muted">${v}</span>${ic('right')}</button>`).join('')}</div>
  <div class="small muted" style="font-weight:700;margin:16px 0 8px">Данные</div>
  <div class="card" style="display:grid;gap:10px">
    <span class="small muted">${S.mine ? 'Вы ведёте свои записи. Они хранятся только на этом устройстве и не попадают в бота.' : 'Сейчас показаны демо-данные. Можно начать с нуля и вносить свои доходы, расходы и долги.'}</span>
    <button class="btn ${S.mine ? 'ghost-danger' : ''}" data-act="wipe" data-to="zero">${S.mine ? 'Очистить всё и начать заново' : 'Начать с нуля'}</button>
    <button class="btn sec2" data-act="wipe" data-to="demo">${S.mine ? 'Вернуться к демо-данным' : 'Вернуть демо-данные к началу'}</button>
  </div>`;
}

// ================= нижние листы =================
const amountVal = (s) => (s ? Number(s.replace(',', '.')) : 0);
function amountHTML(input, cur) {
  const [i, f] = (input || '0').split(',');
  const txt = i.replace(/\B(?=(\d{3})+(?!\d))/g, NB) + (f !== undefined ? ',' + f : '');
  const size = txt.length > 12 ? 32 : txt.length > 9 ? 38 : 44;
  return `<div class="amount" style="font-size:${size}px" aria-live="polite">${txt}<span class="caret"></span><small>${SIGN[cur]}</small></div>`;
}
const keypad = () => `<div class="quickadd">${['000', '+10 000', '+100 000'].map((k) => `<button data-act="key" data-k="${k}">${k}</button>`).join('')}</div>
  <div class="keys">${['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', '⌫'].map((k) => `<button data-act="key" data-k="${k}" aria-label="${k === '⌫' ? 'Стереть' : k}">${k === '⌫' ? ic('bksp') : k}</button>`).join('')}</div>`;
function sheetHTML() {
  const o = S.overlay; if (!o) return '';
  let body = '';
  if (o.type === 'add') {
    const m = o.mode, A = accOf(o.acc), B = accOf(o.to), v = amountVal(o.input);
    const credit = m === 'transfer' ? r2(conv(v, A.cur, B.cur)) : 0;
    const ok = v > 0 && (m === 'transfer' ? o.acc !== o.to : !!o.cat);
    const fx = A.cur === 'UZS' ? B.cur : A.cur;
    body = `<div class="between" style="margin-bottom:10px"><button class="iconbtn" style="background:var(--surface2)" data-act="close" aria-label="Закрыть">${ic('close')}</button><b style="font-size:17px">Новая операция</b><span style="width:40px"></span></div>
    <div class="seg" style="--segc:${m === 'expense' ? 'var(--expense)' : m === 'income' ? 'var(--income)' : 'var(--info)'}">${[['expense', 'Расход'], ['income', 'Доход'], ['transfer', 'Перевод']].map(([k, l]) => `<button class="${k === m ? 'on' : ''}" data-act="mode" data-mode="${k}">${l}</button>`).join('')}</div>
    ${amountHTML(o.input, A.cur)}
    ${m === 'transfer' ? `<div class="xfer"><button class="picker" data-act="pickacc" data-k="acc"><span class="tiny">Откуда</span><b>${accName(A)} · ${fmt(bal(A), A.cur)}</b></button>
      <button class="swap" data-act="swap" aria-label="Поменять счета местами">${ic('vswap')}</button>
      <button class="picker" data-act="pickacc" data-k="to"><span class="tiny">Куда</span><b>${accName(B)} · ${fmt(bal(B), B.cur)}</b></button></div>
      ${A.cur !== B.cur ? `<div class="rate"><div><span class="muted">${MY ? rateName().nom : 'Курс ЦБ на сегодня'}</span><b>1 ${SIGN[fx]} = ${fmt(RATES[fx])}</b></div><div><span class="muted">Спишется с ${A.name}</span><b>−${fmt(v, A.cur)}</b></div><div><span class="muted">Зачислится на ${B.name}</span><b>+${fmt(credit, B.cur)}</b></div></div>` : ''}
      <p class="hint ${o.acc === o.to ? 'neg' : 'muted'}" style="${v > bal(A) && o.acc !== o.to ? 'color:var(--warn)' : ''}">${o.acc === o.to ? 'Выберите два разных счёта' : v > bal(A) ? `Баланс ${A.name} станет ${fmt(bal(A) - v, A.cur)} — попросим подтвердить` : 'Перевод между своими счетами не считается доходом или расходом'}</p>`
    : `<div class="pickers"><button class="picker" data-act="pickacc" data-k="acc"><span class="tiny">${m === 'income' ? 'На счёт' : 'Со счёта'}</span><b>${accName(A)}</b></button>
      <button class="picker" data-act="day"><span class="tiny">Дата · сменить</span><b>${o.yesterday ? 'Вчера' : 'Сегодня'}, ${hm(new Date())}</b></button></div>
      <div class="cats" role="group" aria-label="Категория">${CATS[m].map((c) => `<button class="cat ${o.cat === c.id ? 'on' : ''}" data-act="cat" data-id="${c.id}" aria-pressed="${o.cat === c.id}"><span class="cc">${ic(c.icon)}</span>${c.name}</button>`).join('')}</div>
      <input class="comment" id="comment" placeholder="Комментарий, например «Korzinka»" value="${esc(o.comment || '')}" autocomplete="off" maxlength="60" aria-label="Комментарий">`}
    ${keypad()}
    <button class="btn" data-act="save" ${ok ? '' : 'disabled'}>${m === 'transfer' ? `Перевести${v ? ' ' + fmt(v, A.cur) : ''}` : m === 'income' ? 'Сохранить доход' : 'Сохранить расход'}</button>
    ${m !== 'transfer' && !ok ? `<p class="tiny muted" style="text-align:center;margin:8px 0 0">${v > 0 ? 'Осталось выбрать категорию' : 'Введите сумму и выберите категорию'}</p>` : ''}`;
  } else if (o.type === 'alloc') {
    const g = S.goals.find((x) => x.id === o.gid), A = accOf(o.acc), v = amountVal(o.input), add = o.mode === 'add';
    const limit = add ? freeOf(A) : (g.alloc[A.id] || 0), over = v > limit + 1e-9, ok = v > 0 && !over;
    const accs = [A, ...(add ? S.accounts : S.accounts.filter((a) => g.alloc[a.id])).filter((a) => a.id !== A.id)];
    body = `<div class="grab"></div><b style="font-size:18px">${add ? `Отложить на «${g.name}»` : `Снять с «${g.name}»`}</b>
    <p class="small muted" style="margin:4px 0 0">${add ? 'С какого счёта отложить' : 'С какого счёта снять резерв'}</p>
    <div class="accchips">${accs.map((a) => `<button class="${a.id === A.id ? 'on' : ''}" data-act="allocacc" data-id="${a.id}"><b>${a.name}</b><span class="money">${add ? `свободно ${fmt(freeOf(a), a.cur)}` : `отложено ${fmt(g.alloc[a.id], a.cur)}`}</span></button>`).join('')}</div>
    ${amountHTML(o.input, A.cur)}
    <p class="hint ${over ? 'neg' : 'muted'}" style="text-align:center">${over ? (add ? `На ${A.name} свободно только ${fmt(limit, A.cur)} — остальное уже отложено` : `На ${A.name} отложено только ${fmt(limit, A.cur)}`) : add ? 'Деньги останутся на счёте — уменьшится только «Доступно»' : 'Деньги останутся на счёте — «Доступно» увеличится'}</p>
    ${keypad()}
    <div class="two"><button class="btn sec2" data-act="close">Отмена</button><button class="btn" data-act="allocok" ${ok ? '' : 'disabled'}>${add ? 'Отложить' : 'Снять'}</button></div>`;
  } else if (o.type === 'dpay') {
    const x = S.debts.find((y) => y.id === o.id), A = accOf(o.acc), v = amountVal(o.input), rem = r2(x.amount - x.paid);
    const inDebt = o.full ? rem : A.cur === x.cur ? v : r2(conv(v, A.cur, x.cur)), over = r2(inDebt - rem), fxc = x.cur !== 'UZS' ? x.cur : A.cur;
    body = `<div class="grab"></div><b style="font-size:18px">${x.dir === 'lent' ? `${x.person} возвращает` : `Я возвращаю: ${x.person}`}</b>
    <p class="small muted" style="margin:4px 0 0">Остаток долга ${fmt(rem, x.cur)} · ${x.dir === 'lent' ? 'на какой счёт пришли деньги' : 'с какого счёта'}</p>
    <div class="accchips">${[A, ...S.accounts.filter((a) => a.id !== A.id)].map((a) => `<button class="${a.id === A.id ? 'on' : ''}" data-act="dpayacc" data-id="${a.id}"><b>${a.name}</b><span class="money">${fmt(bal(a), a.cur)}</span></button>`).join('')}</div>
    ${amountHTML(o.input, A.cur)}
    ${A.cur !== x.cur && v > 0 ? `<p class="conv">≈ <b class="money">${fmt(inDebt, x.cur)}</b> по ${rateName().dat} · 1 ${SIGN[fxc]} = ${fmt(RATES[fxc])}</p>` : ''}
    <p class="hint" style="text-align:center;color:${over > 0.01 ? 'var(--warn)' : 'var(--muted)'}">${v > 0 ? (over > 0.01 ? `Переплата ${fmt(over, x.cur)} — на следующем шаге выберете, что с ней делать` : `Останется ${fmt(Math.max(0, r2(rem - inDebt)), x.cur)}`) : 'Введите сумму, которая фактически пришла на счёт'}</p>
    ${keypad()}
    <div class="two"><button class="btn sec2" data-act="close">Отмена</button><button class="btn" data-act="dpayok" ${v > 0 ? '' : 'disabled'}>Записать</button></div>`;
  } else if (o.type === 'overpay') {
    const x = S.debts.find((y) => y.id === o.id), A = accOf(o.acc);
    const opts = [
      ['return_to_debtor', `Вернуть: ${x.person}`, `Появится долг «я должен» на ${fmt(o.over, x.cur)}${MY ? '' : ' с напоминанием'}`],
      ['advance', 'Оставить авансом', `Зачтётся, когда ${x.person} снова возьмёт в долг`],
      ['fx_result', 'Курсовая разница', `Запишется отдельно, не доходом: +${fmt(o.overAcc, A.cur)}`],
      ['later', 'Решу позже', 'Переплата останется отмеченной в карточке долга'],
    ];
    body = `<div class="grab"></div><b style="font-size:18px">Вернули больше остатка</b>
    <div class="card kv" style="background:var(--surface2);margin:12px 0"><div><span>Получено на ${A.name}</span><b class="money">${fmt(o.v, A.cur)}</b></div><div><span>Остаток долга</span><b class="money">${fmt(o.rem, x.cur)}${A.cur !== x.cur ? `<br><span class="tiny muted">≈ ${fmt(o.remAcc, A.cur)}</span>` : ''}</b></div><div><span>Переплата</span><b class="money" style="color:var(--warn)">${fmt(o.overAcc, A.cur)}${A.cur !== x.cur ? `<br><span class="tiny muted">≈ ${fmt(o.over, x.cur)}</span>` : ''}</b></div></div>
    <p class="small muted" style="margin:0">Вся сумма зачислится на ${A.name}, долг закроется. Сама переплата доходом не станет — выберите, что с ней делать:</p>
    <div class="opts">${opts.map(([k, t, dsc]) => `<button class="opt ${o.pick === k ? 'on' : ''}" data-act="opick" data-k="${k}" aria-pressed="${o.pick === k}"><span class="rd"></span><span><b>${t}</b><span class="d">${dsc}</span></span></button>`).join('')}</div>
    <div class="two"><button class="btn sec2" data-act="overback">Назад</button><button class="btn" data-act="overpayok" ${o.pick ? '' : 'disabled'}>Записать</button></div>`;
  } else if (o.type === 'debtdel') {
    const x = S.debts.find((y) => y.id === o.id), mv = S.ops.filter((op) => op.debt === x.id);
    const accIds = [...new Set(mv.map((op) => op.acc))];
    const after = (a) => r2(bal(a) - mv.filter((op) => op.acc === a.id).reduce((s, op) => s + op.sign * op.amount, 0));
    body = `<div class="grab"></div><b style="font-size:18px">Удалить долг: ${x.person}</b>
    <div class="opts">
      <button class="opt ${o.pick === 'record_only' ? 'on' : ''}" data-act="ddpick" data-k="record_only"><span class="rd"></span><span><b>Удалить только запись о долге</b><span class="d">Движения денег останутся в истории. Балансы не изменятся</span></span></button>
      <button class="opt ${o.pick === 'reverse_all' ? 'on' : ''}" data-act="ddpick" data-k="reverse_all"><span class="rd"></span><span><b>Отменить долг целиком</b><span class="d">Долг записан по ошибке: все его движения отменятся обратными записями</span></span></button>
    </div>
    ${o.pick === 'reverse_all' && accIds.length ? `<div class="card kv" style="background:var(--surface2);margin-bottom:12px">${accIds.map((id) => { const a = accOf(id); return `<div><span>Баланс ${a.name}</span><b class="money">${fmt(bal(a), a.cur)} → ${fmt(after(a), a.cur)}</b></div>`; }).join('')}</div>` : ''}
    <button class="btn danger" data-act="debtdelok">Удалить</button><button class="btn sec2" style="margin-top:8px" data-act="close">Отмена</button>
    <p class="tiny muted" style="text-align:center;margin:10px 0 0">5 секунд после удаления можно нажать «Отменить»${MY ? '' : ', восстановить можно 30 дней'}</p>`;
  } else if (o.type === 'negconfirm') {
    const A = accOf(o.acc);
    body = `<div class="grab"></div><div style="display:grid;justify-items:center;gap:8px;text-align:center"><span class="iconbtn" style="width:56px;height:56px;background:color-mix(in srgb,var(--warn) 15%,transparent);color:var(--warn)">${ic('warn')}</span>
      <b style="font-size:20px">Баланс станет отрицательным</b><span class="muted small">Так бывает, если платили в долг или баланс давно не сверяли</span></div>
    <div class="card kv" style="background:var(--surface2);margin:14px 0"><div><span>Баланс ${A.name}</span><b class="money">${fmt(bal(A), A.cur)} → <span class="neg">${fmt(o.after, A.cur)}</span></b></div></div>
    <button class="btn" data-act="negok">Сохранить с минусом</button><button class="btn sec2" style="margin-top:8px" data-act="negback">Изменить сумму</button>`;
  } else if (o.type === 'amount') {
    const v = amountVal(o.input), over = o.max != null && v > o.max + 1e-9, ok = (o.zero ? o.input !== '' : v > 0) && !over;
    body = `<div class="grab"></div><b style="font-size:18px">${o.title}</b>${o.hint ? `<p class="small muted" style="margin:4px 0 0">${o.hint}</p>` : ''}
    ${amountHTML(o.input, o.cur || 'UZS')}
    <p class="hint neg" style="text-align:center;min-height:1.4em">${over ? o.maxMsg : ''}</p>
    ${keypad()}
    <div class="two"><button class="btn sec2" data-act="close">Отмена</button><button class="btn" data-act="amountok" ${ok ? '' : 'disabled'}>${o.ok}</button></div>
    ${o.clear ? `<button class="btn ghost-danger" style="margin-top:8px" data-act="amountclear">${o.clear}</button>` : ''}`;
  } else if (o.type === 'confirm') {
    const x = S.ops.find((y) => y.id === o.id), a = accOf(x.acc), after = bal(a) + (x.kind === 'income' ? -x.amount : x.amount);
    body = `<div class="grab"></div><div style="display:grid;justify-items:center;gap:8px;text-align:center"><span class="iconbtn" style="width:56px;height:56px;background:color-mix(in srgb,var(--expense) 15%,transparent);color:var(--expense)">${ic('trash')}</span>
      <b style="font-size:20px">Удалить операцию?</b><span class="muted small">${esc(x.title)} · ${fmt(x.amount, x.cur)}</span></div>
    <div class="card kv" style="background:var(--surface2);margin:14px 0"><div><span>Баланс ${a.name}</span><b class="money">${fmt(bal(a), a.cur)} → ${fmt(after, a.cur)}</b></div></div>
    <button class="btn danger" data-act="delok" data-id="${x.id}">Удалить</button><button class="btn sec2" style="margin-top:8px" data-act="close">Отмена</button>
    <p class="tiny muted" style="text-align:center;margin:10px 0 0">После удаления 5 секунд можно нажать «Отменить»</p>`;
  } else if (o.type === 'wipe') {
    const zero = o.to === 'zero';
    body = `<div class="grab"></div><div style="display:grid;justify-items:center;gap:8px;text-align:center"><span class="iconbtn" style="width:56px;height:56px;background:color-mix(in srgb,var(--warn) 15%,transparent);color:var(--warn)">${ic(zero ? 'trash' : 'spark')}</span>
      <b style="font-size:20px">${zero ? (S.mine ? 'Очистить все записи?' : 'Начать с нуля?') : S.mine ? 'Вернуться к демо-данным?' : 'Вернуть демо-данные?'}</b>
      <span class="muted small">${zero && MY ? 'Удалятся все операции, долги, цели и лимиты. Счета останутся, их балансы станут нулевыми. Если записи ещё нужны — сначала скачайте резервную копию.' : zero ? 'Удалятся все операции, долги, цели и лимиты. Счета останутся с нулевым балансом. Новые записи сохранятся на этом устройстве.' : S.mine ? 'Ваши записи на этом устройстве удалятся, вернутся примеры.' : 'Примеры вернутся к начальному виду.'}</span></div>
    <button class="btn ${zero || S.mine ? 'danger' : ''}" style="margin-top:16px" data-act="wipeok">${zero && MY ? 'Да, очистить всё' : zero ? 'Да, начать с нуля' : 'Да, показать демо'}</button><button class="btn sec2" style="margin-top:8px" data-act="close">Отмена</button>`;
  } else if (o.type === 'newdebt') {
    const A = accOf(o.acc), v = amountVal(o.input), lent = o.dir === 'lent', ok = v > 0 && !!(o.person || '').trim();
    body = `<div class="grab"></div><b style="font-size:18px">Новый долг</b>
    <div class="seg" style="margin-top:12px"><button class="${lent ? 'on' : ''}" data-act="ndset" data-k="dir" data-v="lent">Я дал в долг</button><button class="${lent ? '' : 'on'}" data-act="ndset" data-k="dir" data-v="borrowed">Я взял в долг</button></div>
    <input class="comment" id="person" placeholder="${lent ? 'Кому дали, например «Алишер»' : 'У кого взяли, например «Брат»'}" value="${esc(o.person || '')}" autocomplete="off" maxlength="40" aria-label="Имя">
    <p class="small muted" style="margin:10px 0 0">${lent ? 'С какого счёта ушли деньги' : 'На какой счёт пришли деньги'}</p>
    <div class="accchips">${S.accounts.map((a) => `<button class="${a.id === A.id ? 'on' : ''}" data-act="ndset" data-k="acc" data-v="${a.id}"><b>${a.name}</b><span class="money">${fmt(bal(a), a.cur)}</span></button>`).join('')}</div>
    ${amountHTML(o.input, A.cur)}
    <div class="seg" role="group" aria-label="Срок возврата">${[['none', 'Без срока'], ['7', 'Через неделю'], ['30', 'Через месяц']].map(([k, l]) => `<button class="${o.due === k ? 'on' : ''}" data-act="ndset" data-k="due" data-v="${k}">${l}</button>`).join('')}</div>
    ${keypad()}
    <div class="two"><button class="btn sec2" data-act="close">Отмена</button><button class="btn" data-act="newdebtok" ${ok ? '' : 'disabled'}>Записать</button></div>`;
  } else if (o.type === 'newgoal') {
    const v = amountVal(o.input), ok = v > 0 && !!(o.name || '').trim();
    body = `<div class="grab"></div><b style="font-size:18px">Новая цель</b>
    <input class="comment" id="gname" placeholder="Название, например «Отпуск»" value="${esc(o.name || '')}" autocomplete="off" maxlength="40" aria-label="Название цели" style="margin-top:12px">
    <p class="small muted" style="margin:10px 0 0">Сколько нужно накопить</p>
    ${amountHTML(o.input, 'UZS')}
    ${keypad()}
    <div class="two"><button class="btn sec2" data-act="close">Отмена</button><button class="btn" data-act="newgoalok" ${ok ? '' : 'disabled'}>Создать цель</button></div>`;
  } else if (o.type === 'newacc') {
    const ok = !!cleanName(o.name);
    body = `<div class="grab"></div><b style="font-size:18px">Новый счёт</b>
    <input class="comment" id="aname" placeholder="Название, например «Kapitalbank»" value="${esc(o.name || '')}" autocomplete="off" maxlength="24" aria-label="Название счёта" style="margin-top:12px">
    <div class="seg" role="group" aria-label="Тип счёта">${[['card', 'Карта'], ['cash', 'Наличные']].map(([k, l]) => `<button class="${o.kind === k ? 'on' : ''}" data-act="naset" data-k="kind" data-v="${k}">${l}</button>`).join('')}</div>
    <div class="seg" role="group" aria-label="Валюта счёта" style="margin-top:8px">${Object.keys(RATES).map((c) => `<button class="${o.cur === c ? 'on' : ''}" data-act="naset" data-k="cur" data-v="${c}">${c}</button>`).join('')}</div>
    <p class="small muted" style="margin:10px 0 0">Сколько на нём сейчас</p>
    ${amountHTML(o.input, o.cur)}
    ${keypad()}
    <div class="two"><button class="btn sec2" data-act="close">Отмена</button><button class="btn" data-act="newaccok" ${ok ? '' : 'disabled'}>Добавить счёт</button></div>`;
  } else if (o.type === 'accname') {
    const ok = !!cleanName(o.name);
    body = `<div class="grab"></div><b style="font-size:18px">Название счёта</b>
    <input class="comment" id="aname" value="${esc(o.name || '')}" autocomplete="off" maxlength="24" aria-label="Название счёта" style="margin:12px 0 4px">
    <div class="seg" role="group" aria-label="Тип счёта" style="margin-bottom:14px">${[['card', 'Карта'], ['cash', 'Наличные']].map(([k, l]) => `<button class="${o.kind === k ? 'on' : ''}" data-act="naset" data-k="kind" data-v="${k}">${l}</button>`).join('')}</div>
    <div class="two"><button class="btn sec2" data-act="close">Отмена</button><button class="btn" data-act="accnameok" ${ok ? '' : 'disabled'}>Сохранить</button></div>`;
  } else if (o.type === 'accdel') {
    const a = accOf(o.id);
    body = `<div class="grab"></div><div style="display:grid;justify-items:center;gap:8px;text-align:center"><span class="iconbtn" style="width:56px;height:56px;background:color-mix(in srgb,var(--expense) 15%,transparent);color:var(--expense)">${ic('trash')}</span>
      <b style="font-size:20px">Удалить счёт «${a.name}»?</b><span class="muted small">Операций по нему нет. ${reservedOn(a.id) ? 'Отложенное на нём для целей тоже снимется.' : ''}</span></div>
    <button class="btn danger" style="margin-top:16px" data-act="accdelok" data-id="${a.id}">Удалить</button><button class="btn sec2" style="margin-top:8px" data-act="close">Отмена</button>`;
  } else if (o.type === 'import') {
    const d = o.data, at = d.savedAt ? new Date(d.savedAt) : null;
    body = `<div class="grab"></div><b style="font-size:18px">Загрузить резервную копию?</b>
    <div class="card kv" style="background:var(--surface2);margin:12px 0"><div><span>Файл</span><b>${esc(o.file)}</b></div>${at && !isNaN(at) ? `<div><span>Сделана</span><b>${dm(at)} ${at.getFullYear()}, ${hm(at)}</b></div>` : ''}<div><span>Счетов</span><b>${d.accounts.length}</b></div><div><span>Операций</span><b>${d.ops.length}</b></div><div><span>Долгов</span><b>${d.debts.filter((x) => !x.deleted).length}</b></div></div>
    <p class="small muted" style="margin:0">Записи, которые сейчас на этом устройстве (${plural(S.ops.length, 'операция', 'операции', 'операций')}), заменятся записями из файла.</p>
    <button class="btn danger" style="margin-top:14px" data-act="importok">Заменить</button><button class="btn sec2" style="margin-top:8px" data-act="close">Отмена</button>`;
  } else if (o.type === 'pickacc') {
    const cur = o.parent[o.k];
    body = `<div class="grab"></div><b style="font-size:18px">${o.k === 'to' ? 'Куда перевести' : 'Выберите счёт'}</b><div style="margin-top:12px">${S.accounts.map((a) => `<button class="listrow" data-act="setacc" data-id="${a.id}"><span class="ri" style="background:var(${a.cc});color:var(--on-card)">${ic('wallet')}</span><b>${accName(a)}</b><span class="small muted money">${fmt(bal(a), a.cur)}</span>${cur === a.id ? ic('check') : '<span></span>'}</button>`).join('')}</div>
    <button class="btn sec2" style="margin-top:6px" data-act="close">Назад</button>`;
  }
  return `<div class="scrim" data-act="close"></div><div class="sheet" role="dialog" aria-modal="true">${body}</div>`;
}

// ================= отрисовка =================
const TABS = [['home', 'Главная', 'home'], ['ops', 'Операции', 'list'], null, ['analytics', 'Аналитика', 'chart'], ['accounts', 'Счета', 'wallet']];
const RINGS = {}, WIDTHS = {};
let lastKey = '', lastOverlayType = null, toastTimer = null;
const view = () => (S.stack.length ? S.stack[S.stack.length - 1] : { s: S.tab });
function render(opts = {}) { if (!opts.overlayOnly) { renderScreen(opts); saveMine(); } renderOverlay(); }
function renderScreen(opts) {
  const v = view(), screen = document.getElementById('screen'), device = document.getElementById('device');
  const map = { home: homeScreen, ops: opsScreen, analytics: analyticsScreen, accounts: accountsScreen, acc: () => accScreen(v.id), budgets: budgetsScreen, rates: ratesScreen, limit: () => limitScreen(v.id), op: () => opScreen(v.id), debts: debtsScreen, debt: () => debtScreen(v.id), goal: goalScreen, ai: aiScreen, profile: profileScreen };
  const key = v.s + ':' + (v.id ?? ''), same = key === lastKey, st = screen.scrollTop;
  screen.innerHTML = map[v.s]();
  if (same) screen.querySelectorAll('.stagger').forEach((e) => e.classList.remove('stagger'));
  screen.classList.toggle('calm', same && !opts.redraw);
  screen.classList.toggle('full', S.stack.length > 0);
  device.classList.toggle('full-view', S.stack.length > 0);
  device.classList.toggle('hide-sums', S.hide);
  document.getElementById('tabbar').hidden = S.stack.length > 0;
  screen.classList.remove('enter', 'enter-back');
  if (!same && opts.anim !== false) { void screen.offsetWidth; screen.classList.add(opts.back ? 'enter-back' : 'enter'); }
  screen.scrollTop = same && !opts.top ? st : 0;
  lastKey = key;
  document.getElementById('tabbar').innerHTML = TABS.map((t) => t ? `<button class="tab ${S.tab === t[0] && !S.stack.length ? 'on' : ''}" data-act="tab" data-to="${t[0]}" ${S.tab === t[0] ? 'aria-current="page"' : ''}>${ic(t[2])}${t[1]}</button>` : `<button class="fab" data-act="add" data-mode="expense" aria-label="Добавить операцию">${ic('plus')}</button>`).join('');
  // кольца и полосы: при первом показе растут с нуля, при обновлении — от прежнего значения
  const rings = [...screen.querySelectorAll('.ring .fg')], bars = [...screen.querySelectorAll('[data-w]')];
  rings.forEach((c) => { if (same && RINGS[c.dataset.k] != null) c.style.strokeDashoffset = RINGS[c.dataset.k]; });
  bars.forEach((b) => { if (same && WIDTHS[b.dataset.k] != null) b.style.width = WIDTHS[b.dataset.k]; });
  void screen.offsetWidth;
  rings.forEach((c) => { c.style.strokeDashoffset = c.dataset.off; RINGS[c.dataset.k] = c.dataset.off; });
  bars.forEach((b) => { b.style.width = b.dataset.w; WIDTHS[b.dataset.k] = b.dataset.w; });
  const b = document.getElementById('bal');
  if (b) { const to = Number(b.dataset.v), from = S.lastTotal == null ? to * 0.94 : S.lastTotal; countUp(b, from, to); S.lastTotal = to; }
}
function renderOverlay() {
  const host = document.getElementById('overlay'), prev = host.querySelector('.sheet'), st = prev ? prev.scrollTop : 0;
  const type = S.overlay ? S.overlay.type : null, keep = !!type && type === lastOverlayType;
  host.innerHTML = sheetHTML();
  if (type && lastOverlayType) host.querySelector('.scrim').classList.add('still');
  if (keep) { const s = host.querySelector('.sheet'); s.classList.add('still'); s.scrollTop = st; }
  lastOverlayType = type;
}
let countRaf = 0;
function countUp(el, from, to) {
  cancelAnimationFrame(countRaf);
  const out = (v) => { el.textContent = num(v, S.cur, { round: true }); };
  if (document.documentElement.classList.contains('no-anim') || matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(to - from) < 0.5) return out(to);
  const t0 = performance.now(), dur = 650;
  const step = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); if (!el.isConnected) return; out(from + (to - from) * e); if (k < 1) countRaf = requestAnimationFrame(step); };
  countRaf = requestAnimationFrame(step);
}
function toast(html, undo) {
  const host = document.getElementById('toastHost');
  clearInterval(toastTimer);
  let left = undo ? 5 : 3;
  host.innerHTML = `<div class="toast" role="status"><span class="ok"><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="${P.check}"/></svg></span><span style="min-width:0">${html}</span>${undo ? `<button class="undo" data-act="undo">Отменить <span class="tiny muted">${left}</span></button>` : '<span></span>'}</div>`;
  S.undo = undo || null;
  toastTimer = setInterval(() => {
    left--;
    if (left <= 0) { clearInterval(toastTimer); host.innerHTML = ''; S.undo = null; return; }
    const sp = host.querySelector('.undo .tiny'); if (sp) sp.textContent = left;
  }, 1000);
}

// ================= действия =================
function openAdd(mode) {
  const acc = mode === 'transfer' ? pickAcc('visa') : pickAcc('uz');
  S.overlay = { type: 'add', mode, input: '', cat: null, acc, to: otherAcc(acc), comment: '', yesterday: false };
  render({ overlayOnly: true });
}
function typeKey(k) {
  const o = S.overlay; let s = o.input || '';
  if (o.full) o.full = false; // сумму поправили вручную — это уже не «весь остаток»
  const [ip, fp] = s.split(',');
  if (k === '⌫') s = s.slice(0, -1);
  else if (k === ',') { if (!s.includes(',')) s = (s || '0') + ','; }
  else if (k === '000') { if (!s || s === '0' || fp !== undefined || ip.length > 7) return; s += '000'; }
  else if (k.startsWith('+')) { const v = amountVal(s) + Number(k.replace(/\D/g, '')); if (v >= 1e10) return; s = String(r2(v)).replace('.', ','); }
  else { if (fp !== undefined) { if (fp.length >= 2) return; } else if (ip.length >= 10) return; if (s === '0') s = ''; s += k; }
  o.input = s; haptic(); render({ overlayOnly: true });
}
function saveAdd() {
  const o = S.overlay, v = amountVal(o.input), a = accOf(o.acc), date = new Date();
  if (o.mode !== 'income' && !o.confirmNeg && bal(a) - v < -0.004) { // минус на счёте — только с подтверждением
    S.overlay = { type: 'negconfirm', parent: o, acc: a.id, after: r2(bal(a) - v) }; render({ overlayOnly: true }); return;
  }
  if (o.yesterday) date.setDate(date.getDate() - 1);
  let op;
  if (o.mode === 'transfer') { const b = accOf(o.to); op = { id: S.nextId++, kind: 'transfer', title: 'Перевод', amount: v, cur: a.cur, acc: a.id, to: b.id, toAmount: r2(conv(v, a.cur, b.cur)), date }; }
  else { const c = catOf(o.cat), comment = (o.comment || '').trim(); op = { id: S.nextId++, kind: o.mode, cat: c.id, title: comment || c.name, comment, amount: v, cur: a.cur, acc: a.id, date }; }
  S.ops.push(op); S.justAdded = op.id; S.overlay = null; haptic();
  render({ anim: false });
  setTimeout(() => { if (S.justAdded === op.id) S.justAdded = null; }, 1700);
  let extra = '';
  if (op.kind === 'expense' && S.budgets[op.cat] && op.date >= monthStats(0).from) { const r = (monthStats(0).byCat[op.cat] || 0) / S.budgets[op.cat]; if (r >= 0.8) extra = ` · ${catOf(op.cat).name}: ${Math.round(r * 100)}% лимита`; }
  const label = op.kind === 'transfer' ? 'Перевод выполнен' : op.kind === 'income' ? 'Доход сохранён' : 'Расход сохранён';
  toast(`<b>${label}</b><span class="tiny muted">${esc(op.title)} · ${fmt(op.amount, op.cur)}${extra}</span>`, { type: 'remove', id: op.id });
}
/** Погашение долга: v — фактическая сумма в валюте счёта, debtPart — сколько гасится в валюте долга, ov — выбор при переплате */
function registerPay(x, A, v, debtPart, ov) {
  const u = snap(), lent = x.dir === 'lent', now = new Date();
  x.paid = r2(Math.min(x.amount, x.paid + debtPart));
  x.pays.push({ amount: debtPart, cur: x.cur, accAmount: v, accCur: A.cur, date: now, note: `${lent ? 'на' : 'с'} ${A.name}` });
  let moved = v; // вся полученная сумма — в движении денег по счёту
  if (ov && ov.pick === 'fx_result') { // переплата — отдельный тип «курсовая разница», не доход; сумма на счёте та же
    moved = ov.remAcc;
    S.ops.push({ id: S.nextId++, kind: 'fx', sign: lent ? 1 : -1, debt: x.id, title: `Курсовая разница · ${x.person}`, comment: 'переплата по долгу', amount: ov.overAcc, cur: A.cur, acc: A.id, date: now });
  }
  S.ops.push({ id: S.nextId++, kind: 'debt', sign: lent ? 1 : -1, debt: x.id, title: lent ? `Возврат долга · ${x.person}` : `Вернул долг · ${x.person}`, amount: moved, cur: A.cur, acc: A.id, date: now });
  if (ov && (ov.pick === 'return_to_debtor' || ov.pick === 'advance')) {
    const due = new Date(); due.setDate(due.getDate() + (ov.pick === 'advance' ? 60 : 7));
    S.debts.push({ id: S.nextDebt++, dir: 'borrowed', person: x.person, amount: ov.over, cur: x.cur, paid: 0, due, pays: [], purpose: ov.pick === 'advance' ? 'advance' : 'refund' });
  }
  if (ov && ov.pick === 'later') x.overpay = { debt: ov.over, acc: ov.overAcc, cur: A.cur };
  haptic(); render({ anim: false });
  const closed = x.paid >= x.amount;
  const extra = ov ? { return_to_debtor: ' · создан долг «вернуть переплату»', advance: ' · переплата сохранена авансом', fx_result: ' · переплата записана курсовой разницей', later: ' · переплату разберёте позже' }[ov.pick] : '';
  toast(`<b>${closed ? 'Долг погашен' : 'Платёж записан'}</b><span class="tiny muted">${x.person} · ${fmt(v, A.cur)}${A.cur !== x.cur ? ` ≈ ${fmt(debtPart, x.cur)}` : ''}${closed ? '' : ` · осталось ${fmt(r2(x.amount - x.paid), x.cur)}`}${extra}</span>`, u);
}
const handlers = {
  tab: (d) => { S.tab = d.to; S.stack = []; render({ top: true }); },
  push: (d) => { if (!d.to) return; S.stack.push({ s: d.to, id: d.id === undefined || d.id === '' ? undefined : isNaN(+d.id) ? d.id : +d.id }); render({ top: true }); },
  back: () => { S.stack.pop(); render({ back: true }); },
  op: (d) => { S.stack.push({ s: 'op', id: +d.id }); render({ top: true }); },
  filteracc: (d) => { const a = accOf(d.id); S.tab = 'ops'; S.stack = []; S.q = a.name; S.chips = 'all'; render({ top: true }); toast(`<b>Операции по счёту ${a.name}</b><span class="tiny muted">Очистите поиск, чтобы увидеть все</span>`); },
  hide: () => { S.hide = !S.hide; haptic(); render({ anim: false }); },
  cur: () => { const list = ['UZS', 'USD', 'EUR', 'RUB']; S.cur = list[(list.indexOf(S.cur) + 1) % list.length]; S.lastTotal = null; haptic(); render({ anim: false }); },
  period: (d) => { S.period = d.p; haptic(); render({ anim: false, redraw: true }); },
  chip: (d) => { S.chips = d.k; render({ anim: false }); },
  aper: (d) => { S.aPer = d.p; render({ anim: false, redraw: true }); },
  dtab: (d) => { S.debtTab = d.k; render({ anim: false }); },
  add: (d) => openAdd(d.mode),
  mode: (d) => { const o = S.overlay; if (o.mode === d.mode) return; o.mode = d.mode; o.cat = null; if (d.mode === 'transfer') { o.acc = pickAcc('visa'); o.to = otherAcc(o.acc); } else if (o.acc === 'visa' && d.mode === 'income') o.acc = pickAcc('uz'); render({ overlayOnly: true }); },
  key: (d) => typeKey(d.k),
  cat: (d) => { S.overlay.cat = d.id; haptic(); render({ overlayOnly: true }); },
  day: () => { S.overlay.yesterday = !S.overlay.yesterday; render({ overlayOnly: true }); },
  swap: () => { const o = S.overlay; [o.acc, o.to] = [o.to, o.acc]; haptic(); render({ overlayOnly: true }); },
  pickacc: (d) => { S.overlay = { type: 'pickacc', k: d.k, parent: S.overlay }; render({ overlayOnly: true }); },
  setacc: (d) => { const p = S.overlay.parent; p[S.overlay.k] = d.id; S.overlay = p; haptic(); render({ overlayOnly: true }); },
  save: () => saveAdd(),
  close: () => { S.overlay = S.overlay && S.overlay.type === 'pickacc' ? S.overlay.parent : null; render({ overlayOnly: true }); },
  del: (d) => { S.overlay = { type: 'confirm', id: +d.id }; render({ overlayOnly: true }); },
  delok: (d) => { const i = S.ops.findIndex((o) => o.id === +d.id), [x] = S.ops.splice(i, 1); S.overlay = null; S.stack.pop(); haptic(); render({ back: true }); toast(`<b>Операция удалена</b><span class="tiny muted">${esc(x.title)} · балансы пересчитаны</span>`, { type: 'restore', op: x }); },
  undo: () => {
    const u = S.undo; if (!u) return;
    if (u.type === 'remove') S.ops = S.ops.filter((o) => o.id !== u.id);
    if (u.type === 'restore') S.ops.push(u.op);
    if (u.type === 'edit') Object.assign(S.ops.find((o) => o.id === u.id) || {}, u.prev);
    if (u.type === 'snap') { S.debts = u.debts; S.ops = u.ops; S.goals = u.goals; }
    if (u.type === 'acc') Object.assign(accOf(u.id) || {}, u.prev);
    if (u.type === 'budget') { if (u.prev == null) delete S.budgets[u.id]; else S.budgets[u.id] = u.prev; }
    if (u.type === 'rate') { RATES[u.cur] = u.prev; S.fx = u.fx; S.lastTotal = null; }
    clearInterval(toastTimer); S.undo = null; haptic(); render({ anim: false }); toast('<b>Отменено</b><span class="tiny muted">всё вернулось как было</span>');
  },
  editamt: (d) => { const x = S.ops.find((o) => o.id === +d.id); S.overlay = { type: 'amount', title: 'Новая сумма', hint: `Сейчас ${fmt(x.amount, x.cur)}`, ok: 'Сохранить', input: '', cur: x.cur, target: { kind: 'op', id: x.id } }; render({ overlayOnly: true }); },
  debtpay: (d) => { S.overlay = { type: 'dpay', id: +d.id, acc: pickAcc('cash'), input: '' }; render({ overlayOnly: true }); },
  debtfull: (d) => { const x = S.debts.find((y) => y.id === +d.id), A = accOf(pickAcc('cash')); S.overlay = { type: 'dpay', id: x.id, acc: A.id, full: true, input: String(r2(conv(x.amount - x.paid, x.cur, A.cur))).replace('.', ',') }; render({ overlayOnly: true }); },
  dpayacc: (d) => { const o = S.overlay; o.acc = d.id; if (o.full) { const x = S.debts.find((y) => y.id === o.id); o.input = String(r2(conv(x.amount - x.paid, x.cur, accOf(d.id).cur))).replace('.', ','); } render({ overlayOnly: true }); },
  dpayok: () => {
    const o = S.overlay, x = S.debts.find((y) => y.id === o.id), A = accOf(o.acc), v = amountVal(o.input), rem = r2(x.amount - x.paid);
    const inDebt = o.full ? rem : A.cur === x.cur ? v : r2(conv(v, A.cur, x.cur)); // «Вернул всё» гасит ровно остаток
    if (r2(inDebt - rem) > 0.01) {
      const remAcc = r2(conv(rem, x.cur, A.cur));
      S.overlay = { type: 'overpay', id: x.id, acc: A.id, v, rem, remAcc, over: r2(inDebt - rem), overAcc: r2(v - remAcc), pick: null, parent: o };
      render({ overlayOnly: true }); return;
    }
    S.overlay = null; registerPay(x, A, v, Math.min(inDebt, rem), null);
  },
  opick: (d) => { S.overlay.pick = d.k; haptic(); render({ overlayOnly: true }); },
  overback: () => { S.overlay = S.overlay.parent; render({ overlayOnly: true }); },
  overpayok: () => { const o = S.overlay, x = S.debts.find((y) => y.id === o.id), A = accOf(o.acc); S.overlay = null; registerPay(x, A, o.v, o.rem, o); },
  debtdel: (d) => { S.overlay = { type: 'debtdel', id: +d.id, pick: 'record_only' }; render({ overlayOnly: true }); },
  ddpick: (d) => { S.overlay.pick = d.k; render({ overlayOnly: true }); },
  debtdelok: () => {
    const o = S.overlay, x = S.debts.find((y) => y.id === o.id), u = snap();
    x.deleted = true;
    if (o.pick === 'reverse_all') S.ops = S.ops.filter((op) => op.debt !== x.id);
    S.overlay = null; S.stack.pop(); haptic(); render({ back: true });
    toast(`<b>Долг удалён</b><span class="tiny muted">${x.person} · ${o.pick === 'reverse_all' ? 'движения отменены, балансы пересчитаны' : 'балансы не изменились'}</span>`, u);
  },
  goaladd: (d) => { const g = S.goals.find((x) => x.id === +d.id); S.overlay = { type: 'alloc', mode: 'add', gid: g.id, acc: pickAcc('uz'), input: '' }; render({ overlayOnly: true }); },
  goalrel: (d) => {
    const g = S.goals.find((x) => x.id === +d.id), first = Object.keys(g.alloc)[0];
    if (!first) { toast('<b>На цели пока ничего не отложено</b>'); return; }
    S.overlay = { type: 'alloc', mode: 'release', gid: g.id, acc: first, input: '' }; render({ overlayOnly: true });
  },
  allocacc: (d) => { S.overlay.acc = d.id; render({ overlayOnly: true }); },
  allocok: () => {
    const o = S.overlay, g = S.goals.find((x) => x.id === o.gid), A = accOf(o.acc), v = amountVal(o.input), u = snap();
    const nv = r2((g.alloc[A.id] || 0) + (o.mode === 'add' ? v : -v));
    if (nv > 0) g.alloc[A.id] = nv; else delete g.alloc[A.id];
    S.overlay = null; haptic(); render({ anim: false });
    toast(`<b>${o.mode === 'add' ? `Отложено на «${g.name}»` : `Снято с «${g.name}»`}</b><span class="tiny muted">${fmt(v, A.cur)} · деньги остались на ${A.name}</span>`, u);
  },
  negok: () => { const p = S.overlay.parent; p.confirmNeg = true; S.overlay = p; saveAdd(); },
  negback: () => { S.overlay = S.overlay.parent; render({ overlayOnly: true }); },
  amountok: () => {
    const o = S.overlay, v = amountVal(o.input), t = o.target; S.overlay = null; haptic();
    if (t.kind === 'bal') { const a = accOf(t.id), prev = { initial: a.initial }, was = bal(a); a.initial = r2(a.initial + v - was); S.lastTotal = null; render({ anim: false }); toast(`<b>Остаток ${esc(a.name)}: ${fmt(v, a.cur)}</b><span class="tiny muted">было ${fmt(was, a.cur)} · в доходы и расходы не попало</span>`, { type: 'acc', id: a.id, prev }); }
    if (t.kind === 'budget') { const prev = S.budgets[t.id]; S.budgets[t.id] = v; render({ anim: false }); toast(`<b>Лимит «${catOf(t.id).name}»: ${fmt(v)}</b><span class="tiny muted">на каждый месяц</span>`, { type: 'budget', id: t.id, prev }); }
    if (t.kind === 'rate') { const u = { type: 'rate', cur: t.cur, prev: RATES[t.cur], fx: S.fx }; RATES[t.cur] = v; S.fx = { at: new Date().toISOString(), src: 'manual', date: '' }; S.lastTotal = null; render({ anim: false }); toast(`<b>1 ${t.cur} = ${fmt(v)}</b><span class="tiny muted">общий баланс пересчитан</span>`, u); }
    if (t.kind === 'op') { const x = S.ops.find((y) => y.id === t.id), prev = { amount: x.amount, toAmount: x.toAmount }; x.amount = v; if (x.kind === 'transfer') x.toAmount = r2(conv(v, x.cur, accOf(x.to).cur)); render({ anim: false }); toast(`<b>Сумма изменена</b><span class="tiny muted">было ${fmt(prev.amount, x.cur)} · балансы пересчитаны</span>`, { type: 'edit', id: x.id, prev }); }
  },
  ask: (d) => {
    if (S.chat.some((m) => m.typing)) return;
    S.chat.push({ me: true, text: d.q }, { typing: true }); render({ anim: false }); scrollChat();
    setTimeout(() => { S.chat = S.chat.filter((m) => !m.typing); S.chat.push(aiAnswer(d.q)); if (view().s === 'ai') { render({ anim: false }); scrollChat(); } }, 900);
  },
  theme: (d) => {
    if (d.t === 'auto') { let tg = null; try { tg = inTG() && window.Telegram.WebApp.colorScheme; } catch (e) { /* нет Telegram */ } if (tg) document.documentElement.setAttribute('data-theme', tg); else document.documentElement.removeAttribute('data-theme'); }
    else document.documentElement.setAttribute('data-theme', d.t);
    if (MY) { try { if (d.t === 'auto') localStorage.removeItem('who-wallet-my-theme'); else localStorage.setItem('who-wallet-my-theme', d.t); } catch (e) { /* хранилище недоступно */ } }
    haptic(); render({ anim: false });
  },
  toast: (d) => toast(`<b>${esc(d.msg)}</b>`),
  reset: () => { dropMine(); S = seed(); S.stack = [{ s: 'profile' }]; render({ anim: false }); toast('<b>Демо-данные возвращены к началу</b>'); },
  wipe: (d) => { S.overlay = { type: 'wipe', to: d.to }; render({ overlayOnly: true }); },
  amountclear: () => {
    const t = S.overlay.target; S.overlay = null; haptic();
    if (t.kind === 'budget') { const prev = S.budgets[t.id]; delete S.budgets[t.id]; render({ anim: false }); toast(`<b>Лимит «${catOf(t.id).name}» убран</b>`, { type: 'budget', id: t.id, prev }); }
  },
  budgetedit: (d) => {
    const c = catOf(d.id), lim = S.budgets[c.id], sp = monthStats(0).byCat[c.id] || 0;
    S.overlay = { type: 'amount', title: `Лимит: ${c.name}`, hint: `${lim ? `Сейчас ${fmt(lim)} в месяц. ` : ''}В ${MPREP[new Date().getMonth()]} потрачено ${fmt(sp, 'UZS', { round: true })}`, ok: 'Сохранить', input: '', cur: 'UZS', target: { kind: 'budget', id: c.id }, clear: lim ? 'Убрать лимит' : '' };
    render({ overlayOnly: true });
  },
  rateedit: (d) => { S.overlay = { type: 'amount', title: `Сколько сумов стоит 1 ${d.cur}`, hint: `Сейчас ${fmt(RATES[d.cur])}`, ok: 'Сохранить', input: '', cur: 'UZS', target: { kind: 'rate', cur: d.cur } }; render({ overlayOnly: true }); },
  cbu: async () => {
    toast('<b>Загружаю курс ЦБ…</b>');
    const ok = await loadCBU(); render({ anim: false });
    toast(ok ? `<b>Курс ЦБ обновлён</b><span class="tiny muted">${fxLine()}</span>` : '<b>Не получилось загрузить курс</b><span class="tiny muted">Нет интернета или сайт ЦБ недоступен. Можно вписать курс вручную</span>');
  },
  newacc: () => { S.overlay = { type: 'newacc', name: '', kind: 'card', cur: 'UZS', input: '' }; render({ overlayOnly: true }); },
  naset: (d) => { S.overlay[d.k] = d.v; haptic(); render({ overlayOnly: true }); },
  newaccok: () => {
    const o = S.overlay, name = cleanName(o.name); if (!name) return;
    let n = S.nextAcc || 1; while (accOf('a' + n)) n++;
    const a = { id: 'a' + n, name, num: '', cur: o.cur, kind: o.kind, cc: ['--card1', '--card2', '--card3', '--card4'][S.accounts.length % 4], initial: amountVal(o.input) };
    S.nextAcc = n + 1; S.accounts.push(a); S.overlay = null; S.lastTotal = null; haptic(); render({ anim: false });
    toast(`<b>Счёт «${esc(name)}» добавлен</b><span class="tiny muted">${fmt(a.initial, a.cur)}</span>`);
  },
  accbal: (d) => { const a = accOf(d.id); S.overlay = { type: 'amount', title: `Сколько сейчас на «${esc(a.name)}»`, hint: `По записям: ${fmt(bal(a), a.cur)}`, ok: 'Сохранить', input: '', cur: a.cur, zero: true, target: { kind: 'bal', id: a.id } }; render({ overlayOnly: true }); },
  accname: (d) => { const a = accOf(d.id); S.overlay = { type: 'accname', id: a.id, name: a.name, kind: isCash(a) ? 'cash' : 'card' }; render({ overlayOnly: true }); },
  accnameok: () => {
    const o = S.overlay, a = accOf(o.id), name = cleanName(o.name); if (!name) return;
    a.name = name; a.kind = o.kind; S.overlay = null; haptic(); render({ anim: false }); toast(`<b>Сохранено</b><span class="tiny muted">${esc(name)}</span>`);
  },
  accdel: (d) => { S.overlay = { type: 'accdel', id: d.id }; render({ overlayOnly: true }); },
  accdelok: (d) => {
    const a = accOf(d.id); if (!a || accUsed(a) || S.accounts.length < 2) return;
    S.accounts = S.accounts.filter((x) => x.id !== a.id); S.goals.forEach((g) => { delete g.alloc[a.id]; });
    S.overlay = null; S.stack.pop(); S.lastTotal = null; haptic(); render({ back: true }); toast(`<b>Счёт «${esc(a.name)}» удалён</b>`);
  },
  export: () => {
    const now = new Date(), y = now.getFullYear(), p2 = (v) => String(v).padStart(2, '0');
    const data = JSON.stringify({ app: 'who-wallet', version: 1, savedAt: now.toISOString(), ...serialize(), backupAt: now.toISOString() }, null, 1);
    try {
      const url = URL.createObjectURL(new Blob([data], { type: 'application/json' })), a = document.createElement('a');
      a.href = url; a.download = `who-wallet-${y}-${p2(now.getMonth() + 1)}-${p2(now.getDate())}.json`; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      S.backupAt = now.toISOString(); render({ anim: false });
      toast(`<b>Копия скачана</b><span class="tiny muted">${inTG() ? 'Если файл не появился, откройте сайт в обычном браузере' : 'Сохраните файл в надёжном месте'}</span>`);
    } catch (e) { toast('<b>Не получилось сохранить файл</b><span class="tiny muted">Откройте сайт в обычном браузере и попробуйте ещё раз</span>'); }
  },
  import: () => document.getElementById('importFile').click(),
  importok: () => {
    const st = S.overlay.data; st.stack = [{ s: 'profile' }]; st.tab = 'home';
    adopt(st); S.lastTotal = null; haptic(); render({ anim: false });
    toast(`<b>Копия загружена</b><span class="tiny muted">${plural(S.ops.length, 'операция', 'операции', 'операций')} · ${plural(S.accounts.length, 'счёт', 'счёта', 'счетов')}</span>`);
  },
  wipeok: () => {
    const zero = S.overlay.to === 'zero';
    const keep = MY ? { accounts: S.accounts.map((a) => ({ ...a, initial: 0 })), fx: S.fx, nextAcc: S.nextAcc, backupAt: S.backupAt } : {};
    dropMine(); S = zero ? { ...zeroState(), ...keep } : seed(); S.stack = [{ s: 'profile' }]; S.lastTotal = null; haptic(); render({ anim: false });
    toast(zero ? `<b>Всё обнулено</b><span class="tiny muted">${MY ? 'Счета остались, балансы нулевые' : 'Новые записи сохраняются на этом устройстве'}</span>` : '<b>Показаны демо-данные</b>');
  },
  newdebt: () => { S.overlay = { type: 'newdebt', dir: S.debtTab || 'lent', person: '', acc: pickAcc('cash'), input: '', due: 'none' }; render({ overlayOnly: true }); },
  ndset: (d) => { S.overlay[d.k] = d.v; haptic(); render({ overlayOnly: true }); },
  newdebtok: () => {
    const o = S.overlay, A = accOf(o.acc), v = amountVal(o.input), person = cleanName(o.person, 40);
    if (!(v > 0) || !person) return;
    const u = snap(), lent = o.dir === 'lent', id = S.nextDebt++;
    let due = null;
    if (o.due !== 'none') { due = new Date(); due.setDate(due.getDate() + Number(o.due)); }
    S.debts.push({ id, dir: o.dir, person, amount: v, cur: A.cur, paid: 0, due, pays: [] });
    S.ops.push({ id: S.nextId++, kind: 'debt', sign: lent ? -1 : 1, debt: id, title: `${lent ? 'Дал в долг' : 'Взял в долг'} · ${person}`, amount: v, cur: A.cur, acc: A.id, date: new Date() });
    S.debtTab = o.dir; S.overlay = null; haptic(); render({ anim: false });
    toast(`<b>Долг записан</b><span class="tiny muted">${esc(person)} · ${fmt(v, A.cur)} · баланс ${A.name} ${lent ? 'уменьшился' : 'увеличился'}</span>`, u);
  },
  newgoal: () => { S.overlay = { type: 'newgoal', name: '', input: '' }; render({ overlayOnly: true }); },
  newgoalok: () => {
    const o = S.overlay, v = amountVal(o.input), name = cleanName(o.name, 40);
    if (!(v > 0) || !name) return;
    const gid = S.nextGoal || 3; S.nextGoal = gid + 1;
    S.goals.unshift({ id: gid, type: 'goal', name, target: v, cur: 'UZS', monthly: 0, alloc: {} });
    S.overlay = null; haptic(); render({ anim: false });
    toast(`<b>Цель создана</b><span class="tiny muted">${esc(name)} · ${fmt(v)}</span>`);
  },
};
/** Текстовые поля листов: значение запоминается до перерисовки */
function captureInputs() {
  const o = S.overlay, get = (id) => document.getElementById(id); if (!o) return;
  if (o.type === 'add' && get('comment')) o.comment = get('comment').value;
  if (o.type === 'newdebt' && get('person')) o.person = get('person').value;
  if (o.type === 'newgoal' && get('gname')) o.name = get('gname').value;
  if ((o.type === 'newacc' || o.type === 'accname') && get('aname')) o.name = get('aname').value;
}
function scrollChat() { const sc = document.getElementById('screen'); sc.scrollTop = sc.scrollHeight; }

const device = document.getElementById('device');
device.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
  const h = handlers[el.dataset.act]; if (!h) return;
  captureInputs();
  h({ ...el.dataset });
});
device.addEventListener('input', (e) => {
  const o = S.overlay;
  if (o && (e.target.id === 'person' || e.target.id === 'gname')) { // кнопка «Записать» оживает сразу, без перерисовки поля
    if (e.target.id === 'person') o.person = e.target.value; else o.name = e.target.value;
    const b = document.querySelector(o.type === 'newdebt' ? '[data-act="newdebtok"]' : '[data-act="newgoalok"]');
    if (b) b.disabled = !(amountVal(o.input) > 0 && e.target.value.trim());
    return;
  }
  if (o && e.target.id === 'aname') { o.name = e.target.value; const b = document.querySelector('[data-act="newaccok"], [data-act="accnameok"]'); if (b) b.disabled = !cleanName(o.name); return; }
  if (e.target.id !== 'q') return;
  S.q = e.target.value; const pos = e.target.selectionStart; render({ anim: false });
  const q = document.getElementById('q'); q.focus(); try { q.setSelectionRange(pos, pos); } catch (err) { /* type=search */ }
});
document.addEventListener('keydown', (e) => {
  if (!S.overlay) return;
  if (e.key === 'Escape') { handlers.close(); return; }
  if (e.key === 'Enter' && e.target.id === 'aname') { captureInputs(); const b = document.querySelector('.sheet [data-act="newaccok"], .sheet [data-act="accnameok"]'); if (b && !b.disabled) b.click(); return; }
  if (!['add', 'amount', 'alloc', 'dpay', 'newdebt', 'newgoal', 'newacc'].includes(S.overlay.type) || e.target.tagName === 'INPUT') return;
  captureInputs();
  if (/^\d$/.test(e.key)) typeKey(e.key); else if (e.key === ',' || e.key === '.') typeKey(','); else if (e.key === 'Backspace') typeKey('⌫');
  else if (e.key === 'Enter') { const b = document.querySelector('.sheet [data-act="save"], .sheet [data-act="amountok"], .sheet [data-act="allocok"], .sheet [data-act="dpayok"], .sheet [data-act="newdebtok"], .sheet [data-act="newgoalok"], .sheet [data-act="newaccok"]'); if (b && !b.disabled) b.click(); }
});

// снимки экранов для отчёта: адрес вида #shot-… открывает нужное состояние без анимаций
const keys = (str) => str.split('').map((k) => () => typeKey(k));
const openDebt = (id) => [() => handlers.push({ to: 'debts' }), () => handlers.push({ to: 'debt', id: String(id) })];
const SHOT = {
  'shot-home': [],
  'shot-zero': [() => { S = zeroState(); render({ anim: false }); }],
  'shot-zero-profile': [() => { S = zeroState(); S.stack = [{ s: 'profile' }]; render({ anim: false }); }],
  'shot-newdebt': [() => { S = zeroState(); handlers.push({ to: 'debts' }); handlers.newdebt(); S.overlay.person = 'Алишер'; }, ...keys('300000')],
  'shot-accounts': [() => handlers.tab({ to: 'accounts' })],
  'shot-goal': [() => handlers.push({ to: 'goal' })],
  'shot-goal-over': [() => handlers.push({ to: 'goal' }), () => handlers.goaladd({ id: '1' }), ...keys('7000000')],
  'shot-debtpay': [...openDebt(4), () => handlers.debtpay({ id: '4' }), ...keys('5000000')],
  'shot-overpay': [...openDebt(4), () => handlers.debtpay({ id: '4' }), ...keys('13000000'), () => handlers.dpayok(), () => handlers.opick({ k: 'return_to_debtor' })],
  'shot-debtdel': [...openDebt(1), () => handlers.debtdel({ id: '1' }), () => handlers.ddpick({ k: 'reverse_all' })],
  'shot-negative': [() => handlers.add({ mode: 'expense' }), () => { S.overlay.acc = 'humo'; }, () => handlers.cat({ id: 'food' }), ...keys('3000000'), () => handlers.save()],
  'shot-reserve-spent': [() => { S.ops.push({ id: S.nextId++, kind: 'expense', cat: 'shop', title: 'Texnomart', amount: 7000000, cur: 'UZS', acc: 'uz', date: new Date() }); S.lastTotal = null; render({ anim: false }); }],
};
// резервная копия из файла: сначала показываем, что в нём, и только после подтверждения заменяем
device.addEventListener('change', (e) => {
  if (e.target.id !== 'importFile' || !e.target.files[0]) return;
  const f = e.target.files[0], rd = new FileReader();
  rd.onload = () => {
    try { const raw = JSON.parse(rd.result), st = hydrate(raw); st.savedAt = raw.savedAt; S.overlay = { type: 'import', file: f.name, data: st }; render({ overlayOnly: true }); }
    catch (err) { toast(`<b>Файл не подошёл</b><span class="tiny muted">${esc(err instanceof SyntaxError ? 'Это не резервная копия Who Wallet' : err.message)}</span>`); }
  };
  rd.readAsText(f); e.target.value = '';
});

if (MY) {
  const inp = document.createElement('input'); inp.type = 'file'; inp.id = 'importFile'; inp.accept = 'application/json,.json'; inp.hidden = true; device.appendChild(inp);
  const saved = loadMine(); if (saved) adopt(saved); else S = zeroState();
  render({ top: true });
  // попросить браузер не стирать записи при нехватке места
  try { navigator.storage && navigator.storage.persist && navigator.storage.persist().catch(() => {}); } catch (e) { /* не поддерживается */ }
  // курс ЦБ подтягивается сам раз в полдня, если вы не вписали свой
  if (S.fx.src !== 'manual' && (!S.fx.at || Date.now() - new Date(S.fx.at) > 12 * 3600e3)) loadCBU().then((ok) => { if (!ok) return; if (S.overlay) saveMine(); else render({ anim: false }); });
} else {
  if (location.hash.startsWith('#shot-')) document.documentElement.classList.add('no-anim');
  const saved = !location.hash.startsWith('#shot-') && loadMine(); if (saved) adopt(saved); else S = seed();
  render({ top: true });
  (SHOT[location.hash.slice(1)] || []).forEach((fn) => fn());
}
})();
